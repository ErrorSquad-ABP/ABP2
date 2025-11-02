import express from "express";
import balcar from "./balcar";
import furnas from "./furnas";
import sima from "./sima";
import metadata from "./metadata";
import tables from "./tables";
import furnasRoutes from "./furnas";
import simaRoutes from "./sima";
import balcarRoutes from "./balcar";

const router = express.Router();

router.use("/balcar", balcar);
router.use("/furnas", furnas);
router.use("/sima", sima);
router.use("/metadata", metadata);
router.use("/tables", tables);
router.use("/furnas", furnasRoutes);
router.use("/sima", simaRoutes);
router.use("/balcar", balcarRoutes);

export default router;
