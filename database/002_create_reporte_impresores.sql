CREATE TABLE reporte_impresores(
    id_reporte INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    plotter VARCHAR(100) NOT NULL,
    wo INTEGER NOT NULL,
    style VARCHAR(100) NOT NULL,
    roster VARCHAR(100),
    process VARCHAR(100) NOT NULL,

    order_qty INTEGER NOT NULL,
    imp_qty INTEGER NOT NULL,

    id_disenador INTEGER NOT NULL,
    id_impresor INTEGER NOT NULL,

    fecha_emb DATE NOT NULL,
    fecha_imp DATE NOT NULL,
    hora_imp TIME NOT NULL,

    parcial BOOLEAN NOT NULL DEFAULT FALSE,
    activo BOOLEAN NOT NULL DEFAULT TRUE,

    CONSTRAINT fk_reporte_impresores_disenador
        FOREIGN KEY (id_disenador)
        REFERENCES empleados (id_empleado),

    CONSTRAINT fk_reporte_impresores_impresor
        FOREIGN KEY (id_impresor)
        REFERENCES empleados (id_empleado)
);