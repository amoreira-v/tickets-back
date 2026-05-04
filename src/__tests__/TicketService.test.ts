import { TicketService } from '../services/TicketService';
import { AppDataSource } from '../config/data-source';
import { Ticket, TicketStatus } from '../models/Ticket';
import { User } from '../models/User';
import { ProfileName } from '../models/Profile';
import { CustomError } from '../utils/CustomError';

jest.mock('../config/data-source', () => ({
  AppDataSource: {
    getRepository: jest.fn(),
  },
}));

describe('TicketService', () => {
  let ticketService: TicketService;
  let ticketRepositoryMock: any;
  let userRepositoryMock: any;

  beforeEach(() => {
    ticketRepositoryMock = {
      find: jest.fn(),
      findOneBy: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
    };
    userRepositoryMock = {
      findOneBy: jest.fn(),
    };

    (AppDataSource.getRepository as jest.Mock).mockImplementation((entity) => {
      if (entity === Ticket) return ticketRepositoryMock;
      if (entity === User) return userRepositoryMock;
    });

    ticketService = new TicketService();
  });

  describe('getAllTickets', () => {
    it('should return all tickets formatted', async () => {
      const mockTickets = [
        { id: '1', title: 'T1', status: TicketStatus.OPEN, user: { id: 'u1' }, createdAt: new Date(), updatedAt: new Date() },
        { id: '2', title: 'T2', status: TicketStatus.IN_PROGRESS, user: null, createdAt: new Date(), updatedAt: new Date() }
      ];
      ticketRepositoryMock.find.mockResolvedValue(mockTickets);

      const result = await ticketService.getAllTickets();

      expect(result).toHaveLength(2);
      expect(result[0].id).toBe('1');
      expect(result[1].user).toBeNull();
    });
  });

  describe('createTicket', () => {
    const createDto = {
      title: 'Test Ticket',
      description: 'Test Description',
      priority: 'high',
    };

    const userAuth = {
      id: 'user-1',
      email: 'client@example.com',
      profile: ProfileName.CLIENTE,
      permissions: [],
    };

    it('should create a ticket with status OPEN when user is CLIENTE', async () => {
      const mockUser = { id: 'user-1', name: 'Client User', email: 'client@example.com' };
      const mockSavedTicket = {
        id: 'ticket-1',
        ...createDto,
        status: TicketStatus.OPEN,
        user: mockUser,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      userRepositoryMock.findOneBy.mockResolvedValue(mockUser);
      ticketRepositoryMock.create.mockReturnValue(mockSavedTicket);
      ticketRepositoryMock.save.mockResolvedValue(mockSavedTicket);

      const result = await ticketService.createTicket(createDto, userAuth);

      expect(ticketRepositoryMock.create).toHaveBeenCalledWith(expect.objectContaining({
        status: TicketStatus.OPEN,
        user: mockUser
      }));
      expect(result.status).toBe(TicketStatus.OPEN);
      expect(result.title).toBe(createDto.title);
    });

    it('should throw forbidden error if user is not CLIENTE', async () => {
      const supportAuth = { ...userAuth, profile: ProfileName.SOPORTE };

      await expect(ticketService.createTicket(createDto, supportAuth))
        .rejects.toThrow(CustomError);
      
      try {
        await ticketService.createTicket(createDto, supportAuth);
      } catch (error: any) {
        expect(error.statusCode).toBe(403);
        expect(error.message).toBe('Solo los perfiles CLIENTE pueden crear tickets');
      }
    });
  });

  describe('updateTicketStatus', () => {
    const ticketId = 'ticket-1';
    const updateDto = { status: TicketStatus.IN_PROGRESS };
    const supportAuth = {
      id: 'support-1',
      email: 'support@example.com',
      profile: ProfileName.SOPORTE,
      permissions: [],
    };

    it('should update ticket status when user is SOPORTE', async () => {
      const mockTicket = { id: ticketId, status: TicketStatus.OPEN };
      const updatedTicket = { ...mockTicket, status: TicketStatus.IN_PROGRESS, updatedAt: new Date() };

      ticketRepositoryMock.findOneBy.mockResolvedValue(mockTicket);
      ticketRepositoryMock.save.mockResolvedValue(updatedTicket);

      const result = await ticketService.updateTicketStatus(ticketId, updateDto, supportAuth);

      expect(result.status).toBe(TicketStatus.IN_PROGRESS);
      expect(ticketRepositoryMock.save).toHaveBeenCalledWith(expect.objectContaining({
        status: TicketStatus.IN_PROGRESS
      }));
    });

    it('should throw forbidden error if user is not SOPORTE', async () => {
      const clientAuth = { ...supportAuth, profile: ProfileName.CLIENTE };

      await expect(ticketService.updateTicketStatus(ticketId, updateDto, clientAuth))
        .rejects.toThrow('Solo los perfiles SOPORTE pueden cambiar el estado de los tickets');
    });

    it('should throw error if status transition is not allowed', async () => {
      const invalidDto = { status: TicketStatus.OPEN }; // OPEN is not in allowedStatuses for updates

      await expect(ticketService.updateTicketStatus(ticketId, invalidDto as any, supportAuth))
        .rejects.toThrow('Estado de transición no permitido');
    });

    it('should throw error if ticket is not found', async () => {
      ticketRepositoryMock.findOneBy.mockResolvedValue(null);

      await expect(ticketService.updateTicketStatus('non-existent', updateDto, supportAuth))
        .rejects.toThrow('Ticket not found');
    });
  });
});
