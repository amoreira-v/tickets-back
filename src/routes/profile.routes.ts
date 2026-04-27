import { Router } from 'express';
import { ProfileController } from '../controllers/ProfileController';
import { validateRequest } from '../middlewares/validateRequest';
import { requireRole } from '../middlewares/role.middleware';
import { CreateProfileDto, UpdateProfileDto } from '../dtos/admin.dto';

const router = Router();
const controller = new ProfileController();

// Rutas de lectura (Todos los autenticados)
router.get('/', controller.getAll);
router.get('/:id', controller.getById);

// Rutas de escritura (Solo ADMIN)
router.post('/', requireRole('ADMIN'), validateRequest(CreateProfileDto), controller.create);
router.patch('/:id', requireRole('ADMIN'), validateRequest(UpdateProfileDto), controller.update);
router.delete('/:id', requireRole('ADMIN'), controller.delete);

export default router;
