"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_config_1 = require("../config/env.config");
const CustomError_1 = require("../utils/CustomError");
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return next(new CustomError_1.CustomError('Token no proporcionado o expirado', 401));
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jsonwebtoken_1.default.verify(token, env_config_1.ENV.JWT_SECRET);
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
                return next(new CustomError_1.CustomError('No tienes permiso para acceder a esta funcion', 403));
            }
        }
        next();
    }
    catch (error) {
        return next(new CustomError_1.CustomError('Token no proporcionado o expirado', 401));
    }
};
exports.authMiddleware = authMiddleware;
