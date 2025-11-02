import { useState } from "react";

interface DownloadOptions {
  format: "csv" | "json" | "pdf";
  filters?: Record<string, any>;
  columns?: string[];
}

export const useDownload = () => {
  const [isDownloading, setIsDownloading] = useState(false);

  const downloadData = async (database: string, table: string, options: DownloadOptions) => {
    setIsDownloading(true);
    try {
      const response = await fetch(
        `http://localhost:${import.meta.env.VITE_SERVER_PORT}/api/${database}/download/${table}?format=${options.format}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            filters: options.filters || {},
            columns: options.columns || ["*"],
          }),
        },
      );

      if (!response.ok) {
        throw new Error("Erro no download");
      }

      // Criar blob e fazer download
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;

      // Extrair filename do header Content-Disposition ou usar padrão
      const contentDisposition = response.headers.get("Content-Disposition");
      let filename = `${database}_${table}_${Date.now()}.${options.format}`;

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
      console.error("Erro no download:", error);
      throw error;
    } finally {
      setIsDownloading(false);
    }
  };

  return {
    downloadData,
    isDownloading,
  };
};
