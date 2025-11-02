import { Router } from "express";
import {
  getAll,
  downloadCSV,
  downloadJSON,
  downloadPDF,
  //getAllSortedById,
} from "../../controllers/sima/sima.controller";

const router = Router();

router.get("/all", getAll);
router.get("/download/csv", downloadCSV);
router.get("/download/json", downloadJSON);
router.get("/download/pdf", downloadPDF);
//router.get("/allSorted", getAllSortedById);

export default router;
