# Prompt 06: CRUDs Administrativos (Módulos y Opciones)

Actúa como desarrollador Backend. Siguiendo el patrón de controladores, servicios y repositorios ya establecido, necesito generar los endpoints CRUD (Create, Read, Update, Delete) para las entidades administrativas restantes: Profiles, Modules y Options.

1. Asegúrate de que estos endpoints estén protegidos por el middleware de JWT.
2. Solo los usuarios con perfil 'ADMIN' deben tener permisos para realizar operaciones de escritura (POST, PATCH, DELETE) en estas entidades.
3. Valida que las relaciones (ej. option_id vinculado a un module_id) se respeten.
4. Todas las respuestas deben mantener el formato estándar: { "status": "success", "data": ... }.
