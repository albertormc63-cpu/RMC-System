//importar la libreria de fastify para crear el servidor
import Fastify from "fastify";

//crear una instancia de fastify app es el objeto que representa el servidor y nos permite configurar rutas, middlewares, etc.
const app = Fastify({
    //habilitar el logger para ver los logs en la consola
    logger: true,
});

//app.get sirve para crear una ruta GET en el servidor la ruta es la URL que se debe acceder para ejecutar la funcion
app.get("/", async () => {
    //usar "/" como ruta principal del servidor
    //retornar un objeto JSON con un mensaje
    return { message: "RMC System API funcionando" };
});

//crear funcion asincrona para iniciar el servidor
const iniciarServidor =  async () => {
    try {
        //iniciar el servidor en el puerto 3000 y en la IP
        await app.listen({
            port: 3000,
            host: "127.0.0.1",
        });

        console.log("RMC System API escuchando en http://127.0.0.1:3000");    
    } catch (error) {
        app.log.error(error);
        process.exit(1);
    }
};

iniciarServidor();