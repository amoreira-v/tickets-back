"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const User_1 = require("../models/User");
const Profile_1 = require("../models/Profile");
const Ticket_1 = require("../models/Ticket");
const Module_1 = require("../models/Module");
const Option_1 = require("../models/Option");
const Comment_1 = require("../models/Comment");
const Assignment_1 = require("../models/Assignment");
const env_config_1 = require("./env.config");
exports.AppDataSource = new typeorm_1.DataSource(env_config_1.ENV.DB_TYPE === 'sqlite'
    ? {
        type: 'sqlite',
        database: env_config_1.ENV.DB_DATABASE,
        synchronize: true,
        logging: false,
        entities: [User_1.User, Profile_1.Profile, Ticket_1.Ticket, Module_1.Module, Option_1.Option, Comment_1.Comment, Assignment_1.Assignment],
    }
    : {
        type: 'postgres',
        host: env_config_1.ENV.DB_HOST,
        port: env_config_1.ENV.DB_PORT,
        username: env_config_1.ENV.DB_USER,
        password: env_config_1.ENV.DB_PASSWORD,
        database: env_config_1.ENV.DB_NAME,
        synchronize: true,
        logging: false,
        entities: [User_1.User, Profile_1.Profile, Ticket_1.Ticket, Module_1.Module, Option_1.Option, Comment_1.Comment, Assignment_1.Assignment],
    });
