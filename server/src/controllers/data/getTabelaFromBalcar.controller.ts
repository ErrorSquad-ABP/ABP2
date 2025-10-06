import { balcarPool } from "../../configs/db";
import { Request, Response } from "express";
import { logger } from "../../configs/logger";

const PAGE_SIZE = Number(process.env.PAGE_SIZE) || 10;

export const getTabela = async (req: Request, res: Response): Promise<void> => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || PAGE_SIZE;
    const offset = (page - 1) * limit;

    const tabela = req.params.tabela;

    const queryColumns: any = req.query.colunas;

    const columns = queryColumns ? `${queryColumns}` : "*";

    const query = `SELECT ${columns} FROM ${tabela} LIMIT ${limit} OFFSET ${offset}`;

    const result = await balcarPool.query(query);
    const resultData = result.rows;

    res.status(200).json({
      colunas: queryColumns,
      data: resultData,
    });
  } catch (error: any) {
    logger.error("Erro ao consultar tbfluxoinpe", {
      message: error.message,
      stack: error.stack,
    });
  }
};
