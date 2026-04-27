import { AppDataSource } from '../config/data-source';
import { Ticket, TicketStatus } from '../models/Ticket';
import { User } from '../models/User';
import { CreateTicketDto, UpdateTicketStatusDto } from '../dtos/ticket.dto';
import { CustomError } from '../utils/CustomError';
import { ProfileName } from '../models/Profile';
import { TokenPayload } from '../middlewares/auth.middleware';

interface TicketUserView {
  id: string;
  name: string;
  email: string;
}

interface TicketView {
  id: string;
  title: string;
  description: string;
  status: TicketStatus;
  priority: string;
  user: TicketUserView | null;
  assignedTo: TicketUserView | null;
  createdAt: Date;
  updatedAt: Date;
}

export class TicketService {
  private ticketRepository = AppDataSource.getRepository(Ticket);
  private userRepository = AppDataSource.getRepository(User);

  private toUserView(user: User | null | undefined): TicketUserView | null {
    if (!user) {
      return null;
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }

  private toTicketView(ticket: Ticket): TicketView {
    return {
      id: ticket.id,
      title: ticket.title,
      description: ticket.description,
      status: ticket.status,
      priority: ticket.priority,
      user: this.toUserView(ticket.user),
      assignedTo: this.toUserView(ticket.assignedTo),
      createdAt: ticket.createdAt,
      updatedAt: ticket.updatedAt,
    };
  }

  async getAllTickets() {
    const tickets = await this.ticketRepository.find({
      relations: ['user', 'assignedTo'],
      order: { createdAt: 'DESC' }
    });

    return tickets.map((ticket) => this.toTicketView(ticket));
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

    const savedTicket = await this.ticketRepository.save(ticket);

    return this.toTicketView({
      ...savedTicket,
      user,
      assignedTo: savedTicket.assignedTo ?? null,
    } as Ticket);
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
