CREATE TABLE "c_departamentos" (
	"id_departamento" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "c_departamentos_id_departamento_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"nombre" varchar(100) NOT NULL,
	"descripcion" varchar(255),
	"activo" boolean DEFAULT true NOT NULL,
	CONSTRAINT "c_departamentos_nombre_unique" UNIQUE("nombre")
);
--> statement-breakpoint
CREATE TABLE "c_puestos" (
	"id_puesto" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "c_puestos_id_puesto_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"nombre" varchar(100) NOT NULL,
	"descripcion" varchar(255),
	"activo" boolean DEFAULT true NOT NULL,
	CONSTRAINT "c_puestos_nombre_unique" UNIQUE("nombre")
);
