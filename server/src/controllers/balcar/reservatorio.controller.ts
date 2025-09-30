import { Request, Response } from "express";
import { balcarPool } from "../../configs/db";
import { logger } from "../../configs/logger";

const PAGE_SIZE = Number(process.env.PAGE_SIZE) || 10;

export const getAll = async (req: Request, res: Response): Promise<void> => {
  try {
    // consulta com paginação
    const result = await balcarPool.query(
      `
      SELECT 
        idreservatorio,
        nome,
        lat,
        lng
      FROM tbreservatorio
      `,
    );

    const resultComInstituicao = result.rows.map((item) => ({
      ...item,
      instituicao: "INPE",
    }));

    // consulta total de registros
    const countResult = await balcarPool.query("SELECT COUNT(*) FROM tbreservatorio");
    const total = Number(countResult.rows[0].count);

    res.status(200).json({
      success: true,
      total,
      data: resultComInstituicao,
    });
  } catch (error: any) {
    logger.error("Erro ao consultar tbreservatorio", {
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

    const result = await balcarPool.query(
      "SELECT idreservatorio, nome, lat, lng  FROM tbreservatorio WHERE idreservatorio = $1",
      [id],
    );

    if (result.rows.length === 0) {
      res.status(404).json({ success: false, error: "Reservatório não encontrado" });
      return;
    }

    const resultComInstituicao = result.rows.map((item) => ({
      ...item,
      instituicao: "INPE",
    }));

    res.status(200).json({ success: true, data: resultComInstituicao[0] });
  } catch (error: any) {
    console.error("Erro no getById:", error);
    logger.error("Erro ao consultar reservatório específico", {
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

    const result = await balcarPool.query(
      `
      SELECT 
        idreservatorio,
        nome,
        lat,
        lng
      FROM tbreservatorio
      LIMIT $1 OFFSET $2
      `,
      [limit, offset],
    );

    if (result.rows.length === 0) {
      res.status(404).json({ success: false, error: "Reservatório não encontrado" });
      return;
    }

    // consulta total de registros
    const countResult = await balcarPool.query("SELECT COUNT(*) FROM tbreservatorio");
    const total = Number(countResult.rows[0].count);

    const resultComInstituicao = result.rows.map((item) => ({
      ...item,
      instituicao: "INPE",
    }));

    res.status(200).json({
      success: true,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      data: resultComInstituicao,
    });
  } catch (error: any) {
    console.error("Erro no getByPage:", error);
    logger.error("Erro ao consultar reservatório por paginação", {
      message: error.message,
      stack: error.stack,
    });
    res.status(500).json({ success: false, error: "Erro ao realizar a operação." });
  }
};
