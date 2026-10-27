// FastifyPluginAsync es un tipo de TypeScript que representa un plugin asíncrono de Fastify.
// Un plugin es una función que recibe la instancia de Fastify y puede registrar rutas, decoradores, hooks, etc. El tipo FastifyPluginAsync asegura que la función sea asíncrona y que cumpla con la firma esperada por Fastify.
import type { FastifyPluginAsync } from  "fastify";
// importar la conexion {db} para poder usarla en este archivo
import {db} from "../db/index.js";
// Importar la tabla empleados, esa tabla se exporta desde el schema.js
import {empleados} from "../db/schema.js";


const empleadosRoutes: FastifyPluginAsync = async (app) => {
    app.get("/", async () =>{
        const empleadosSelect = await db
        .select()
        .from(empleados);

        return empleadosSelect;
    });
};

export default empleadosRoutes;