import { Request, Response, NextFunction } from "express";
import { logger } from "../configs/logger";

export function errorHandler(err: any, req: Request, res: Response, _next: NextFunction) {
  // Se for um erro de CORS, retorna 403 com mensagem apropriada
  if (err.message === "Not allowed by CORS") {
    logger.warn("CORS blocked", {
      origin: req.headers.origin,
      method: req.method,
      path: req.path,
    });

    return res.status(403).json({
      success: false,
      error: "Acesso negado por CORS.",
      origin: req.headers.origin,
    });
  }

  logger.error("Unhandled error", {
    message: err.message,
    stack: err.stack,
    method: req.method,
    path: req.path,
    body: req.body,
  });

  res.status(500).json({
    success: false,
    error: "Erro interno do servidor.",
  });
}
