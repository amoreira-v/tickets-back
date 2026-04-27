# Prompt 02: Configuración de Base de Datos y Entidades de Identidad

Actúa como un desarrollador Backend Semi-Senior. Ya tengo el proyecto inicializado en Node.js con TypeScript y TypeORM.

Mi objetivo ahora es configurar la conexión a la base de datos y definir las primeras entidades de identidad. Por favor, genera:
1. El archivo de configuración de DataSource para conectar TypeORM con PostgreSQL usando variables de entorno.
2. La entidad Profile con los campos: id (UUID), name (ADMIN, SOPORTE, CLIENTE), description, created_at y updated_at.
3. La entidad User con los campos: id (UUID), name, email, password (que deberá ser hasheado luego) y una relación ManyToOne con Profile.
4. Un script de Seed sencillo para insertar los tres perfiles básicos (ADMIN, SOPORTE, CLIENTE) para poder realizar pruebas de integración más adelante.

Asegúrate de seguir la estructura de carpetas definida previamente (src/config, src/models) y de usar decoradores de TypeScript correctamente.
