import express from "express"
import balcar from "./balcar.routes";
import furnas from "./furnas.routes";
import sima from "./sima.routes";


const router = express.Router()

router.use("/sima", sima)
router.use("/balcar", balcar)
// router.use("/furnas", furnas)

export default router