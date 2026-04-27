import { AppDataSource } from '../config/data-source';
import { Ticket, TicketStatus } from '../models/Ticket';
import { User } from '../models/User';
import { CreateTicketDto, UpdateTicketStatusDto } from '../dtos/ticket.dto';
import { CustomError } from '../utils/CustomError';
import { ProfileName } from '../models/Profile';
import { TokenPayload } from '../middlewares/auth.middleware';

export class TicketService {
  private ticketRepository = AppDataSource.getRepository(Ticket);
  private userRepository = AppDataSource.getRepository(User);

  async getAllTickets() {
    return await this.ticketRepository.find({
      relations: ['user', 'assignedTo'],
      order: { createdAt: 'DESC' }
    });
  }

  // Se añade parámetro userAuthData que proviene de req.user
  async createTicket(data: CreateTicketDto, userAuthData: TokenPayload) {
    if (userAuthData.profile !== ProfileName.CLIENTE) {
      throw new CustomError('Solo los perfiles CLIENTE pueden crear tickets', 403);
    }

    const user = await this.userRepository.findOneBy({ id: userAuthData.id });
    if (!user) {
      throw new CustomError('User not found', 404);
    }

    const ticket = this.ticketRepository.create({
      title: data.title,
      description: data.description,
      priority: data.priority,
      status: TicketStatus.OPEN,
      user: user,
    });

    return await this.ticketRepository.save(ticket);
  }

  // Se añade parámetro userAuthData
  async updateTicketStatus(id: string, data: UpdateTicketStatusDto, userAuthData: TokenPayload) {
    if (userAuthData.profile !== ProfileName.SOPORTE) {
      throw new CustomError('Solo los perfiles SOPORTE pueden cambiar el estado de los tickets', 403);
    }

    // Validar transición permitida
    const allowedStatuses = [TicketStatus.IN_PROGRESS, TicketStatus.RESOLVED, TicketStatus.REJECTED];
    if (!allowedStatuses.includes(data.status)) {
      throw new CustomError('Estado de transición no permitido', 400);
    }

    const ticket = await this.ticketRepository.findOneBy({ id });
    
    if (!ticket) {
      throw new CustomError('Ticket not found', 404);
    }

    ticket.status = data.status;
    const updatedTicket = await this.ticketRepository.save(ticket);

    return {
      id: updatedTicket.id,
      status: updatedTicket.status,
      updated_at: updatedTicket.updatedAt
    };
  }
}
