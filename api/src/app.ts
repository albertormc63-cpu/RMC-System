// Crear instancia de fastify
import fastify from "fastify";
// Importar la const exportada en empleados.js que contiene las rutas de empleados
import empleadosRoutes from "./routes/empleados.js";


// Crear y configurar la instancia de Fastify y exportarla para su uso en otros módulos
// exportar la funcion de buildApp (buildApp es un nombre que le damos a la funcion que crea la instancia de Fastify)
export function buildApp() {
    // crear la variable app que contiene la instancia de Fastify
    const app = fastify({
        // Configuración de Fastify
        logger: true, // Habilitar el registro de solicitudes y respuestas
    });

    // Registrar las rutas de empleados en la instancia de Fastify con el prefijo "/empleados"
    app.register(empleadosRoutes, {
        prefix: "/empleados",
    });


    //crear la ruta de prueba para verificar la API
    app.get("/", async () => {
        return { message: "API funcionando correctamente" }; // Devolver un mensaje de prueba .JSON
    });

    return app; // Devolver la instancia de Fastify
}