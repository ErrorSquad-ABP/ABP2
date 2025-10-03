import { Router } from "express";
import { getDataFromTable } from "../../controllers/metadata/metadata.controller";

const router = Router();

router.get("/:table", getDataFromTable);

export default router;
