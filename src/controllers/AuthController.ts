import { Request, Response } from 'express';
import { AuthService } from '../services/AuthService';
import { catchAsync } from '../utils/catchAsync';
import { CustomError } from '../utils/CustomError';

const authService = new AuthService();

export class AuthController {
  
  register = catchAsync(async (req: Request, res: Response) => {
    try {
      const result = await authService.register(req.body);
      return res.status(201).json({
        status: 'success',
        data: result
      });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Unknown error during registration';
      // Mapeando errores del servicio a CustomError para el global handler
      throw new CustomError(message, 400);
    }
  });

  login = catchAsync(async (req: Request, res: Response) => {
    try {
      const result = await authService.login(req.body);
      return res.status(200).json({
        status: 'success',
        data: result
      });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Unknown error during login';
      if (message === 'User not found') {
        throw new CustomError(message, 404);
      }
      if (message === 'Invalid credentials') {
        throw new CustomError(message, 401);
      }
      throw new CustomError(message, 500);
    }
  });
}
