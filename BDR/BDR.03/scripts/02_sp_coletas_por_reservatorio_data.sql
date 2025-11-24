-- BDR.03/scripts/02_sp_coletas_por_reservatorio_data.sql
-- PROCEDURE: Listar Coletas por Reservatório em Intervalo de Datas

/**
 * @procedure sp_listar_coletas_por_reservatorio_data
 * @objetivo: Listar todas as coletas de dados abióticos de coluna para um reservatório específico dentro de um intervalo de datas
 * @uso: Filtragem básica de dados por reservatório e período temporal
 * @aplicacao: Interface de filtros do sistema web
 * 
 * @parametro p_id_reservatorio: ID do reservatório (ex: 1 para Furnas, 2 para Balcar)
 * @parametro p_data_inicio: Data inicial do período (YYYY-MM-DD)
 * @parametro p_data_fim: Data final do período (YYYY-MM-DD)
 * @parametro p_limit: Limite de registros (para paginação)
 * @parametro p_offset: Offset para paginação
 * 
 * @retorno: Conjunto de dados com informações completas das coletas filtradas
 */
CREATE OR REPLACE FUNCTION sp_listar_coletas_por_reservatorio_data(
    p_id_reservatorio INTEGER,
    p_data_inicio DATE,
    p_data_fim DATE,
    p_limit INTEGER DEFAULT 100,
    p_offset INTEGER DEFAULT 0
)
RETURNS TABLE(
    id_coleta INTEGER,
    data_medida DATE,
    hora_medida TIME,
    profundidade DECIMAL,
    dic DECIMAL,
    nt DECIMAL,
    pt DECIMAL,
    delta13c DECIMAL,
    delta15n DECIMAL,
    id_campanha INTEGER,
    nro_campanha VARCHAR,
    id_sitio INTEGER,
    nome_sitio VARCHAR,
    lat_sitio DECIMAL,
    lng_sitio DECIMAL,
    total_registros BIGINT
) 
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    WITH total_cte AS (
        SELECT COUNT(*) as total
        FROM tbabioticocoluna ac
        INNER JOIN tbsitio s ON ac.idsitio = s.idsitio
        INNER JOIN tbcampanha camp ON ac.idcampanha = camp.idcampanha
        WHERE s.idreservatorio = p_id_reservatorio
        AND ac.datamedida BETWEEN p_data_inicio AND p_data_fim
    )
    SELECT 
        ac.idabioticocoluna,
        ac.datamedida,
        ac.horamedida,
        ac.profundidade,
        ac.dic,
        ac.nt,
        ac.pt,
        ac.delta13c,
        ac.delta15n,
        camp.idcampanha,
        camp.nrocampanha,
        s.idsitio,
        s.nome,
        s.lat,
        s.lng,
        (SELECT total FROM total_cte) as total_registros
    FROM tbabioticocoluna ac
    INNER JOIN tbsitio s ON ac.idsitio = s.idsitio
    INNER JOIN tbcampanha camp ON ac.idcampanha = camp.idcampanha
    WHERE s.idreservatorio = p_id_reservatorio
    AND ac.datamedida BETWEEN p_data_inicio AND p_data_fim
    ORDER BY ac.datamedida DESC, ac.horamedida DESC
    LIMIT p_limit
    OFFSET p_offset;
    
    -- Log de auditoria
    INSERT INTO tb_auditoria_consultas (tipo_consulta, parametros, data_consulta)
    VALUES (
        'coletas_por_reservatorio_data', 
        json_build_object(
            'id_reservatorio', p_id_reservatorio,
            'data_inicio', p_data_inicio,
            'data_fim', p_data_fim,
            'limit', p_limit,
            'offset', p_offset
        ),
        NOW()
    );
END;
$$;

COMMENT ON FUNCTION sp_listar_coletas_por_reservatorio_data IS 'Procedure para filtragem básica de dados por reservatório e período. Essencial para a funcionalidade principal do sistema web.';