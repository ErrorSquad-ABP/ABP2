import { Router } from "express";
import { getAll, getById, getByPage } from "../../controllers/furnas/instituicao.controller";

const router = Router();

router.get("/all", getAll);

// GET instituição com paginação
router.get("/page/:pagina", getByPage);

// GET instituição específica por ID
router.get("/id/:id", getById);

export default router;
