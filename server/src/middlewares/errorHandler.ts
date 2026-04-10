import { Request, Response, NextFunction } from "express";
import { logger } from "../configs/logger";
import { AppError } from "../infrastructure/http/AppError";

export function errorHandler(err: unknown, req: Request, res: Response, _next: NextFunction): void {
  if (err instanceof AppError) {
    logger.warn("Request failed", {
      message: err.message,
      code: err.code,
      statusCode: err.statusCode,
      method: req.method,
      path: req.path,
    });
    res.status(err.statusCode).json({
      success: false,
      error: err.message,
      ...(err.code ? { code: err.code } : {}),
    });
    return;
  }

  const message = err instanceof Error ? err.message : String(err);
  const stack = err instanceof Error ? err.stack : undefined;

  logger.error("Unhandled error", {
    message,
    stack,
    method: req.method,
    path: req.path,
  });

  res.status(500).json({
    success: false,
    error: "Erro interno do servidor.",
  });
}
