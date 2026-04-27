import { Router } from 'express';
import { TicketController } from '../controllers/TicketController';
import { validateRequest } from '../middlewares/validateRequest';
import { CreateTicketDto, UpdateTicketStatusDto } from '../dtos/ticket.dto';
import { requireRole } from '../middlewares/role.middleware';

const router = Router();
const ticketController = new TicketController();

router.get('/', ticketController.getAll);

router.post('/', requireRole('CLIENTE'), validateRequest(CreateTicketDto), ticketController.create);

router.patch('/:id/status', requireRole('SOPORTE'), validateRequest(UpdateTicketStatusDto), ticketController.updateStatus);

export default router;
