# Prompt 08: Auditoría de Integridad y Validación de Tipado

Actúa como un Principal Software Engineer. Necesito realizar un 'Code Integrity Check' exhaustivo sobre todo el código del Backend generado hasta ahora. El objetivo es asegurar que el proyecto levante sin errores de compilación ni advertencias de TypeScript.

Por favor, revisa y corrige:
1. Tipado Estricto: Asegura que no existan tipos any implícitos o explícitos. Define interfaces o tipos precisos para todos los Request Bodys, Params y Responses.
2. Configuración de TSC: Valida que el archivo tsconfig.json tenga activos strict: true, noImplicitAny: true y esModuleInterop: true.
3. Integridad de TypeORM: Verifica que todas las relaciones en las entidades (ManyToOne, OneToMany) estén correctamente decoradas y que los tipos de retorno de las promesas en los servicios coincidan con las entidades.
4. Manejo de Promesas: Asegura que todos los métodos asíncronos tengan sus respectivos bloques try/catch o que el middleware de error centralizado capture todas las promesas rechazadas.
