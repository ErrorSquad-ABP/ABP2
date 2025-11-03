import type { Sima } from "../types/sima";
import { useState, useMemo, JSX } from "react";
import styled from "styled-components";
import { chunkArray } from "../utils/chunkArray";

interface SimaTableProps<T> {
  columns: Array<{
    key: keyof T;
    label: string;
    sortable?: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    render?: (value: any, row: T) => JSX.Element;
  }>;
  data: T[];
  page?: number;
  pageSize?: number;
  onPageChange?: (page: number) => void;
  onSort?: (field: keyof T, order: "asc" | "desc") => void;
  // Novas props para download
  tableName?: string;
  downloadParams?: {
    startDate?: string;
    endDate?: string;
    stations?: string[];
    columns?: string[];
  };
  onDownload?: (format: "csv" | "json" | "pdf") => void;
}

const TableWrapper = styled.div`
  max-width: 100%;
  overflow-x: auto;
  position: relative;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);

  th,
  td {
    padding: 0.75rem 1rem;
    text-align: left;
    border-bottom: 1px solid #e5e7eb;
  }

  th {
    background-color: #2563eb;
    color: white;
    font-weight: 600;
    cursor: pointer;
    user-select: none;
  }

  tr:nth-child(even) {
    background-color: #f9fafb;
  }

  tr:hover {
    background-color: #f1f5f9;
  }
`;

const PaginationControls = styled.div`
  margin-top: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;

  button {
    padding: 4px 12px;
    border: 1px solid #ccc;
    background: #f5f5f5;
    cursor: pointer;
    border-radius: 4px;
    transition: all 0.2s;

    &:disabled {
      background: #eee;
      cursor: not-allowed;
    }

    &:hover:not(:disabled) {
      background: #e0e7ff;
    }
  }

  span {
    font-weight: 500;
  }
`;

const ControlButtonsContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
  flex-wrap: wrap;
`;

const ColumnControlButton = styled.button`
  background-color: #2563eb;
  color: white;
  font-weight: 600;
  border: none;
  border-radius: 4px;
  padding: 6px 12px;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    background-color: #1e40af;
  }
`;

const DownloadButton = styled.button<{ variant: "csv" | "json" | "pdf" }>`
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
  font-weight: 600;
  border: none;
  border-radius: 4px;
  padding: 6px 12px;
  cursor: pointer;
  transition: 0.2s;
  display: flex;
  align-items: center;
  gap: 4px;

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

const ColumnSelector = styled.div`
  position: absolute;
  top: 40px;
  left: 0;
  background: white;
  border: 1px solid #ddd;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 6px;
  padding: 12px;
  z-index: 10;
  max-height: 250px;
  overflow-y: auto;

  label {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 4px 0;
    font-size: 0.9rem;
  }
`;

