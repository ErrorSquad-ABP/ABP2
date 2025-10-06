import { Request, Response } from "express";
import { simaPool } from "../../configs/db";
import { logger } from "../../configs/logger";
import { recursiveSort } from "../../utils/recursiveSort";

const PAGE_SIZE = Number(process.env.PAGE_SIZE) || 10;

export const getAll = async (req: Request, res: Response): Promise<void> => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || PAGE_SIZE;
    const offset = (page - 1) * limit;

    // consulta com paginação
    const result = await simaPool.query(
      `
      SELECT 
        idsima,
        idestacao,
        datahora,
        regno,
        nofsamples,
        proamag,
        dirvt,
        intensvt,
        u_vel,
        v_vel,
        tempag1,
        tempag2,
        tempag3,
        tempag4,
        tempar,
        ur,
        tempar_r,
        pressatm,
        radincid,
        radrefl,
        bateria,
        sonda_temp,
        sonda_cond,
        sonda_DOsat,
        sonda_DO,
        sonda_pH,
        sonda_NH4,
        sonda_NO3,
        sonda_turb,
        sonda_chl,
        sonda_bateria,
        corr_norte,
        corr_leste,
        co2_low,
        co2_high,
        precipitacao
      FROM tbsima
      ORDER BY datahora DESC
      LIMIT $1 OFFSET $2
      `,
      [limit, offset],
    );

    // total de registros
    const countResult = await simaPool.query("SELECT COUNT(*) FROM tbsima");
    const total = Number(countResult.rows[0].count);

    res.status(200).json({
      success: true,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      data: result.rows,
    });
  } catch (error: any) {
    logger.error("Erro ao consultar tbsima", {
      message: error.message,
      stack: error.stack,
    });

    res.status(500).json({
      success: false,
      error: "Erro ao realizar a operação.",
    });
  }
};

export const getAllSortedById = async (req: Request, res: Response): Promise<void> => {
  try {
    // limita a 10 registros por página
    const limit = 440018;
    const page = Number(req.query.page) || 1;
    const offset = (page - 1) * limit;

    // consulta apenas as colunas essenciais
    const result = await simaPool.query(
      `
      SELECT idsima, datahora
      FROM tbsima
      ORDER BY idsima DESC
      LIMIT $1 OFFSET $2
      `,
      [limit, offset],
    );

    // aplica a ordenação recursiva (mesmo com limit)
    const sortedData = recursiveSort(
      result.rows.map((r: { idsima: any }) => ({ ...r, idsima: Number(r.idsima) })),
      "idsima",
    );

    res.status(200).json({
      success: true,
      page,
      limit,
      total: result.rows.length,
      data: sortedData,
    });
  } catch (error: any) {
    logger.error("Erro ao consultar tbsima (sorted route)", {
      message: error.message,
      stack: error.stack,
    });

    res.status(500).json({
      success: false,
      error: "Erro ao realizar a operação.",
    });
  }
};
