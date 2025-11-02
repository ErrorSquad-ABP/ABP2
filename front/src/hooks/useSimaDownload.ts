import { useState } from "react";

interface SimaDownloadOptions {
  format: "csv" | "json" | "pdf";
  estacoes?: string[];
  sensores?: string[];
  parametros?: string[];
  dataInicio?: string;
  dataFim?: string;
  colunas?: string[];
}

export const useSimaDownload = () => {
  const [isDownloading, setIsDownloading] = useState(false);

  const downloadSima = async (options: SimaDownloadOptions) => {
    setIsDownloading(true);
    try {
      const response = await fetch(
        `http://localhost:${import.meta.env.VITE_SERVER_PORT}/api/sima/download-enhanced/filtrado?format=${options.format}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            estacoes: options.estacoes || [],
            sensores: options.sensores || [],
            parametros: options.parametros || [],
            dataInicio: options.dataInicio,
            dataFim: options.dataFim,
            colunas: options.colunas || ["*"],
          }),
        },
      );

      if (!response.ok) {
        throw new Error("Erro no download do SIMA");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;

      const contentDisposition = response.headers.get("Content-Disposition");
      let filename = `sima_dados_${Date.now()}.${options.format}`;

      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename="(.+)"/);
        if (filenameMatch) {
          filename = filenameMatch[1];
        }
      }

      a.download = filename;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Erro no download do SIMA:", error);
      throw error;
    } finally {
      setIsDownloading(false);
    }
  };

  return {
    downloadSima,
    isDownloading,
  };
};
