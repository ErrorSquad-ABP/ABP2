import { Request, Response } from "express";
import { logger } from "../../configs/logger";
import rawData from "./rawData";


export const getDataFromTable = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = rawData[req.params.table]

    res.status(200).json({
      success: true,
      data: result
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

