"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const AuthService_1 = require("../services/AuthService");
const catchAsync_1 = require("../utils/catchAsync");
const CustomError_1 = require("../utils/CustomError");
const authService = new AuthService_1.AuthService();
class AuthController {
    constructor() {
        this.register = (0, catchAsync_1.catchAsync)(async (req, res) => {
            try {
                const result = await authService.register(req.body);
                return res.status(201).json({
                    status: 'success',
                    data: result
                });
            }
            catch (error) {
                const message = error instanceof Error ? error.message : 'Unknown error during registration';
                // Mapeando errores del servicio a CustomError para el global handler
                throw new CustomError_1.CustomError(message, 400);
            }
        });
        this.login = (0, catchAsync_1.catchAsync)(async (req, res) => {
            try {
                const result = await authService.login(req.body);
                return res.status(200).json({
                    status: 'success',
                    data: result
                });
            }
            catch (error) {
                const message = error instanceof Error ? error.message : 'Unknown error during login';
                if (message === 'User not found') {
                    throw new CustomError_1.CustomError(message, 404);
                }
                if (message === 'Invalid credentials') {
                    throw new CustomError_1.CustomError(message, 401);
                }
                throw new CustomError_1.CustomError(message, 500);
            }
        });
    }
}
exports.AuthController = AuthController;
