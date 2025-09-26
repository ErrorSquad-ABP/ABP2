import { Request, Response } from "express";
import { furnasPool } from "../../configs/db";
import { logger } from "../../configs/logger";

/**
 * GET /tables/:table/metadata
 * Retorna metadados para a UI (minDate, maxDate, totalRows, responsibles)
 *
 * Ajustado para priorizar idcampanha (que referencia tbcampanha contendo
 * idreservatorio e idinstituicao).
 */
export const getMetadata = async (req: Request, res: Response): Promise<void> => {
  const table = String(req.params.table || "").trim();

  try {
    if (!/^[a-z0-9_]+$/.test(table)) {
      res.status(400).json({ success: false, error: "Nome de tabela inválido." });
      return;
    }

    // verifica se a tabela existe
    const tableExistsResult = await furnasPool.query(
      `SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = $1 LIMIT 1`,
      [table],
    );
    if (tableExistsResult.rowCount === 0) {
      res.status(404).json({ success: false, error: "Tabela não encontrada." });
      return;
    }

    // obtém colunas da tabela
    const colsRes = await furnasPool.query(
      `SELECT column_name, data_type
       FROM information_schema.columns
       WHERE table_schema = 'public' AND table_name = $1`,
      [table],
    );
    const cols = colsRes.rows.map((r: any) => ({ name: r.column_name, type: r.data_type }));
    const columnNames = cols.map((c) => c.name.toLowerCase());

    // detecta coluna de data
    const preferredDateCols = ["datamedida", "data", "datacoleta", "datainicio", "datamedicao", "date"];
    let dateColumn: string | null = null;
    for (const candidate of preferredDateCols) {
      const found = cols.find((c) => c.name.toLowerCase() === candidate);
      if (found) {
        dateColumn = found.name;
        break;
      }
    }
    if (!dateColumn) {
      const dateTypeCols = cols.filter((c) =>
        ["date", "timestamp without time zone", "timestamp with time zone", "timestamp"].includes(c.type),
      );
      if (dateTypeCols.length > 0) dateColumn = dateTypeCols[0].name;
    }
    if (!dateColumn) {
      res.status(400).json({ success: false, error: "Nenhuma coluna de data encontrada nesta tabela." });
      return;
    }

    // calcula total e min/max date a partir da coluna detectada
    const metaQuery = `
      SELECT
        COUNT(*)::bigint AS total,
        MIN(${dateColumn})::date AS min_date,
        MAX(${dateColumn})::date AS max_date
      FROM public.${table}
    `;
    const metaRes = await furnasPool.query(metaQuery);
    const totalRows = Number(metaRes.rows[0].total || 0);
    const minDateRaw = metaRes.rows[0].min_date;
    const maxDateRaw = metaRes.rows[0].max_date;
    const formatDate = (d: any) => (d ? (d instanceof Date ? d.toISOString().slice(0, 10) : d.toString().slice(0, 10)) : null);

    const responsibles: any = {};

    // --- Se tiver idcampanha: usar campanha -> campanha tem idreservatorio e idinstituicao
    if (columnNames.includes("idcampanha")) {
      // pega campanhas referenciadas nesta tabela
      const fkCampRes = await furnasPool.query(
        `SELECT DISTINCT idcampanha FROM public.${table} WHERE idcampanha IS NOT NULL`,
      );
      const campanhaIds = fkCampRes.rows.map((r: any) => Number(r.idcampanha)).filter(Boolean);

      if (campanhaIds.length > 0) {
        // busca dados das campanhas
        const campanhasRes = await furnasPool.query(
          `SELECT idcampanha AS id, nrocampanha, datainicio::date AS datainicio, datafim::date AS datafim, idreservatorio, idinstituicao
           FROM public.tbcampanha
           WHERE idcampanha = ANY($1::bigint[])
           ORDER BY nrocampanha::int NULLS LAST, datainicio ASC`,
          [campanhaIds],
        );

        responsibles.campanha = campanhasRes.rows.map((r: any) => ({
          id: r.id,
          nrocampanha: r.nrocampanha,
          datainicio: formatDate(r.datainicio),
          datafim: formatDate(r.datafim),
          idreservatorio: r.idreservatorio,
          idinstituicao: r.idinstituicao,
        }));

        // coletar ids de reservatorio e instituicao para retornar listas únicas
        const reservatorioIds = Array.from(new Set(campanhasRes.rows.map((r: any) => r.idreservatorio).filter(Boolean)));
        const instituicaoIds = Array.from(new Set(campanhasRes.rows.map((r: any) => r.idinstituicao).filter(Boolean)));

        if (reservatorioIds.length > 0) {
          const resReserv = await furnasPool.query(
            `SELECT idreservatorio AS id, nome FROM public.tbreservatorio WHERE idreservatorio = ANY($1::bigint[])`,
            [reservatorioIds],
          );
          responsibles.reservatorio = resReserv.rows.map((r: any) => ({ id: r.id, name: r.nome }));
        } else {
          responsibles.reservatorio = [];
        }

        if (instituicaoIds.length > 0) {
          const resInst = await furnasPool.query(
            `SELECT idinstituicao AS id, nome FROM public.tbinstituicao WHERE idinstituicao = ANY($1::bigint[])`,
            [instituicaoIds],
          );
          responsibles.instituicao = resInst.rows.map((r: any) => ({ id: r.id, name: r.nome }));
        } else {
          responsibles.instituicao = [];
        }
      } else {
        responsibles.campanha = [];
        responsibles.reservatorio = [];
        responsibles.instituicao = [];
      }

      // se a tabela tiver idsitio, buscar sites também
      if (columnNames.includes("idsitio")) {
        const fkSitioRes = await furnasPool.query(
          `SELECT DISTINCT idsitio FROM public.${table} WHERE idsitio IS NOT NULL`,
        );
        const sitioIds = fkSitioRes.rows.map((r: any) => Number(r.idsitio)).filter(Boolean);
        if (sitioIds.length > 0) {
          const sitiosRes = await furnasPool.query(
            `SELECT idsitio AS id, nome, lat, lng FROM public.tbsitio WHERE idsitio = ANY($1::bigint[])`,
            [sitioIds],
          );
          responsibles.sitio = sitiosRes.rows.map((r: any) => ({
            id: r.id,
            name: r.nome,
            lat: r.lat,
            lng: r.lng,
          }));
        } else {
          responsibles.sitio = [];
        }
      } else {
        responsibles.sitio = [];
      }
    } else {
      // --- Fallback: verificar manualmente FKs (campanha, sitio, reservatorio, instituicao)
      const responsibleMap: { [key: string]: { fk: string; refTable: string; refId: string; refName: string } } = {
        campanha: { fk: "idcampanha", refTable: "tbcampanha", refId: "idcampanha", refName: "nrocampanha" },
        sitio: { fk: "idsitio", refTable: "tbsitio", refId: "idsitio", refName: "nome" },
        reservatorio: { fk: "idreservatorio", refTable: "tbreservatorio", refId: "idreservatorio", refName: "nome" },
        instituicao: { fk: "idinstituicao", refTable: "tbinstituicao", refId: "idinstituicao", refName: "nome" },
      };

      for (const [key, info] of Object.entries(responsibleMap)) {
        if (!columnNames.includes(info.fk)) {
          responsibles[key] = [];
          continue;
        }
        const fkValuesRes = await furnasPool.query(`SELECT DISTINCT ${info.fk} AS fk FROM public.${table} WHERE ${info.fk} IS NOT NULL`);
        const fkValues = fkValuesRes.rows.map((r: any) => r.fk).filter((v: any) => v != null);
        if (fkValues.length === 0) {
          responsibles[key] = [];
          continue;
        }
        const refRows = await furnasPool.query(
          `SELECT ${info.refId} AS id, ${info.refName} AS name FROM public.${info.refTable} WHERE ${info.refId} = ANY($1::bigint[])`,
          [fkValues],
        );
        responsibles[key] = refRows.rows.map((r: any) => ({ id: r.id, name: r.name }));
      }
    }

    res.status(200).json({
      success: true,
      table,
      minDate: formatDate(minDateRaw),
      maxDate: formatDate(maxDateRaw),
      responsibles,
      totalRows,
    });








    
  } catch (error: any) {
    logger.error("Erro ao obter metadata da tabela", {
      table,
      message: error.message,
      stack: error.stack,
    });
    res.status(500).json({ success: false, error: "Erro ao obter metadados da tabela." });
  }
};
