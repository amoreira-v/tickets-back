# Prompt 03: Implementación de Entidad de Tickets y Contrato de API

Actúa como desarrollador Backend. Ahora que tengo las entidades de Usuario y Perfil, necesito implementar la lógica para la entidad Ticket.

1. Crea la entidad Ticket con los campos solicitados: id (UUID), title, description, status (OPEN, IN_PROGRESS, RESOLVED, REJECTED), priority, user_id, assigned_to, y timestamps.
2. Genera un Controller y un Service para GET /api/tickets y POST /api/tickets.
3. REQUISITO CRÍTICO: Todas las respuestas deben seguir exactamente este formato de contrato:
```json
{
  "status": "success",
  "data": [...] // o { objeto único }
}
```
4. Para el POST /api/tickets, asegúrate de que el estado por defecto sea OPEN.
5. Implementa el endpoint PATCH /api/tickets/:id/status específicamente para cambiar el estado, siguiendo esta estructura de respuesta:
```json
{
  "status": "success",
  "data": { "id": "...", "status": "...", "updated_at": "..." }
}
```
Incluye validaciones básicas de entrada usando class-validator o similar.
