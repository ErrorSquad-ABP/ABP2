import { Router } from "express";
import { getAll, getById } from "../../controllers/furnas/instituicao.controller";

const router = Router();

router.get("/all", getAll);

// GET instituição específica por ID
router.get("/:id", getById);

export default router;
