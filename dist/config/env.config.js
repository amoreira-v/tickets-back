"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ENV = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.ENV = {
    PORT: process.env.PORT ? parseInt(process.env.PORT) : 3000,
    DB_TYPE: (process.env.DB_TYPE || 'postgres'),
    DB_HOST: process.env.DB_HOST || 'localhost',
    DB_PORT: parseInt(process.env.DB_PORT || '5432', 10),
    DB_USER: process.env.DB_USER || 'postgres',
    DB_PASSWORD: process.env.DB_PASSWORD || '',
    DB_NAME: process.env.DB_NAME || 'tickets_db',
    DB_DATABASE: process.env.DB_DATABASE || 'database.sqlite', // Para SQLite
    JWT_SECRET: process.env.JWT_SECRET || 'super_secret_key',
};
// Validación pre-vuelo simplificada
if (!exports.ENV.JWT_SECRET) {
    throw new Error('CRITICAL ERROR: JWT_SECRET is not defined.');
}
