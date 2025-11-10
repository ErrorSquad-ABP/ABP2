import { Request, Response } from "express";

export const getBalcarInfo = async (req: Request, res: Response): Promise<void> => {
  try {
    res.status(200).json({
      success: true,
      message: "API BALCAR - Sistema Integrado de Monitoramento Ambiental",
      endpoints: {
        fluxoinpe: "/balcar/fluxoinpe",
        reservatorio: "/balcar/reservatorio",
        campanha: "/balcar/campanha",
      },
    });
  } catch {
    res.status(500).json({
      success: false,
      error: "Erro ao realizar a operação.",
    });
  }
};
