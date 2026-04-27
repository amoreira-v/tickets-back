# Prompt 05: Lógica de Negocio y Flujos por Rol (Cliente/Soporte)

Actúa como un desarrollador Backend Senior. Ahora que tenemos la autenticación y los modelos básicos, necesito implementar las reglas de negocio del Flujo de Tickets y el Manejo de Errores Centralizado.

Por favor, genera:
1. Lógica de Creación (Perfil CLIENTE): Un endpoint que permita a usuarios con perfil 'CLIENTE' crear tickets. El sistema debe asignar automáticamente el user_id del usuario autenticado y establecer el estado inicial como OPEN.
2. Lógica de Transición de Estados (Perfil SOPORTE): Un endpoint PATCH /api/tickets/:id/status que solo permita a usuarios con perfil 'SOPORTE' cambiar el estado del ticket a IN_PROGRESS, REJECTED o RESOLVED.
3. Manejo de Errores Global: Implementa un Error Middleware que capture excepciones y devuelva respuestas estandarizadas con el formato:
```json
{
  "status": "error",
  "message": "Mensaje descriptivo del error",
  "code": 403 // o el código correspondiente
}
```
Asegúrate de que toda la API use este manejador centralizado.
