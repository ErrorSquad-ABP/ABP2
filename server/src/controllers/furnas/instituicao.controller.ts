import { Request, Response } from "express";
import { furnasPool } from "../../configs/db";
import { logger } from "../../configs/logger";

const PAGE_SIZE = Number(process.env.PAGE_SIZE) || 10;

// GET todas as instituições (com paginação e filtro opcional)
export const getAll = async (req: Request, res: Response): Promise<void> => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || PAGE_SIZE;
    const offset = (page - 1) * limit;
    const { nome } = req.query;

    const conditions: string[] = [];
    const values: any[] = [];

    if (nome) {
      values.push(`%${nome}%`);
      conditions.push(`nome ILIKE $${values.length}`);
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

    const query = `
      SELECT 
        idinstituicao,
        nome
      FROM tbinstituicao
      ${whereClause}
      ORDER BY nome
      LIMIT $${values.length + 1} OFFSET $${values.length + 2}
    `;

    values.push(limit, offset);

    const result = await furnasPool.query(query, values);

    const countQuery = `
      SELECT COUNT(*) as total
      FROM tbinstituicao
      ${whereClause}
    `;
    const countResult = await furnasPool.query(countQuery, values.slice(0, values.length - 2));
    const total = Number(countResult.rows[0].total);

    res.status(200).json({
      success: true,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      data: result.rows,
    });
  } catch (error: any) {
    console.error("Erro no getAll:", error);
    logger.error("Erro ao consultar tbinstituicao", {
      message: error.message,
      stack: error.stack,
    });
    res.status(500).json({ success: false, error: "Erro ao realizar a operação." });
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
