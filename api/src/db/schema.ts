// Importar las funciones necesarias de Drizzle ORM.
import { pgTable, integer, varchar, boolean, date, time} from "drizzle-orm/pg-core";


// Definir la tabla "empleados" con sus columnas y tipos de datos.
export const empleados = pgTable ("empleados", {
    idEmpleado: integer("id_empleado")
        .generatedAlwaysAsIdentity()
        .primaryKey(),
    numeroEmpleado: integer("numero_empleado").notNull(),
    nombre: varchar("nombre", { length: 100 }).notNull(),
    apellidoPaterno: varchar("apellido_paterno", { length: 100 }).notNull(),
    apellidoMaterno: varchar("apellido_materno", { length: 100 }),
    
    idPuesto: integer("id_puesto")
        .references(() => cPuestos.idPuesto),
    idDepartamento: integer("id_departamento")
        .references(() => cDepartamentos.idDepartamento),

    puesto: varchar("puesto", { length: 100 }).notNull(),
    activo: boolean("activo").notNull().default(true),
});

// Definir la relación entre la tabla "empleados" y la tabla "reporte_impresores".
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

    //Agregar referencias a las llaves foraneas de la tabla empleados
    idDisenador: integer("id_disenador")
        .notNull()
        .references(() => empleados.idEmpleado),
    
    idImpresor: integer("id_impresor")
        .notNull()
        .references(() => empleados.idEmpleado),

    fechaEmb: date("fecha_emb").notNull(),
    fechaImp: date("fecha_imp").notNull(),
    horaImp: time("hora_imp").notNull(),

    parcial: boolean("parcial").notNull().default(false),
    activo: boolean("activo").notNull().default(true),
});

export const cPuestos = pgTable("c_puestos",{
    idPuesto: integer("id_puesto")
        .generatedAlwaysAsIdentity()
        .primaryKey(),
    nombre: varchar("nombre", {length: 100})
        .notNull()
        .unique(),
    
    descripcion: varchar("descripcion", { length: 255 }),

    activo: boolean("activo")
        .notNull()
        .default(true),
});

export const cDepartamentos = pgTable("c_departamentos", {
    idDepartamento: integer("id_departamento")
        .generatedAlwaysAsIdentity()
        .primaryKey(),
    nombre: varchar("nombre", { length: 100 })
        .notNull()
        .unique(),
    
    descripcion: varchar("descripcion", { length:255 }),

    activo: boolean("activo")
        .notNull()
        .default(true),
});

export type Empleado = typeof empleados.$inferSelect;
export type NuevoEmpleado = typeof empleados.$inferInsert;

export type ReporteImpresor = typeof reporteImpresores.$inferSelect;
export type NuevoReporteImpresor = typeof reporteImpresores.$inferInsert;