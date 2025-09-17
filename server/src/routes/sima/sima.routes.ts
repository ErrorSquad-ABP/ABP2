import { Router } from "express";
import { getAll } from "../../controllers/sima/sima.controller";

const router = Router();

router.get("/all", getAll);

export default router;
