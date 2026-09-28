// Importar las funciones necesarias de Drizzle ORM para definir la tabla y sus columnas
import { pgTable, serial, varchar, integer, boolean, date, time } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// 001 Definir la tabla "empleados" con sus columnas y tipos de datos
export const empleados = pgTable("empleados", {
    //lo que va dentro de pgTable son las columnas de la tabla, con su nombre y tipo de dato
    idEmpleado: serial("id_empleado").primaryKey(),
    numeroEmpleado: integer("numero_empleado").notNull(),
    nombre: varchar("nombre", { length: 100 }).notNull(),
    apellidoPaterno: varchar("apellido_paterno", { length: 100 }).notNull(),
    apellidoMaterno: varchar("apellido_materno", { length: 100 }),
    puesto: varchar("puesto", { length: 100 }).notNull(),
    activo: boolean("activo").notNull().default(true).notNull(),
});

//002 Definir la tabla "reporteImpresores" con sus columnas y tipos de datos
export const reporteImpresores = pgTable("reporte_impresores", {
    idReporte: serial("id_reporte").primaryKey(),
    plotter: varchar("plotter", { length: 100 }).notNull(),
    wo: integer("wo").notNull(),
    style: varchar("style", { length: 100 }).notNull(),
    roster: varchar("roster", { length: 100 }),
    process: varchar("process", { length: 100 }).notNull(),
    orderQty: integer("order_qty").notNull(),
    impQty: integer("imp_qty").notNull(),

    //Llaves foraneas aountando a la tabla empleados
    idDisenador: integer("id_disena").references(() => empleados.idEmpleado),
    idImpresor: integer("id_impresor").references(() => empleados.idEmpleado),

    fechaEmb: date("fecha_emb").notNull(),
    fechaImp: date("fecha_imp").notNull(),
    horaImp: time("hora_imp").notNull(),

    parcial: boolean("parcial").default(false).notNull(),
    activo: boolean("activo").default(true).notNull(),

});


// Exportar los tipos automaicamente para usarlos en React
export type Empleado = typeof empleados.$inferSelect;
export type NewEmpleado = typeof empleados.$inferInsert;

export type ReporteImpresor = typeof reporteImpresores.$inferSelect;
export type NewReporteImpresor = typeof reporteImpresores.$inferInsert;