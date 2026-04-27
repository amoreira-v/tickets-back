"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModuleService = void 0;
const data_source_1 = require("../config/data-source");
const Module_1 = require("../models/Module");
const CustomError_1 = require("../utils/CustomError");
class ModuleService {
    constructor() {
        this.repository = data_source_1.AppDataSource.getRepository(Module_1.Module);
    }
    async findAll() {
        return await this.repository.find({ order: { createdAt: 'DESC' } });
    }
    async findById(id) {
        const moduleItem = await this.repository.findOneBy({ id });
        if (!moduleItem)
            throw new CustomError_1.CustomError('Module not found', 404);
        return moduleItem;
    }
    async create(data) {
        const existing = await this.repository.findOneBy({ name: data.name });
        if (existing)
            throw new CustomError_1.CustomError('Module with this name already exists', 400);
        const moduleItem = this.repository.create(data);
        return await this.repository.save(moduleItem);
    }
    async update(id, data) {
        const moduleItem = await this.findById(id);
        if (data.name)
            moduleItem.name = data.name;
        if (data.description !== undefined)
            moduleItem.description = data.description;
        return await this.repository.save(moduleItem);
    }
    async delete(id) {
        const moduleItem = await this.findById(id);
        await this.repository.remove(moduleItem);
        return { message: 'Module deleted successfully' };
    }
}
exports.ModuleService = ModuleService;
