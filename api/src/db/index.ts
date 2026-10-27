// importamos postgres y drizzle para conectarnos a la base de datos
import postgres from "postgres";
//{drizzle} aqui se esta importando drizzle para poder usarlo en la conexion a la base de datos
import { drizzle } from "drizzle-orm/postgres-js";
import "dotenv/config";
//traemos la variable de entorno DATABASE_URL que contiene la url de la base de datos
const connection = postgres(process.env.DATABASE_URL!);
//exportamos la conexion a la base de datos para poder usarla en otros archivos
export const db = drizzle(connection);

