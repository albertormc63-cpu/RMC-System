# RMC System — Estado del proyecto y plan de desarrollo

> Documento de continuidad para retomar el proyecto en otro chat sin depender del historial anterior.
> Última actualización: 22 de octubre de 2026.
> Idioma de trabajo: español.
> Estilo de acompañamiento: avanzar paso a paso, explicar el propósito de los comandos y esperar el resultado antes de pasar al siguiente paso.

## 1. Visión del proyecto

**RMC System** es un sistema modular que comenzará con un piloto para registrar y consultar reportes de impresión de plotters. A futuro podrá crecer para apoyar flujos de trabajo de otras áreas de producción.

La arquitectura prevista es:

- **PostgreSQL** como base de datos central.
- **Node.js + TypeScript + Fastify** para la API.
- **Drizzle ORM + Drizzle Kit** para el esquema y las migraciones.
- **React + TypeScript + Tauri** para una aplicación de escritorio.
- Equipos Windows como clientes y un Mac como servidor central durante el despliegue inicial en LAN.
- La aplicación cliente se comunicará con la API; no se conectará directamente a PostgreSQL.

## 2. Cómo trabajar en este proyecto

- Trabajar una etapa y un paso a la vez.
- Explicar qué hace cada comando, por qué se ejecuta y qué resultado se espera.
- No avanzar al siguiente paso hasta que el usuario comparta el resultado del actual.
- Evitar explicar en exceso conceptos SQL básicos: el usuario ya conoce `CREATE`, `SELECT`, `INSERT`, `JOIN` y tipos de columnas.
- Explicar con más detalle las decisiones nuevas de arquitectura, seguridad, migraciones y reglas de negocio.
- No ejecutar migraciones ni operaciones destructivas sin revisar primero los cambios.
- No incluir contraseñas, tokens ni valores reales de `DATABASE_URL` en mensajes, archivos compartidos o documentación.
- Mantener este archivo actualizado cuando cambie una decisión importante o se complete una etapa.
- El usuario quiere aprender a desarrollar y entender el sistema, no solo copiar comandos.

## 3. Estado técnico confirmado

### Entorno

- macOS.
- PostgreSQL 18 instalado.
- La versión comprobada con `psql` fue **18.6**.
- Base de desarrollo creada: `rmc_bd_dev`.
- `pg_isready` respondió que el servidor acepta conexiones por el puerto `5432`.
- La conexión mediante `psql -U postgres -d rmc_bd_dev` funcionó.
- En la última comprobación, `\dt` respondió `Did not find any tables.`; la base estaba vacía en ese momento.
- Git/GitHub ya están inicializados para el proyecto.
- Repositorio: https://github.com/albertormc63-cpu/RMC-System.git

### API

La carpeta de la API es `api/`. Se instalaron y configuraron:

- Node.js / npm
- TypeScript
- Fastify
- `drizzle-orm`
- `drizzle-kit`
- `postgres`
- `dotenv`
- `@types/node`

El `tsconfig.json` se ha compilado correctamente. La configuración usa `NodeNext`, `ES2022`, `strict`, `rootDir: ./src` y `outDir: ./dist`.

### Configuración de Drizzle

Archivo `api/drizzle.config.ts`:

```ts
import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/db/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
```

La carga `import 'dotenv/config'` se añadió para cargar las variables del archivo `.env`.

Archivo `api/src/db/index.ts`:

```ts
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import "dotenv/config";

const connection = postgres(process.env.DATABASE_URL!);

export const db = drizzle(connection);
```

El `.env` existe dentro de `api/` y contiene la conexión a la base. **Nunca copiar su contenido a este documento ni al repositorio.** Asegurarse de que `.env` esté excluido por `.gitignore`. En una conversación anterior se compartió accidentalmente una contraseña; si sigue siendo válida, cambiarla.

### Verificaciones ya realizadas

Desde `api/`:

```bash
npx drizzle-kit check
```

Resultado: `Everything's fine`.

```bash
pg_isready
```

