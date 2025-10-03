// front/src/hooks/useApiHooks.ts
import { useEffect, useState, useCallback } from "react";
import * as api from "../api/tablesApi";

/** Tipos simples (expanda conforme sua necessidade) */
export type Reservatorio = { id: number; nome: string; instituicao?: string };
export type Instituicao = { id: number; nome: string; reservatorios?: Reservatorio[] };
export type TableMetadata = {
  minDate?: string;
  maxDate?: string;
  responsaveis?: string[];
  totalRecords?: number;
};

/** Hook genérico */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function useFetch<T = any>(fetcher: () => Promise<T>, deps: any[] = []) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [error, setError] = useState<any>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetcher();
      setData(res);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, deps); // eslint-disable-line

  useEffect(() => {
    load();
  }, [load]);

  return { data, loading, error, refetch: load };
}

/** Hooks específicos */
export const useReservatorios = () => {
  return useFetch<Reservatorio[]>(() => api.getReservatorios(), []);
};

export const useInstituicoes = () => {
  return useFetch<Instituicao[]>(() => api.getInstituicoes(), []);
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useDataUnion = (params?: Record<string, any>) => {
  return useFetch(() => api.getDataUnion(params), [JSON.stringify(params || {})]);
};

export const useTableColumns = (table: string) => {
  return useFetch(() => api.getTableColumns(table), [table]);
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useTableData = (table: string, params?: Record<string, any>) => {
  return useFetch(() => api.getTableData(table, params), [table, JSON.stringify(params || {})]);
};
/*
export const useTableMetadata = (table: string) => {
  return useFetch<TableMetadata>(() => api.getTableMetadata(table), [table]);
};
*/
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useTableAggregate = (table: string, params?: Record<string, any>) => {
  return useFetch(
    () => api.getTableAggregate(table, params),
    [table, JSON.stringify(params || {})],
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useTableMap = (table: string, params?: Record<string, any>) => {
  return useFetch(() => api.getTableMap(table, params), [table, JSON.stringify(params || {})]);
};

export const useExport = () => {
  const call = async (payload: {
    format: "csv" | "json" | "pdf";
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    query: any;
  }) => {
    return api.postExport(payload);
  };
  return { exportData: call };
};
