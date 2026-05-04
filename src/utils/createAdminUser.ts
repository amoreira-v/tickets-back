import bcrypt from 'bcrypt';
import { AppDataSource } from '../config/data-source';
import { User } from '../models/User';
import { Profile, ProfileName } from '../models/Profile';

async function createAdmin() {
  try {
    await AppDataSource.initialize();
    console.log('Database connected.');

    const userRepository = AppDataSource.getRepository(User);
    const profileRepository = AppDataSource.getRepository(Profile);

    // 1. Buscar perfil ADMIN
    const adminProfile = await profileRepository.findOneBy({ name: ProfileName.ADMIN as any });
    if (!adminProfile) {
      console.error('Error: Profile ADMIN not found. Please run "npm run seed" first.');
      return;
    }

    // 2. Verificar si ya existe el usuario
    const email = 'admin@admin.com';
    const existingUser = await userRepository.findOneBy({ email });
    if (existingUser) {
      console.log(`User ${email} already exists.`);
      return;
    }

    // 3. Crear usuario admin
    const password = 'adminadmin';
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const adminUser = userRepository.create({
      name: 'Administrador Principal',
      email: email,
      password: hashedPassword,
      profile: adminProfile
    });

    await userRepository.save(adminUser);
    console.log('=========================================');
    console.log('✅ Admin user created successfully.');
    console.log(`📧 Email: ${email}`);
    console.log(`🔑 Password: ${password}`);
    console.log('=========================================');

  } catch (error) {
    console.error('Error creating admin user:', error);
  } finally {
    if (AppDataSource.isInitialized) {
      await AppDataSource.destroy();
    }
  }
}

createAdmin();
