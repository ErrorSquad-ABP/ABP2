import { Request, Response } from "express";
import { furnasPool } from "../../configs/db";
import { logger } from "../../configs/logger";

const PAGE_SIZE = Number(process.env.PAGE_SIZE) || 10;

// GET todas as instituições (com paginação e filtro opcional)
export const getAll = async (req: Request, res: Response): Promise<void> => {
  try {
    // consulta com paginação
    const result = await furnasPool.query(
      `
      SELECT 
        idinstituicao,
        nome
      FROM tbinstituicao
      ` 
    );

    // consulta total de registros
    const countResult = await furnasPool.query("SELECT COUNT(*) FROM tbinstituicao");
    const total = Number(countResult.rows[0].count);

    res.status(200).json({
      success: true,
      total,
      data: result.rows, 
    });
  } catch (error: any) {
    logger.error("Erro ao consultar tbinstituicao", {
      message: error.message,
      stack: error.stack,
    });

    res.status(500).json({
      success: false,
      error: "Erro ao realizar a operação.",
    });
  }
};

// GET instituição específica por ID
export const getById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ success: false, error: "ID inválido" });
      return;
    }

    const result = await furnasPool.query(
      "SELECT idinstituicao, nome FROM tbinstituicao WHERE idinstituicao = $1",
      [id]
    );

    if (result.rows.length === 0) {
      res.status(404).json({ success: false, error: "Instituição não encontrada" });
      return;
    }

    res.status(200).json({ success: true, data: result.rows[0] });
  } catch (error: any) {
    console.error("Erro no getById:", error);
    logger.error("Erro ao consultar instituição específica", {
      message: error.message,
      stack: error.stack,
    });
    res.status(500).json({ success: false, error: "Erro ao realizar a operação." });
  }
};

export const getByPage = async (req: Request, res: Response): Promise<void> => {
  try {

    const page = Number(req.params.pagina) || 1;
    const limit = Number(req.query.limit) || PAGE_SIZE;
    const offset = (page - 1) * limit;

    if (isNaN(page)) {
      res.status(400).json({ success: false, error: "Página inválido" });
      return;
    }

    const result = await furnasPool.query(
       `
      SELECT 
        idinstituicao,
        nome
      FROM tbinstituicao
      LIMIT $1 OFFSET $2
      `,
      [limit, offset]
    );

    if (result.rows.length === 0) {
      res.status(404).json({ success: false, error: "Instituição não encontrada" });
      return;
    }

     // consulta total de registros
    const countResult = await furnasPool.query("SELECT COUNT(*) FROM tbinstituicao");
    const total = Number(countResult.rows[0].count);

     res.status(200).json({
      success: true,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      data:  result.rows
    });
  } catch (error: any) {
    console.error("Erro no getByPage:", error);
    logger.error("Erro ao consultar instituição por paginação", {
      message: error.message,
      stack: error.stack,
    });
    res.status(500).json({ success: false, error: "Erro ao realizar a operação." });
  }
};