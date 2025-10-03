//SimaTable.tsx
import type { Sima } from "../types/sima";
import { useState, useMemo, JSX } from "react";
import styled from "styled-components";
import { chunkArray } from "../utils/chunkArray";

interface SimaTableProps<T> {
  columns: Array<{
    key: keyof T;
    label: string;
    sortable?: boolean;
    render?: (value: any, row: T) => JSX.Element;
  }>;
  data: T[];
  page?: number;
  pageSize?: number;
  onPageChange?: (page: number) => void;
  onSort?: (field: keyof T, order: "asc" | "desc") => void;
}

// Wrapper para a tabela
const TableWrapper = styled.div`
  max-width: 100%;
  overflow-x: auto;
`;

// Tabela estilizada
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

// Controles de paginação
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

const SimaTable = ({
  columns,
  data,
  page: controlledPage,
  pageSize = 10,
  onPageChange,
  onSort,
}: SimaTableProps<Sima>) => {
  const [internalPage, setInternalPage] = useState(0);
  const [sortConfig, setSortConfig] = useState<{
    field: keyof Sima;
    order: "asc" | "desc";
  } | null>(null);

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

  return (
    <TableWrapper>
      <Table>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={String(col.key)} onClick={() => col.sortable && handleSort(col.key)}>
                {col.label}
                {sortConfig?.field === col.key && (sortConfig.order === "asc" ? " ▲" : " ▼")}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {pages[page]?.map((row) => (
            <tr key={(row as any).idsima}>
              {columns.map((col) => (
                <td key={String(col.key)}>
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
          Prev
        </button>
        <span>
          Página {page + 1} de {pages.length || 1}
        </span>
        <button
          onClick={() => handlePageChange(Math.min(page + 1, pages.length - 1))}
          disabled={page === pages.length - 1 || pages.length === 0}
        >
          Next
        </button>
      </PaginationControls>
    </TableWrapper>
  );
};

export default SimaTable;
