import { Router } from "express";
import { getTabela } from "../../controllers/data/getTabelaFromFurnas.controller";
import { health } from "../../controllers/data/health.controller";

const router = Router();

router.get("/health", health);
router.get("/:tabela", getTabela);

export default router;
