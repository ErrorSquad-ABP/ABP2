import { Request, Response } from "express";
import { balcarPool } from "../../configs/db";
import { logger } from "../../configs/logger";

export const getCampaigns = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await balcarPool.query(
      `
      SELECT 
        idcampanha,
        idreservatorio,
        idinstituicao,
        nrocampanha,
        datainicio,
        datafim
      FROM tbcampanha
      ORDER BY idcampanha
      `,
    );

    res.status(200).json({
      success: true,
      data: result.rows,
    });
  } catch (error: any) {
    logger.error("Erro ao consultar campanhas do Balcar", {
      message: error.message,
      stack: error.stack,
    });

    res.status(500).json({
      success: false,
      error: "Erro ao realizar a operação.",
    });
  }
};
