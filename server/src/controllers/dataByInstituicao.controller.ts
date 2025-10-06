import { Request, Response } from "express";
import { furnasPool } from "../configs/db"; // ajuste conforme seu projeto
import { logger } from "../configs/logger";

// Função principal do endpoint
export const getDataByInstituicao = async (req: Request, res: Response) => {
  try {
    const { table } = req.params;
    const { instituicao_id, start, end, columns, limit = 50, page = 1 } = req.query;

    if (!instituicao_id) {
      return res.status(400).json({ success: false, error: "instituicao_id é obrigatório" });
    }

    const offset = (Number(page) - 1) * Number(limit);

    // Colunas selecionadas
    const selectCols =
      Array.isArray(columns) && columns.length > 0 ? (columns as string[]).join(", ") : "*";

    // Monta query
    const query = `
      SELECT ${selectCols} 
      FROM ${table} 
      WHERE responsible_type = 'instituicao' AND responsible_id = $1
      ${start ? `AND date >= $2` : ""}
      ${end ? `AND date <= $3` : ""}
      ORDER BY date ASC
      LIMIT $4 OFFSET $5
    `;

    const values: any[] = [instituicao_id, start, end, Number(limit), offset].filter(
      (v) => v !== undefined,
    );

    const result = await furnasPool.query(query, values);

    // Total de registros para paginação
    const countQuery = `
      SELECT COUNT(*) AS total
      FROM ${table}
      WHERE responsible_type = 'instituicao' AND responsible_id = $1
      ${start ? `AND date >= $2` : ""}
      ${end ? `AND date <= $3` : ""}
    `;

    const countResult = await furnasPool.query(countQuery, values.slice(0, values.length - 2));
    const total = Number(countResult.rows[0].total);

    res.status(200).json({
      success: true,
      page: Number(page),
      limit: Number(limit),
      total,
      totalPages: Math.ceil(total / Number(limit)),
      data: result.rows,
    });
  } catch (error: any) {
    logger.error("Erro em GET /tables/:table/data/by-instituicao", {
      message: error.message,
      stack: error.stack,
    });
    res.status(500).json({ success: false, error: "Erro interno ao consultar dados" });
  }
};
