import { Router } from "express";
import { getDataByInstituicao } from "../../controllers/furnas/getDataByInstituicao";

const router = Router();

// Endpoint atalho para consulta por instituição
router.get("/tables/:table/data/by-instituicao", getDataByInstituicao);

export default router;
