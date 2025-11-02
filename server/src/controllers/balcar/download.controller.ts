import { Request, Response } from "express";
import { balcarPool } from "../../configs/db";
import { BaseDownloadController, DownloadOptions } from "../base/download.controller";

class BalcarDownloadController extends BaseDownloadController {
  constructor(tableName: string) {
    super(balcarPool, tableName);
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
}

export const fluxoinpeDownload = new BalcarDownloadController("tbfluxoinpe");
export const campanhaDownload = new BalcarDownloadController("tbcampanha");
export const instituicaoDownload = new BalcarDownloadController("tbinstituicao");
export const reservatorioDownload = new BalcarDownloadController("tbreservatorio");
export const sitioDownload = new BalcarDownloadController("tbsitio");
