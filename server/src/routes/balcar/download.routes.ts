import { Router } from "express";
import {
  fluxoinpeDownload,
  campanhaDownload,
  instituicaoDownload,
  reservatorioDownload,
  sitioDownload,
} from "../../controllers/balcar/download.controller";

const router = Router();

router.post("/fluxoinpe", (req, res) => fluxoinpeDownload.download(req, res));
router.post("/campanha", (req, res) => campanhaDownload.download(req, res));
router.post("/instituicao", (req, res) => instituicaoDownload.download(req, res));
router.post("/reservatorio", (req, res) => reservatorioDownload.download(req, res));
router.post("/sitio", (req, res) => sitioDownload.download(req, res));

export default router;
