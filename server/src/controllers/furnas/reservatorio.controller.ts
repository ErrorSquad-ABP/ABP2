import { Request, Response } from "express";
import { furnasPool } from "../../configs/db";
import { logger } from "../../configs/logger";

const PAGE_SIZE = Number(process.env.PAGE_SIZE) || 10;

export const getAll = async (req: Request, res: Response): Promise<void> => {
  try {
    // consulta com paginação
    const result = await furnasPool.query(
      `
      SELECT 
        idreservatorio,
        nome,
        lat,
        lng
      FROM tbreservatorio
      ` 
    );

    // consulta total de registros
    const countResult = await furnasPool.query("SELECT COUNT(*) FROM tbreservatorio");
    const total = Number(countResult.rows[0].count);

    res.status(200).json({
      success: true,
      total,
      data: result.rows, 
    });
  } catch (error: any) {
    logger.error("Erro ao consultar tbreservatorio", {
      message: error.message,
      stack: error.stack,
    });

    res.status(500).json({
      success: false,
      error: "Erro ao realizar a operação.",
    });
  }
};
