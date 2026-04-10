import express from "express";
import rateLimit from "express-rate-limit";
import balcar from "./balcar";
import furnas from "./furnas";
import sima from "./sima";
import metadata from "./metadata";
import tables from "./tables";
import { health } from "../controllers/data/health.controller";

const router = express.Router();

const tablesRateLimit = rateLimit({
  windowMs: 60_000,
  max: 120,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, error: "Muitas requisições. Tente novamente em instantes." },
});

router.get("/health", health);

router.use("/balcar", balcar);
router.use("/furnas", furnas);
router.use("/sima", sima);
router.use("/metadata", metadata);
router.use("/tables", tablesRateLimit, tables);

export default router;
