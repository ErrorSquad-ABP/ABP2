import { Router } from "express";
import {
  simaDownload,
  simaofflineDownload,
  estacaoDownload,
  sensorDownload,
  campotabelaDownload,
} from "../../controllers/sima/download.controller";

const router = Router();

// Rotas de download básico para cada tabela
router.post("/sima", (req, res) => simaDownload.download(req, res));
router.post("/simaoffline", (req, res) => simaofflineDownload.download(req, res));
router.post("/estacao", (req, res) => estacaoDownload.download(req, res));
router.post("/sensor", (req, res) => sensorDownload.download(req, res));
router.post("/campotabela", (req, res) => campotabelaDownload.download(req, res));

// Rota especial para dados completos do SIMA com joins
router.post("/completo", (req, res) => simaDownload.downloadSimaCompleto(req, res));

// Rota para metadados das tabelas SIMA (útil para front-end)
router.get("/metadata", async (req, res) => {
  try {
    const tables = [
      {
        name: "tbsima",
        description: "Dados principais do SIMA - medições em tempo real",
        columns: [
          "idsima",
          "datamedicao",
          "horamedicao",
          "valor",
          "idestacao",
          "idsensor",
          "idcampotabela",
        ],
      },
      {
        name: "tbsimaoffline",
        description: "Dados offline do SIMA - medições históricas",
        columns: [
          "idsimaoffline",
          "datamedicao",
          "horamedicao",
          "valor",
          "idestacao",
          "idsensor",
          "idcampotabela",
        ],
      },
      {
        name: "tbestacao",
        description: "Cadastro de estações de monitoramento",
        columns: [
          "idestacao",
          "nome",
          "localizacao",
          "latitude",
          "longitude",
          "descricao",
          "data_instalacao",
        ],
      },
      {
        name: "tbsensor",
        description: "Cadastro de sensores e parâmetros medidos",
        columns: [
          "idsensor",
          "nome",
          "parametro",
          "unidade",
          "fabricante",
          "modelo",
          "data_calibracao",
        ],
      },
      {
        name: "tbcampotabela",
        description: "Metadados dos campos e tabelas",
        columns: ["idcampotabela", "nometabela", "nomecampo", "descricao", "tipo_dado", "unidade"],
      },
    ];

    res.json({
      success: true,
      data: tables,
    });
  } catch (error: any) {
    console.error("Erro ao obter metadados SIMA:", error);
    res.status(500).json({
      success: false,
      error: "Erro ao obter metadados das tabelas.",
    });
  }
});

export default router;
