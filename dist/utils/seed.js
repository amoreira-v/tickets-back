"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../config/data-source");
const Profile_1 = require("../models/Profile");
const Option_1 = require("../models/Option");
const Module_1 = require("../models/Module");
async function seed() {
    try {
        // Inicializar conexión
        await data_source_1.AppDataSource.initialize();
        console.log('Database connection initialized for seeding...');
        const profileRepository = data_source_1.AppDataSource.getRepository(Profile_1.Profile);
        const optionRepository = data_source_1.AppDataSource.getRepository(Option_1.Option);
        const moduleRepository = data_source_1.AppDataSource.getRepository(Module_1.Module);
        // 1. Crear Módulo base si no existe
        let mainModule = await moduleRepository.findOneBy({ name: 'Sistema' });
        if (!mainModule) {
            mainModule = moduleRepository.create({ name: 'Sistema', description: 'Módulo principal del sistema' });
            await moduleRepository.save(mainModule);
            console.log('Module "Sistema" created.');
        }
        // 2. Definir Opciones
        const optionsData = [
            // CLIENTE
            { name: 'Mis Tickets', path: '/tickets', icon: 'confirmation_number' },
            { name: 'Nuevo Ticket', path: '/tickets/nuevo', icon: 'add_circle' },
            // SOPORTE
            { name: 'Gestión de Tickets', path: '/tickets', icon: 'assignment' },
            // ADMIN
            { name: 'Usuarios', path: '/admin/usuarios', icon: 'people' },
            { name: 'Perfiles', path: '/admin/perfiles', icon: 'admin_panel_settings' },
            { name: 'Módulos', path: '/admin/modulos', icon: 'view_module' },
            { name: 'Opciones', path: '/admin/opciones', icon: 'settings_input_component' },
        ];
        const createdOptions = {};
        for (const opt of optionsData) {
            let existingOption = await optionRepository.findOneBy({ name: opt.name, path: opt.path });
            if (!existingOption) {
                existingOption = optionRepository.create({ ...opt, module: mainModule });
                await optionRepository.save(existingOption);
                console.log(`Option "${opt.name}" created.`);
            }
            createdOptions[opt.name] = existingOption;
        }
        // 3. Crear Perfiles y Asociar Opciones
        const profiles = [
            {
                name: Profile_1.ProfileName.ADMIN,
                description: 'Administrador del sistema con acceso total.',
                options: ['Usuarios', 'Perfiles', 'Módulos', 'Opciones']
            },
            {
                name: Profile_1.ProfileName.SOPORTE,
                description: 'Personal de soporte que gestiona los tickets.',
                options: ['Gestión de Tickets']
            },
            {
                name: Profile_1.ProfileName.CLIENTE,
                description: 'Usuario regular que crea tickets de soporte.',
                options: ['Mis Tickets', 'Nuevo Ticket']
            },
        ];
        for (const pData of profiles) {
            let profile = await profileRepository.findOne({
                where: { name: pData.name },
                relations: ['options']
            });
            if (!profile) {
                profile = profileRepository.create({
                    name: pData.name,
                    description: pData.description,
                    options: []
                });
            }
            // Asociar opciones
            profile.options = pData.options.map(name => createdOptions[name]).filter(Boolean);
            await profileRepository.save(profile);
            console.log(`Profile "${pData.name}" updated with ${profile.options.length} options.`);
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
