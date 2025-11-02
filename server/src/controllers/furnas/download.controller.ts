import { Request, Response } from "express";
import { furnasPool } from "../../configs/db";
import { BaseDownloadController, DownloadOptions } from "../base/download.controller";

class FurnasDownloadController extends BaseDownloadController {
  constructor(tableName: string) {
    super(furnasPool, tableName);
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

// Controllers específicos para cada tabela Furnas
export const abioticocolunaDownload = new FurnasDownloadController("tbabioticocoluna");
export const abioticosuperficieDownload = new FurnasDownloadController("tbabioticosuperficie");
export const campanhaDownload = new FurnasDownloadController("tbcampanha");
export const instituicaoDownload = new FurnasDownloadController("tbinstituicao");
export const reservatorioDownload = new FurnasDownloadController("tbreservatorio");
export const sitioDownload = new FurnasDownloadController("tbsitio");

// Adicione mais controllers para outras tabelas conforme necessário
export const bioticocolunaDownload = new FurnasDownloadController("tbbioticocoluna");
export const bioticosuperficieDownload = new FurnasDownloadController("tbbioticosuperficie");
export const fluxocarbonoDownload = new FurnasDownloadController("tbfluxocarbono");
