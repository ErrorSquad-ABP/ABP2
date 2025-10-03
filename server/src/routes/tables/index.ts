import express from "express"
import balcar from "./balcar.routes";
import furnas from "./furnas.routes";
import sima from "./sima.routes";
import { getTabela } from "../../controllers/data/getTabelaFromBalcar.controller";


const router = express.Router()

router.use("/sima", sima);
router.use("/balcar", balcar);
router.use("/furnas", furnas);
router.get("/:tabela", getTabela);

export default router;
