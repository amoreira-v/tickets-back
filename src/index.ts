import 'reflect-metadata';
import express, { Request, Response } from 'express';
import cors from 'cors';

import { AppDataSource } from './config/data-source';
import { ENV } from './config/env.config';

import ticketRoutes from './routes/ticket.routes';
import authRoutes from './routes/auth.routes';
import profileRoutes from './routes/profile.routes';
import moduleRoutes from './routes/module.routes';
import optionRoutes from './routes/option.routes';
import { authMiddleware } from './middlewares/auth.middleware';
import { errorHandler } from './middlewares/errorHandler';

const app = express();
const PORT = ENV.PORT;

// Middlewares
app.use(cors({
  origin: 'http://localhost:4200',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

// Protected Routes
app.use('/api/tickets', authMiddleware, ticketRoutes);
app.use('/api/profiles', authMiddleware, profileRoutes);
app.use('/api/modules', authMiddleware, moduleRoutes);
app.use('/api/options', authMiddleware, optionRoutes);

// Basic Route
app.get('/', (req: Request, res: Response) => {
  res.send('Tickets Platform API is running...');
});

// Error handling middleware (Debe ir siempre después de las rutas)
app.use(errorHandler);

// Initialize DB and start server
AppDataSource.initialize()
  .then(() => {
    console.log('=========================================');
    console.log('✅ Database connected successfully.');
    console.log(`🚀 Server running on port: ${PORT}`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`📦 Database: ${ENV.DB_NAME} at ${ENV.DB_HOST}`);
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
