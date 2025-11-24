-- =====================================================================
-- BDR.01 - Consultas com JOIN
-- Aplicação Web de Dados Limnológicos - INPE
-- Objetivo: cruzar dados de múltiplas tabelas usando JOINs
-- =====================================================================


-- 1) Parâmetros coletados em cada reservatório
-- Retorna todos os parâmetros que já foram coletados para cada reservatório,
-- incluindo a data da coleta (campanha).
SELECT 
    r.nome AS reservatorio,
    p.nome_parametro,
    c.data_coleta
FROM campanha c
INNER JOIN reservatorio r ON c.id_reservatorio = r.id_reservatorio
INNER JOIN parametro p ON c.id_parametro = p.id_parametro;


-- 2) Instituições responsáveis por campanhas
-- Mostra quais instituições ficaram responsáveis por campanhas de coleta
-- em cada reservatório.
SELECT 
    i.nome AS instituicao,
    r.nome AS reservatorio,
    c.data_coleta
FROM instituicao i
INNER JOIN campanha c ON i.id_instituicao = c.id_instituicao
INNER JOIN reservatorio r ON c.id_reservatorio = r.id_reservatorio;


-- 3) Séries temporais (SIMA) vinculadas a pontos de reservatório
-- Lista dados de séries temporais (data/hora + valor) e o parâmetro medido,
-- relacionados ao reservatório onde foram coletados.
SELECT 
    r.nome AS reservatorio,
    s.data_hora,
    s.valor,
    p.nome_parametro
FROM serie_temporal s
INNER JOIN parametro p ON s.id_parametro = p.id_parametro
INNER JOIN reservatorio r ON s.id_reservatorio = r.id_reservatorio;


-- 4) Localizações de coleta (sítios) vinculadas a medições coletadas
-- Relaciona os pontos geográficos (sítios) onde ocorreram campanhas,
-- retornando latitude, longitude e o parâmetro medido.
SELECT
    st.nome_sitio,
    st.latitude,
    st.longitude,
    p.nome_parametro,
    c.data_coleta
FROM campanha c
INNER JOIN sitio st ON c.id_sitio = st.id_sitio
INNER JOIN parametro p ON c.id_parametro = p.id_parametro;


-- 5) Lista de todos os parâmetros coletados por cada instituição
-- Mostra cada instituição e todos os parâmetros que ela já coletou
-- em campanhas ao longo do tempo.
SELECT 
    i.nome AS instituicao,
    p.nome_parametro,
    COUNT(*) AS total_coletas
FROM instituicao i
INNER JOIN campanha c ON i.id_instituicao = c.id_instituicao
INNER JOIN parametro p ON c.id_parametro = p.id_parametro
GROUP BY i.nome, p.nome_parametro
ORDER BY i.nome, p.nome_parametro;