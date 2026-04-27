import { Router } from 'express';
import { OptionController } from '../controllers/OptionController';
import { validateRequest } from '../middlewares/validateRequest';
import { requireRole } from '../middlewares/role.middleware';
import { CreateOptionDto, UpdateOptionDto } from '../dtos/admin.dto';

const router = Router();
const controller = new OptionController();

router.get('/', controller.getAll);
router.get('/:id', controller.getById);

router.post('/', requireRole('ADMIN'), validateRequest(CreateOptionDto), controller.create);
router.patch('/:id', requireRole('ADMIN'), validateRequest(UpdateOptionDto), controller.update);
router.delete('/:id', requireRole('ADMIN'), controller.delete);

export default router;
