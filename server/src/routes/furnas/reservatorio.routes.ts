import { Router } from "express";
import { getAll, getByPage, getById } from "../../controllers/furnas/reservatorio.controller";

const router = Router();

router.get("/all", getAll);

// GET instituição específica por ID
router.get("/id/:id", getById);

// GET instituição com paginação
router.get("/:pagina", getByPage);

export default router;
