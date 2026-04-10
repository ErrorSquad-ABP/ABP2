// src/components/SimaTable.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useMemo, JSX } from "react";
import styled from "styled-components";
import { chunkArray } from "../../utils/chunkArray";

/**
 * SimaTable (versão dinâmica)
 * - Aceita colunas dinâmicas (keys = string).
 * - Paginação, ordenação, export CSV/JSON/PDF (fallback local).
 * - Peça ao parent: columns: Array<{ key: string; label: string; sortable?: boolean; render?: (value,row)=>JSX|string }>
 */

/* ----------------- Types ----------------- */

type ColumnDef = {
  key: string;
  label: string;
  sortable?: boolean;
  render?: (value: any, row: any) => JSX.Element | string;
};

interface SimaTableProps {
  columns: ColumnDef[];
  data: any[];
  page?: number;
  pageSize?: number;
  onPageChange?: (p: number) => void;
  onSort?: (field: string, order: "asc" | "desc") => void;
  tableName?: string;
  downloadParams?: { startDate?: string; endDate?: string } | any;
  onDownload?: (format: "csv" | "json" | "pdf") => void;
}

/* ----------------- Styles ----------------- */

const TableWrapper = styled.div`
  max-width: 100%;
  overflow-x: auto;
  position: relative;
  padding-top: 8px;
`;

const ControlsBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  gap: 8px;
`;

const LeftControls = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const RightControls = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const IconButton = styled.button`
  padding: 6px 10px;
  border-radius: 8px;
  border: 1px solid #e6e6e6;
  background: #fff;
  cursor: pointer;
  font-weight: 700;
  font-size: 13px;

  &:hover {
    background: #f0f4ff;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
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
    font-size: 14px;
  }

  th {
    background-color: #2563eb;
    color: white;
    font-weight: 600;
    cursor: pointer;
    user-select: none;
    position: sticky;
    top: 0;
    z-index: 2;
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
  gap: 12px;

  button {
    padding: 6px 12px;
    border: 1px solid #d1d5db;
    background: #fff;
    cursor: pointer;
    border-radius: 6px;
    transition: all 0.12s;
    font-weight: 600;
  }

  button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  span {
    font-weight: 600;
    color: #374151;
  }
`;

const ColumnSelector = styled.div`
  position: absolute;
  top: 44px;
  left: 8px;
  background: white;
  border: 1px solid #e6e6e6;
  box-shadow: 0 6px 18px rgba(2, 6, 23, 0.08);
  border-radius: 8px;
  padding: 12px;
  z-index: 30;
  max-height: 300px;
  overflow-y: auto;
  min-width: 220px;

  h4 {
    margin: 0 0 8px 0;
    font-size: 14px;
  }

  label {
    display: flex;
    gap: 8px;
    align-items: center;
    margin-bottom: 6px;
    font-size: 13px;
  }
`;

const DownloadOptions = styled.div`
  position: absolute;
  top: 44px;
  right: 8px;
  background: white;
  border: 1px solid #e6e6e6;
  box-shadow: 0 6px 18px rgba(2, 6, 23, 0.08);
  border-radius: 8px;
  padding: 12px;
  z-index: 30;
  min-width: 200px;

  h4 {
    margin: 0 0 8px 0;
    font-size: 14px;
  }

  button {
    width: 100%;
    padding: 8px 10px;
    border-radius: 6px;
    border: none;
    cursor: pointer;
    font-weight: 700;
    font-size: 13px;
  }

  .csv {
    background: #2563eb;
    color: white;
    margin-bottom: 8px;
  }
  .json {
    background: #2563eb;
    color: white;
    margin-bottom: 8px;
  }
  .pdf {
    background: #2563eb;
    color: white;
  }
`;

/* ----------------- Component ----------------- */

const SimaTable = ({
  columns,
  data,
  page: controlledPage,
  pageSize = 10,
  onPageChange,
  onSort,
  tableName = "data",
  onDownload,
}: SimaTableProps) => {
  // pagination internal
  const [internalPage, setInternalPage] = useState(0);

  // sort config uses string fields for flexibility
  const [sortConfig, setSortConfig] = useState<{ field: string; order: "asc" | "desc" } | null>(
    null,
  );

  // UI toggles (we actually use these so TS won't complain about unused)
  const [showColumnSelector, setShowColumnSelector] = useState(false);
  const [showDownloadOptions, setShowDownloadOptions] = useState(false);

  // visible columns (keys)
  const [visibleColumns, setVisibleColumns] = useState<string[]>(columns.map((c) => c.key));

  const page = controlledPage ?? internalPage;

  // sorting
  const sortedData = useMemo(() => {
    if (!sortConfig) return data;
    const { field, order } = sortConfig;
    return [...data].sort((a: any, b: any) => {
      const av = a?.[field];
      const bv = b?.[field];
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

  const handleSort = (field: string) => {
    let order: "asc" | "desc" = "asc";
    if (sortConfig && sortConfig.field === field && sortConfig.order === "asc") {
      order = "desc";
    }
    setSortConfig({ field, order });
    onSort?.(field, order);
  };

  const toggleColumnVisibility = (key: string) => {
    setVisibleColumns((prev) =>
      prev.includes(key) ? prev.filter((c) => c !== key) : [...prev, key],
    );
  };

  /* ----------------- Download helpers (local fallback) ----------------- */

  const handleDownloadCSV = () => {
    if (onDownload) {
      onDownload("csv");
      return;
    }
    if (!data || data.length === 0) {
      alert("Não há dados para exportar.");
      return;
    }

    const visibleKeys = columns.filter((c) => visibleColumns.includes(c.key)).map((c) => c.key);
    const headers = visibleKeys.map((k) => columns.find((c) => c.key === k)?.label ?? String(k));
    const rows = data.map((row) =>
      visibleKeys.map((k) => `"${String(row?.[k] ?? "").replace(/"/g, '""')}"`),
    );
    const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${tableName}_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDownloadJSON = () => {
    if (onDownload) {
      onDownload("json");
      return;
    }
    if (!data || data.length === 0) {
      alert("Não há dados para exportar.");
      return;
    }

    const visibleKeys = columns.filter((c) => visibleColumns.includes(c.key)).map((c) => c.key);
    const out = {
      table: tableName,
      exportedAt: new Date().toISOString(),
      totalRecords: data.length,
      visibleColumns: visibleKeys.map((k) => ({
        key: k,
        label: columns.find((c) => c.key === k)?.label ?? k,
      })),
      data: data.map((row) => {
        const o: any = {};
        visibleKeys.forEach((k) => (o[k] = row?.[k] ?? null));
        return o;
      }),
    };

    const blob = new Blob([JSON.stringify(out, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${tableName}_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDownloadPDF = () => {
    if (onDownload) {
      onDownload("pdf");
      return;
    }
    if (!data || data.length === 0) {
      alert("Não há dados para exportar.");
      return;
    }

    const visibleKeys = columns.filter((c) => visibleColumns.includes(c.key)).map((c) => c.key);
    const headers = visibleKeys.map((k) => columns.find((c) => c.key === k)?.label ?? k);
    const rows = data.map((row) => visibleKeys.map((k) => row?.[k] ?? ""));

    const html = `
      <!doctype html>
      <html>
        <head>
          <meta charset="utf-8"/>
          <title>${tableName} - Export</title>
          <style>
            body { font-family: Arial, Helvetica, sans-serif; padding: 18px; color: #111827; }
            h1 { color: #2563eb; }
            table { width: 100%; border-collapse: collapse; margin-top: 12px; }
            th, td { border: 1px solid #e5e7eb; padding: 8px; text-align: left; font-size: 13px; }
            th { background: #2563eb; color: #fff; }
            tr:nth-child(even) { background: #f9fafb; }
          </style>
        </head>
        <body>
          <h1>${tableName}</h1>
          <p>Exportado em: ${new Date().toLocaleString("pt-BR")}</p>
          <table>
            <thead><tr>${headers.map((h) => `<th>${h}</th>`).join("")}</tr></thead>
            <tbody>
              ${rows.map((r) => `<tr>${r.map((c) => `<td>${String(c)}</td>`).join("")}</tr>`).join("")}
            </tbody>
          </table>
        </body>
      </html>
    `;

    const w = window.open("", "_blank");
    if (!w) {
      alert("Permita popups para exportar PDF.");
      return;
    }
    w.document.write(html);
    w.document.close();
    setTimeout(() => w.print(), 400);
  };

  const handleQuickDownload = (format: "csv" | "json" | "pdf") => {
    if (format === "csv") handleDownloadCSV();
    if (format === "json") handleDownloadJSON();
    if (format === "pdf") handleDownloadPDF();
    setShowDownloadOptions(false);
  };

  /* ----------------- Render ----------------- */

  return (
    <TableWrapper>
      <ControlsBar>
        <LeftControls>
          <IconButton onClick={() => setShowColumnSelector((s) => !s)}>Colunas</IconButton>
        </LeftControls>

        <RightControls>
          <IconButton onClick={() => setShowDownloadOptions((s) => !s)}>Exportar</IconButton>
          <IconButton onClick={() => handlePageChange(0)}>Inicio</IconButton>
        </RightControls>
      </ControlsBar>

      {showColumnSelector && (
        <ColumnSelector>
          <h4>Colunas visíveis</h4>
          {columns.map((col) => (
            <label key={col.key}>
              <input
                type="checkbox"
                checked={visibleColumns.includes(col.key)}
                onChange={() => toggleColumnVisibility(col.key)}
              />
              <span>{col.label}</span>
            </label>
          ))}
        </ColumnSelector>
      )}

      {showDownloadOptions && (
        <DownloadOptions>
          <h4>Exportar dados</h4>
          <button
            className="csv"
            onClick={() => handleQuickDownload("csv")}
            disabled={!data || data.length === 0}
          >
            CSV Completo
          </button>
          <button
            className="json"
            onClick={() => handleQuickDownload("json")}
            disabled={!data || data.length === 0}
          >
            JSON Completo
          </button>
          <button
            className="pdf"
            onClick={() => handleQuickDownload("pdf")}
            disabled={!data || data.length === 0}
          >
            PDF (Imprimir)
          </button>
        </DownloadOptions>
      )}

      <Table>
        <thead>
          <tr>
            {columns
              .filter((c) => visibleColumns.includes(c.key))
              .map((col) => (
                <th key={col.key} onClick={() => col.sortable && handleSort(col.key)}>
                  {col.label}
                  {sortConfig?.field === col.key && (sortConfig.order === "asc" ? " ▲" : " ▼")}
                </th>
              ))}
          </tr>
        </thead>
        <tbody>
          {(pages[page] ?? []).map((row, rowIndex) => (
            <tr key={(row && (row.id || row.idsima || `row-${rowIndex}`)) ?? rowIndex}>
              {columns
                .filter((c) => visibleColumns.includes(c.key))
                .map((col) => (
                  <td key={col.key}>
                    {col.render
                      ? col.render((row as any)[col.key], row)
                      : String((row as any)[col.key] ?? "-")}
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
          disabled={page >= pages.length - 1 || pages.length === 0}
        >
          Próxima
        </button>
      </PaginationControls>
    </TableWrapper>
  );
};

export default SimaTable;
