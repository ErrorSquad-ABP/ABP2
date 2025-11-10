import express from "express";
import fluxoinpe from "./fluxoinpe.routes";
import reservatorio from "./reservatorio.routes";
import { getCampaigns } from "../../controllers/balcar/campanha.controller";
import { getBalcarInfo } from "../../controllers/balcar/index.controller";

const router = express.Router();

// Rota raiz para /balcar
router.get("/", getBalcarInfo);

router.use("/fluxoinpe", fluxoinpe);
router.use("/reservatorio", reservatorio);
router.get("/campanha", getCampaigns);

export default router;
