import { Request, Response } from "express";
import { simaPool } from "../../configs/db";
import { logger } from "../../configs/logger";

const PAGE_SIZE = Number(process.env.PAGE_SIZE) || 10;

export const getAll = async (req: Request, res: Response): Promise<void> => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || PAGE_SIZE;
    const offset = (page - 1) * limit;

    const result = await simaPool.query(
      `
      SELECT 
        idsima,
        idestacao,
        datahora,
        tempar,
        precipitacao,
        ph,
        oxigenio,
        condutividade
      FROM tbsima
      ORDER BY datahora DESC
      LIMIT $1 OFFSET $2
      `,
      [limit, offset],
    );

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

export const downloadCSV = async (req: Request, res: Response): Promise<void> => {
  try {
    const { startDate, endDate, stations, columns: _columns } = req.query;

    let query = `
      SELECT 
        idsima,
        idestacao,
        datahora,
        tempar,
        precipitacao,
        ph,
        oxigenio,
        condutividade
      FROM tbsima
      WHERE 1=1
    `;

    const params: any[] = [];
    let paramCount = 0;

    if (startDate) {
      paramCount++;
      query += ` AND datahora >= $${paramCount}`;
      params.push(startDate);
    }

    if (endDate) {
      paramCount++;
      query += ` AND datahora <= $${paramCount}`;
      params.push(endDate);
    }

    if (stations) {
      const stationList = String(stations).split(",");
      if (stationList.length > 0) {
        paramCount++;
        query += ` AND idestacao = ANY($${paramCount})`;
        params.push(stationList);
      }
    }

    query += " ORDER BY datahora DESC";

    const result = await simaPool.query(query, params);

    const headers = Object.keys(result.rows[0] || {}).join(",");
    const csvRows = result.rows.map((row) =>
      Object.values(row)
        .map((value) => `"${String(value).replace(/"/g, '""')}"`)
        .join(","),
    );

    const csvContent = [headers, ...csvRows].join("\n");

    res.setHeader("Content-Type", "text/csv");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="sima_${new Date().toISOString().split("T")[0]}.csv"`,
    );
    res.status(200).send(csvContent);
  } catch (error: any) {
    logger.error("Erro ao exportar CSV tbsima", {
      message: error.message,
      stack: error.stack,
    });

    res.status(500).json({
      success: false,
      error: "Erro ao exportar dados.",
    });
  }
};

export const downloadJSON = async (req: Request, res: Response): Promise<void> => {
  try {
    const { startDate, endDate, stations } = req.query;

    let query = `
      SELECT 
        idsima,
        idestacao,
        datahora,
        tempar,
        precipitacao,
        ph,
        oxigenio,
        condutividade
      FROM tbsima
      WHERE 1=1
    `;

    const params: any[] = [];
    let paramCount = 0;

    if (startDate) {
      paramCount++;
      query += ` AND datahora >= $${paramCount}`;
      params.push(startDate);
    }

    if (endDate) {
      paramCount++;
      query += ` AND datahora <= $${paramCount}`;
      params.push(endDate);
    }

    if (stations) {
      const stationList = String(stations).split(",");
      if (stationList.length > 0) {
        paramCount++;
        query += ` AND idestacao = ANY($${paramCount})`;
        params.push(stationList);
      }
    }

    query += " ORDER BY datahora DESC";

    const result = await simaPool.query(query, params);

    res.setHeader("Content-Type", "application/json");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="sima_${new Date().toISOString().split("T")[0]}.json"`,
    );
    res.status(200).json({
      success: true,
      data: result.rows,
      metadata: {
        exportedAt: new Date().toISOString(),
        totalRecords: result.rows.length,
        table: "tbsima",
      },
    });
  } catch (error: any) {
    logger.error("Erro ao exportar JSON tbsima", {
      message: error.message,
      stack: error.stack,
    });

    res.status(500).json({
      success: false,
      error: "Erro ao exportar dados.",
    });
  }
};

export const downloadPDF = async (req: Request, res: Response): Promise<void> => {
  try {
    const { startDate, endDate } = req.query;

    let query = `
      SELECT 
        idsima,
        idestacao,
        datahora,
        tempar,
        precipitacao,
        ph,
        oxigenio,
        condutividade
      FROM tbsima
      WHERE 1=1
    `;

    const params: any[] = [];
    let paramCount = 0;

    if (startDate) {
      paramCount++;
      query += ` AND datahora >= $${paramCount}`;
      params.push(startDate);
    }

    if (endDate) {
      paramCount++;
      query += ` AND datahora <= $${paramCount}`;
      params.push(endDate);
    }

    query += " ORDER BY datahora DESC LIMIT 1000";

    const result = await simaPool.query(query, params);

    const pdfContent = `
      RELATÓRIO - Dados SIMA
      Data de exportação: ${new Date().toLocaleString("pt-BR")}
      Período: ${startDate || "Início"} à ${endDate || "Fim"}
      Total de registros: ${result.rows.length}
      
      ${result.rows
        .map(
          (row) =>
            `ID: ${row.idsima} | Estação: ${row.idestacao} | Data: ${row.datahora} | Temp: ${row.tempar}°C`,
        )
        .join("\n")}
    `;

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="sima_${new Date().toISOString().split("T")[0]}.pdf"`,
    );
    res.status(200).send(pdfContent);
  } catch (error: any) {
    logger.error("Erro ao exportar PDF tbsima", {
      message: error.message,
      stack: error.stack,
    });

    res.status(500).json({
      success: false,
      error: "Erro ao exportar dados.",
    });
  }
};
