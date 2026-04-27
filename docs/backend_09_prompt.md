# Prompt 09: Levantamiento de Aplicación y Guía del README

Actúa como un DevOps Engineer. Necesito configurar el proceso de levantamiento (bootstrapping) del Backend de forma infalible.

Por favor, proporciona:
1. Scripts de package.json: Define los comandos npm run dev (usando nodemon), npm run build y npm run start (ejecutando el JS compilado).
2. Validación Pre-vuelo: Crea una lógica simple en el archivo de inicio (index.ts o main.ts) que verifique la conexión a PostgreSQL y la existencia de las variables de entorno necesarias antes de levantar el servidor.
3. Logs de Inicio: Asegura que al iniciar, el sistema imprima en consola un mensaje claro indicando el puerto, el entorno (desarrollo/producción) y el estado de la base de datos.
4. Guía de Ejecución: Redacta los pasos exactos para que un tercero clone el repo, instale dependencias, configure el .env y tenga la API corriendo en segundos.

El objetivo es que el backend levante de manera limpia, sin errores de compilación y con una configuración lista para recibir peticiones del frontend.
