// server/src/controllers/data/health.controller.ts
import { Request, Response } from "express";
import { logger } from "../../configs/logger";


export const health = async (req: Request, res: Response): Promise<void> => {
  try {
    res.status(200).json({
      success: "Rota funcionando!",
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
