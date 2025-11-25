-- BDR.03/scripts/01_create_audit_table.sql
-- Tabela de auditoria para monitoramento das consultas

CREATE TABLE IF NOT EXISTS tb_auditoria_consultas (
    id_auditoria SERIAL PRIMARY KEY,
    tipo_consulta VARCHAR(50) NOT NULL,
    parametros JSONB,
    data_consulta TIMESTAMP DEFAULT NOW(),
    usuario VARCHAR(100) DEFAULT 'sistema_web'
);

COMMENT ON TABLE tb_auditoria_consultas IS 'Tabela para auditoria das consultas realizadas através das stored procedures.';