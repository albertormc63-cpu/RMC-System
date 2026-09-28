CREATE TABLE reporte_impresores(
    id_reporte INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    plotter VARCHAR(100) NOT NULL,
    wo INTEGER(100) NOT NULL,
    style VARCHAR(100) NOT NULL,
    roster VARCHAR(100),
    process VARCHAR(100),

    order_qty INTEGER,
    imp_qty INTEGER,

    id_disenador INTEGER,
    id_impresor INTEGER,

    fecha_emb DATE,
    fecha_imp DATE,
    hora_imp TIME,

    parcial BOOLEAN NOT NULL DEFAULT FALSE,
    activo BOOLEAN NOT NULL DEFAULT TRUE,

    CONSTRAINT fk_reporte_impresores_disenador
        FOREIGN KEY (id_disenador)
        REFERENCES empleados (id_empleado),

    CONSTRAINT fk_reporte_impresores_impresor
        FOREIGN KEY (id_impresor)
        REFERENCES empleados (id_empleado)
);