import { Router } from "express";
import { getAll, getAllSortedById } from "../../controllers/sima/sima.controller";

const router = Router();

router.get("/all", getAll);

router.get("/allSorted", getAllSortedById);

export default router;
