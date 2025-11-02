import { Router } from "express";
import {
  getAll,
  downloadCSV,
  downloadJSON,
  downloadPDF,
} from "../../controllers/furnas/abioticosuperficie.controller";

const router = Router();

router.get("/all", getAll);
router.get("/download/csv", downloadCSV);
router.get("/download/json", downloadJSON);
router.get("/download/pdf", downloadPDF);

export default router;
