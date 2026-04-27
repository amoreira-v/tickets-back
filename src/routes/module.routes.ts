import { Router } from 'express';
import { ModuleController } from '../controllers/ModuleController';
import { validateRequest } from '../middlewares/validateRequest';
import { requireRole } from '../middlewares/role.middleware';
import { CreateModuleDto, UpdateModuleDto } from '../dtos/admin.dto';

const router = Router();
const controller = new ModuleController();

router.get('/', controller.getAll);
router.get('/:id', controller.getById);

router.post('/', requireRole('ADMIN'), validateRequest(CreateModuleDto), controller.create);
router.patch('/:id', requireRole('ADMIN'), validateRequest(UpdateModuleDto), controller.update);
router.delete('/:id', requireRole('ADMIN'), controller.delete);

export default router;
