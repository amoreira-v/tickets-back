export class CustomError extends Error {
  public statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    
    // Mantiene la traza de pila correcta (solo V8/Node.js)
    Error.captureStackTrace(this, this.constructor);
  }
}
