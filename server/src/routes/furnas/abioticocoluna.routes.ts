import { Router } from "express";
import {
  getAll,
  downloadCSV,
  downloadJSON,
  downloadPDF,
} from "../../controllers/furnas/abioticocoluna.controller";

const router = Router();

// Rota para obter dados paginados
router.get("/all", getAll);

// Rotas de download
router.get("/download/csv", downloadCSV);
router.get("/download/json", downloadJSON);
router.get("/download/pdf", downloadPDF);

export default router;
