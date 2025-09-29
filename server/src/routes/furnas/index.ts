import express from "express";
import abioticocoluna from "./abioticocoluna.routes";
import campanha from "./campanha.routes";
import instituicao from "./instituicao.routes";
import reservatorio from "./reservatorio.routes";
import sitio from "./sitio.routes";
import data from "./data.routes";
import dataUnion from "./dataUnion.routes"

const router = express.Router();

router.use("/abioticocoluna", abioticocoluna);
router.use("/campanha", campanha);
router.use("/instituicao", instituicao);
router.use("/reservatorio", reservatorio);
router.use("/sitio", sitio);
router.use("/tables", data);
router.use("/data", dataUnion)

export default router;
