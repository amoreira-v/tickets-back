import { Response, NextFunction } from 'express';
import { AuthRequest } from './auth.middleware';
import { CustomError } from '../utils/CustomError';

export const requireRole = (requiredRole: string) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    // Verificar que req.user exista (lo inyecta authMiddleware)
    if (!req.user || !req.user.profile) {
      return next(new CustomError('No autenticado o perfil no encontrado', 401));
    }

    if (req.user.profile !== requiredRole) {
      return next(new CustomError(`Acceso denegado. Se requiere el rol ${requiredRole}`, 403));
    }

    next();
  };
};
