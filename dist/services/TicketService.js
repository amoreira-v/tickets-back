"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketService = void 0;
const data_source_1 = require("../config/data-source");
const Ticket_1 = require("../models/Ticket");
const User_1 = require("../models/User");
const CustomError_1 = require("../utils/CustomError");
const Profile_1 = require("../models/Profile");
class TicketService {
    constructor() {
        this.ticketRepository = data_source_1.AppDataSource.getRepository(Ticket_1.Ticket);
        this.userRepository = data_source_1.AppDataSource.getRepository(User_1.User);
    }
    toUserView(user) {
        if (!user) {
            return null;
        }
        return {
            id: user.id,
            name: user.name,
            email: user.email,
        };
    }
    toTicketView(ticket) {
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
    async createTicket(data, userAuthData) {
        if (userAuthData.profile !== Profile_1.ProfileName.CLIENTE) {
            throw new CustomError_1.CustomError('Solo los perfiles CLIENTE pueden crear tickets', 403);
        }
        const user = await this.userRepository.findOneBy({ id: userAuthData.id });
        if (!user) {
            throw new CustomError_1.CustomError('User not found', 404);
        }
        const ticket = this.ticketRepository.create({
            title: data.title,
            description: data.description,
            priority: data.priority,
            status: Ticket_1.TicketStatus.OPEN,
            user: user,
        });
        const savedTicket = await this.ticketRepository.save(ticket);
        return this.toTicketView({
            ...savedTicket,
            user,
            assignedTo: savedTicket.assignedTo ?? null,
        });
    }
    // Se añade parámetro userAuthData
    async updateTicketStatus(id, data, userAuthData) {
        if (userAuthData.profile !== Profile_1.ProfileName.SOPORTE) {
            throw new CustomError_1.CustomError('Solo los perfiles SOPORTE pueden cambiar el estado de los tickets', 403);
        }
        // Validar transición permitida
        const allowedStatuses = [Ticket_1.TicketStatus.IN_PROGRESS, Ticket_1.TicketStatus.RESOLVED, Ticket_1.TicketStatus.REJECTED];
        if (!allowedStatuses.includes(data.status)) {
            throw new CustomError_1.CustomError('Estado de transición no permitido', 400);
        }
        const ticket = await this.ticketRepository.findOneBy({ id });
        if (!ticket) {
            throw new CustomError_1.CustomError('Ticket not found', 404);
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
exports.TicketService = TicketService;
