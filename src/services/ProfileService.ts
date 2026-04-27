import { AppDataSource } from '../config/data-source';
import { Profile, ProfileName } from '../models/Profile';
import { CustomError } from '../utils/CustomError';
import { CreateProfileDto, UpdateProfileDto } from '../dtos/admin.dto';

export class ProfileService {
  private repository = AppDataSource.getRepository(Profile);

  async findAll() {
    return await this.repository.find({ order: { createdAt: 'DESC' } });
  }

  async findById(id: string) {
    const profile = await this.repository.findOneBy({ id });
    if (!profile) throw new CustomError('Profile not found', 404);
    return profile;
  }

  async create(data: CreateProfileDto) {
    const existing = await this.repository.findOneBy({ name: data.name as ProfileName });
    if (existing) throw new CustomError('Profile with this name already exists', 400);

    const profile = this.repository.create({
      name: data.name as ProfileName,
      description: data.description
    });
    return await this.repository.save(profile);
  }

  async update(id: string, data: UpdateProfileDto) {
    const profile = await this.findById(id);
    
    if (data.name) profile.name = data.name as ProfileName;
    if (data.description !== undefined) profile.description = data.description;
    
    return await this.repository.save(profile);
  }

  async delete(id: string) {
    const profile = await this.findById(id);
    await this.repository.remove(profile);
    return { message: 'Profile deleted successfully' };
  }
}
