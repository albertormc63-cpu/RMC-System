ALTER TABLE "empleados" ALTER COLUMN "id_puesto" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "empleados" ALTER COLUMN "id_departamento" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "empleados" DROP COLUMN "puesto";