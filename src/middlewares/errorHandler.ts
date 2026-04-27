import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../utils/CustomError';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  let statusCode = 500;
  let message = err.message || 'Error interno del servidor';
  let details: unknown;

  // Si es un CustomError, extraemos su status code
  if (err instanceof CustomError) {
    statusCode = err.statusCode;
    details = err.details;
  }

  const payload: { status: string; message: string; code: number; data?: unknown } = {
    status: 'error',
    message: message,
    code: statusCode
  };

  if (details !== undefined) {
    payload.data = details;
  }

  res.status(statusCode).json(payload);
};
