import { furnasPool } from "../../configs/db";
import { Request, Response } from "express";
import { logger } from "../../configs/logger";

export const getTabela = async (req: Request, res: Response): Promise<void> => {
  try {
    const tabela = String(req.params.tabela || "").trim();

    // Validação do nome da tabela (segurança - evita SQL injection)
    if (!tabela || !/^[a-z0-9_]+$/i.test(tabela)) {
      res.status(400).json({
        success: false,
        error: "Nome de tabela inválido.",
      });
      return;
    }

    // Verifica se a tabela existe no schema public (case-insensitive)
    const tableExistsResult = await furnasPool.query(
      `SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND LOWER(table_name) = LOWER($1) LIMIT 1`,
      [tabela],
    );

    if (tableExistsResult.rowCount === 0) {
      res.status(404).json({
        success: false,
        error: "Tabela não encontrada.",
        tabela: tabela,
      });
      return;
    }

    // Obtém o nome exato da tabela (case-sensitive)
    const exactTableName = tableExistsResult.rows[0].table_name;

    const queryColumns: any = req.query.colunas;
    let columns = "*";

    // Se colunas foram especificadas, valida se existem
    if (queryColumns) {
      const colsArray = String(queryColumns)
        .split(",")
        .map((c) => c.trim())
        .filter(Boolean);

      // Obtém colunas válidas da tabela
      const colsRes = await furnasPool.query(
        `SELECT column_name FROM information_schema.columns WHERE table_schema = 'public' AND table_name = $1`,
        [exactTableName],
      );
      const validColumns = colsRes.rows.map((r: any) => r.column_name);

      // Valida se todas as colunas solicitadas existem (case-insensitive)
      const invalidColumns = colsArray.filter((col) => {
        return !validColumns.some((validCol) => validCol.toLowerCase() === col.toLowerCase());
      });

      if (invalidColumns.length > 0) {
        res.status(400).json({
          success: false,
          error: "Colunas inválidas.",
          colunasInvalidas: invalidColumns,
          colunasValidas: validColumns,
        });
        return;
      }

      // Usa os nomes exatos das colunas
      const exactColumnNames = colsArray.map((col) => {
        const found = validColumns.find((validCol) => validCol.toLowerCase() === col.toLowerCase());
        return found || col;
      });

      columns = exactColumnNames.join(", ");
    }

    // Executa a query com o nome exato da tabela (case-sensitive)
    const query = `SELECT ${columns} FROM "${exactTableName}"`;
    const result = await furnasPool.query(query);
    const resultData = result.rows;

    const count = await furnasPool.query(`SELECT COUNT(*) FROM "${exactTableName}"`);

    res.status(200).json({
      colunas: queryColumns,
      count: count.rows[0],
      data: resultData,
    });
  } catch (error: any) {
    logger.error("Erro ao consultar tabela FURNAS", {
      message: error.message,
      stack: error.stack,
      tabela: req.params.tabela,
    });

    res.status(500).json({
      success: false,
      error: "Erro ao realizar a operação.",
      message: error.message,
    });
  }
};
