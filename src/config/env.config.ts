import dotenv from 'dotenv';
dotenv.config();

export const ENV = {
  PORT: process.env.PORT ? parseInt(process.env.PORT) : 3000,
  DB_TYPE: (process.env.DB_TYPE || 'postgres') as 'postgres' | 'sqlite',
  DB_HOST: process.env.DB_HOST || 'localhost',
  DB_PORT: parseInt(process.env.DB_PORT || '5432', 10),
  DB_USER: process.env.DB_USER || 'postgres',
  DB_PASSWORD: process.env.DB_PASSWORD || '',
  DB_NAME: process.env.DB_NAME || 'tickets_db',
  DB_DATABASE: process.env.DB_DATABASE || 'database.sqlite', // Para SQLite
  JWT_SECRET: process.env.JWT_SECRET || 'super_secret_key',
};

// Validación pre-vuelo simplificada
if (!ENV.JWT_SECRET) {
  throw new Error('CRITICAL ERROR: JWT_SECRET is not defined.');
}
