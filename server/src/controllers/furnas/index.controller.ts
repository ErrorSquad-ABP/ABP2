import { Request, Response } from "express";

export const getFurnasInfo = async (req: Request, res: Response): Promise<void> => {
  try {
    res.status(200).json({
      success: true,
      message: "API FURNAS - Sistema Integrado de Monitoramento Ambiental",
      endpoints: {
        reservatorio: "/furnas/reservatorio",
        campanha: "/furnas/campanha",
        instituicao: "/furnas/instituicao",
        sitio: "/furnas/sitio",
        data: "/furnas/data",
        abioticocoluna: "/furnas/abioticocoluna",
        abioticosuperficie: "/furnas/abioticosuperficie",
        tables: "/furnas/tables",
      },
    });
  } catch {
    res.status(500).json({
      success: false,
      error: "Erro ao realizar a operação.",
    });
  }
};
