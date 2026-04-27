import { AppDataSource } from '../config/data-source';
import { Profile, ProfileName } from '../models/Profile';

async function seed() {
  try {
    // Inicializar conexión
    await AppDataSource.initialize();
    console.log('Database connection initialized for seeding...');

    const profileRepository = AppDataSource.getRepository(Profile);

    // Iterar sobre los nombres de los perfiles e insertarlos si no existen
    const profiles = [
      { name: ProfileName.ADMIN, description: 'Administrador del sistema con acceso total.' },
      { name: ProfileName.SOPORTE, description: 'Personal de soporte que gestiona los tickets.' },
      { name: ProfileName.CLIENTE, description: 'Usuario regular que crea tickets de soporte.' },
    ];

    for (const p of profiles) {
      const existingProfile = await profileRepository.findOneBy({ name: p.name });
      if (!existingProfile) {
        const newProfile = profileRepository.create(p);
        await profileRepository.save(newProfile);
        console.log(`Profile ${p.name} created successfully.`);
      } else {
        console.log(`Profile ${p.name} already exists. Skipping.`);
      }
    }

    console.log('Seeding completed successfully!');
  } catch (error) {
    console.error('Error during seeding:', error);
  } finally {
    // Cerrar conexión
    if (AppDataSource.isInitialized) {
      await AppDataSource.destroy();
      console.log('Database connection closed.');
    }
  }
}

// Ejecutar el script
seed();
