//importar libreria de postgres-js
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import * as schema from "./schema";

import 'dotenv/config'; //Para leer datos desde e; .env

if (!process.env.DATABASE_URL) {
    throw new Error('La variable de entorno DATABASE_URL no está definida');
}

//Coneccion para Drizzle
const queryClient = postgres(process.env.DATABASE_URL);
export const db = drizzle(queryClient, { schema });