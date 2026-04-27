import { AppDataSource } from '../config/data-source';
import { Module } from '../models/Module';
import { CustomError } from '../utils/CustomError';
import { CreateModuleDto, UpdateModuleDto } from '../dtos/admin.dto';

export class ModuleService {
  private repository = AppDataSource.getRepository(Module);

  async findAll() {
    return await this.repository.find({ order: { createdAt: 'DESC' } });
  }

  async findById(id: string) {
    const moduleItem = await this.repository.findOneBy({ id });
    if (!moduleItem) throw new CustomError('Module not found', 404);
    return moduleItem;
  }

  async create(data: CreateModuleDto) {
    const existing = await this.repository.findOneBy({ name: data.name });
    if (existing) throw new CustomError('Module with this name already exists', 400);

    const moduleItem = this.repository.create(data);
    return await this.repository.save(moduleItem);
  }

  async update(id: string, data: UpdateModuleDto) {
    const moduleItem = await this.findById(id);
    
    if (data.name) moduleItem.name = data.name;
    if (data.description !== undefined) moduleItem.description = data.description;
    
    return await this.repository.save(moduleItem);
  }

  async delete(id: string) {
    const moduleItem = await this.findById(id);
    await this.repository.remove(moduleItem);
    return { message: 'Module deleted successfully' };
  }
}
