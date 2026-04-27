import { Request, Response } from 'express';
import { TicketService } from '../services/TicketService';
import { catchAsync } from '../utils/catchAsync';
import { AuthRequest, TokenPayload } from '../middlewares/auth.middleware';

const ticketService = new TicketService();

export class TicketController {
  
  getAll = catchAsync(async (req: Request, res: Response) => {
    const tickets = await ticketService.getAllTickets();
    return res.status(200).json({
      status: 'success',
      data: tickets
    });
  });

  create = catchAsync(async (req: AuthRequest, res: Response) => {
    const newTicket = await ticketService.createTicket(req.body, req.user as TokenPayload);
    return res.status(201).json({
      status: 'success',
      data: newTicket
    });
  });

  updateStatus = catchAsync(async (req: AuthRequest, res: Response) => {
    const id = req.params.id as string;
    const updatedData = await ticketService.updateTicketStatus(id, req.body, req.user as TokenPayload);
    
    return res.status(200).json({
      status: 'success',
      data: updatedData
    });
  });
}
