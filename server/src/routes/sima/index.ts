import express from "express";
import sima from "./sima.routes";
import simaoffline from "./simaoffline.routes";
import download from "./download.routes";
//import downloadEnhanced from "./download-enhanced.routes";

const router = express.Router();

router.use("/sima", sima);
router.use("/simaoffline", simaoffline);
router.use("/download", download);
//router.use("/download-enhanced", downloadEnhanced);

export default router;
