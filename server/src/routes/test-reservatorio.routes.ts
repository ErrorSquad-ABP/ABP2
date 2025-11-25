// server/src/routes/test-reservatorio.routes.ts
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Router } from "express";
import { validateReservatorio, batchValidate } from "../utils/reservatorioValidator";

const router = Router();

// Rota única para validação
router.post("/validate", async (req, res) => {
  try {
    const { tableName, recordId, expectedReservatorioId } = req.body;

    if (!tableName || !recordId) {
      return res.status(400).json({
        success: false,
        error: "tableName e recordId são obrigatórios",
      });
    }

    const result = await validateReservatorio(
      tableName,
      Number(recordId),
      expectedReservatorioId ? Number(expectedReservatorioId) : undefined,
    );

    res.json({
      success: true,
      tableName,
      recordId,
      expectedReservatorioId,
      ...result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Erro na validação",
    });
  }
});

// Rota para teste em lote
router.post("/batch-validate", async (req, res) => {
  try {
    const { tests } = req.body;

    if (!tests || !Array.isArray(tests)) {
      return res.status(400).json({
        success: false,
        error: "Array 'tests' é obrigatório",
      });
    }

    const results = await batchValidate(tests);

    res.json({
      success: true,
      results,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Erro na validação em lote",
    });
  }
});

export default router;
