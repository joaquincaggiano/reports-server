# Ejecutar en Dev

1. Clonar el proyecto
2. Instalar dependencias `pnpm install`
3. Clonar `.env.template` y renombrarlo a `.env`
4. Levantar la base de datos con `docker compose up -d`
5. Generar el Prisma client `pnpx prisma generate`
6. Ejecutar proyecto `pnpm run start:dev`
