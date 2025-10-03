import { Router } from "express";
import getTabela from "../../controllers/data/getTabelaFromBalcar.controller";
import { health } from "../../controllers/data/health.controller"

const router = Router()

router.get("/:tabela", getTabela);
router.get("/health", health)


export default router;