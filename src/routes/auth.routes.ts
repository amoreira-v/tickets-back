import { Router } from 'express';
import { AuthController } from '../controllers/AuthController';
import { validateRequest } from '../middlewares/validateRequest';
import { RegisterDto, LoginDto } from '../dtos/auth.dto';

const router = Router();
const authController = new AuthController();

router.post('/register', validateRequest(RegisterDto), authController.register);
router.post('/login', validateRequest(LoginDto), authController.login);

export default router;
