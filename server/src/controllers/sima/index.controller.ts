import { Request, Response } from "express";

export const getSimaInfo = async (req: Request, res: Response): Promise<void> => {
  try {
    res.status(200).json({
      success: true,
      message: "API SIMA - Sistema Integrado de Monitoramento Ambiental",
      endpoints: {
        sima: "/sima/sima",
        simaoffline: "/sima/simaoffline",
      },
    });
  } catch {
    res.status(500).json({
      success: false,
      error: "Erro ao realizar a operação.",
    });
  }
};
