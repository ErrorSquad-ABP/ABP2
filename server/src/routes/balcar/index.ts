import express from "express";
import fluxoinpe from "./fluxoinpe.routes";
import reservatorio from "./reservatorio.routes";

const router = express.Router();

router.use("/fluxoinpe", fluxoinpe);
router.use("/reservatorio", reservatorio);

export default router;
