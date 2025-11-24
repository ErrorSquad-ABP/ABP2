# Stored Procedures - Sistema Limnológico INPE

## 📋 Descrição
Stored procedures para o sistema de gerenciamento de dados limnológicos do INPE.

## 🗂️ Arquivos

- `01_create_audit_table.sql` - Tabela de auditoria
- `02_sp_coletas_por_reservatorio_data.sql` - Filtro por reservatório e data
- `03_sp_estatisticas_parametro_campanha.sql` - Estatísticas por campanha
- `04_sp_parametros_por_instituicao.sql` - Relatórios por instituição
- `deploy_all_procedures.sql` - Script de deploy completo

## 🚀 Deploy

```bash
# Deploy individual
psql -d limnologia_db -f 01_create_audit_table.sql

# Deploy completo
psql -d limnologia_db -f deploy_all_procedures.sql