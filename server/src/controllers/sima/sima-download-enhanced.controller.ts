import { Request, Response } from "express";
import { simaPool } from "../../configs/db";
import { logger } from "../../configs/logger";

export class SimaEnhancedDownloadController {
  // Download de dados do SIMA com filtros avançados
  async downloadSimaFiltrado(req: Request, res: Response): Promise<void> {
    try {
      const { format = "csv" } = req.query;
      const {
        estacoes = [],
        sensores = [],
        parametros = [],
        dataInicio,
        dataFim,
        colunas = ["*"],
      } = req.body;

      let query = `
        SELECT 
          s.idsima,
          s.datamedicao,
          s.horamedicao,
          s.valor,
          e.nome AS estacao_nome,
          e.localizacao AS estacao_localizacao,
          e.latitude,
          e.longitude,
          sn.nome AS sensor_nome,
          sn.parametro AS sensor_parametro,
          sn.unidade AS sensor_unidade,
          ct.nometabela,
          ct.nomecampo
        FROM tbsima s
        INNER JOIN tbestacao e ON s.idestacao = e.idestacao
        INNER JOIN tbsensor sn ON s.idsensor = sn.idsensor
        LEFT JOIN tbcampotabela ct ON s.idcampotabela = ct.idcampotabela
        WHERE 1=1
      `;

      const values: any[] = [];
      let paramCount = 0;

      // Filtro por estações
      if (estacoes.length > 0) {
        const placeholders = estacoes.map((_: any, index: number) => `$${++paramCount}`).join(",");
        query += ` AND e.idestacao IN (${placeholders})`;
        values.push(...estacoes);
      }

      // Filtro por sensores
      if (sensores.length > 0) {
        const placeholders = sensores.map((_: any, index: number) => `$${++paramCount}`).join(",");
        query += ` AND sn.idsensor IN (${placeholders})`;
        values.push(...sensores);
      }

      // Filtro por parâmetros
      if (parametros.length > 0) {
        const placeholders = parametros
          .map((_: any, index: number) => `$${++paramCount}`)
          .join(",");
        query += ` AND sn.parametro IN (${placeholders})`;
        values.push(...parametros);
      }

      // Filtro por período
      if (dataInicio && dataFim) {
        query += ` AND s.datamedicao BETWEEN $${++paramCount} AND $${++paramCount}`;
        values.push(dataInicio, dataFim);
      }

      query += ` ORDER BY e.nome, sn.parametro, s.datamedicao DESC, s.horamedicao DESC`;

      const result = await simaPool.query(query, values);

      // Gerar arquivo conforme o formato
      await this.gerarArquivo(res, result.rows, format as string, "sima_filtrado");
    } catch (error: any) {
      logger.error("Erro no download filtrado do SIMA", {
        message: error.message,
        stack: error.stack,
        body: req.body,
      });

      res.status(500).json({
        success: false,
        error: "Erro ao gerar download dos dados filtrados.",
      });
    }
  }

  // Download de relatório consolidado do SIMA
  async downloadRelatorioConsolidado(req: Request, res: Response): Promise<void> {
    try {
      const { format = "csv" } = req.query;
      const { dataInicio, dataFim } = req.body;

      const query = `
        SELECT 
          e.nome AS estacao,
          sn.parametro,
          sn.unidade,
          COUNT(s.idsima) AS total_medicoes,
          MIN(s.valor) AS valor_minimo,
          MAX(s.valor) AS valor_maximo,
          AVG(s.valor) AS valor_medio,
          MIN(s.datamedicao) AS primeira_medicao,
          MAX(s.datamedicao) AS ultima_medicao
        FROM tbsima s
        INNER JOIN tbestacao e ON s.idestacao = e.idestacao
        INNER JOIN tbsensor sn ON s.idsensor = sn.idsensor
        WHERE s.datamedicao BETWEEN $1 AND $2
        GROUP BY e.nome, sn.parametro, sn.unidade
        ORDER BY e.nome, sn.parametro
      `;

      const values = [dataInicio, dataFim];
      const result = await simaPool.query(query, values);

      await this.gerarArquivo(res, result.rows, format as string, "relatorio_consolidado_sima");
    } catch (error: any) {
      logger.error("Erro no download do relatório consolidado", {
        message: error.message,
        stack: error.stack,
      });

      res.status(500).json({
        success: false,
        error: "Erro ao gerar relatório consolidado.",
      });
    }
  }

  private async gerarArquivo(
    res: Response,
    data: any[],
    format: string,
    filenameBase: string = "sima_dados",
  ): Promise<void> {
    const timestamp = Date.now();

    switch (format) {
      case "csv":
        await this.gerarCSV(res, data, `${filenameBase}_${timestamp}.csv`);
        break;
      case "json":
        await this.gerarJSON(res, data, `${filenameBase}_${timestamp}.json`);
        break;
      case "pdf":
        await this.gerarPDF(res, data, `${filenameBase}_${timestamp}.pdf`);
        break;
      default:
        throw new Error(`Formato não suportado: ${format}`);
    }
  }

  private async gerarCSV(res: Response, data: any[], filename: string): Promise<void> {
    if (data.length === 0) {
      res.setHeader("Content-Type", "text/csv");
      res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
      res.send("");
      return;
    }

    const headers = Object.keys(data[0]);
    const csvContent = [
      headers.join(","),
      ...data.map((row) =>
        headers
          .map((header) => {
            const value = row[header];
            if (value === null || value === undefined) return "";
            const stringValue = String(value);
            return stringValue.includes(",") ? `"${stringValue}"` : stringValue;
          })
          .join(","),
      ),
    ].join("\n");

    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
    res.send(csvContent);
  }

  private async gerarJSON(res: Response, data: any[], filename: string): Promise<void> {
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
    res.json({
      success: true,
      timestamp: new Date().toISOString(),
      total: data.length,
      data,
    });
  }

  private async gerarPDF(res: Response, data: any[], filename: string): Promise<void> {
    // Implementação básica de PDF - pode ser melhorada com pdfkit
    const content = this.formatarParaPDF(data);

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
    res.send(content);
  }

  private formatarParaPDF(data: any[]): string {
    const header = `
RELATÓRIO SIMA - SISTEMA INTEGRADO DE MONITORAÇÃO AMBIENTAL
Data de geração: ${new Date().toLocaleString("pt-BR")}
Total de registros: ${data.length}

================================================================================
`;

    const rows = data
      .map((row, index) => {
        return `
Registro ${index + 1}:
${Object.entries(row)
  .map(([key, value]) => `  ${key}: ${value}`)
  .join("\n")}
`;
      })
      .join("\n");

    return header + rows;
  }
}

export const simaEnhancedDownload = new SimaEnhancedDownloadController();
