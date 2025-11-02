import React from "react";
import styled from "styled-components";
import { useDownload } from "../hooks/useDownload";

interface DownloadButtonsProps {
  database: string;
  table: string;
  filters: Record<string, any>;
  selectedColumns: string[];
}

const DownloadContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  padding: 10px;
  background: #f5f5f5;
  border-radius: 4px;
`;

const DownloadButton = styled.button<{ format: string }>`
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background: ${(props) => {
    switch (props.format) {
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
  cursor: pointer;
  font-size: 14px;

  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const DownloadButtons: React.FC<DownloadButtonsProps> = ({
  database,
  table,
  filters,
  selectedColumns,
}) => {
  const { downloadData, isDownloading } = useDownload();

  const handleDownload = async (format: "csv" | "json" | "pdf") => {
    try {
      await downloadData(database, table, {
        format,
        filters,
        columns: selectedColumns,
      });
    } catch (error) {
      alert("Erro ao fazer download. Tente novamente.");
    }
  };

  return (
    <DownloadContainer>
      <DownloadButton format="csv" onClick={() => handleDownload("csv")} disabled={isDownloading}>
        {isDownloading ? "Baixando..." : "📥 CSV"}
      </DownloadButton>

      <DownloadButton format="json" onClick={() => handleDownload("json")} disabled={isDownloading}>
        {isDownloading ? "Baixando..." : "📥 JSON"}
      </DownloadButton>

      <DownloadButton format="pdf" onClick={() => handleDownload("pdf")} disabled={isDownloading}>
        {isDownloading ? "Baixando..." : "📥 PDF"}
      </DownloadButton>
    </DownloadContainer>
  );
};
