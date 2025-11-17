import { Request, Response } from "express";
import { furnasPool, balcarPool, simaPool } from "../configs/db";
import { logger } from "../configs/logger";

/**
 * Controller genérico para acessar qualquer tabela via /tables/{provider}/{table}
 * Aceita query param ?colunas=col1,col2 e opcional ?idreservatorio=ID
 */
export const getData = async (req: Request, res: Response) => {
  try {
    const { provider, table } = req.params;
    const { colunas, idreservatorio } = req.query;

    // Validações básicas
    if (!/^[a-z0-9_]+$/i.test(table)) {
      return res.status(400).json({ success: false, error: "Nome de tabela inválido." });
    }

    const pool =
      provider === "furnas"
        ? furnasPool
        : provider === "balcar"
          ? balcarPool
          : provider === "sima"
            ? simaPool
            : null;

    if (!pool) {
      return res.status(400).json({ success: false, error: "Provider inválido." });
    }

    // Define as colunas a serem buscadas
    let columns = "*";
    if (colunas) {
      const colArray = (colunas as string)
        .split(",")
        .map((c) => c.trim())
        .filter(Boolean);

      if (colArray.length > 0) {
        // Escapa nomes de colunas (básico)
        columns = colArray.map((c) => `"${c}"`).join(", ");
      }
    }

    // Monta query base
    let query = `SELECT ${columns} FROM public.${table}`;
    const params: any[] = [];

    // Adiciona filtro opcional por idreservatorio
    if (idreservatorio) {
      query += ` WHERE idreservatorio = $1`;
      params.push(idreservatorio);
    }

    query += ` LIMIT 500`; // Limite de segurança

    const result = await pool.query(query, params);

    res.status(200).json({
      success: true,
      provider,
      table,
      count: result.rowCount,
      data: result.rows,
    });
  } catch (error: any) {
    logger.error("Erro ao buscar dados genéricos", {
      message: error.message,
      stack: error.stack,
    });
    res.status(500).json({ success: false, error: "Erro interno ao buscar dados." });
  }
};
