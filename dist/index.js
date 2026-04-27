"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
// Force restart
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const data_source_1 = require("./config/data-source");
const env_config_1 = require("./config/env.config");
const ticket_routes_1 = __importDefault(require("./routes/ticket.routes"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const profile_routes_1 = __importDefault(require("./routes/profile.routes"));
const module_routes_1 = __importDefault(require("./routes/module.routes"));
const option_routes_1 = __importDefault(require("./routes/option.routes"));
const auth_middleware_1 = require("./middlewares/auth.middleware");
const errorHandler_1 = require("./middlewares/errorHandler");
const app = (0, express_1.default)();
const PORT = env_config_1.ENV.PORT;
// Middlewares
app.use((0, cors_1.default)({
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express_1.default.json());
// Routes
app.use('/api/auth', auth_routes_1.default);
// Protected Routes
app.use('/api/tickets', auth_middleware_1.authMiddleware, ticket_routes_1.default);
app.use('/api/profiles', auth_middleware_1.authMiddleware, profile_routes_1.default);
app.use('/api/modules', auth_middleware_1.authMiddleware, module_routes_1.default);
app.use('/api/options', auth_middleware_1.authMiddleware, option_routes_1.default);
// Basic Route
app.get('/', (req, res) => {
    res.send('Tickets Platform API is running...');
});
// Error handling middleware (Debe ir siempre después de las rutas)
app.use(errorHandler_1.errorHandler);
// Initialize DB and start server
data_source_1.AppDataSource.initialize()
    .then(() => {
    console.log('=========================================');
    console.log('✅ Database connected successfully.');
    console.log(`🚀 Server running on port: ${PORT}`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`📦 Database: ${env_config_1.ENV.DB_NAME} at ${env_config_1.ENV.DB_HOST}`);
    console.log('=========================================');
    app.listen(PORT, () => {
        // Server is already implicitly logging through the banner above
    });
})
    .catch((error) => {
    console.error('❌ CRITICAL ERROR: Database connection failed');
    console.error(error);
    process.exit(1); // Detener el proceso si la base de datos no está disponible
});
