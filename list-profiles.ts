import { AppDataSource } from './src/config/data-source';
import { Profile } from './src/models/Profile';

async function listProfiles() {
    await AppDataSource.initialize();
    const profileRepo = AppDataSource.getRepository(Profile);
    const profiles = await profileRepo.find();
    console.log('--- PERFILES DISPONIBLES ---');
    profiles.forEach(p => {
        console.log(`Nombre: ${p.name} | ID (UUID): ${p.id}`);
    });
    await AppDataSource.destroy();
}

listProfiles();
