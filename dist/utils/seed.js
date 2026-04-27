"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../config/data-source");
const Profile_1 = require("../models/Profile");
async function seed() {
    try {
        // Inicializar conexión
        await data_source_1.AppDataSource.initialize();
        console.log('Database connection initialized for seeding...');
        const profileRepository = data_source_1.AppDataSource.getRepository(Profile_1.Profile);
        // Iterar sobre los nombres de los perfiles e insertarlos si no existen
        const profiles = [
            { name: Profile_1.ProfileName.ADMIN, description: 'Administrador del sistema con acceso total.' },
            { name: Profile_1.ProfileName.SOPORTE, description: 'Personal de soporte que gestiona los tickets.' },
            { name: Profile_1.ProfileName.CLIENTE, description: 'Usuario regular que crea tickets de soporte.' },
        ];
        for (const p of profiles) {
            const existingProfile = await profileRepository.findOneBy({ name: p.name });
            if (!existingProfile) {
                const newProfile = profileRepository.create(p);
                await profileRepository.save(newProfile);
                console.log(`Profile ${p.name} created successfully.`);
            }
            else {
                console.log(`Profile ${p.name} already exists. Skipping.`);
            }
        }
        console.log('Seeding completed successfully!');
    }
    catch (error) {
        console.error('Error during seeding:', error);
    }
    finally {
        // Cerrar conexión
        if (data_source_1.AppDataSource.isInitialized) {
            await data_source_1.AppDataSource.destroy();
            console.log('Database connection closed.');
        }
    }
}
// Ejecutar el script
seed();
