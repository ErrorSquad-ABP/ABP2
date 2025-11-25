import { Request, Response } from "express";
import { furnasPool } from "../../configs/db";
import { logger } from "../../configs/logger";
import Erros from "../../utils/erros.model";


const PAGE_SIZE = Number(process.env.PAGE_SIZE) || 10;

// Interface para critérios de ordenação
interface SortCriteria {
  field: string;
  direction: "ASC" | "DESC";
}

// Função para construir cláusula ORDER BY
const buildOrderByClause = (sortBy?: string, sortOrder?: string): SortCriteria[] => {
  if (!sortBy) return [];

  const fields = sortBy.split(",");
  const orders = sortOrder ? sortOrder.split(",") : [];

  return fields.map((field, index) => ({
    field: field.trim(),
    direction: (orders[index] || "ASC").toUpperCase() as "ASC" | "DESC",
  }));
};

// Função para aplicar ordenação à query
const applySortToQuery = (baseQuery: string, sortCriteria: SortCriteria[]): string => {
  if (sortCriteria.length === 0) {
    return baseQuery;
  }

  const orderByClauses = sortCriteria.map((criteria) => {
    // Mapear campos para os nomes corretos da tabela
    const fieldMap: { [key: string]: string } = {
      datamedida: "a.datamedida",
      horamedida: "a.horamedida",
      profundidade: "a.profundidade",
      dic: "a.dic",
      nt: "a.nt",
      pt: "a.pt",
      delta13c: "a.delta13c",
      delta15n: "a.delta15n",
      nrocampanha: "b.nrocampanha",
      sitio_nome: "c.nome",
    };

    const field = fieldMap[criteria.field] || `a.${criteria.field}`;
    return `${field} ${criteria.direction}`;
  });

  return `${baseQuery} ORDER BY ${orderByClauses.join(", ")}`;
};

export const getAll = async (req: Request, res: Response): Promise<void> => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || PAGE_SIZE;
    const offset = (page - 1) * limit;

    // Parâmetros de ordenação múltipla
    const sortBy = req.query.sortBy as string;
    const sortOrder = req.query.sortOrder as string;

    const sortCriteria = buildOrderByClause(sortBy, sortOrder);

    // Query base sem ORDER BY fixo
    let baseQuery = `
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
    `;

    // Aplicar ordenação dinâmica
    const sortedQuery = applySortToQuery(baseQuery, sortCriteria);

    // Query final com paginação
    const finalQuery = `${sortedQuery} LIMIT $1 OFFSET $2`;

    // Executar consulta
    const result = await furnasPool.query(finalQuery, [limit, offset]);

    // Consulta total de registros
    const countResult = await furnasPool.query("SELECT COUNT(*) FROM tbabioticocoluna");
    const total = Number(countResult.rows[0].count);

    // Dados formatados
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
      sortBy,
      sortOrder,
      data,
    });
  } catch (error: any) {
    logger.error("Erro ao consultar tbabioticocoluna", {
      message: error.message,
      stack: error.stack,
    });

        const erro : Erros = { success: false, error: "Erro ao realizar a operação." }
    

    res.status(500).json(erro);
  }
};

export const downloadCSV = async (req: Request, res: Response): Promise<void> => {
  try {
    const { startDate, endDate, sortBy, sortOrder } = req.query;
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

    // Aplicar ordenação se fornecida
    const sortCriteria = buildOrderByClause(sortBy as string, sortOrder as string);
    if (sortCriteria.length > 0) {
      query = applySortToQuery(query, sortCriteria);
    } else {
      // Ordenação padrão
      query += " ORDER BY a.datamedida DESC, a.horamedida DESC";
    }

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
    const { startDate, endDate, sortBy, sortOrder } = req.query;

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

    // Aplicar ordenação se fornecida
    const sortCriteria = buildOrderByClause(sortBy as string, sortOrder as string);
    if (sortCriteria.length > 0) {
      query = applySortToQuery(query, sortCriteria);
    } else {
      // Ordenação padrão
      query += " ORDER BY a.datamedida DESC, a.horamedida DESC";
    }

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
        sortBy,
        sortOrder,
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
    const { startDate, endDate, sortBy, sortOrder } = req.query;

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

    // Aplicar ordenação se fornecida
    const sortCriteria = buildOrderByClause(sortBy as string, sortOrder as string);
    if (sortCriteria.length > 0) {
      query = applySortToQuery(query, sortCriteria);
    } else {
      // Ordenação padrão
      query += " ORDER BY a.datamedida DESC, a.horamedida DESC";
    }

    query += " LIMIT 1000"; // Limitar para PDF

    const result = await furnasPool.query(query, params);

    // PDF simples em texto - para produção use uma biblioteca dedicada
    const pdfContent = `
      RELATÓRIO - Dados Abióticos Coluna
      Data de exportação: ${new Date().toLocaleString("pt-BR")}
      Período: ${startDate || "Início"} à ${endDate || "Fim"}
      Ordenação: ${sortBy || "Padrão (data descendente)"}
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
