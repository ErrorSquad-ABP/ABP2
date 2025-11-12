import { Request, Response } from "express";
import { furnasPool } from "../configs/db";
import { balcarPool } from "../configs/db";
import { logger } from "../configs/logger";

// Função utilitária para formatar data no padrão DD/MM/AAAA
function formatDate(date: any): string {
  if (!date) return "";
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
}

export const getDatesFromTable = async (req: Request, res: Response) => {
  try {
    const { table } = req.params;
    if (!/^[a-z0-9_]+$/i.test(table)) {
      return res.status(400).json({ success: false, error: "Nome de tabela inválido." });
    }

    // Detecta se a tabela existe em Furnas ou Balcar
    let pool = furnasPool;
    let dbName = "furnas";

    const furnasCheck = await furnasPool.query(
      `SELECT 1 FROM information_schema.tables WHERE table_schema='public' AND table_name=$1`,
      [table],
    );

    if (furnasCheck.rowCount === 0) {
      const balcarCheck = await balcarPool.query(
        `SELECT 1 FROM information_schema.tables WHERE table_schema='public' AND table_name=$1`,
        [table],
      );

      if (balcarCheck.rowCount === 0) {
        return res.status(404).json({ success: false, error: "Tabela não encontrada." });
      } else {
        pool = balcarPool;
        dbName = "balcar";
      }
    }

    // Verifica colunas disponíveis
    const colsRes = await pool.query(
      `SELECT column_name FROM information_schema.columns WHERE table_schema='public' AND table_name=$1`,
      [table],
    );
    const columns = colsRes.rows.map((r: any) => r.column_name.toLowerCase());

    // Monta lista de colunas que podem conter datas
    const dateCols = ["datainicio", "datafim", "datamedida", "datahora"].filter((c) =>
      columns.includes(c),
    );

    if (dateCols.length === 0) {
      return res
        .status(400)
        .json({ success: false, error: "Nenhuma coluna de data encontrada nesta tabela." });
    }

    // Monta query dinâmica para buscar todas as datas dessas colunas
    const selectExpressions = dateCols.map((col) => `SELECT ${col} AS data FROM public.${table}`);
    const unionQuery = selectExpressions.join(" UNION ");

    const result = await pool.query(unionQuery);

    // Usa Set para remover repetições
    const uniqueDates = Array.from(
      new Set(result.rows.map((r: any) => formatDate(r.data)).filter(Boolean)),
    );

    res.status(200).json({
      success: true,
      origem: dbName,
      total: uniqueDates.length,
      datas: uniqueDates,
    });
  } catch (error: any) {
    logger.error("Erro ao buscar datas da tabela", { message: error.message, stack: error.stack });
    res.status(500).json({ success: false, error: "Erro interno ao buscar datas." });
  }
};