Resultado observado: `/tmp:5432 - accepting connections`.

La conexión por `psql` también funcionó y la base `rmc_bd_dev` estaba vacía al consultarla.

## 4. Estructura de carpetas objetivo

```text
RMC System/
├── .gitignore
├── database/
│   ├── 001_create_empleados.sql
│   └── 002_create_reporte_impresores.sql
└── api/
    ├── .env                  # local; nunca subir a Git
    ├── .env.example          # plantilla sin secretos, si se mantiene
    ├── package.json
    ├── tsconfig.json
    ├── drizzle.config.ts
    ├── drizzle/              # migraciones generadas y metadatos de Drizzle
    └── src/
        ├── db/
        │   ├── index.ts
        │   └── schema.ts
        ├── routes/
        │   ├── empleados.ts
        │   └── reportes-impresores.ts
        ├── services/
        ├── app.ts
        └── server.ts
```

Las carpetas/archivos `routes/`, `services/`, `app.ts` y algunas piezas de organización todavía pueden no existir. Esta es la estructura objetivo, no una afirmación de que todo esté creado.

## 5. Modelo de datos acordado

### Tabla `empleados`

Campos acordados:

- `id_empleado`: `INTEGER`, identidad autogenerada, clave primaria.
- `numero_empleado`: `INTEGER NOT NULL`.
- `nombre`: `VARCHAR(100) NOT NULL`.
- `apellido_paterno`: `VARCHAR(100) NOT NULL`.
- `apellido_materno`: `VARCHAR(100)`, permite `NULL`.
- `puesto`: `VARCHAR(100) NOT NULL`.
- `activo`: `BOOLEAN NOT NULL DEFAULT TRUE`.

Los puestos proceden de la información de empleados/RH. En el alcance inicial se registrarán los empleados que interactúan con el sistema RMC; no se ha decidido crear un catálogo separado de puestos.

### Tabla `reporte_impresores`

Campos acordados:

- `id_reporte`: `INTEGER`, identidad autogenerada, clave primaria.
- `plotter`: `VARCHAR(100) NOT NULL`.
- `wo`: `INTEGER NOT NULL`.
- `style`: `VARCHAR(100) NOT NULL`.
- `roster`: `VARCHAR(100)`, permite `NULL`.
- `process`: `VARCHAR(100) NOT NULL`.
- `order_qty`: `INTEGER NOT NULL`.
- `imp_qty`: `INTEGER NOT NULL`.
- `id_disenador`: `INTEGER NOT NULL`, FK a `empleados.id_empleado`.
- `id_impresor`: `INTEGER NOT NULL`, FK a `empleados.id_empleado`.
- `fecha_emb`: `DATE NOT NULL`.
- `fecha_imp`: `DATE NOT NULL`.
- `hora_imp`: `TIME NOT NULL`.
- `parcial`: `BOOLEAN NOT NULL DEFAULT FALSE`.
- `activo`: `BOOLEAN NOT NULL DEFAULT TRUE`.

### Reglas de negocio ya discutidas

- `order_qty` proviene de la información del código de barras.
- Cuando `parcial = FALSE`, el registro completo inicialmente debe tener `imp_qty = order_qty`.
- Cuando `parcial = TRUE`, `imp_qty` es la cantidad registrada en esa entrega parcial.
- Una WO normalmente no debería repetirse, salvo cuando se registra como parcial.
- Ejemplo: una orden de 250 piezas podría registrarse en cuatro reportes parciales de 100, 50, 50 y 50 piezas.
- La validación `imp_qty <= order_qty` por sí sola no impide que la suma de varios registros parciales supere `order_qty`.
- Antes de implementar el registro de parciales, diseñar cómo identificar y agrupar todas las partes de una misma orden y cómo impedir excesos incluso con solicitudes simultáneas. Una columna booleana `parcial` por sí sola podría no ser suficiente.
- `id_disenador` e `id_impresor` son referencias a empleados y ambos son obligatorios.

### Código de barras

Formato de referencia:

