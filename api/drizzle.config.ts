import { defineConfig } from 'drizzle-kit';
import 'dotenv/config';

declare const process: { env: { DATABASE_URL?: string } };

export default defineConfig({
  schema: './src/db/schema.ts', // Ruta a tu esquema
  out: './drizzle',             // Dónde guardará las migraciones SQL
  dialect: 'postgresql',        // Dialecto de base de datos
  dbCredentials: {
    url: process.env.DATABASE_URL || '', // Tu string de conexión del .env
  },
});