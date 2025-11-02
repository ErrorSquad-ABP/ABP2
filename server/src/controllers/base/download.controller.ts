import { Response } from "express";
import { Pool } from "pg";
import { logger } from "../../configs/logger";

export interface DownloadOptions {
  format: "csv" | "json" | "pdf";
  filters?: Record<string, any>;
  columns?: string[];
}

export class BaseDownloadController {
  protected pool: Pool;
  protected tableName: string;

  constructor(pool: Pool, tableName: string) {
    this.pool = pool;
    this.tableName = tableName;
  }

  async downloadData(res: Response, options: DownloadOptions): Promise<void> {
    try {
      const { format, filters = {}, columns = ["*"] } = options;

      // Construir query base
      let query = `SELECT ${columns.join(", ")} FROM ${this.tableName}`;
      const values: any[] = [];
      const whereConditions: string[] = [];

      // Aplicar filtros
      Object.entries(filters).forEach(([key, value], index) => {
        if (value !== undefined && value !== null && value !== "") {
          whereConditions.push(`${key} = $${index + 1}`);
          values.push(value);
        }
      });

      if (whereConditions.length > 0) {
        query += ` WHERE ${whereConditions.join(" AND ")}`;
      }

      const result = await this.pool.query(query, values);

      switch (format) {
        case "csv":
          await this.exportCSV(res, result.rows);
          break;
        case "json":
          await this.exportJSON(res, result.rows);
          break;
        case "pdf":
          await this.exportPDF(res, result.rows);
          break;
        default:
          throw new Error(`Formato não suportado: ${format}`);
      }
    } catch (error: any) {
      logger.error(`Erro no download da tabela ${this.tableName}`, {
        message: error.message,
        stack: error.stack,
        options,
      });

      res.status(500).json({
        success: false,
        error: "Erro ao gerar download dos dados.",
      });
    }
  }

  // Mude de private para protected para permitir override
  protected async exportCSV(res: Response, data: any[]): Promise<void> {
    if (data.length === 0) {
      res.setHeader("Content-Type", "text/csv");
      res.setHeader("Content-Disposition", `attachment; filename="${this.tableName}.csv"`);
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
            // Escapar valores para CSV
            if (value === null || value === undefined) return "";
            const stringValue = String(value);
            return stringValue.includes(",") ? `"${stringValue}"` : stringValue;
          })
          .join(","),
      ),
    ].join("\n");

    res.setHeader("Content-Type", "text/csv");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${this.tableName}_${Date.now()}.csv"`,
    );
    res.send(csvContent);
  }

  protected async exportJSON(res: Response, data: any[]): Promise<void> {
    res.setHeader("Content-Type", "application/json");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${this.tableName}_${Date.now()}.json"`,
    );
    res.json({
      success: true,
      table: this.tableName,
      total: data.length,
      data,
    });
  }

  protected async exportPDF(res: Response, data: any[]): Promise<void> {
    // Para PDF vamos implementar uma versão simples primeiro
    // Futuramente podemos usar bibliotecas como pdfkit
    const pdfContent = this.generateSimplePDF(data);

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${this.tableName}_${Date.now()}.pdf"`,
    );
    res.send(pdfContent);
  }

  protected generateSimplePDF(data: any[]): string {
    // Implementação básica - podemos melhorar depois com pdfkit
    const content = [
      `Relatório: ${this.tableName}`,
      `Data de geração: ${new Date().toLocaleString("pt-BR")}`,
      `Total de registros: ${data.length}`,
      "",
      "Dados:",
      JSON.stringify(data, null, 2),
    ].join("\n");

    return content;
  }
}
