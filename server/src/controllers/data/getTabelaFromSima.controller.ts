import { simaPool } from "../../configs/db";
import { Request, Response } from "express";
import { logger } from "../../configs/logger";
import { assertSimaTableAllowed, parseSimaColumnList } from "../../utils/simaPublicValidation";

const MAX_ROWS = 100_000;

export const getTabela = async (req: Request, res: Response): Promise<void> => {
  try {
    const tabelaRaw = req.params.tabela;
    const tableCheck = assertSimaTableAllowed(tabelaRaw);
    if (!tableCheck.ok) {
      res.status(400).json({ success: false, error: tableCheck.error, code: "INVALID_TABLE" });
      return;
    }
    const tabela = String(tabelaRaw).trim().toLowerCase();

    const colParse = parseSimaColumnList(req.query.colunas);
    if (!colParse.ok) {
      res.status(400).json({ success: false, error: colParse.error, code: "INVALID_COLUMNS" });
      return;
    }

    const columns = colParse.columns;

    const query = `SELECT ${columns} FROM ${tabela} LIMIT $1`;
    const result = await simaPool.query(query, [MAX_ROWS]);
    const resultData = result.rows;

    const count = await simaPool.query(`SELECT COUNT(*)::int AS c FROM ${tabela}`);

    res.status(200).json({
      success: true,
      colunas: req.query.colunas,
      count: count.rows[0],
      data: resultData,
      truncated: resultData.length >= MAX_ROWS,
    });
  } catch (error: any) {
    logger.error("Erro ao consultar tabela SIMA", {
      message: error.message,
      stack: error.stack,
    });

    res.status(500).json({
      success: false,
      error: "Erro ao realizar a operação.",
    });
  }
};
