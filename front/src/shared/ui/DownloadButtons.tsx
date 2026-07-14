import React from "react";
import styled from "styled-components";
import { furnasApi, DownloadParams } from "@/api/furnasApi";

const DownloadContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  flex-wrap: wrap;
`;

const DownloadButton = styled.button<{ variant: "csv" | "json" | "pdf" }>`
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s;

  background-color: ${(props) => {
    switch (props.variant) {
      case "csv":
        return "#28a745";
      case "json":
        return "#17a2b8";
      case "pdf":
        return "#dc3545";
      default:
        return "#6c757d";
    }
  }};

  color: white;

  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

interface DownloadButtonsProps {
  table: string;
  downloadParams: DownloadParams;
  isLoading?: boolean;
}

export const DownloadButtons: React.FC<DownloadButtonsProps> = ({
  table,
  downloadParams,
  isLoading = false,
}) => {
  const handleDownload = async (type: "csv" | "json" | "pdf") => {
    try {
      let response;

      switch (type) {
        case "csv":
          response = await furnasApi.downloadCSV(table, downloadParams);
          break;
        case "json":
          response = await furnasApi.downloadJSON(table, downloadParams);
          break;
        case "pdf":
          response = await furnasApi.downloadPDF(table, downloadParams);
          break;
      }

      // Criar blob e fazer download
      const blob = new Blob([response.data]);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;

      const filename =
        response.headers["content-disposition"]?.split("filename=")[1] ||
        `${table}_${new Date().toISOString().split("T")[0]}.${type}`;

      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(`Erro ao baixar ${type.toUpperCase()}:`, error);
      alert(`Erro ao baixar arquivo ${type.toUpperCase()}. Tente novamente.`);
    }
  };

  return (
    <DownloadContainer>
      <DownloadButton variant="csv" onClick={() => handleDownload("csv")} disabled={isLoading}>
        📥 Exportar CSV
      </DownloadButton>

      <DownloadButton variant="json" onClick={() => handleDownload("json")} disabled={isLoading}>
        📥 Exportar JSON
      </DownloadButton>

      <DownloadButton variant="pdf" onClick={() => handleDownload("pdf")} disabled={isLoading}>
        📥 Exportar PDF
      </DownloadButton>
    </DownloadContainer>
  );
};
