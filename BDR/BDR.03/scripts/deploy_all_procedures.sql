-- BDR.03/scripts/deploy_all_procedures.sql
-- Script para deploy de todas as stored procedures em ordem

\i 01_create_audit_table.sql
\i 02_sp_coletas_por_reservatorio_data.sql
\i 03_sp_estatisticas_parametro_campanha.sql
\i 04_sp_parametros_por_instituicao.sql

-- Verificação das procedures criadas
SELECT 
    routine_name,
    routine_type,
    data_type as return_type
FROM information_schema.routines 
WHERE routine_schema = 'public'
AND routine_name LIKE 'sp_%'
ORDER BY routine_name;