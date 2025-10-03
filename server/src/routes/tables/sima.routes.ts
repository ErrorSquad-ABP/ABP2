import { Router } from "express";
import { health } from "../../controllers/data/health.controller"
import { getTabela } from "../../controllers/data/getTabelaFromBalcar.controller";

const router = Router()

router.get("/health", health);
router.get("/:tabela", getTabela);

export default router;
