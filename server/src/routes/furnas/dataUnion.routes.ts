import { Router } from "express";
import { getUnionData } from "../../controllers/furnas/dataUnion.controller";

const router = Router();

router.get("/union", getUnionData);

export default router;