`WO#-Roster-Style-Pzs/Qty-Process-Emb`

Ejemplo:

`178328-80799.26-T1625Y-5-R-18/9`

Incluye WO, Roster, Style, piezas/cantidad, Process y Emb. La aplicación cliente podrá interpretar el código y rellenar el formulario, pero el backend deberá validar los datos y aplicar las reglas de negocio. PostgreSQL debe proteger la integridad de los datos.

## 6. Plan por etapas

### Etapa A — Base de datos y backend base

**Estado: en progreso.**

Objetivo: dejar lista la base técnica antes de construir la interfaz.

- [x] Instalar PostgreSQL 18.
- [x] Crear la base `rmc_bd_dev`.
- [x] Inicializar Git/GitHub y el proyecto Node.js + TypeScript.
- [x] Instalar Fastify, Drizzle ORM, Drizzle Kit, `postgres` y `dotenv`.
- [x] Crear el archivo `.env` local y comprobar la conexión a PostgreSQL.
- [x] Crear `src/db/index.ts`.
- [x] Crear `src/db/schema.ts`.
- [x] Comprobar que TypeScript compila.
- [x] Comprobar `npx drizzle-kit check`.
- [x] Comprobar que PostgreSQL acepta conexiones y que `rmc_bd_dev` no tenía tablas.
- [x] Revisar que `schema.ts` refleje exactamente el modelo acordado.
- [x] Generar una migración inicial correcta.
- [x] Inspeccionar el SQL generado antes de aplicarlo.
- [x] Aplicar la migración y verificar las tablas reales.
- [ ] Comprobar consultas a través de Drizzle.
- [ ] Organizar la API (`app.ts`, `server.ts`, rutas y servicios).
- [ ] Probar las rutas iniciales.

**Incidente a revisar:** la primera migración generada no incluía `numero_empleado` y hacía `apellido_materno NOT NULL`, aunque el modelo acordado requiere lo contrario. El usuario borró el contenido de `api/drizzle/` y volvió a generar la migración para evitar archivos duplicados. En el siguiente chat, NO asumir que el problema quedó resuelto: inspeccionar el `schema.ts` actual y la migración recién generada. Si las migraciones todavía no se han aplicado, verificar los archivos antes de ejecutar cualquier migración. No borrar metadatos de Drizzle como rutina.

### Etapa B — API de Impresores

**Estado: por hacer.**

Objetivo: permitir que la aplicación consulte y registre datos de forma segura.

- [ ] Separar la creación de Fastify del arranque del servidor (`app.ts` y `server.ts`).
- [ ] Crear rutas para consultar empleados y reportes.
- [ ] Crear la ruta para registrar reportes de impresión.
- [ ] Validar datos recibidos y referencias a empleados.
- [ ] Implementar reglas del código de barras.
- [ ] Diseñar y validar duplicados de WO y registros parciales.
- [ ] Probar respuestas correctas, errores y casos límite.

### Etapa C — Aplicación de escritorio

**Estado: por hacer.**

Objetivo: crear la interfaz que usarán los impresores en sus equipos.

- [ ] Preparar React + TypeScript.
- [ ] Integrar Tauri para generar la aplicación de escritorio.
- [ ] Crear el formulario de reporte de impresión.
- [ ] Cargar impresores, diseñadores y plotters desde las fuentes correspondientes.
- [ ] Implementar lectura o captura del código de barras.
- [ ] Mostrar los últimos registros del día y sus validaciones.

### Etapa D — Consultas y reportes

**Estado: por hacer.**

Objetivo: completar las funciones operativas del diseño.

- [ ] Buscar reportes por distintos campos.
- [ ] Consultar todos los registros con paginación.
- [ ] Editar registros capturados incorrectamente con permisos y validaciones.
- [ ] Agrupar o consultar las distintas partes de una misma WO.
- [ ] Exportar el reporte general a Excel con filtros.

### Etapa E — Pruebas en LAN y despliegue

**Estado: por hacer.**

Objetivo: conectar los equipos reales al sistema central.

