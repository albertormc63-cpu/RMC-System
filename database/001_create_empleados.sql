--Crear la tabla de "empleados"
CREATE TABLE empleados (
    id_empleado INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    numero_empleado INTEGER NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    apellido_paterno VARCHAR(100) NOT NULL,
    apellido_materno VARCHAR(100),
    puesto VARCHAR(100) NOT NULL,
    activo BOOLEAN NOT NULL DEFAULT TRUE
);