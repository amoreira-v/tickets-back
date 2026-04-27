import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ENV } from '../config/env.config';
import { CustomError } from '../utils/CustomError';

export interface TokenPayload {
  id: string;
  email: string;
  profile: string;
  permissions: string[];
}

export interface AuthRequest extends Request {
  user?: TokenPayload;
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new CustomError('Token no proporcionado o expirado', 401));
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, ENV.JWT_SECRET) as TokenPayload;
    req.user = decoded;

    // Validación de permisos basada en la ruta
    // El usuario tiene una lista de paths permitidos (ej: ['/tickets', '/config'])
    // Los endpoints del backend empiezan con /api (ej: /api/tickets, /api/profiles)
    
    const requestedPath = req.originalUrl;
    const isPublicPath = requestedPath.startsWith('/api/auth');
    const permissions = Array.isArray(decoded.permissions) ? decoded.permissions : [];
    
    if (!isPublicPath && decoded.profile !== 'ADMIN') {
      const hasPermission = permissions.some(permissionPath => {
        // Mapeo simple: si el path permitido está contenido en la URL de la API
        // Ej: /tickets permite /api/tickets
        return typeof permissionPath === 'string' && requestedPath.includes(permissionPath);
      });

      if (!hasPermission) {
        return next(new CustomError('No tienes permiso para acceder a esta funcion', 403));
      }
    }

    next();
  } catch (error) {
    return next(new CustomError('Token no proporcionado o expirado', 401));
  }
};
