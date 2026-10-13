// Importar las funciones necesarias de Drizzle ORM.
import { pgTable, integer, varchar, boolean, date, time} from "drizzle-orm/pg-core";
// relations es una función que permite definir relaciones entre tablas en Drizzle ORM.
import { relations } from "drizzle-orm";

export const empleados = pgTable ("empleados", {
    idEmpleado: integer("id_empleado")
        .generatedAlwaysAsIdentity()
        .primaryKey(),

    nombre: varchar("nombre", { length: 100 }).notNull(),
    apellidoPaterno: varchar("apellido_paterno", { length: 100 }).notNull(),
    apellidoMaterno: varchar("apellido_materno", { length: 100 }).notNull(),
    puesto: varchar("puesto", { length: 100 }).notNull(),
    activo: boolean("activo").notNull().default(true)
});

export const reporteImpresores = pgTable("reporte_impresores",{
    idReporte: integer("id_reporte")
        .generatedAlwaysAsIdentity()
        .primaryKey(),
    
    plotter: varchar("plotter", { length: 100 }).notNull(),
    wo: integer("wo").notNull(),
    style: varchar("style", { length: 100 }).notNull(),
    roster: varchar("roster", { length: 100 }),
    process: varchar("process", { length: 100 }).notNull(),

    orderQty: integer("order_qty").notNull(),
    impQty: integer("imp_qty").notNull(),

    idDisenador: integer("id_disenador").notNull(),
    idImpresor: integer("id_impresor").notNull(),

    fechaEmb: date("fecha_emb").notNull(),
    fechaImp: date("fecha_imp").notNull(),
    horaImp: time("hora_imp").notNull(),
});