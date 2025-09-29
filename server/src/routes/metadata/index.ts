import { Router } from "express";
import { getDataFromTable } from "../../controllers/metadata/metadata.controller";

/*
Criar rotas para devolver as colunas de determinada tabela

===============================================================

Rotas para retornar quais tabelas fazem parte de cada card

abioticos: [  <-- Card
    {
      id: "tbabioticocoluna", <-- Tabela 1
      name: "tbabioticocoluna",
      description: "Medições na coluna d'água (profundidade, DIC, delta15N, etc.)",
    },
    {
      id: "tbabioticosuperficie", <-- Tabela 2
      name: "tbabioticosuperficie",
      description: "Medições na superfície",
    },
  ],
*/

const router = Router();

router.get("/:table", getDataFromTable);

export default router;
