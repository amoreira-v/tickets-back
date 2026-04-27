"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const data_source_1 = require("../config/data-source");
const User_1 = require("../models/User");
const Profile_1 = require("../models/Profile");
const env_config_1 = require("../config/env.config");
class AuthService {
    constructor() {
        this.userRepository = data_source_1.AppDataSource.getRepository(User_1.User);
        this.profileRepository = data_source_1.AppDataSource.getRepository(Profile_1.Profile);
    }
    async register(data) {
        // Check if user exists
        const existingUser = await this.userRepository.findOneBy({ email: data.email });
        if (existingUser) {
            throw new Error('User already exists with this email');
        }
        // Determine profile
        let profile = null;
        if (data.profile_id) {
            profile = await this.profileRepository.findOneBy({ id: data.profile_id });
        }
        else {
            // Si no se envía ID, buscamos el perfil CLIENTE por defecto
            profile = await this.profileRepository.findOneBy({ name: Profile_1.ProfileName.CLIENTE });
        }
        if (!profile) {
            throw new Error('Profile not found');
        }
        // Hash password
        const saltRounds = 10;
        const hashedPassword = await bcrypt_1.default.hash(data.password, saltRounds);
        // Create user
        const newUser = this.userRepository.create({
            name: data.name,
            email: data.email,
            password: hashedPassword,
            profile: profile
        });
        const savedUser = await this.userRepository.save(newUser);
        // Remove password from response
        const { password, ...userWithoutPassword } = savedUser;
        return userWithoutPassword;
    }
    async login(data) {
        const user = await this.userRepository.findOne({
            where: { email: data.email },
            relations: ['profile']
        });
        if (!user) {
            throw new Error('User not found');
        }
        const isMatch = await bcrypt_1.default.compare(data.password, user.password);
        if (!isMatch) {
            throw new Error('Invalid credentials');
        }
        // Generate token
        const token = jsonwebtoken_1.default.sign({
            id: user.id,
            email: user.email,
            profile: user.profile.name
        }, env_config_1.ENV.JWT_SECRET, { expiresIn: '24h' });
        return {
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                profile: user.profile.name
            }
        };
    }
}
exports.AuthService = AuthService;
