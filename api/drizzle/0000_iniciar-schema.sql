CREATE TABLE "empleados" (
	"id_empleado" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "empleados_id_empleado_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"numero_empleado" integer NOT NULL,
	"nombre" varchar(100) NOT NULL,
	"apellido_paterno" varchar(100) NOT NULL,
	"apellido_materno" varchar(100),
	"puesto" varchar(100) NOT NULL,
	"activo" boolean DEFAULT true NOT NULL
);
--> statement-breakpoint
CREATE TABLE "reporte_impresores" (
	"id_reporte" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "reporte_impresores_id_reporte_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"plotter" varchar(100) NOT NULL,
	"wo" integer NOT NULL,
	"style" varchar(100) NOT NULL,
	"roster" varchar(100),
	"process" varchar(100) NOT NULL,
	"order_qty" integer NOT NULL,
	"imp_qty" integer NOT NULL,
	"id_disenador" integer NOT NULL,
	"id_impresor" integer NOT NULL,
	"fecha_emb" date NOT NULL,
	"fecha_imp" date NOT NULL,
	"hora_imp" time NOT NULL,
	"parcial" boolean DEFAULT false NOT NULL,
	"activo" boolean DEFAULT true NOT NULL
);
--> statement-breakpoint
ALTER TABLE "reporte_impresores" ADD CONSTRAINT "reporte_impresores_id_disenador_empleados_id_empleado_fk" FOREIGN KEY ("id_disenador") REFERENCES "public"."empleados"("id_empleado") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reporte_impresores" ADD CONSTRAINT "reporte_impresores_id_impresor_empleados_id_empleado_fk" FOREIGN KEY ("id_impresor") REFERENCES "public"."empleados"("id_empleado") ON DELETE no action ON UPDATE no action;