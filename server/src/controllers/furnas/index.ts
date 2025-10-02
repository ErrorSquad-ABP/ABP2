import { Router } from "express";
import mapRoutes from "./map.routes";

const router = Router();

router.use(mapRoutes);

export default router;
