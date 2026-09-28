import Fastify from 'fastify';
import cors from '@fastify/cors';
import { db } from './db/index.js'; 
import { empleados } from './db/schema.js';

const fastify = Fastify({ logger: true });

// 1. Definimos las rutas primero
fastify.get('/', async (request, reply) => {
  return { status: 'API de RMC System corriendo perfectamente en LAN 🚀' };
});

fastify.get('/empleados', async (request, reply) => {
  try {
    const listaEmpleados = await db.select().from(empleados);
    return listaEmpleados;
  } catch (error) {
    fastify.log.error(error);
    return reply.status(500).send({ error: 'Error al consultar la base de datos' });
  }
});

// 2. Metemos toda la lógica asíncrona dentro de la función de arranque
const start = async () => {
  try {
    // Configuración de CORS movida aquí adentro para solucionar el error de 'await'
    await fastify.register(cors, {
      origin: [
        'tauri://localhost',
        'https://tauri.localhost',
        'http://localhost:5173' 
      ]
    });

    // Escuchar en la IP local para acceso LAN
    await fastify.listen({ port: 3000, host: '0.0.0.0' });
    console.log('Servidor encendido exitosamente');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
