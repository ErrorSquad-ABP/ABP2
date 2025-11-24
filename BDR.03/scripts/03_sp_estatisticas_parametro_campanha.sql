-- BDR.03/scripts/03_sp_estatisticas_parametro_campanha.sql
-- PROCEDURE: Calcular Estatísticas de Parâmetros por Campanha

/**
 * @procedure sp_calcular_estatisticas_parametro_campanha
 * @objetivo: Calcular estatísticas (média, mínimo, máximo) de um parâmetro específico agrupado por campanha
 * @uso: Análise comparativa entre campanhas para um parâmetro específico
 * @aplicacao: Geração de gráficos comparativos e relatórios analíticos
 * 
 * @parametro p_nome_parametro: Nome do parâmetro a ser analisado (ex: 'dic', 'nt', 'pt', 'profundidade')
 * @parametro p_id_reservatorio: ID do reservatório para filtro (NULL para todos)
 * @parametro p_data_inicio: Data inicial do período (NULL para sem filtro)
 * @parametro p_data_fim: Data final do período (NULL para sem filtro)
 * 
 * @retorno: Estatísticas agregadas por campanha com informações contextuais
 */
CREATE OR REPLACE FUNCTION sp_calcular_estatisticas_parametro_campanha(
    p_nome_parametro VARCHAR(50),
    p_id_reservatorio INTEGER DEFAULT NULL,
    p_data_inicio DATE DEFAULT NULL,
    p_data_fim DATE DEFAULT NULL
)
RETURNS TABLE(
    id_campanha INTEGER,
    nro_campanha VARCHAR,
    data_inicio_campanha DATE,
    data_fim_campanha DATE,
    nome_reservatorio VARCHAR,
    parametro VARCHAR,
    media_valor DECIMAL,
    minimo_valor DECIMAL,
    maximo_valor DECIMAL,
    total_medidas BIGINT,
    desvio_padrao DECIMAL
) 
LANGUAGE plpgsql
AS $$
DECLARE
    v_sql TEXT;
    v_where_conditions TEXT := '';
BEGIN
    -- Construir condições WHERE dinamicamente
    IF p_id_reservatorio IS NOT NULL THEN
        v_where_conditions := v_where_conditions || ' AND r.idreservatorio = ' || p_id_reservatorio;
    END IF;
    
    IF p_data_inicio IS NOT NULL THEN
        v_where_conditions := v_where_conditions || ' AND ac.datamedida >= ''' || p_data_inicio || '''';
    END IF;
    
    IF p_data_fim IS NOT NULL THEN
        v_where_conditions := v_where_conditions || ' AND ac.datamedida <= ''' || p_data_fim || '''';
    END IF;
    
    -- Construir query dinâmica baseada no parâmetro escolhido
    v_sql := '
        SELECT 
            camp.idcampanha,
            camp.nrocampanha,
            camp.datainicio as data_inicio_campanha,
            camp.datafim as data_fim_campanha,
            r.nome as nome_reservatorio,
            ''' || p_nome_parametro || ''' as parametro,
            AVG(ac.' || quote_ident(p_nome_parametro) || ') as media_valor,
            MIN(ac.' || quote_ident(p_nome_parametro) || ') as minimo_valor,
            MAX(ac.' || quote_ident(p_nome_parametro) || ') as maximo_valor,
            COUNT(ac.' || quote_ident(p_nome_parametro) || ') as total_medidas,
            STDDEV(ac.' || quote_ident(p_nome_parametro) || ') as desvio_padrao
        FROM tbabioticocoluna ac
        INNER JOIN tbcampanha camp ON ac.idcampanha = camp.idcampanha
        INNER JOIN tbsitio s ON ac.idsitio = s.idsitio
        INNER JOIN tbreservatorio r ON s.idreservatorio = r.idreservatorio
        WHERE ac.' || quote_ident(p_nome_parametro) || ' IS NOT NULL
        ' || v_where_conditions || '
        GROUP BY camp.idcampanha, camp.nrocampanha, camp.datainicio, camp.datafim, r.nome
        HAVING COUNT(ac.' || quote_ident(p_nome_parametro) || ') > 0
        ORDER BY camp.datainicio DESC, media_valor DESC';
    
    -- Executar query dinâmica
    RETURN QUERY EXECUTE v_sql;
    
    -- Log para auditoria de consultas estatísticas
    INSERT INTO tb_auditoria_consultas (tipo_consulta, parametros, data_consulta)
    VALUES (
        'estatisticas_parametro_campanha', 
        json_build_object(
            'parametro', p_nome_parametro,
            'id_reservatorio', p_id_reservatorio,
            'data_inicio', p_data_inicio,
            'data_fim', p_data_fim
        ),
        NOW()
    );
END;
$$;

COMMENT ON FUNCTION sp_calcular_estatisticas_parametro_campanha IS 'Procedure para análise estatística comparativa entre campanhas. Suporta a geração de gráficos no front-end.';