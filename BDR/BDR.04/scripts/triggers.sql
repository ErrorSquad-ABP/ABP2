-- BDR.04/scripts/triggers.sql
-- Triggers para o Banco de Dados Limnologia_db - INPE Data Management

-- =============================================
-- TRIGGER 1: Log de Operações em Tabelas Críticas
-- =============================================

-- Objetivo: Registrar em log todas as operações de INSERT, UPDATE e DELETE na tabela tbabioticocoluna
-- Evento: INSERT, UPDATE, DELETE
-- Tabela alvo: tbabioticocoluna

-- Criação da tabela de log se não existir
CREATE TABLE IF NOT EXISTS log_operacoes_abioticos (
    id_log SERIAL PRIMARY KEY,
    tabela_afetada VARCHAR(100) NOT NULL,
    operacao VARCHAR(10) NOT NULL,
    id_registro INTEGER,
    dados_antigos JSONB,
    dados_novos JSONB,
    usuario VARCHAR(100) DEFAULT CURRENT_USER,
    data_hora TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ip_conexao VARCHAR(50)
);

-- Função para o trigger de log
CREATE OR REPLACE FUNCTION fn_log_operacoes_abioticos()
RETURNS TRIGGER AS $$
BEGIN
    IF (TG_OP = 'DELETE') THEN
        INSERT INTO log_operacoes_abioticos (
            tabela_afetada, 
            operacao, 
            id_registro, 
            dados_antigos
        ) VALUES (
            'tbabioticocoluna',
            'DELETE',
            OLD.idabioticocoluna,
            row_to_json(OLD)
        );
        RETURN OLD;
    ELSIF (TG_OP = 'UPDATE') THEN
        INSERT INTO log_operacoes_abioticos (
            tabela_afetada, 
            operacao, 
            id_registro, 
            dados_antigos,
            dados_novos
        ) VALUES (
            'tbabioticocoluna',
            'UPDATE',
            NEW.idabioticocoluna,
            row_to_json(OLD),
            row_to_json(NEW)
        );
        RETURN NEW;
    ELSIF (TG_OP = 'INSERT') THEN
        INSERT INTO log_operacoes_abioticos (
            tabela_afetada, 
            operacao, 
            id_registro, 
            dados_novos
        ) VALUES (
            'tbabioticocoluna',
            'INSERT',
            NEW.idabioticocoluna,
            row_to_json(NEW)
        );
        RETURN NEW;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Criação do trigger
DROP TRIGGER IF EXISTS trg_log_abioticos ON tbabioticocoluna;
CREATE TRIGGER trg_log_abioticos
    AFTER INSERT OR UPDATE OR DELETE ON tbabioticocoluna
    FOR EACH ROW
    EXECUTE FUNCTION fn_log_operacoes_abioticos();

-- =============================================
-- TRIGGER 2: Validação de Faixas de Parâmetros Abióticos
-- =============================================

-- Objetivo: Validar dados de entrada para garantir que parâmetros físicos-químicos estejam dentro de faixas aceitáveis
-- Evento: INSERT, UPDATE
-- Tabela alvo: tbabioticocoluna

