// src/pages/SimaPage.tsx
import { useEffect, useState } from "react";
import { getSima } from "../api/simaApi";
import SimaTable from "../components/SimaTable";
import type { Sima, PaginatedResponse } from "../types/sima";
import styled from "styled-components";
import { Download } from "lucide-react";

// Container principal da página
const PageContainer = styled.div`
  flex: 1;
  width: 100%;
  padding: 1.5rem;
  background-color: #f3f4f6;
`;

// Título
const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #111827;
`;

// Container dos botões de ação (ex: exportar)
const ActionBar = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

// Botão estilizado
const ExportButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  background-color: #2563eb;
  color: white;
  border: none;
  border-radius: 0.5rem;
  padding: 0.5rem 0.9rem;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #1e40af;
  }

  &:disabled {
    background-color: #9ca3af;
    cursor: not-allowed;
  }
`;

// Seção de download avançado
const AdvancedDownloadSection = styled.div`
  background: #e8f4fd;
  padding: 1rem;
  border-radius: 0.5rem;
  border: 1px solid #b3d9ff;
  margin-bottom: 1rem;
`;

const SectionTitle = styled.h3`
  color: #2c3e50;
  margin-bottom: 0.5rem;
  font-size: 1rem;
`;

const DownloadInfo = styled.p`
  color: #4b5563;
  font-size: 0.875rem;
  margin-bottom: 0.75rem;
`;

function SimaPage() {
  const [data, setData] = useState<Sima[]>([]);
  const [page] = useState(1);
  //const [totalPages, setTotalPages] = useState(1);
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
  const [isDownloading, setIsDownloading] = useState(false);

  // Defina as colunas para a tabela SIMA
  const simaColumns = [
    { key: "idsima" as keyof Sima, label: "ID", sortable: true },
    { key: "datamedicao" as keyof Sima, label: "Data Medição", sortable: true },
    { key: "horamedicao" as keyof Sima, label: "Hora Medição", sortable: true },
    { key: "valor" as keyof Sima, label: "Valor", sortable: true },
    { key: "idestacao" as keyof Sima, label: "ID Estação", sortable: true },
    { key: "idsensor" as keyof Sima, label: "ID Sensor", sortable: true },
    { key: "idcampotabela" as keyof Sima, label: "ID Campo Tabela", sortable: true },
    // Adicione mais colunas conforme sua estrutura de dados SIMA
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: PaginatedResponse<Sima> = await getSima(page, 10);
        setData(response.data);
        //setTotalPages(response.totalPages ?? 1);
      } catch (error) {
        console.error("Erro ao carregar registros:", error);
      }
    };

    fetchData();
  }, [page]);

  // Função de download básica (mantendo sua implementação atual)
  const handleExport = async (format: string) => {
    try {
      const url = `${import.meta.env.VITE_API_URL}/export?db=sima&tabela=sima&formato=${format}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error("Erro ao exportar dados");

      const blob = await response.blob();
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `sima_export.${format}`;
      link.click();
      URL.revokeObjectURL(link.href);
    } catch (error) {
      console.error("Falha ao exportar:", error);
    }
  };

  // Nova função de download usando a API que criamos
  const handleAdvancedDownload = async (format: "csv" | "json" | "pdf") => {
    setIsDownloading(true);
    try {
      const response = await fetch(
        `http://localhost:${import.meta.env.VITE_SERVER_PORT}/api/sima/download/sima?format=${format}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            filters: {}, // Você pode adicionar filtros aqui se quiser
            columns: selectedColumns.length > 0 ? selectedColumns : ["*"],
          }),
        },
      );

      if (!response.ok) {
        throw new Error("Erro no download");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;

      // Extrair filename do header
      const contentDisposition = response.headers.get("Content-Disposition");
      let filename = `sima_dados_${Date.now()}.${format}`;

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
      console.error("Erro no download avançado:", error);
      alert("Erro ao fazer download. Tente novamente.");
    } finally {
      setIsDownloading(false);
    }
  };

  // Download completo do SIMA com joins
  const handleCompleteDownload = async (format: "csv" | "json" | "pdf") => {
    setIsDownloading(true);
    try {
      const response = await fetch(
        `http://localhost:${import.meta.env.VITE_SERVER_PORT}/api/sima/download/completo?format=${format}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (!response.ok) {
        throw new Error("Erro no download completo");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;

      const contentDisposition = response.headers.get("Content-Disposition");
      let filename = `sima_completo_${Date.now()}.${format}`;

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
      console.error("Erro no download completo:", error);
      alert("Erro ao fazer download completo. Tente novamente.");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <PageContainer>
      <Title>Lista de Registros - SIMA</Title>

      {/* Download Básico (sua implementação original) */}
      <ActionBar>
        <ExportButton onClick={() => handleExport("csv")}>
          <Download size={18} /> CSV
        </ExportButton>
        <ExportButton onClick={() => handleExport("json")}>
          <Download size={18} /> JSON
        </ExportButton>
        <ExportButton onClick={() => handleExport("pdf")}>
          <Download size={18} /> PDF
        </ExportButton>
      </ActionBar>

      {/* Download Avançado - Nova funcionalidade */}
      <AdvancedDownloadSection>
        <SectionTitle>Download Avançado</SectionTitle>
        <DownloadInfo>
          Exporte dados com colunas selecionadas ou dados completos com relacionamentos entre
          tabelas.
          {selectedColumns.length > 0 && (
            <span style={{ display: "block", marginTop: "4px", fontWeight: "bold" }}>
              {selectedColumns.length} coluna(s) selecionada(s) para exportação
            </span>
          )}
        </DownloadInfo>

        <ActionBar>
          <ExportButton onClick={() => handleAdvancedDownload("csv")} disabled={isDownloading}>
            <Download size={18} />
            {isDownloading ? "Exportando..." : "CSV com Colunas Selecionadas"}
          </ExportButton>

          <ExportButton onClick={() => handleAdvancedDownload("json")} disabled={isDownloading}>
            <Download size={18} />
            {isDownloading ? "Exportando..." : "JSON com Colunas Selecionadas"}
          </ExportButton>

          <ExportButton onClick={() => handleCompleteDownload("csv")} disabled={isDownloading}>
            <Download size={18} />
            {isDownloading ? "Exportando..." : "CSV Completo (com Joins)"}
          </ExportButton>

          <ExportButton onClick={() => handleCompleteDownload("json")} disabled={isDownloading}>
            <Download size={18} />
            {isDownloading ? "Exportando..." : "JSON Completo (com Joins)"}
          </ExportButton>
        </ActionBar>
      </AdvancedDownloadSection>

      <SimaTable columns={simaColumns} data={data} onColumnsChange={setSelectedColumns} />
    </PageContainer>
  );
}

export default SimaPage;
