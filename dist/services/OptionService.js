"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OptionService = void 0;
const data_source_1 = require("../config/data-source");
const Option_1 = require("../models/Option");
const Module_1 = require("../models/Module");
const CustomError_1 = require("../utils/CustomError");
class OptionService {
    constructor() {
        this.repository = data_source_1.AppDataSource.getRepository(Option_1.Option);
        this.moduleRepository = data_source_1.AppDataSource.getRepository(Module_1.Module);
    }
    async findAll() {
        return await this.repository.find({
            relations: ['module'],
            order: { createdAt: 'DESC' }
        });
    }
    async findById(id) {
        const option = await this.repository.findOne({ where: { id }, relations: ['module'] });
        if (!option)
            throw new CustomError_1.CustomError('Option not found', 404);
        return option;
    }
    async create(data) {
        const moduleItem = await this.moduleRepository.findOneBy({ id: data.moduleId });
        if (!moduleItem)
            throw new CustomError_1.CustomError('Module not found', 404);
        const option = this.repository.create({
            name: data.name,
            description: data.description,
            module: moduleItem
        });
        return await this.repository.save(option);
    }
    async update(id, data) {
        const option = await this.findById(id);
        if (data.name)
            option.name = data.name;
        if (data.description !== undefined)
            option.description = data.description;
        if (data.moduleId) {
            const moduleItem = await this.moduleRepository.findOneBy({ id: data.moduleId });
            if (!moduleItem)
                throw new CustomError_1.CustomError('Module not found', 404);
            option.module = moduleItem;
        }
        return await this.repository.save(option);
    }
    async delete(id) {
        const option = await this.findById(id);
        await this.repository.remove(option);
        return { message: 'Option deleted successfully' };
    }
}
exports.OptionService = OptionService;