- [ ] Configurar el Mac como servidor central de la API y PostgreSQL.
- [ ] Permitir acceso desde clientes Windows por la LAN.
- [ ] Configurar HTTPS para la API cuando corresponda.
- [ ] Preparar seguridad, credenciales, copias de seguridad y recuperación.
- [ ] Probar con usuarios y datos de prueba.
- [ ] Generar instaladores y documentar instalación y actualización.

### Etapa F — Expansión de RMC System

**Estado: futuro.**

Objetivo: convertir el piloto en un sistema modular para áreas de producción.

- [ ] Diseñar los siguientes módulos según las necesidades de cada departamento.
- [ ] Reutilizar la API y la infraestructura común.
- [ ] Mantener aplicaciones específicas para cada área cuando sea necesario.
- [ ] Definir cómo se transfiere y rastrea cada orden entre departamentos.
- [ ] Evaluar clientes para tabletas cuando el flujo principal esté estable.

## 7. Decisiones de arquitectura y buenas prácticas

- La API será el punto de entrada de los clientes a los datos; no dar acceso directo a PostgreSQL a las aplicaciones de escritorio.
- La validación del cliente sirve para facilitar la experiencia, pero la validación del backend es la autoridad.
- Las restricciones de PostgreSQL protegen la integridad, especialmente para claves foráneas y campos obligatorios.
- Drizzle Kit genera migraciones desde `src/db/schema.ts`; `src/db/index.ts` es la conexión que utiliza la aplicación en ejecución.
- `api/drizzle/` contiene los SQL generados y metadatos de migración. Mantenerlos en control de versiones y no eliminar `meta/` sin entender el impacto.
- Los archivos SQL manuales en la carpeta raíz `database/` no se sincronizan automáticamente con Drizzle. Antes de decidir cómo se usarán en despliegues, definir una única estrategia clara para evitar aplicar dos veces las mismas tablas.
- No usar `npm audit fix --force` sin revisar el impacto: anteriormente npm reportó vulnerabilidades moderadas en dependencias y la solución forzada sugería cambios potencialmente incompatibles.
- Nunca subir `.env` ni compartir contraseñas en texto.

## 8. Próximo paso exacto al retomar en otro chat

Comenzar por la **Etapa A, revisión de la migración inicial**, no por la API ni la interfaz.

Pedir al usuario que comparta, sin secretos:

1. El contenido actual de `api/src/db/schema.ts`.
2. El nombre y contenido del SQL que acaba de generar dentro de `api/drizzle/`.
3. La salida de `npx drizzle-kit check` y `npx tsc --noEmit`, si no se han ejecutado después de los cambios.

Verificar expresamente:

- Que `numero_empleado INTEGER NOT NULL` exista.
- Que `apellido_materno` permita `NULL`.
- Que las demás columnas, valores predeterminados y claves foráneas coincidan con el modelo acordado.
- Que la migración aún no se haya aplicado.
- Que no haya archivos de migración anteriores o metadatos que deban conservarse.

Después de revisar, aplicar la migración solo cuando el SQL sea correcto; verificar con `\dt` y describir las tablas en PostgreSQL. Avanzar paso a paso y esperar el resultado de cada comando.

## 9. Mensaje para iniciar el próximo chat

Puedes pegar este texto junto con el archivo:

> Vamos a continuar el proyecto RMC System usando el documento de continuidad adjunto como referencia principal. Mantén el plan por etapas y el estilo de aprendizaje paso a paso. Estamos en la Etapa A: base de datos y backend base. Antes de avanzar, revisa el esquema actual y la migración inicial de Drizzle, porque una migración anterior no incluía `numero_empleado` y marcaba `apellido_materno` como obligatorio. La carpeta `api/drizzle/` se limpió y se volvió a generar una migración, pero aún debemos verificar el resultado antes de aplicarla. No asumas que se corrigió hasta inspeccionar los archivos. Explica cada paso, no ejecutes ni recomiendes cambios destructivos sin revisar, y espera mis resultados antes de avanzar.
