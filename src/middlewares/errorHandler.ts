import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../utils/CustomError';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  let statusCode = 500;
  let message = err.message || 'Error interno del servidor';

  // Si es un CustomError, extraemos su status code
  if (err instanceof CustomError) {
    statusCode = err.statusCode;
  }

  res.status(statusCode).json({
    status: 'error',
    message: message,
    code: statusCode
  });
};
