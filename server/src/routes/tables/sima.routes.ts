import { Router } from "express";
import { health } from "../../controllers/data/health.controller";
import { getTabela } from "../../controllers/data/getTabelaFromSima.controller";

const router = Router();

router.get("/health", health);
router.get("/:tabela", getTabela);

export default router;
