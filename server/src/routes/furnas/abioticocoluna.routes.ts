import { Router } from "express";
import {
  getAll,
  downloadCSV,
  downloadJSON,
  downloadPDF,
} from "../../controllers/furnas/abioticocoluna.controller";

const router = Router();

// Rota para obter dados paginados com ordenação múltipla
router.get("/", getAll); // Agora aceita sortBy e sortOrder como query params

// Rotas de download com suporte a ordenação
router.get("/download/csv", downloadCSV);
router.get("/download/json", downloadJSON);
router.get("/download/pdf", downloadPDF);

export default router;
