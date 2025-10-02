import { Router } from "express";
import { getMapGeoJSON } from "../../controllers/furnas/map.controller";

const router = Router();

router.get("/tables/:table/map", getMapGeoJSON);

export default router;
