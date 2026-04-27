import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from '../models/User';
import { Profile } from '../models/Profile';
import { Ticket } from '../models/Ticket';
import { Module } from '../models/Module';
import { Option } from '../models/Option';
import { Comment } from '../models/Comment';
import { Assignment } from '../models/Assignment';
import { ENV } from './env.config';

export const AppDataSource = new DataSource(
  ENV.DB_TYPE === 'sqlite' 
    ? {
        type: 'sqlite',
        database: ENV.DB_DATABASE,
        synchronize: true,
        logging: false,
        entities: [User, Profile, Ticket, Module, Option, Comment, Assignment],
      }
    : {
        type: 'postgres',
        host: ENV.DB_HOST,
        port: ENV.DB_PORT,
        username: ENV.DB_USER,
        password: ENV.DB_PASSWORD,
        database: ENV.DB_NAME,
        synchronize: true,
        logging: false,
        entities: [User, Profile, Ticket, Module, Option, Comment, Assignment],
      }
);
