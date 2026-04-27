# Prompt 10: Lógica de Permisos Dinámicos (RBAC) en el Login

Actúa como un desarrollador Backend Senior. Necesito modificar la lógica de Login para que, además del token JWT, retorne la información completa de los permisos del usuario.

Por favor, realiza lo siguiente:
1. Consulta de Permisos: Al momento de autenticar al usuario, realiza un JOIN entre las tablas users, profiles, profile_options y options.
2. Propiedad funciones: El objeto de respuesta del login debe incluir una propiedad llamada funciones. Esta propiedad debe ser un array de objetos que contenga el nombre de la opción, el path y el icono asociados al perfil del usuario.
3. Estructura de Respuesta: Asegúrate de que el JSON de respuesta siga este formato:
```json
{
  "status": "success",
  "data": {
    "token": "JWT_TOKEN_HERE",
    "user": {
      "id": "...",
      "name": "...",
      "email": "...",
      "profile": "ADMIN | SOPORTE | CLIENTE",
      "funciones": [
        { "name": "Tickets", "path": "/tickets", "icon": "ticket-icon" },
        { "name": "Configuración", "path": "/config", "icon": "settings-icon" }
      ]
    }
  }
}
```
Incluye también la validación de estos permisos en el middleware de autorización para proteger los endpoints correspondientes según el path solicitado.
