// FastifyPluginAsync es un tipo de TypeScript que representa un plugin asíncrono de Fastify.
// Un plugin es una función que recibe la instancia de Fastify y puede registrar rutas, decoradores, hooks, etc. El tipo FastifyPluginAsync asegura que la función sea asíncrona y que cumpla con la firma esperada por Fastify.
import type { FastifyPluginAsync } from  "fastify";
// importar eq y sql de drizzle-kit
import {eq, sql} from "drizzle-orm";
// cada vez que necesitemos algo de la bd, importar/agregar esto al achivo
// importar la conexion {db} para poder usarla en este archivo
import {db} from "../db/index.js";
// Importar la tabla empleados, esa tabla se exporta desde el schema.js
import {empleados, cPuestos, cDepartamentos } from "../db/schema.js";


const empleadosRoutes: FastifyPluginAsync = async (app) => {
    //Hacer select con inner join de la tabla empleados con la tabla cPuestos y cDepartamentos
    app.get("/", async () =>{

        const empleadosSelect = await db
        .select({
            idEmpleado: empleados.idEmpleado,
            numeroEmpleado: empleados.numeroEmpleado,
            //usamos sql<string> para concatenar el nombre completo del empleado
            nombreCompleto: sql<string> 
                `CONCAT_WS(' ',
                 ${empleados.nombre},
                 ${empleados.apellidoPaterno},
                 ${empleados.apellidoMaterno})
                 `,
            puesto: cPuestos.nombre,
            departamento: cDepartamentos.nombre,
            activo: empleados.activo
        })
        .from(empleados)
        .innerJoin(
            cPuestos,
            eq(empleados.idPuesto, cPuestos.idPuesto)
        )
        .innerJoin(
            cDepartamentos,
            eq(empleados.idDepartamento, cDepartamentos.idDepartamento)
        );


        return empleadosSelect;
    });
};

export default empleadosRoutes;