import { simaPool } from "../../configs/db";
import { Request, Response } from "express";
import { logger } from "../../configs/logger";

export const getTabela = async (req: Request, res: Response): Promise<void> => {
  try {
    const tabela = req.params.tabela;

    const queryColumns: any = req.query.colunas;

    const columns = queryColumns ? `${queryColumns}` : "*";

    const query = `SELECT ${columns} FROM ${tabela}`;

    const result = await simaPool.query(query);
    const resultData = result.rows;

    const count = await simaPool.query(`SELECT COUNT(*) FROM ${tabela}`);

    res.status(200).json({
      success: true,
      colunas: queryColumns,
      count: count.rows[0],
      data: resultData,
    });
  } catch (error: any) {
    logger.error("Erro ao consultar tbfluxoinpe", {
      message: error.message,
      stack: error.stack,
    });

    res.status(500).json({
      success: false,
      error: "Erro ao realizar a operação.",
    });
  }
};
