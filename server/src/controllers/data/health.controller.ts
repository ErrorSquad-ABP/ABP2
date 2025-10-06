import { Request, Response } from "express";

export const health = async (req: Request, res: Response): Promise<void> => {
  try {
    res.status(200).json({
      success: "Rota funcionando!",
    });
  } catch (_err) {
    // Se quiser logar futuramente:
    // console.error(_err);
    // Mantemos o catch para caso alguma operação futura lance erro.
  }
};
