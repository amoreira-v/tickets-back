"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const CustomError_1 = require("../utils/CustomError");
const errorHandler = (err, req, res, next) => {
    let statusCode = 500;
    let message = err.message || 'Error interno del servidor';
    let details;
    // Si es un CustomError, extraemos su status code
    if (err instanceof CustomError_1.CustomError) {
        statusCode = err.statusCode;
        details = err.details;
    }
    const payload = {
        status: 'error',
        message: message,
        code: statusCode
    };
    if (details !== undefined) {
        payload.data = details;
    }
    res.status(statusCode).json(payload);
};
exports.errorHandler = errorHandler;
