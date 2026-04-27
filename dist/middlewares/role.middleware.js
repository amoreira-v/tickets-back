"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireRole = void 0;
const CustomError_1 = require("../utils/CustomError");
const requireRole = (requiredRole) => {
    return (req, res, next) => {
        // Verificar que req.user exista (lo inyecta authMiddleware)
        if (!req.user || !req.user.profile) {
            return next(new CustomError_1.CustomError('No autenticado o perfil no encontrado', 401));
        }
        if (req.user.profile !== requiredRole) {
            return next(new CustomError_1.CustomError(`Acceso denegado. Se requiere el rol ${requiredRole}`, 403));
        }
        next();
    };
};
exports.requireRole = requireRole;
