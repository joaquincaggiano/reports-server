# Ejecutar en Dev

1. Clonar el proyecto
2. Instalar dependencias `pnpm install`
3. Clonar `.env.template` y renombrarlo a `.env`
4. Levantar la base de datos con `docker compose up -d`
5. Tenemos que cargar la base de datos. Ingresamos en localhost:8080 con las creenciales de pg-admin que tenemos en `docker-compose.yml`. Y utilizamos la querie que tenemos dentro de la carpeta `queries`.
6. Ejecutamos `pnpx prisma db pull` para traernos los cambios y que se actualice el `schema.prisma`
7. Generar el Prisma client `pnpx prisma generate`
8. Ejecutar proyecto `pnpm run start:dev`
