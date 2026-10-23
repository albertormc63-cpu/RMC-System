// importar buildApp desde app.js (ojo, aunque sea en .ts los imports los hacemos con .js)
import { buildApp } from "./app.js"

//contruimos nuestra app con la funcion buildApp de app.js
const app = buildApp();

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