import { Router } from "express";
import {
  abioticocolunaDownload,
  abioticosuperficieDownload,
  campanhaDownload,
  instituicaoDownload,
  reservatorioDownload,
  sitioDownload,
  bioticocolunaDownload,
  bioticosuperficieDownload,
  fluxocarbonoDownload,
} from "../../controllers/furnas/download.controller";

const router = Router();

// Rotas de download para cada tabela
router.post("/abioticocoluna", (req, res) => abioticocolunaDownload.download(req, res));
router.post("/abioticosuperficie", (req, res) => abioticosuperficieDownload.download(req, res));
router.post("/campanha", (req, res) => campanhaDownload.download(req, res));
router.post("/instituicao", (req, res) => instituicaoDownload.download(req, res));
router.post("/reservatorio", (req, res) => reservatorioDownload.download(req, res));
router.post("/sitio", (req, res) => sitioDownload.download(req, res));
router.post("/bioticocoluna", (req, res) => bioticocolunaDownload.download(req, res));
router.post("/bioticosuperficie", (req, res) => bioticosuperficieDownload.download(req, res));
router.post("/fluxocarbono", (req, res) => fluxocarbonoDownload.download(req, res));

// Adicione mais rotas para outras tabelas

export default router;
