import { Request, Response } from "express";
import { furnasPool } from "../../configs/db";
import { logger } from "../../configs/logger";

const PAGE_SIZE = Number(process.env.PAGE_SIZE) || 10;

export const getReservatorioById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    if (!id || isNaN(Number(id))) {
      res.status(400).json({ success: false, error: "ID do reservatório inválido." });
      return;
    }

    const query = `
      SELECT 
        r.idreservatorio,
        r.nome AS reservatorio_nome,
        r.lat AS reservatorio_lat,
        r.lng AS reservatorio_lng,

        s.idsitio,
        s.nome AS sitio_nome,
        s.lat AS sitio_lat,
        s.lng AS sitio_lng,
        s.descricao AS sitio_descricao,

        c.idcampanha,
        c.nrocampanha,
        c.datainicio,
        c.datafim,

        i.idinstituicao,
        i.nome AS instituicao_nome



      FROM tbreservatorio r
      LEFT JOIN tbsitio s ON s.idreservatorio = r.idreservatorio
      LEFT JOIN tbcampanha c ON c.idreservatorio = r.idreservatorio
      LEFT JOIN tbinstituicao i ON c.idinstituicao = i.idinstituicao


      WHERE r.idreservatorio = $1
      ORDER BY c.datainicio DESC
    `;

    const result = await furnasPool.query(query, [id]);

    res.status(200).json({
      success: true,
      rows: result.rows.length,
      data: result.rows,
    });
  } catch (error: any) {
    logger.error("Erro ao buscar reservatório", {
      message: error.message,
      stack: error.stack,
    });
    res.status(500).json({ success: false, error: "Erro interno do servidor." });
  }
};
