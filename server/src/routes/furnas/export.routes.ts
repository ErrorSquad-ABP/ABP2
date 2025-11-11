import { Router } from "express";
import { exportCSV, exportJSON } from "../../controllers/furnas/export.controller";

const router = Router();

router.get("/csv", exportCSV);
router.get("/json", exportJSON);

export default router;
