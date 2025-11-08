import { Request, Response } from "express";
import { furnasPool } from "../../configs/db";
import { logger } from "../../configs/logger";

const PAGE_SIZE = Number(process.env.PAGE_SIZE) || 10;

export const getAll = async (req: Request, res: Response): Promise<void> => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || PAGE_SIZE;
    const offset = (page - 1) * limit;

    // consulta com joins
    const result = await furnasPool.query(
      `
      SELECT 
        a.idabioticocoluna,
        a.datamedida,
        a.horamedida,
        a.profundidade,
        a.dic,
        a.nt,
        a.pt,
        a.delta13c,
        a.delta15n,
        b.idcampanha,
        b.nrocampanha,
        c.idsitio,
        c.nome AS sitio_nome,
        c.lat AS sitio_lat,
        c.lng AS sitio_lng
      FROM tbabioticocoluna AS a
      LEFT JOIN tbcampanha AS b
        ON a.idcampanha = b.idcampanha
      LEFT JOIN tbsitio AS c
        ON a.idsitio = c.idsitio
      ORDER BY a.datamedida DESC, a.horamedida DESC
      LIMIT $1 OFFSET $2
      `,
      [limit, offset],
    );

    // consulta total de registros
    const countResult = await furnasPool.query("SELECT COUNT(*) FROM tbabioticocoluna");
    const total = Number(countResult.rows[0].count);

    // dados formatados
    const data = result.rows.map((row: any) => ({
      idabioticocoluna: row.idabioticocoluna,
      campanha: row.idcampanha
        ? {
            idcampanha: row.idcampanha,
            nrocampanha: row.nrocampanha,
          }
        : undefined,
      sitio: row.idsitio
        ? {
            idsitio: row.idsitio,
            nome: row.sitio_nome,
            lat: row.sitio_lat,
            lng: row.sitio_lng,
          }
        : undefined,
      datamedida: row.datamedida,
      horamedida: row.horamedida,
      profundidade: row.profundidade,
      dic: row.dic,
      nt: row.nt,
      pt: row.pt,
      delta13c: row.delta13c,
      delta15n: row.delta15n,
    }));

    res.status(200).json({
      success: true,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      data,
    });
  } catch (error: any) {
    logger.error("Erro ao consultar tbabioticocoluna", {
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
    const { startDate, endDate, columns: _columns, filters: _filters } = req.query;

    // Construir query base
    let query = `
      SELECT 
        a.idabioticocoluna,
        a.datamedida,
        a.horamedida,
        a.profundidade,
        a.dic,
        a.nt,
        a.pt,
        a.delta13c,
        a.delta15n,
        b.nrocampanha,
        c.nome as sitio_nome,
        c.lat as sitio_lat,
        c.lng as sitio_lng
      FROM tbabioticocoluna AS a
      LEFT JOIN tbcampanha AS b ON a.idcampanha = b.idcampanha
      LEFT JOIN tbsitio AS c ON a.idsitio = c.idsitio
      WHERE 1=1
    `;

    const params: any[] = [];
    let paramCount = 0;

    // Aplicar filtros de data
    if (startDate) {
      paramCount++;
      query += ` AND a.datamedida >= $${paramCount}`;
      params.push(startDate);
    }

    if (endDate) {
      paramCount++;
      query += ` AND a.datamedida <= $${paramCount}`;
      params.push(endDate);
    }

    // Ordenação
    query += " ORDER BY a.datamedida DESC, a.horamedida DESC";

    const result = await furnasPool.query(query, params);

    // Converter para CSV
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
      `attachment; filename="abioticocoluna_${new Date().toISOString().split("T")[0]}.csv"`,
    );
    res.status(200).send(csvContent);
  } catch (error: any) {
    logger.error("Erro ao exportar CSV tbabioticocoluna", {
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
    const { startDate, endDate } = req.query;

    let query = `
      SELECT 
        a.idabioticocoluna,
        a.datamedida,
        a.horamedida,
        a.profundidade,
        a.dic,
        a.nt,
        a.pt,
        a.delta13c,
        a.delta15n,
        b.nrocampanha,
        c.nome as sitio_nome,
        c.lat as sitio_lat,
        c.lng as sitio_lng
      FROM tbabioticocoluna AS a
      LEFT JOIN tbcampanha AS b ON a.idcampanha = b.idcampanha
      LEFT JOIN tbsitio AS c ON a.idsitio = c.idsitio
      WHERE 1=1
    `;

    const params: any[] = [];
    let paramCount = 0;

    if (startDate) {
      paramCount++;
      query += ` AND a.datamedida >= $${paramCount}`;
      params.push(startDate);
    }

    if (endDate) {
      paramCount++;
      query += ` AND a.datamedida <= $${paramCount}`;
      params.push(endDate);
    }

    query += " ORDER BY a.datamedida DESC, a.horamedida DESC";

    const result = await furnasPool.query(query, params);

    res.setHeader("Content-Type", "application/json");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="abioticocoluna_${new Date().toISOString().split("T")[0]}.json"`,
    );
    res.status(200).json({
      success: true,
      data: result.rows,
      metadata: {
        exportedAt: new Date().toISOString(),
        totalRecords: result.rows.length,
        table: "tbabioticocoluna",
      },
    });
  } catch (error: any) {
    logger.error("Erro ao exportar JSON tbabioticocoluna", {
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
    // Implementação básica de PDF - você pode usar bibliotecas como pdfkit ou puppeteer
    const { startDate, endDate } = req.query;

    let query = `
      SELECT 
        a.idabioticocoluna,
        a.datamedida,
        a.horamedida,
        a.profundidade,
        a.dic,
        a.nt,
        a.pt,
        a.delta13c,
        a.delta15n,
        b.nrocampanha,
        c.nome as sitio_nome
      FROM tbabioticocoluna AS a
      LEFT JOIN tbcampanha AS b ON a.idcampanha = b.idcampanha
      LEFT JOIN tbsitio AS c ON a.idsitio = c.idsitio
      WHERE 1=1
    `;

    const params: any[] = [];
    let paramCount = 0;

    if (startDate) {
      paramCount++;
      query += ` AND a.datamedida >= $${paramCount}`;
      params.push(startDate);
    }

    if (endDate) {
      paramCount++;
      query += ` AND a.datamedida <= $${paramCount}`;
      params.push(endDate);
    }

    query += " ORDER BY a.datamedida DESC, a.horamedida DESC LIMIT 1000"; // Limitar para PDF

    const result = await furnasPool.query(query, params);

    // PDF simples em texto - para produção use uma biblioteca dedicada
    const pdfContent = `
      RELATÓRIO - Dados Abióticos Coluna
      Data de exportação: ${new Date().toLocaleString("pt-BR")}
      Período: ${startDate || "Início"} à ${endDate || "Fim"}
      Total de registros: ${result.rows.length}
      
      ${result.rows
        .map(
          (row) =>
            `ID: ${row.idabioticocoluna} | Data: ${row.datamedida} | Profundidade: ${row.profundidade} | DIC: ${row.dic}`,
        )
        .join("\n")}
    `;

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="abioticocoluna_${new Date().toISOString().split("T")[0]}.pdf"`,
    );
    res.status(200).send(pdfContent);
  } catch (error: any) {
    logger.error("Erro ao exportar PDF tbabioticocoluna", {
      message: error.message,
      stack: error.stack,
    });

    res.status(500).json({
      success: false,
      error: "Erro ao exportar dados.",
    });
  }
};
