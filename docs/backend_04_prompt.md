# Prompt 04: Lógica de Autenticación JWT y Middlewares

Actúa como un desarrollador Backend Senior. Ahora que tenemos las entidades de Usuario y Perfil, necesito implementar el sistema de Autenticación JWT.

Por favor, genera:
1. Un AuthService que incluya:
   - Lógica para Registro de usuarios: Debe recibir nombre, email, password y profile_id. Asegúrate de hashear la contraseña antes de guardarla (puedes usar bcrypt).
   - Lógica para Login: Debe verificar las credenciales y, si son correctas, retornar un token JWT que expire en 24 horas.
2. Un AuthController con los endpoints POST /api/auth/register y POST /api/auth/login.
3. Un Middleware de Autenticación (auth.middleware.ts) que verifique la validez del token JWT en el encabezado Authorization: Bearer <token>.
4. Configura este middleware para proteger todas las rutas de /api/tickets, de modo que solo usuarios autenticados puedan acceder.

Asegúrate de incluir el manejo de errores para 'Usuario no encontrado', 'Credenciales inválidas' y 'Token no proporcionado o expirado'.
