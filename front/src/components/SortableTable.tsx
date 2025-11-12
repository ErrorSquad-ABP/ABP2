import React from "react";
import styled from "styled-components";
import { useSortableTable } from "../hooks/useSortableTable";

interface Column {
  key: string;
  label: string;
  sortable?: boolean;
}

interface SortableTableProps {
  columns: Column[];
  data: any[];
  onSortChange?: (sortParams: { sortBy?: string; sortOrder?: string }) => void;
}

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 1rem 0;
`;

const TableHeader = styled.th<{ sortable?: boolean }>`
  padding: 0.75rem;
  text-align: left;
  border-bottom: 2px solid #ddd;
  background-color: #f8f9fa;
  cursor: ${(props) => (props.sortable ? "pointer" : "default")};
  user-select: none;

  &:hover {
    background-color: ${(props) => (props.sortable ? "#e9ecef" : "#f8f9fa")};
  }
`;

const SortIndicator = styled.span`
  margin-left: 0.5rem;
  font-size: 0.8em;
  color: #007bff;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f8f9fa;
  }

  &:hover {
    background-color: #e9ecef;
  }
`;

const TableCell = styled.td`
  padding: 0.75rem;
  border-bottom: 1px solid #ddd;
`;

export const SortableTable: React.FC<SortableTableProps> = ({ columns, data, onSortChange }) => {
  const { handleSort, getSortIndicator, getSortParams } = useSortableTable();

  const handleHeaderClick = (column: Column) => {
    if (!column.sortable) return;

    handleSort(column.key);

    // Notificar componente pai sobre mudanças na ordenação
    if (onSortChange) {
      onSortChange(getSortParams());
    }
  };

  const renderSortIndicator = (key: string) => {
    const indicator = getSortIndicator(key);
    if (!indicator) return null;

    return (
      <SortIndicator>
        {indicator.direction === "ASC" ? "↑" : "↓"}
        {indicator.position > 1 && <sup>{indicator.position}</sup>}
      </SortIndicator>
    );
  };

  return (
    <Table>
      <thead>
        <tr>
          {columns.map((column) => (
            <TableHeader
              key={column.key}
              sortable={column.sortable}
              onClick={() => handleHeaderClick(column)}
            >
              {column.label}
              {renderSortIndicator(column.key)}
            </TableHeader>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <TableRow key={index}>
            {columns.map((column) => (
              <TableCell key={column.key}>{row[column.key]}</TableCell>
            ))}
          </TableRow>
        ))}
      </tbody>
    </Table>
  );
};

//exemplo de uso:
/* /api/furnas/abioticocoluna?sortBy=datamedida,profundidade&sortOrder=DESC,ASC */
