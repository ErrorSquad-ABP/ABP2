import { Request, Response } from "express";
import { furnasPool } from "../../configs/db";
import { logger } from "../../configs/logger";
import Erros from "../../utils/erros.model";

export const getDataByInstituicao = async (req: Request, res: Response): Promise<void> => {
  try {
    const { table } = req.params;
    const { instituicao_id } = req.query;

    // validação
    if (!instituicao_id) {
      res.status(400).json({
        success: false,
        error: "O parâmetro 'instituicao_id' é obrigatório.",
      });
      return;
    }

    // segurança no nome da tabela (evita SQL injection)
    if (!/^[a-z0-9_]+$/i.test(table)) {
      res.status(400).json({
        success: false,
        error: "Nome de tabela inválido.",
      });
      return;
    }

    // verifica se a tabela existe no schema public
    const tableExists = await furnasPool.query(
      `SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = $1 LIMIT 1`,
      [table],
    );

    if (tableExists.rowCount === 0) {
      res.status(404).json({
        success: false,
        error: "Tabela não encontrada.",
      });
      return;
    }

    // verifica se existe a coluna idcampanha antes de tentar o JOIN
    const cols = await furnasPool.query(
      `SELECT column_name FROM information_schema.columns WHERE table_schema = 'public' AND table_name = $1`,
      [table],
    );

    const hasIdCampanha = cols.rows.some((r) => r.column_name === "idcampanha");

    if (!hasIdCampanha) {
      res.status(400).json({
        success: false,
        error: `A tabela '${table}' não possui a coluna 'idcampanha', necessária para o relacionamento.`,
      });
      return;
    }

    // consulta principal
    const query = `
      SELECT t.*
      FROM public.${table} AS t
      INNER JOIN public.tbcampanha AS c ON c.idcampanha = t.idcampanha
      WHERE c.idinstituicao = $1
      LIMIT 200
    `;

    const result = await furnasPool.query(query, [instituicao_id]);

    res.status(200).json({
      success: true,
      count: result.rowCount,
      data: result.rows,
    });
  } catch (error: any) {
    logger.error("Erro ao buscar dados por instituição", {
      message: error.message,
      stack: error.stack,
    });

    const erro: Erros = { success: false, error: "Erro ao realizar a operação." };

    res.status(500).json(erro);
  }
};
