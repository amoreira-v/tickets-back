import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AppDataSource } from '../config/data-source';
import { User } from '../models/User';
import { Profile, ProfileName } from '../models/Profile';
import { RegisterDto, LoginDto } from '../dtos/auth.dto';
import { ENV } from '../config/env.config';

export interface UserResponse {
  id: string;
  name: string;
  email: string;
  profile: string;
}

export interface AuthResponse {
  token: string;
  user: UserResponse;
}

export class AuthService {
  private userRepository = AppDataSource.getRepository(User);
  private profileRepository = AppDataSource.getRepository(Profile);

  async register(data: RegisterDto): Promise<Omit<User, 'password'>> {
    // Check if user exists
    const existingUser = await this.userRepository.findOneBy({ email: data.email });
    if (existingUser) {
      throw new Error('User already exists with this email');
    }

    // Determine profile
    let profile: Profile | null = null;
    
    if (data.profile_id) {
      profile = await this.profileRepository.findOneBy({ id: data.profile_id });
    } else {
      // Si no se envía ID, buscamos el perfil CLIENTE por defecto
      profile = await this.profileRepository.findOneBy({ name: ProfileName.CLIENTE as any });
    }

    if (!profile) {
      throw new Error('Profile not found');
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(data.password, saltRounds);

    // Create user
    const newUser = this.userRepository.create({
      name: data.name,
      email: data.email,
      password: hashedPassword,
      profile: profile
    });

    const savedUser = await this.userRepository.save(newUser);

    // Remove password from response
    const { password, ...userWithoutPassword } = savedUser;
    return userWithoutPassword;
  }

  async login(data: LoginDto): Promise<AuthResponse> {
    const user = await this.userRepository.findOne({ 
      where: { email: data.email },
      relations: ['profile']
    });

    if (!user) {
      throw new Error('User not found');
    }

    const isMatch = await bcrypt.compare(data.password, user.password);
    if (!isMatch) {
      throw new Error('Invalid credentials');
    }
    
    // Generate token
    const token = jwt.sign(
      { 
        id: user.id, 
        email: user.email, 
        profile: user.profile.name 
      }, 
      ENV.JWT_SECRET, 
      { expiresIn: '24h' }
    );

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        profile: user.profile.name
      }
    };
  }
}
