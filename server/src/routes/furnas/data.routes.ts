import { Router } from "express";
import { getData } from "../../controllers/furnas/data.controller";

const router = Router();

router.get("/:table/data", getData);

export default router;