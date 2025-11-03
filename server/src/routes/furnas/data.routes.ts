import { Router } from "express";
import { getData } from "../../controllers/furnas/data.controller";
import { getReservatorioById } from "../../controllers/furnas/dataByReservatorio.controller";
import { getDataByInstituicao } from "../../controllers/furnas/getDataByInstituicao";
console.log("getReservatorioById:", getReservatorioById); // deve aparecer: [AsyncFunction: getReservatorioById]

const router = Router();

router.get("/:table/data", getData);

router.get("/reservatorio/:id", getReservatorioById);

router.get("/:table/data/by-instituicao", getDataByInstituicao);

export default router;
