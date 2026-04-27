"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileService = void 0;
const data_source_1 = require("../config/data-source");
const Profile_1 = require("../models/Profile");
const CustomError_1 = require("../utils/CustomError");
class ProfileService {
    constructor() {
        this.repository = data_source_1.AppDataSource.getRepository(Profile_1.Profile);
    }
    async findAll() {
        return await this.repository.find({ order: { createdAt: 'DESC' } });
    }
    async findById(id) {
        const profile = await this.repository.findOneBy({ id });
        if (!profile)
            throw new CustomError_1.CustomError('Profile not found', 404);
        return profile;
    }
    async create(data) {
        const existing = await this.repository.findOneBy({ name: data.name });
        if (existing)
            throw new CustomError_1.CustomError('Profile with this name already exists', 400);
        const profile = this.repository.create({
            name: data.name,
            description: data.description
        });
        return await this.repository.save(profile);
    }
    async update(id, data) {
        const profile = await this.findById(id);
        if (data.name)
            profile.name = data.name;
        if (data.description !== undefined)
            profile.description = data.description;
        return await this.repository.save(profile);
    }
    async delete(id) {
        const profile = await this.findById(id);
        await this.repository.remove(profile);
        return { message: 'Profile deleted successfully' };
    }
}
exports.ProfileService = ProfileService;