const DownloadOptions = styled.div`
  position: absolute;
  top: 40px;
  right: 0;
  background: white;
  border: 1px solid #ddd;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 6px;
  padding: 8px;
  z-index: 10;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const SimaTable = ({
  columns,
  data,
  page: controlledPage,
  pageSize = 10,
  onPageChange,
  onSort,
  tableName = "data",
  downloadParams,
  onDownload,
}: SimaTableProps<Sima>) => {
  const [internalPage, setInternalPage] = useState(0);
  const [sortConfig, setSortConfig] = useState<{ field: keyof Sima; order: "asc" | "desc" } | null>(
    null,
  );
  const [showColumnSelector, setShowColumnSelector] = useState(false);
  const [showDownloadOptions, setShowDownloadOptions] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState(columns.map((c) => c.key));

  const page = controlledPage ?? internalPage;

  const sortedData = useMemo(() => {
    if (!sortConfig) return data;
    const { field, order } = sortConfig;
    return [...data].sort((a, b) => {
      const av = a[field as keyof Sima];
      const bv = b[field as keyof Sima];
      if (av === bv) return 0;
      if (av == null) return order === "asc" ? -1 : 1;
      if (bv == null) return order === "asc" ? 1 : -1;
      return order === "asc"
        ? String(av).localeCompare(String(bv))
        : String(bv).localeCompare(String(av));
    });
  }, [data, sortConfig]);

  const pages = useMemo(() => chunkArray(sortedData, pageSize), [sortedData, pageSize]);

  const handlePageChange = (newPage: number) => {
    if (onPageChange) onPageChange(newPage);
    else setInternalPage(newPage);
  };

  const handleSort = (field: keyof Sima) => {
    let order: "asc" | "desc" = "asc";
    if (sortConfig && sortConfig.field === field && sortConfig.order === "asc") {
      order = "desc";
    }
    setSortConfig({ field, order });
    onSort?.(field, order);
  };

  const toggleColumnVisibility = (key: keyof Sima) => {
    setVisibleColumns((prev) =>
      prev.includes(key) ? prev.filter((c) => c !== key) : [...prev, key],
    );
  };

  // Funções de download
  const handleDownloadCSV = () => {
    if (onDownload) {
      onDownload("csv");
      return;
    }

    // Fallback: download local
    if (!data || data.length === 0) {
      alert("Não há dados para exportar.");
      return;
    }

    const visibleColumnKeys = columns
      .filter((col) => visibleColumns.includes(col.key))
      .map((col) => col.key);

    const headers = visibleColumnKeys.map(
      (key) => columns.find((col) => col.key === key)?.label || String(key),
    );

    const rows = data.map((row) =>
      visibleColumnKeys.map((key) => {
        const value = row[key as keyof Sima];
        return `"${String(value ?? "").replace(/"/g, '""')}"`;
      }),
    );

    const csvContent = [headers.join(","), ...rows.map((row) => row.join(","))].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${tableName}_${new Date().toISOString().split("T")[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDownloadJSON = () => {
    if (onDownload) {
      onDownload("json");
      return;
    }

    // Fallback: download local
    if (!data || data.length === 0) {
      alert("Não há dados para exportar.");
      return;
    }

    const visibleColumnKeys = columns
      .filter((col) => visibleColumns.includes(col.key))
      .map((col) => col.key);

    const jsonData = {
      table: tableName,
      exportedAt: new Date().toISOString(),
      totalRecords: data.length,
      visibleColumns: visibleColumnKeys.map((key) => ({
        key: String(key),
        label: columns.find((col) => col.key === key)?.label || String(key),
      })),
      data: data.map((row) => {
        const obj: any = {};
        visibleColumnKeys.forEach((key) => {
          obj[String(key)] = row[key as keyof Sima];
        });
        return obj;
      }),
    };

    const blob = new Blob([JSON.stringify(jsonData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${tableName}_${new Date().toISOString().split("T")[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDownloadPDF = () => {
    if (onDownload) {
      onDownload("pdf");
      return;
    }

    // Fallback: print da tabela
    if (!data || data.length === 0) {
      alert("Não há dados para exportar.");
      return;
    }

    const printWindow = window.open("", "_blank");
    if (!printWindow) {
      alert("Permita popups para exportar PDF.");
      return;
    }

    const visibleColumnKeys = columns
      .filter((col) => visibleColumns.includes(col.key))
      .map((col) => col.key);

    const headers = visibleColumnKeys.map(
      (key) => columns.find((col) => col.key === key)?.label || String(key),
    );

    const tableRows = data.map((row) =>
      visibleColumnKeys.map((key) => row[key as keyof Sima] ?? ""),
    );

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>${tableName} - Export</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h1 { color: #2563eb; margin-bottom: 20px; }
            table { width: 100%; border-collapse: collapse; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #2563eb; color: white; }
            tr:nth-child(even) { background-color: #f9fafb; }
            .metadata { margin-bottom: 20px; color: #666; }
          </style>
        </head>
        <body>
          <h1>${tableName}</h1>
          <div class="metadata">
            <p><strong>Exportado em:</strong> ${new Date().toLocaleString("pt-BR")}</p>
            <p><strong>Total de registros:</strong> ${data.length}</p>
            ${downloadParams?.startDate ? `<p><strong>Período:</strong> ${downloadParams.startDate} à ${downloadParams.endDate}</p>` : ""}
          </div>
          <table>
            <thead>
              <tr>
                ${headers.map((header) => `<th>${header}</th>`).join("")}
              </tr>
            </thead>
            <tbody>
              ${tableRows
                .map((row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join("")}</tr>`)
                .join("")}
            </tbody>
          </table>
        </body>
      </html>
    `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();

    setTimeout(() => {
      printWindow.print();
    }, 500);
  };

  const handleQuickDownload = (format: "csv" | "json" | "pdf") => {
    switch (format) {
      case "csv":
        handleDownloadCSV();
        break;
      case "json":
        handleDownloadJSON();
        break;
      case "pdf":
        handleDownloadPDF();
        break;
    }
    setShowDownloadOptions(false);
  };

  return (
    <TableWrapper>
      <ControlButtonsContainer>
        <ColumnControlButton onClick={() => setShowColumnSelector((prev) => !prev)}>
          📊 Organizar Colunas
        </ColumnControlButton>

        <DownloadButton
          variant="csv"
          onClick={() => handleQuickDownload("csv")}
          disabled={!data || data.length === 0}
        >
          📥 CSV
        </DownloadButton>

        <DownloadButton
          variant="json"
          onClick={() => handleQuickDownload("json")}
          disabled={!data || data.length === 0}
        >
          📥 JSON
        </DownloadButton>

        <DownloadButton
          variant="pdf"
          onClick={() => handleQuickDownload("pdf")}
          disabled={!data || data.length === 0}
        >
          📥 PDF
        </DownloadButton>

        <ColumnControlButton onClick={() => setShowDownloadOptions((prev) => !prev)}>
          ⚙️ Mais Opções
        </ColumnControlButton>
      </ControlButtonsContainer>

      {showColumnSelector && (
        <ColumnSelector>
          <h4 style={{ margin: "0 0 8px 0" }}>Colunas Visíveis</h4>
          {columns.map((col) => (
            <label key={String(col.key)}>
              <input
                type="checkbox"
                checked={visibleColumns.includes(col.key)}
                onChange={() => toggleColumnVisibility(col.key)}
              />
              {col.label}
            </label>
          ))}
        </ColumnSelector>
      )}

      {showDownloadOptions && (
        <DownloadOptions>
          <h4 style={{ margin: "0 0 8px 0", fontSize: "14px" }}>Exportar Dados</h4>
          <button
            onClick={() => handleQuickDownload("csv")}
            style={{
              padding: "6px 12px",
              border: "none",
              background: "#28a745",
              color: "white",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "12px",
            }}
            disabled={!data || data.length === 0}
          >
            CSV Completo
          </button>
          <button
            onClick={() => handleQuickDownload("json")}
            style={{
              padding: "6px 12px",
              border: "none",
              background: "#17a2b8",
              color: "white",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "12px",
            }}
            disabled={!data || data.length === 0}
          >
            JSON Completo
          </button>
          <button
            onClick={() => handleQuickDownload("pdf")}
            style={{
              padding: "6px 12px",
              border: "none",
              background: "#dc3545",
              color: "white",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "12px",
            }}
            disabled={!data || data.length === 0}
          >
            PDF com Formatação
          </button>
        </DownloadOptions>
      )}

      <Table>
        <thead>
          <tr>
            {columns
              .filter((col) => visibleColumns.includes(col.key))
              .map((col) => (
                <th key={String(col.key)} onClick={() => col.sortable && handleSort(col.key)}>
                  {col.label}
                  {sortConfig?.field === col.key && (sortConfig.order === "asc" ? " ▲" : " ▼")}
                </th>
              ))}
          </tr>
        </thead>
        <tbody>
          {pages[page]?.map((row, index) => (
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            <tr key={(row as any).idsima || index}>
              {columns
                .filter((col) => visibleColumns.includes(col.key))
                .map((col) => (
                  <td key={String(col.key)}>
                    {col.render
                      ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        col.render((row as any)[col.key], row)
                      : // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        String((row as any)[col.key] ?? "-")}
                  </td>
                ))}
            </tr>
          ))}
        </tbody>
      </Table>

      <PaginationControls>
        <button onClick={() => handlePageChange(Math.max(page - 1, 0))} disabled={page === 0}>
          Anterior
        </button>
        <span>
          Página {page + 1} de {pages.length || 1}
        </span>
        <button
          onClick={() => handlePageChange(Math.min(page + 1, pages.length - 1))}
          disabled={page === pages.length - 1 || pages.length === 0}
        >
          Próxima
        </button>
      </PaginationControls>
    </TableWrapper>
  );
};

export default SimaTable;
