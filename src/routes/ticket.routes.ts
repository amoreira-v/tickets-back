import { Router } from 'express';
import { TicketController } from '../controllers/TicketController';
import { validateRequest } from '../middlewares/validateRequest';
import { CreateTicketDto, UpdateTicketStatusDto } from '../dtos/ticket.dto';

const router = Router();
const ticketController = new TicketController();

router.get('/', ticketController.getAll);

router.post('/', validateRequest(CreateTicketDto), ticketController.create);

router.patch('/:id/status', validateRequest(UpdateTicketStatusDto), ticketController.updateStatus);

export default router;
