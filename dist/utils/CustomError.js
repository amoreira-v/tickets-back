"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomError = void 0;
class CustomError extends Error {
    constructor(message, statusCode, details) {
        super(message);
        this.statusCode = statusCode;
        this.details = details;
        // Mantiene la traza de pila correcta (solo V8/Node.js)
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.CustomError = CustomError;
