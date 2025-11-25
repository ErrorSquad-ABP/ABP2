import { Request, Response } from "express";
import { furnasPool } from "../../configs/db";
import { logger } from "../../configs/logger";
import Erros from "../../utils/erros.model";


const PAGE_SIZE = Number(process.env.PAGE_SIZE) || 20;

// 🔒 Tabelas permitidas
const allowedTables: Record<string, string[]> = {
  tbabioticocoluna: [
    "datamedida",
    "horamedida",
    "profundidade",
    "dic",
    "nt",
    "pt",
    "delta13c",
    "delta15n",
  ],
  tbabioticosuperficie: ["datamedida", "horamedida", "dic", "nt", "pt", "delta13c", "delta15n"],
  // Adicionar outras tabelas compatíveis aqui...
};

export const getUnionData = async (req: Request, res: Response): Promise<void> => {
  try {
    const tables = Array.isArray(req.query.tables)
      ? (req.query.tables as string[])
      : [req.query.tables as string].filter(Boolean);

    const columnsParam = (req.query.columns as string) || "";
    const startDate = req.query.startDate as string;
    const endDate = req.query.endDate as string;
    const responsavelId = req.query.responsavelId as string;
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || PAGE_SIZE;
    const offset = (page - 1) * limit;

    if (!tables.length) {
      res.status(400).json({ success: false, error: "Parâmetro 'tables[]' é obrigatório." });
      return;
    }
    if (!startDate || !endDate) {
      res
        .status(400)
        .json({ success: false, error: "Período (startDate, endDate) é obrigatório." });
      return;
    }
    if (!responsavelId) {
      res.status(400).json({ success: false, error: "Filtro 'responsavelId' é obrigatório." });
      return;
    }

    // 🔎 Validar tabelas e colunas
    const validTables = tables.filter((t) => allowedTables[t]);
    if (!validTables.length) {
      res.status(400).json({ success: false, error: "Nenhuma tabela válida fornecida." });
      return;
    }

    const requestedColumns = columnsParam ? columnsParam.split(",").map((c) => c.trim()) : [];

    // Verifica se todas as colunas estão na whitelist
    const selectColumnsByTable = validTables.map((table) => {
      const tableColumns = allowedTables[table];
      const colsToSelect = requestedColumns.length
        ? requestedColumns.filter((col) => tableColumns.includes(col))
        : tableColumns;

      if (!colsToSelect.length) {
        throw new Error(`Nenhuma coluna válida para a tabela ${table}.`);
      }

      const colsSQL = colsToSelect.map((c) => `"${c}"`).join(", ");
      return `SELECT ${colsSQL}, '${table}' AS origem 
              FROM ${table} 
              WHERE datamedida BETWEEN $1 AND $2`;
    });

    const unionSQL =
      selectColumnsByTable.join(" UNION ALL ") + ` ORDER BY datamedida DESC LIMIT $3 OFFSET $4`;

    const result = await furnasPool.query(unionSQL, [startDate, endDate, limit, offset]);

    res.status(200).json({
      success: true,
      page,
      limit,
      total: result.rowCount,
      data: result.rows,
    });
  } catch (error: any) {
    logger.error("Erro no getUnionData", { message: error.message, stack: error.stack });
    const erro : Erros = { success: false, error: "Erro ao realizar a operação." }
    res.status(500).json(erro);
  }
};

//Rota pra teste
//http://localhost:3001/furnas/data/union?tables=tbabioticocoluna&tables=tbabioticosuperficie&columns=datamedida,dic,delta15n&startDate=2003-11-18&endDate=2004-03-18&responsavelId=1302&page=1&limit=50