CREATE OR REPLACE FUNCTION fn_validar_parametros_abioticos()
RETURNS TRIGGER AS $$
BEGIN
    -- Validação de pH (faixa típica em ambientes aquáticos)
    IF NEW.profundidade IS NOT NULL AND NEW.profundidade < 0 THEN
        RAISE EXCEPTION 'Profundidade não pode ser negativa. Valor informado: %', NEW.profundidade;
    END IF;
    
    -- Validação de DIC (Dissolved Inorganic Carbon) - valores típicos em mg/L
    IF NEW.dic IS NOT NULL AND (NEW.dic < 0 OR NEW.dic > 1000) THEN
        RAISE EXCEPTION 'DIC fora da faixa aceitável (0-1000 mg/L). Valor informado: %', NEW.dic;
    END IF;
    
    -- Validação de Nitrogênio Total (NT) - valores típicos em mg/L
    IF NEW.nt IS NOT NULL AND (NEW.nt < 0 OR NEW.nt > 50) THEN
        RAISE EXCEPTION 'NT fora da faixa aceitável (0-50 mg/L). Valor informado: %', NEW.nt;
    END IF;
    
    -- Validação de Fósforo Total (PT) - valores típicos em mg/L
    IF NEW.pt IS NOT NULL AND (NEW.pt < 0 OR NEW.pt > 10) THEN
        RAISE EXCEPTION 'PT fora da faixa aceitável (0-10 mg/L). Valor informado: %', NEW.pt;
    END IF;
    
    -- Validação de delta13C - valores isotópicos típicos
    IF NEW.delta13c IS NOT NULL AND (NEW.delta13c < -50 OR NEW.delta13c > 10) THEN
        RAISE EXCEPTION 'delta13C fora da faixa aceitável (-50 a +10 ‰). Valor informado: %', NEW.delta13c;
    END IF;
    
    -- Validação de delta15N - valores isotópicos típicos
    IF NEW.delta15n IS NOT NULL AND (NEW.delta15n < -10 OR NEW.delta15n > 50) THEN
        RAISE EXCEPTION 'delta15N fora da faixa aceitável (-10 a +50 ‰). Valor informado: %', NEW.delta15n;
    END IF;
    
    -- Validação de data (não pode ser futura)
    IF NEW.datamedida > CURRENT_DATE THEN
        RAISE EXCEPTION 'Data de medida não pode ser futura. Data informada: %', NEW.datamedida;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Criação do trigger
DROP TRIGGER IF EXISTS trg_validar_parametros ON tbabioticocoluna;
CREATE TRIGGER trg_validar_parametros
    BEFORE INSERT OR UPDATE ON tbabioticocoluna
    FOR EACH ROW
    EXECUTE FUNCTION fn_validar_parametros_abioticos();

-- =============================================
-- TRIGGER 3: Atualização Automática de Timestamp em Reservatórios
-- =============================================

-- Objetivo: Atualizar automaticamente a data da última medição quando novos dados são inseridos
-- Evento: INSERT, UPDATE
-- Tabela alvo: tbabioticocoluna

-- Primeiro, adicionamos a coluna de última atualização se não existir
ALTER TABLE tbreservatorio 
ADD COLUMN IF NOT EXISTS ultima_atualizacao TIMESTAMP,
ADD COLUMN IF NOT EXISTS total_medicoes INTEGER DEFAULT 0;

CREATE OR REPLACE FUNCTION fn_atualizar_ultima_medicao_reservatorio()
RETURNS TRIGGER AS $$
DECLARE
    v_idreservatorio INTEGER;
BEGIN
    -- Obter o ID do reservatório através do sítio
    SELECT r.idreservatorio INTO v_idreservatorio
    FROM tbsitio s
    INNER JOIN tbreservatorio r ON s.idreservatorio = r.idreservatorio
    WHERE s.idsitio = NEW.idsitio;
    
    IF v_idreservatorio IS NOT NULL THEN
        -- Atualizar a última atualização e incrementar o contador
        UPDATE tbreservatorio 
        SET 
            ultima_atualizacao = CURRENT_TIMESTAMP,
            total_medicoes = total_medicoes + 1
        WHERE idreservatorio = v_idreservatorio;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Criação do trigger
DROP TRIGGER IF EXISTS trg_atualizar_reservatorio ON tbabioticocoluna;
CREATE TRIGGER trg_atualizar_reservatorio
    AFTER INSERT OR UPDATE ON tbabioticocoluna
    FOR EACH ROW
    EXECUTE FUNCTION fn_atualizar_ultima_medicao_reservatorio();

-- =============================================
-- TRIGGER BÔNUS: Manutenção de Histórico de Alterações
-- =============================================

