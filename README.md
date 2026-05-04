# Tickets Management Platform - Backend

Backend robusto desarrollado con Node.js, Express, TypeScript y TypeORM para la gestión de tickets de soporte.

## 🚀 Guía de Inicio Rápido

### 1. Requisitos Previos
- **Node.js**: v16 o superior.
- **PostgreSQL**: Instancia corriendo localmente o en la nube.

### 2. Instalación
Clona el repositorio e instala las dependencias:

```bash
git clone https://github.com/amoreira-v/tickets-back.git
cd tickets-back
npm install
```

### 3. Configuración del Entorno
Copia el archivo de ejemplo y configura tus credenciales de base de datos y secreto de JWT:

```bash
cp .env.example .env
```

Edita el archivo `.env`:
```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USER=tu_usuario
DB_PASSWORD=tu_password
DB_NAME=tickets_db
JWT_SECRET=tu_secreto_seguro
```

> **Nota:** Debes crear manualmente la base de datos `tickets_db` en tu instancia de PostgreSQL antes de iniciar.

### 4. Poblado de Datos Iniciales (Seed)
Ejecuta el script para insertar los perfiles básicos (ADMIN, SOPORTE, CLIENTE):

```bash
npm run seed
```

### 5. Ejecución

#### Modo Desarrollo (con recarga automática):
```bash
npm run dev
```

#### Modo Producción (Compilación y arranque):
```bash
npm run build
npm run start
```

## 🛠 Arquitectura y Tecnologías
- **TypeScript**: Tipado estricto para mayor seguridad.
- **TypeORM**: Gestión de persistencia con soporte para PostgreSQL.
- **JWT**: Autenticación segura mediante tokens.
- **Bcrypt**: Hashing de contraseñas.
- **Global Error Handling**: Middleware centralizado para respuestas uniformes.

## 📡 Contrato de API
Todas las respuestas siguen el formato:
- Éxito: `{ "status": "success", "data": ... }`
- Error: `{ "status": "error", "message": "...", "code": 400 }`

Para una guía detallada de todos los endpoints, parámetros y roles, consulta la [Documentación de la API](API_DOCUMENTATION.md).
