import { AuthService } from '../services/AuthService';
import { AppDataSource } from '../config/data-source';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import { Profile, ProfileName } from '../models/Profile';

jest.mock('../config/data-source', () => ({
  AppDataSource: {
    getRepository: jest.fn(),
  },
}));

jest.mock('bcrypt');
jest.mock('jsonwebtoken');

describe('AuthService', () => {
  let authService: AuthService;
  let userRepositoryMock: any;
  let profileRepositoryMock: any;

  beforeEach(() => {
    userRepositoryMock = {
      findOneBy: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
    };
    profileRepositoryMock = {
      findOneBy: jest.fn(),
    };

    (AppDataSource.getRepository as jest.Mock).mockImplementation((entity) => {
      if (entity === User) return userRepositoryMock;
      if (entity === Profile) return profileRepositoryMock;
    });

    authService = new AuthService();
  });

  describe('register', () => {
    it('should register a new user successfully', async () => {
      const registerDto = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
      };

      const mockProfile = { id: '1', name: ProfileName.CLIENTE };
      const hashedPassword = 'hashedPassword123';
      const savedUser = {
        id: '1',
        ...registerDto,
        password: hashedPassword,
        profile: mockProfile,
      };

      userRepositoryMock.findOneBy.mockResolvedValue(null);
      profileRepositoryMock.findOneBy.mockResolvedValue(mockProfile);
      (bcrypt.hash as jest.Mock).mockResolvedValue(hashedPassword);
      userRepositoryMock.create.mockReturnValue(savedUser);
      userRepositoryMock.save.mockResolvedValue(savedUser);

      const result = await authService.register(registerDto);

      expect(userRepositoryMock.findOneBy).toHaveBeenCalledWith({ email: registerDto.email });
      expect(bcrypt.hash).toHaveBeenCalledWith(registerDto.password, 10);
      expect(userRepositoryMock.create).toHaveBeenCalled();
      expect(userRepositoryMock.save).toHaveBeenCalled();
      expect(result).not.toHaveProperty('password');
      expect(result.email).toBe(registerDto.email);
    });

    it('should register with a specific profile_id', async () => {
      const registerDto = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
        profile_id: '2'
      };

      const mockProfile = { id: '2', name: ProfileName.SOPORTE };
      const savedUser = { id: '1', ...registerDto, profile: mockProfile };

      userRepositoryMock.findOneBy.mockResolvedValue(null);
      profileRepositoryMock.findOneBy.mockResolvedValue(mockProfile);
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashed');
      userRepositoryMock.create.mockReturnValue(savedUser);
      userRepositoryMock.save.mockResolvedValue(savedUser);

      await authService.register(registerDto);

      expect(profileRepositoryMock.findOneBy).toHaveBeenCalledWith({ id: '2' });
    });

    it('should throw error if profile is not found', async () => {
      const registerDto = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
      };

      userRepositoryMock.findOneBy.mockResolvedValue(null);
      profileRepositoryMock.findOneBy.mockResolvedValue(null);

      await expect(authService.register(registerDto)).rejects.toThrow('Profile not found');
    });

    it('should throw an error if user already exists', async () => {
      const registerDto = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
      };

      userRepositoryMock.findOneBy.mockResolvedValue({ id: '1', email: registerDto.email });

      await expect(authService.register(registerDto)).rejects.toThrow('User already exists with this email');
    });
  });

  describe('login', () => {
    it('should return a token and user data on successful login', async () => {
      const loginDto = {
        email: 'test@example.com',
        password: 'password123',
      };

      const mockUser = {
        id: '1',
        name: 'Test User',
        email: 'test@example.com',
        password: 'hashedPassword123',
        profile: {
          name: ProfileName.CLIENTE,
          options: [{ name: 'Dashboard', path: '/dashboard', icon: 'dashboard' }],
        },
      };

      const mockToken = 'mockJwtToken';

      userRepositoryMock.findOne.mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      (jwt.sign as jest.Mock).mockReturnValue(mockToken);

      const result = await authService.login(loginDto);

      expect(userRepositoryMock.findOne).toHaveBeenCalledWith({
        where: { email: loginDto.email },
        relations: ['profile', 'profile.options'],
      });
      expect(bcrypt.compare).toHaveBeenCalledWith(loginDto.password, mockUser.password);
      expect(jwt.sign).toHaveBeenCalled();
      expect(result.token).toBe(mockToken);
      expect(result.user.email).toBe(mockUser.email);
    });

    it('should throw an error if user is not found', async () => {
      userRepositoryMock.findOne.mockResolvedValue(null);

      await expect(authService.login({ email: 'wrong@example.com', password: 'any' })).rejects.toThrow('User not found');
    });

    it('should throw an error if password does not match', async () => {
      const mockUser = { id: '1', password: 'hashedPassword' };
      userRepositoryMock.findOne.mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(authService.login({ email: 'test@example.com', password: 'wrong' })).rejects.toThrow('Invalid credentials');
    });
  });
});
