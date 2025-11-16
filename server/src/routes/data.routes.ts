import { Router } from "express";
import { getDataByInstituicao } from "../controllers/furnas/getDataByInstituicao";
import { getDatesFromTable } from "../controllers/dataByDate.controller";
import { getData } from "../controllers/data.controller";

const router = Router();

// Endpoint atalho para consulta por instituição
router.get("/tablesbyinst/:table/data/by-instituicao", getDataByInstituicao);
router.get("/:table/datas", getDatesFromTable);
router.get("/tables/:provider/:table", getData);

export default router;
