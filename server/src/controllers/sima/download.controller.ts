import { Request, Response } from "express";
import { simaPool } from "../../configs/db";
import { BaseDownloadController, DownloadOptions } from "../base/download.controller";

class SimaDownloadController extends BaseDownloadController {
  constructor(tableName: string) {
    super(simaPool, tableName);
  }

  async download(req: Request, res: Response): Promise<void> {
    const { format = "csv" } = req.query;
    const filters = req.body.filters || {};
    const columns = req.body.columns || ["*"];

    const options: DownloadOptions = {
      format: format as "csv" | "json" | "pdf",
      filters,
      columns,
    };

    await this.downloadData(res, options);
  }

  // Método específico para dados do SIMA com joins complexos
  async downloadSimaCompleto(req: Request, res: Response): Promise<void> {
    try {
      const { format = "csv" } = req.query;
      const filters = req.body.filters || {};

      // Query com joins para dados completos do SIMA
      let query = `
        SELECT 
          s.idsima,
          s.datamedicao,
          s.horamedicao,
          s.valor,
          se.nome AS estacao_nome,
          se.localizacao AS estacao_localizacao,
          sn.nome AS sensor_nome,
          sn.unidade AS sensor_unidade,
          sn.parametro AS sensor_parametro,
          ct.nometabela,
          ct.nomecampo
        FROM tbsima s
        LEFT JOIN tbestacao se ON s.idestacao = se.idestacao
        LEFT JOIN tbsensor sn ON s.idsensor = sn.idsensor
        LEFT JOIN tbcampotabela ct ON s.idcampotabela = ct.idcampotabela
      `;

      const values: any[] = [];
      const whereConditions: string[] = [];

      // Aplicar filtros específicos do SIMA
      if (filters.idestacao) {
        whereConditions.push(`s.idestacao = $${values.length + 1}`);
        values.push(filters.idestacao);
      }

      if (filters.idsensor) {
        whereConditions.push(`s.idsensor = $${values.length + 1}`);
        values.push(filters.idsensor);
      }

      if (filters.datainicio && filters.datafim) {
        whereConditions.push(
          `s.datamedicao BETWEEN $${values.length + 1} AND $${values.length + 2}`,
        );
        values.push(filters.datainicio, filters.datafim);
      }

      if (whereConditions.length > 0) {
        query += ` WHERE ${whereConditions.join(" AND ")}`;
      }

      query += ` ORDER BY s.datamedicao DESC, s.horamedicao DESC`;

      const result = await this.pool.query(query, values);

      const options: DownloadOptions = {
        format: format as "csv" | "json" | "pdf",
        filters: {},
        columns: ["*"],
      };

      // Usar o método base para exportar
      await this.downloadData(res, options);
    } catch (error: any) {
      console.error("Erro no download completo do SIMA:", error);
      res.status(500).json({
        success: false,
        error: "Erro ao gerar download dos dados SIMA.",
      });
    }
  }
}

// Controllers específicos para cada tabela SIMA
export const simaDownload = new SimaDownloadController("tbsima");
export const simaofflineDownload = new SimaDownloadController("tbsimaoffline");
export const estacaoDownload = new SimaDownloadController("tbestacao");
export const sensorDownload = new SimaDownloadController("tbsensor");
export const campotabelaDownload = new SimaDownloadController("tbcampotabela");

export default SimaDownloadController;
