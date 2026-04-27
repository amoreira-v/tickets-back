import { AppDataSource } from '../config/data-source';
import { Option } from '../models/Option';
import { Module } from '../models/Module';
import { CustomError } from '../utils/CustomError';
import { CreateOptionDto, UpdateOptionDto } from '../dtos/admin.dto';

export class OptionService {
  private repository = AppDataSource.getRepository(Option);
  private moduleRepository = AppDataSource.getRepository(Module);

  async findAll() {
    return await this.repository.find({ 
      relations: ['module'],
      order: { createdAt: 'DESC' } 
    });
  }

  async findById(id: string) {
    const option = await this.repository.findOne({ where: { id }, relations: ['module'] });
    if (!option) throw new CustomError('Option not found', 404);
    return option;
  }

  async create(data: CreateOptionDto) {
    const moduleItem = await this.moduleRepository.findOneBy({ id: data.moduleId });
    if (!moduleItem) throw new CustomError('Module not found', 404);

    const option = this.repository.create({
      name: data.name,
      description: data.description,
      module: moduleItem
    });
    return await this.repository.save(option);
  }

  async update(id: string, data: UpdateOptionDto) {
    const option = await this.findById(id);
    
    if (data.name) option.name = data.name;
    if (data.description !== undefined) option.description = data.description;
    
    if (data.moduleId) {
      const moduleItem = await this.moduleRepository.findOneBy({ id: data.moduleId });
      if (!moduleItem) throw new CustomError('Module not found', 404);
      option.module = moduleItem;
    }
    
    return await this.repository.save(option);
  }

  async delete(id: string) {
    const option = await this.findById(id);
    await this.repository.remove(option);
    return { message: 'Option deleted successfully' };
  }
}
