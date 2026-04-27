import { Request, Response, NextFunction } from 'express';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { CustomError } from '../utils/CustomError';

export function validateRequest(type: { new (...args: unknown[]): object }) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const obj = plainToInstance(type, req.body);
    const errors = await validate(obj);
    
    if (errors.length > 0) {
      const formattedErrors = errors.map(err => ({
        property: err.property,
        constraints: err.constraints
      }));
      
      return next(new CustomError('Error de validacion en la solicitud', 400, formattedErrors));
    }
    
    req.body = obj;
    next();
  };
}
