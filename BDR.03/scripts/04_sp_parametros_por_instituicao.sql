-- BDR.03/scripts/04_sp_parametros_por_instituicao.sql
-- PROCEDURE: Listar Parâmetros Medidos por Instituição com Filtros

/**
 * @procedure sp_listar_parametros_por_instituicao
 * @objetivo: Listar todos os parâmetros medidos por uma instituição específica com múltiplos filtros
 * @uso: Relatório institucional e análise de contribuição por instituição parceira
 * @aplicacao: Dashboard institucional e relatórios de parcerias
 * 
 * @parametro p_id_instituicao: ID da instituição (ex: 1=INPE, 2=UFRJ, 3=UFJF, 4=IIE)
 * @parametro p_tipo_dado: Tipo de dado ('abiotico_coluna', 'biotico_superficie', 'fluxos', etc.)
 * @parametro p_data_inicio: Data inicial do período
 * @parametro p_data_fim: Data final do período
 * @parametro p_id_reservatorio: ID do reservatório (NULL para todos)
 * 
 * @retorno: Lista detalhada de parâmetros medidos com metadados completos
 */
CREATE OR REPLACE FUNCTION sp_listar_parametros_por_instituicao(
    p_id_instituicao INTEGER,
    p_tipo_dado VARCHAR(30) DEFAULT NULL,
    p_data_inicio DATE DEFAULT NULL,
    p_data_fim DATE DEFAULT NULL,
    p_id_reservatorio INTEGER DEFAULT NULL
)
RETURNS TABLE(
    id_registro INTEGER,
    tipo_tabela VARCHAR,
    parametro VARCHAR,
    valor DECIMAL,
    unidade_medida VARCHAR,
    data_medida DATE,
    hora_medida TIME,
    profundidade DECIMAL,
    nome_campanha VARCHAR,
    nome_sitio VARCHAR,
    nome_reservatorio VARCHAR,
    coordenadas VARCHAR,
    instituicao_responsavel VARCHAR
) 
LANGUAGE plpgsql
AS $$
BEGIN
    -- Consulta para dados abióticos de coluna
    IF p_tipo_dado IS NULL OR p_tipo_dado = 'abiotico_coluna' THEN
        RETURN QUERY
        SELECT 
            ac.idabioticocoluna::INTEGER as id_registro,
            'abiotico_coluna' as tipo_tabela,
            'DIC' as parametro,
            ac.dic as valor,
            'mg/L' as unidade_medida,
            ac.datamedida as data_medida,
            ac.horamedida as hora_medida,
            ac.profundidade as profundidade,
            camp.nrocampanha as nome_campanha,
            s.nome as nome_sitio,
            r.nome as nome_reservatorio,
            CONCAT(s.lat, ', ', s.lng) as coordenadas,
            inst.nome as instituicao_responsavel
        FROM tbabioticocoluna ac
        INNER JOIN tbcampanha camp ON ac.idcampanha = camp.idcampanha
        INNER JOIN tbsitio s ON ac.idsitio = s.idsitio
        INNER JOIN tbreservatorio r ON s.idreservatorio = r.idreservatorio
        INNER JOIN tbinstituicao inst ON camp.idinstituicao = inst.idinstituicao
        WHERE inst.idinstituicao = p_id_instituicao
        AND ac.dic IS NOT NULL
        AND (p_data_inicio IS NULL OR ac.datamedida >= p_data_inicio)
        AND (p_data_fim IS NULL OR ac.datamedida <= p_data_fim)
        AND (p_id_reservatorio IS NULL OR r.idreservatorio = p_id_reservatorio)
        
        UNION ALL
        
        SELECT 
            ac.idabioticocoluna::INTEGER as id_registro,
            'abiotico_coluna' as tipo_tabela,
            'NT' as parametro,
            ac.nt as valor,
            'mg/L' as unidade_medida,
            ac.datamedida as data_medida,
            ac.horamedida as hora_medida,
            ac.profundidade as profundidade,
            camp.nrocampanha as nome_campanha,
            s.nome as nome_sitio,
            r.nome as nome_reservatorio,
            CONCAT(s.lat, ', ', s.lng) as coordenadas,
            inst.nome as instituicao_responsavel
        FROM tbabioticocoluna ac
        INNER JOIN tbcampanha camp ON ac.idcampanha = camp.idcampanha
        INNER JOIN tbsitio s ON ac.idsitio = s.idsitio
        INNER JOIN tbreservatorio r ON s.idreservatorio = r.idreservatorio
        INNER JOIN tbinstituicao inst ON camp.idinstituicao = inst.idinstituicao
        WHERE inst.idinstituicao = p_id_instituicao
        AND ac.nt IS NOT NULL
        AND (p_data_inicio IS NULL OR ac.datamedida >= p_data_inicio)
        AND (p_data_fim IS NULL OR ac.datamedida <= p_data_fim)
        AND (p_id_reservatorio IS NULL OR r.idreservatorio = p_id_reservatorio)
        
        UNION ALL
        
        SELECT 
            ac.idabioticocoluna::INTEGER as id_registro,
            'abiotico_coluna' as tipo_tabela,
            'PT' as parametro,
            ac.pt as valor,
            'mg/L' as unidade_medida,
            ac.datamedida as data_medida,
            ac.horamedida as hora_medida,
            ac.profundidade as profundidade,
            camp.nrocampanha as nome_campanha,
            s.nome as nome_sitio,
            r.nome as nome_reservatorio,
            CONCAT(s.lat, ', ', s.lng) as coordenadas,
            inst.nome as instituicao_responsavel
        FROM tbabioticocoluna ac
        INNER JOIN tbcampanha camp ON ac.idcampanha = camp.idcampanha
        INNER JOIN tbsitio s ON ac.idsitio = s.idsitio
        INNER JOIN tbreservatorio r ON s.idreservatorio = r.idreservatorio
        INNER JOIN tbinstituicao inst ON camp.idinstituicao = inst.idinstituicao
        WHERE inst.idinstituicao = p_id_instituicao
        AND ac.pt IS NOT NULL
        AND (p_data_inicio IS NULL OR ac.datamedida >= p_data_inicio)
        AND (p_data_fim IS NULL OR ac.datamedida <= p_data_fim)
        AND (p_id_reservatorio IS NULL OR r.idreservatorio = p_id_reservatorio);
    END IF;
    
    -- Log de auditoria para consultas institucionais
    INSERT INTO tb_auditoria_consultas (tipo_consulta, parametros, data_consulta)
    VALUES (
        'parametros_por_instituicao', 
        json_build_object(
            'id_instituicao', p_id_instituicao,
            'tipo_dado', p_tipo_dado,
            'data_inicio', p_data_inicio,
            'data_fim', p_data_fim,
            'id_reservatorio', p_id_reservatorio
        ),
        NOW()
    );
END;
$$;

COMMENT ON FUNCTION sp_listar_parametros_por_instituicao IS 'Procedure para relatórios institucionais detalhados. Atende ao requisito de transparência nas parcerias.';