# Documentación de la API - Tickets Platform

Esta API proporciona las funcionalidades necesarias para gestionar un sistema de tickets, incluyendo autenticación, perfiles de usuario, módulos del sistema y gestión de tickets.

## Información General

- **Base URL**: `http://localhost:3000/api`
- **Formato de datos**: JSON
- **Autenticación**: JWT (JSON Web Token)

---

## Autenticación

La mayoría de los endpoints requieren un token de autenticación. Este token debe enviarse en el header de la petición como:
`Authorization: Bearer <token>`

### Roles Disponibles
- **ADMIN**: Acceso total al sistema (Módulos, Perfiles, Opciones).
- **SOPORTE**: Puede ver todos los tickets y cambiar su estado.
- **CLIENTE**: Puede crear sus propios tickets y ver su estado.

---

## Endpoints

### 1. Autenticación (`/auth`)

#### Registro de Usuario
- **URL**: `/auth/register`
- **Método**: `POST`
- **Autenticación Requerida**: No
- **Cuerpo (JSON)**:
  ```json
  {
    "name": "Nombre Usuario",
    "email": "usuario@ejemplo.com",
    "password": "password123",
    "profile_id": "UUID-del-perfil" (Opcional)
  }
  ```
- **Respuesta Exitosa (201)**:
  ```json
  {
    "token": "JWT-TOKEN",
    "user": {
      "id": "UUID",
      "name": "Nombre Usuario",
      "email": "usuario@ejemplo.com",
      "profile": "NOMBRE_PERFIL",
      "funciones": [...]
    }
  }
  ```

#### Inicio de Sesión
- **URL**: `/auth/login`
- **Método**: `POST`
- **Autenticación Requerida**: No
- **Cuerpo (JSON)**:
  ```json
  {
    "email": "usuario@ejemplo.com",
    "password": "password123"
  }
  ```
- **Respuesta Exitosa (200)**: Igual que el registro.

---

### 2. Tickets (`/tickets`)

#### Listar Tickets
- **URL**: `/tickets`
- **Método**: `GET`
- **Autenticación Requerida**: Sí
- **Descripción**: Los administradores y soporte ven todos los tickets. Los clientes solo ven los suyos.

#### Crear Ticket
- **URL**: `/tickets`
- **Método**: `POST`
- **Autenticación Requerida**: Sí (Rol: `CLIENTE`)
- **Cuerpo (JSON)**:
  ```json
  {
    "title": "Problema con el login",
    "description": "No puedo acceder a mi cuenta...",
    "priority": "ALTA" (Opcional)
  }
  ```

#### Actualizar Estado de Ticket
- **URL**: `/tickets/:id/status`
- **Método**: `PATCH`
- **Autenticación Requerida**: Sí (Rol: `SOPORTE`)
- **Cuerpo (JSON)**:
  ```json
  {
    "status": "EN_PROCESO" (Valores: ABIERTO, EN_PROCESO, RESUELTO, CERRADO)
  }
  ```

---

### 3. Perfiles (`/profiles`) - Solo ADMIN

#### Listar Perfiles
- **URL**: `/profiles`
- **Método**: `GET`
- **Autenticación Requerida**: Sí

#### Obtener Perfil por ID
- **URL**: `/profiles/:id`
- **Método**: `GET`
- **Autenticación Requerida**: Sí

#### Crear Perfil
- **URL**: `/profiles`
- **Método**: `POST`
- **Autenticación Requerida**: Sí (Rol: `ADMIN`)
- **Cuerpo (JSON)**:
  ```json
  {
    "name": "Nombre Perfil",
    "description": "Descripción opcional"
  }
  ```

#### Actualizar Perfil
- **URL**: `/profiles/:id`
- **Método**: `PATCH`
- **Autenticación Requerida**: Sí (Rol: `ADMIN`)
- **Cuerpo (JSON)**:
  ```json
  {
    "name": "Nuevo Nombre",
    "description": "Nueva descripción"
  }
  ```

#### Eliminar Perfil
- **URL**: `/profiles/:id`
- **Método**: `DELETE`
- **Autenticación Requerida**: Sí (Rol: `ADMIN`)

---

### 4. Módulos y Opciones (`/modules` y `/options`) - Solo ADMIN

Funcionan de manera similar a Perfiles (CRUD completo).
- `/modules`: Gestiona los módulos del sistema.
- `/options`: Gestiona las opciones o funcionalidades dentro de cada módulo. Requiere `moduleId` al crear.

---

## Códigos de Error Comunes

- `400 Bad Request`: Datos de entrada inválidos.
- `401 Unauthorized`: Token faltante o inválido.
- `403 Forbidden`: No tienes el rol necesario para esta acción.
- `404 Not Found`: El recurso solicitado no existe.
- `500 Internal Server Error`: Error inesperado en el servidor.
