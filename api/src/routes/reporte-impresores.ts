//Importar fastifyPluginAsync de fastify
import type { FastifyPluginAsync } from "fastify";
//Importar eq y sql de drizzle-orm
import { eq, sql, } from "drizzle-orm";
//Importar la conexion a la BD
import { db } from "../db/index.js";
//Importar la tabla reporteImpresores y empleados del schema
import { reporteImpresores, empleados } from "../db/schema.js";
//Importar alias de drizzle-orm
import { alias } from "drizzle-orm/pg-core" 

//Crear los const para los alias() de los empleados que son disenador e impresor
const disenador = alias(empleados, "disenador");
const impresor = alias(empleados, "impresor");

//Definir el plugin de rutas para reporte-impresores
const reporteImpresoresRoutes: FastifyPluginAsync = async (app) => {
    app.get("/", async () =>{
        const reporteImpresoresSelect = await db
        .select({
            idReporte: reporteImpresores.idReporte,
            plotter: reporteImpresores.plotter,
            wo: reporteImpresores.wo,
            style: reporteImpresores.style,
            roster: reporteImpresores.roster,
            process: reporteImpresores.process,
            
            orderQty: reporteImpresores.orderQty,
            impQty: reporteImpresores.impQty,

            nombreDisenador: sql<string>
            `CONCAT_WS(' ',
                ${disenador.nombre},
                ${disenador.apellidoPaterno},
                ${disenador.apellidoMaterno}
            )`,
            nombreImpresor: sql<string>
            `CONCAT_WS(' ',
                ${impresor.nombre},
                ${impresor.apellidoPaterno},
                ${impresor.apellidoMaterno}
            )`,

            fechaEmb: reporteImpresores.fechaEmb,
            fechaImp: reporteImpresores.fechaImp,
            horaImp: reporteImpresores.horaImp,

            parcial: reporteImpresores.parcial,
            activo: reporteImpresores.activo
        })
        .from(reporteImpresores)
        .innerJoin(
            disenador,
            eq(reporteImpresores.idDisenador, disenador.idEmpleado)
        )
        .innerJoin(
            impresor,
            eq(reporteImpresores.idImpresor, impresor.idEmpleado)
        );

        return reporteImpresoresSelect;
    });
};

export default reporteImpresoresRoutes;