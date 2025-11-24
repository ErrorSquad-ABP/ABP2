[19:59, 24/11/2025] Taróloga Aline: -- =====================================================================
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
-- Mostra quais instituições ficaram responsáveis…
[20:17, 24/11/2025] Taróloga Aline: Requisito BDR.02 — Funções Agrupadoras
Tema — Aplicação Web para visualização e disseminação de dados limnológicos
-> Objetivo
Aplicar funções de agregação (COUNT, SUM, AVG, MIN, MAX) combinadas com GROUP BY e HAVING, para gerar
relatórios estatísticos a partir dos dados limnológicos armazenados no banco limnologia_db.
-> Situação-problema
O INPE precisa resumir informações complexas do banco de dados para apoiar a tomada de decisão.
Por exemplo:
* Quantos parâmetros foram coletados em cada reservatório?
* Qual a média de valores de oxigênio dissolvido em cada campanha?
* Qual foi a data da primeira e da última coleta em cada reservatório?
* Quais instituições realizaram mais de X campanhas?
Essas perguntas só podem ser respondidas utilizando funções de agregaçã…
[20:37, 24/11/2025] Taróloga Aline: -- =====================================================================
-- BDR.02 - Consultas com Funções Agregadoras (GROUP BY e HAVING)
-- Aplicação Web de Dados Limnológicos - INPE
-- Objetivo: gerar estatísticas a partir dos dados do banco limnologia_db
-- =====================================================================


-- 1) Total de campanhas por reservatório
-- Conta quantas campanhas já ocorreram em cada reservatório.
SELECT 
    r.nome AS reservatorio,
    COUNT(c.id_campanha) AS total_campanhas
FROM reservatorio r
INNER JOIN campanha c ON r.id_reservatorio = c.id_reservatorio
GROUP BY r.nome
ORDER BY total_campanhas DESC;



-- 2) Média dos valores medidos por parâmetro (SIMA)
-- Calcula o valor médio medido em séries temporais para cada parâmetro.
SELECT 
    p.nome_parametro,
    AVG(s.valor) AS media_valor
FROM serie_temporal s
INNER JOIN parametro p ON s.id_parametro = p.id_parametro
GROUP BY p.nome_parametro
ORDER BY media_valor DESC;



-- 3) Instituições que realizaram mais de 5 campanhas
-- Utiliza HAVING para retornar somente instituições com grande atividade.
SELECT 
    i.nome AS instituicao,
    COUNT(c.id_campanha) AS total_campanhas
FROM instituicao i
INNER JOIN campanha c ON i.id_instituicao = c.id_instituicao
GROUP BY i.nome
HAVING COUNT(c.id_campanha) > 5
ORDER BY total_campanhas DESC;



-- 4) Primeira e última coleta registrada em cada reservatório
-- Mostra o intervalo temporal das coletas em cada reservatório.
SELECT 
    r.nome AS reservatorio,
    MIN(c.data_coleta) AS primeira_coleta,
    MAX(c.data_coleta) AS ultima_coleta
FROM reservatorio r
INNER JOIN campanha c ON r.id_reservatorio = c.id_reservatorio
GROUP BY r.nome
ORDER BY r.nome;



-- 5) Número de parâmetros diferentes coletados por instituição
-- Mostra quantos tipos distintos de parâmetros cada instituição já coletou.
SELECT 
    i.nome AS instituicao,
    COUNT(DISTINCT p.id_parametro) AS parametros_diferentes
FROM instituicao i
INNER JOIN campanha c ON i.id_instituicao = c.id_instituicao
INNER JOIN parametro p ON c.id_parametro = p.id_parametro
GROUP BY i.nome
ORDER BY parametros_diferentes DESC;