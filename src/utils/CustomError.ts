export class CustomError extends Error {
  public statusCode: number;
  public details?: unknown;

  constructor(message: string, statusCode: number, details?: unknown) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
    
    // Mantiene la traza de pila correcta (solo V8/Node.js)
    Error.captureStackTrace(this, this.constructor);
  }
}
