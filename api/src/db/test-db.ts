// Importamos la instancia de la base de datos desde el archivo index.ts
import {db} from "./index.js";
//Importamos las tablas definidas en el archivo schema.ts
import {empleados, reporteImpresores} from "./schema.js";

// Función principal para ejecutar las operaciones de la base de datos
// como es una funcion que se conectara a la BD, es recomendable que sea asincrona
async function main(){
    //crear variables con las consultas .select
    const listaEmpleados = await db.select().from(empleados);
    const listaReportes = await db.select().from(reporteImpresores);

    // Mostar en pantalla si se esta obteniendo la informacion de la BD
    console.log("Conexion mediante Drizzle: correcta");
    console.log("Empleados: ", listaEmpleados.length);
    console.log("Reportes: ", listaReportes.length);
}

// Ejecutar la función principal y manejar errores
main().catch((error) => {
    console.error("Error al consultar PostgreSQL:", error);
    process.exitCode = 1;
});
