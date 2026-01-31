# Ejecutar en Dev

1. Clonar el proyecto
2. Instalar dependencias `pnpm install`
3. Clonar `.env.template` y renombrarlo a `.env`
4. Levantar la base de datos con `docker compose up -d`
5. Generar el Prisma client `pnpx prisma generate`
6. Tenemos que cargar la base de datos. Ingresamos en localhsot:8080 con las creenciales de pg-admin que tenemos en `docker-compose.yml`. Y utilizamos la querie que tenemos dentro de la carpeta `queries`.
7. Ejecutar proyecto `pnpm run start:dev`
