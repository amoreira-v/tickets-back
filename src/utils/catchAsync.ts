import { Request, Response, NextFunction, RequestHandler } from 'express';

// Envuelve funciones asíncronas para atrapar errores y pasarlos a next()
export const catchAsync = (fn: (req: Request, res: Response, next: NextFunction) => Promise<unknown>): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
};
