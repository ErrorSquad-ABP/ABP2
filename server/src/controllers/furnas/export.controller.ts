import { Request, Response } from "express";
import { logger } from "../../configs/logger";
import Erros from "../../utils/erros.model";


export const exportCSV = async (req: Request, res: Response): Promise<void> => {
  try {
    const { table } = req.query;

    // Dados aleatórios para demonstração
    const randomData = [
      {
        id: 1,
        nome: "Amostra A",
        valor: Math.random() * 100,
        data: new Date().toISOString().split("T")[0],
      },
      {
        id: 2,
        nome: "Amostra B",
        valor: Math.random() * 100,
        data: new Date().toISOString().split("T")[0],
      },
      {
        id: 3,
        nome: "Amostra C",
        valor: Math.random() * 100,
        data: new Date().toISOString().split("T")[0],
      },
      {
        id: 4,
        nome: "Amostra D",
        valor: Math.random() * 100,
        data: new Date().toISOString().split("T")[0],
      },
      {
        id: 5,
        nome: "Amostra E",
        valor: Math.random() * 100,
        data: new Date().toISOString().split("T")[0],
      },
    ];

    // Converter para CSV
    const headers = "ID,Nome,Valor,Data\n";
    const csvRows = randomData
      .map((item) => `${item.id},${item.nome},${item.valor.toFixed(2)},${item.data}`)
      .join("\n");

    const csvContent = headers + csvRows;

    // Configurar headers para download
    res.setHeader("Content-Type", "text/csv");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="export_${table || "data"}_${Date.now()}.csv"`,
    );

    res.status(200).send(csvContent);

    logger.info("Exportação CSV realizada com sucesso", {
      table: table || "random",
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    logger.error("Erro na exportação CSV", {
      message: error.message,
      stack: error.stack,
    });

    const erro : Erros = { success: false, error: "Erro ao realizar a operação." }

    res.status(500).json(erro);
  }
};

export const exportJSON = async (req: Request, res: Response): Promise<void> => {
  try {
    const { table } = req.query;

    // Dados aleatórios para demonstração
    const randomData = [
      {
        id: 1,
        nome: "Amostra A",
        valor: Math.random() * 100,
        data: new Date().toISOString().split("T")[0],
      },
      {
        id: 2,
        nome: "Amostra B",
        valor: Math.random() * 100,
        data: new Date().toISOString().split("T")[0],
      },
      {
        id: 3,
        nome: "Amostra C",
        valor: Math.random() * 100,
        data: new Date().toISOString().split("T")[0],
      },
    ];

    res.setHeader("Content-Type", "application/json");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="export_${table || "data"}_${Date.now()}.json"`,
    );

    res.status(200).json({
      success: true,
      data: randomData,
      metadata: {
        exportedAt: new Date().toISOString(),
        table: table || "random",
        recordCount: randomData.length,
      },
    });
  } catch (error: any) {
    logger.error("Erro na exportação JSON", {
      message: error.message,
      stack: error.stack,
    });

    res.status(500).json({
      success: false,
      error: "Erro ao gerar arquivo JSON.",
    });
  }
};