-- Objetivo: Manter histórico completo das alterações para auditoria e análise temporal
-- Evento: UPDATE, DELETE
-- Tabela alvo: tbabioticocoluna

CREATE TABLE IF NOT EXISTS historico_abioticos (
    id_historico SERIAL PRIMARY KEY,
    idabioticocoluna INTEGER NOT NULL,
    datamedida DATE,
    horamedida TIME,
    profundidade NUMERIC(10,2),
    dic NUMERIC(10,4),
    nt NUMERIC(10,4),
    pt NUMERIC(10,4),
    delta13c NUMERIC(10,4),
    delta15n NUMERIC(10,4),
    idcampanha INTEGER,
    idsitio INTEGER,
    operacao VARCHAR(10),
    usuario VARCHAR(100) DEFAULT CURRENT_USER,
    data_hora_alteracao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE OR REPLACE FUNCTION fn_manter_historico_abioticos()
RETURNS TRIGGER AS $$
BEGIN
    IF (TG_OP = 'DELETE') THEN
        INSERT INTO historico_abioticos (
            idabioticocoluna, datamedida, horamedida, profundidade,
            dic, nt, pt, delta13c, delta15n, idcampanha, idsitio, operacao
        ) VALUES (
            OLD.idabioticocoluna, OLD.datamedida, OLD.horamedida, OLD.profundidade,
            OLD.dic, OLD.nt, OLD.pt, OLD.delta13c, OLD.delta15n, OLD.idcampanha, OLD.idsitio, 'DELETE'
        );
        RETURN OLD;
    ELSIF (TG_OP = 'UPDATE') THEN
        INSERT INTO historico_abioticos (
            idabioticocoluna, datamedida, horamedida, profundidade,
            dic, nt, pt, delta13c, delta15n, idcampanha, idsitio, operacao
        ) VALUES (
            OLD.idabioticocoluna, OLD.datamedida, OLD.horamedida, OLD.profundidade,
            OLD.dic, OLD.nt, OLD.pt, OLD.delta13c, OLD.delta15n, OLD.idcampanha, OLD.idsitio, 'UPDATE'
        );
        RETURN NEW;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_historico_abioticos ON tbabioticocoluna;
CREATE TRIGGER trg_historico_abioticos
    AFTER UPDATE OR DELETE ON tbabioticocoluna
    FOR EACH ROW
    EXECUTE FUNCTION fn_manter_historico_abioticos();

-- =============================================
-- Comentários explicativos das triggers
-- =============================================

COMMENT ON TABLE log_operacoes_abioticos IS 'Tabela de log para auditoria de operações na tabela tbabioticocoluna';
COMMENT ON TABLE historico_abioticos IS 'Tabela de histórico para manter versões anteriores dos registros de parâmetros abióticos';

COMMENT ON FUNCTION fn_log_operacoes_abioticos() IS '
Função do trigger para registrar operações de INSERT, UPDATE e DELETE na tabela tbabioticocoluna.
Captura dados antigos e novos, usuário, data/hora e operação realizada.';

COMMENT ON FUNCTION fn_validar_parametros_abioticos() IS '
Função do trigger para validar dados de entrada de parâmetros abióticos.
Verifica se os valores estão dentro de faixas aceitáveis baseadas em conhecimento limnológico.
Inclui validações para: profundidade, DIC, NT, PT, delta13C, delta15N e data de medida.';

COMMENT ON FUNCTION fn_atualizar_ultima_medicao_reservatorio() IS '
Função do trigger para atualizar automaticamente a data da última medição no reservatório.
Incrementa o contador total de medições sempre que novos dados são inseridos.';

COMMENT ON FUNCTION fn_manter_historico_abioticos() IS '
Função do trigger para manter histórico completo de alterações e exclusões.
Permite auditoria detalhada e análise temporal das mudanças nos dados.';