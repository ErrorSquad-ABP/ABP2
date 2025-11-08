import express from "express";
import sima from "./sima.routes";
import simaoffline from "./simaoffline.routes";
import { getSimaInfo } from "../../controllers/sima/index.controller";

const router = express.Router();

// Rota raiz para /sima
router.get("/", getSimaInfo);

router.use("/sima", sima);
router.use("/simaoffline", simaoffline);

export default router;
