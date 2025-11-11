import express from "express";
import abioticocoluna from "./abioticocoluna.routes";
import abioticosuperficie from "./abioticosuperficie.routes";
import campanha from "./campanha.routes";
import instituicao from "./instituicao.routes";
import reservatorio from "./reservatorio.routes";
import sitio from "./sitio.routes";
import data from "./data.routes";
import dataUnion from "./dataUnion.routes";
import exportRoutes from "./export.routes"; // ← Nova importação
import { getFurnasInfo } from "../../controllers/furnas/index.controller";

const router = express.Router();

// Rota raiz para /furnas
router.get("/", getFurnasInfo);

router.use("/abioticocoluna", abioticocoluna);
router.use("/abioticosuperficie", abioticosuperficie);
router.use("/campanha", campanha);
router.use("/instituicao", instituicao);
router.use("/reservatorio", reservatorio);
router.use("/sitio", sitio);
router.use("/tables", data);
router.use("/data", dataUnion);
router.use("/export", exportRoutes); // ← Nova rota de exportação

export default router;
