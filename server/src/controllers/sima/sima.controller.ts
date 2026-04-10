import { Request, Response } from "express";
import { simaPool } from "../../configs/db";
import { logger } from "../../configs/logger";
import { getDefaultPageSize } from "../../configs/pagination";
import { parseSimaExportQuery } from "../../utils/simaPublicValidation";

const PAGE_SIZE = getDefaultPageSize();

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
      idsima: "idsima",
      idestacao: "idestacao",
      datahora: "datahora",
      tempar: "tempar",
      precipitacao: "precipitacao",
      ph: "ph",
      oxigenio: "oxigenio",
      condutividade: "condutividade",
    };

    const field = fieldMap[criteria.field] || criteria.field;
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
        idsima,
        idestacao,
        datahora,
        tempar,
        precipitacao,
        ph,
        oxigenio,
        condutividade
      FROM tbsima
    `;

    // Aplicar ordenação dinâmica
    const sortedQuery = applySortToQuery(baseQuery, sortCriteria);

    // Query final com paginação
    const finalQuery = `${sortedQuery} LIMIT $1 OFFSET $2`;

    // Executar consulta
    const result = await simaPool.query(finalQuery, [limit, offset]);

    // Consulta total de registros
    const countResult = await simaPool.query("SELECT COUNT(*) FROM tbsima");
    const total = Number(countResult.rows[0].count);

    res.status(200).json({
      success: true,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      sortBy,
      sortOrder,
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
    const q = parseSimaExportQuery(req.query as Record<string, unknown>);
    if (!q.ok) {
      res.status(400).json({ success: false, error: q.error, code: "INVALID_QUERY" });
      return;
    }
    const { startDate, endDate, stations, sortBy, sortOrder } = {
      startDate: q.data.startDate,
      endDate: q.data.endDate,
      stations: q.data.stations,
      sortBy: q.data.sortBy,
      sortOrder: q.data.sortOrder,
    };
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

    // Aplicar filtros de data
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

    // Aplicar filtro de estações
    if (stations) {
      const stationList = String(stations).split(",");
      if (stationList.length > 0) {
        paramCount++;
        query += ` AND idestacao = ANY($${paramCount})`;
        params.push(stationList);
      }
    }

    // Aplicar ordenação se fornecida
    const sortCriteria = buildOrderByClause(sortBy as string, sortOrder as string);
    if (sortCriteria.length > 0) {
      query = applySortToQuery(query, sortCriteria);
    } else {
      // Ordenação padrão
      query += " ORDER BY datahora DESC";
    }

    const result = await simaPool.query(query, params);

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
    const q = parseSimaExportQuery(req.query as Record<string, unknown>);
    if (!q.ok) {
      res.status(400).json({ success: false, error: q.error, code: "INVALID_QUERY" });
      return;
    }
    const { startDate, endDate, stations, sortBy, sortOrder } = {
      startDate: q.data.startDate,
      endDate: q.data.endDate,
      stations: q.data.stations,
      sortBy: q.data.sortBy,
      sortOrder: q.data.sortOrder,
    };

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

    // Aplicar ordenação se fornecida
    const sortCriteria = buildOrderByClause(sortBy as string, sortOrder as string);
    if (sortCriteria.length > 0) {
      query = applySortToQuery(query, sortCriteria);
    } else {
      // Ordenação padrão
      query += " ORDER BY datahora DESC";
    }

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
        sortBy,
        sortOrder,
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
    const q = parseSimaExportQuery(req.query as Record<string, unknown>);
    if (!q.ok) {
      res.status(400).json({ success: false, error: q.error, code: "INVALID_QUERY" });
      return;
    }
    const { startDate, endDate, stations, sortBy, sortOrder } = {
      startDate: q.data.startDate,
      endDate: q.data.endDate,
      stations: q.data.stations,
      sortBy: q.data.sortBy,
      sortOrder: q.data.sortOrder,
    };

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

    // Aplicar ordenação se fornecida
    const sortCriteria = buildOrderByClause(sortBy as string, sortOrder as string);
    if (sortCriteria.length > 0) {
      query = applySortToQuery(query, sortCriteria);
    } else {
      // Ordenação padrão
      query += " ORDER BY datahora DESC";
    }

    query += " LIMIT 1000"; // Limitar para PDF

    const result = await simaPool.query(query, params);

    // PDF simples em texto - para produção use uma biblioteca dedicada
    const pdfContent = `
      RELATÓRIO - Dados SIMA
      Data de exportação: ${new Date().toLocaleString("pt-BR")}
      Período: ${startDate || "Início"} à ${endDate || "Fim"}
      Ordenação: ${sortBy || "Padrão (datahora descendente)"}
      Total de registros: ${result.rows.length}
      
      ${result.rows
        .map(
          (row) =>
            `ID: ${row.idsima} | Estação: ${row.idestacao} | Data: ${row.datahora} | Temp: ${row.tempar}°C | pH: ${row.ph}`,
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

// Nova função para obter dados com joins para relatórios mais completos
export const getWithStations = async (req: Request, res: Response): Promise<void> => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || PAGE_SIZE;
    const offset = (page - 1) * limit;

    // Parâmetros de ordenação múltipla
    const sortBy = req.query.sortBy as string;
    const sortOrder = req.query.sortOrder as string;

    const sortCriteria = buildOrderByClause(sortBy, sortOrder);

    // Query base com join para estações
    let baseQuery = `
      SELECT 
        s.idsima,
        s.idestacao,
        s.datahora,
        s.tempar,
        s.precipitacao,
        s.ph,
        s.oxigenio,
        s.condutividade,
        e.nome AS estacao_nome,
        e.localizacao AS estacao_localizacao
      FROM tbsima AS s
      LEFT JOIN tbestacao AS e ON s.idestacao = e.idestacao
    `;

    // Aplicar ordenação dinâmica
    const sortedQuery = applySortToQuery(baseQuery, sortCriteria);

    // Query final com paginação
    const finalQuery = `${sortedQuery} LIMIT $1 OFFSET $2`;

    // Executar consulta
    const result = await simaPool.query(finalQuery, [limit, offset]);

    // Consulta total de registros
    const countResult = await simaPool.query("SELECT COUNT(*) FROM tbsima");
    const total = Number(countResult.rows[0].count);

    res.status(200).json({
      success: true,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      sortBy,
      sortOrder,
      data: result.rows,
    });
  } catch (error: any) {
    logger.error("Erro ao consultar tbsima com estações", {
      message: error.message,
      stack: error.stack,
    });

    res.status(500).json({
      success: false,
      error: "Erro ao realizar a operação.",
    });
  }
};
