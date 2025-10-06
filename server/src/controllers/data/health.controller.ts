// server/src/controllers/data/health.controller.ts
import { Request, Response } from "express";

export const health = async (req: Request, res: Response): Promise<void> => {
  try {
    res.status(200).json({
      success: "Rota funcionando!",
    });
  } catch {
    // Mantemos o catch para futuras operações que possam lançar erro.
    // Se quiser logar futuramente, adicione: console.error(err);
  }
};
