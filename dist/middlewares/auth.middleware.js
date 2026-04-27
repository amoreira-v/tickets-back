"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_config_1 = require("../config/env.config");
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            status: 'error',
            message: 'Token no proporcionado o expirado'
        });
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
        if (!isPublicPath && decoded.profile !== 'ADMIN') {
            const hasPermission = decoded.permissions.some(permissionPath => {
                // Mapeo simple: si el path permitido está contenido en la URL de la API
                // Ej: /tickets permite /api/tickets
                return requestedPath.includes(permissionPath);
            });
            if (!hasPermission) {
                return res.status(403).json({
                    status: 'error',
                    message: 'No tienes permiso para acceder a esta función'
                });
            }
        }
        next();
    }
    catch (error) {
        return res.status(401).json({
            status: 'error',
            message: 'Token no proporcionado o expirado'
        });
    }
};
exports.authMiddleware = authMiddleware;
