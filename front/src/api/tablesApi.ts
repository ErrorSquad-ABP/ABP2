// front/src/api/tablesApi.ts
import api from "./axios";

/**
 * Endpoints esperados:
 * GET  /reservatorios
 * GET  /instituicoes
 * GET  /data/union
 * GET  /tables/:table/data
 * GET  /tables/:table/data/by-reservatorio
 * GET  /tables/:table/data/by-instituicao
 * GET  /tables/:table/columns
 * GET  /tables/:table/metadata
 * GET  /tables/:table/aggregate
 * GET  /tables/:table/map
 * POST /export
 */

export const getReservatorios = async () => {
  const { data } = await api.get("/reservatorios");
  return data;
};

export const getInstituicoes = async () => {
  const { data } = await api.get("/instituicoes");
  return data;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getDataUnion = async (params?: Record<string, any>) => {
  const { data } = await api.get("/data/union", { params });
  return data;
};

export const getTableColumns = async (table: string) => {
  const { data } = await api.get(`/tables/${encodeURIComponent(table)}/columns`);
  return data;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getTableData = async (table: string, params?: Record<string, any>) => {
  const { data } = await api.get(`/tables/${encodeURIComponent(table)}/data`, { params });
  return data;
};

export const getTableDataByReservatorio = async (
  table: string,
  reservatorioId: number,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params?: Record<string, any>,
) => {
  const { data } = await api.get(`/tables/${encodeURIComponent(table)}/data/by-reservatorio`, {
    params: { reservatorioId, ...params },
  });
  return data;
};

export const getTableDataByInstituicao = async (
  table: string,
  instituicaoId: number,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params?: Record<string, any>,
) => {
  const { data } = await api.get(`/tables/${encodeURIComponent(table)}/data/by-instituicao`, {
    params: { instituicaoId, ...params },
  });
  return data;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getTableAggregate = async (table: string, params?: Record<string, any>) => {
  const { data } = await api.get(`/tables/${encodeURIComponent(table)}/aggregate`, { params });
  return data;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getTableMap = async (table: string, params?: Record<string, any>) => {
  const { data } = await api.get(`/tables/${encodeURIComponent(table)}/map`, { params });
  return data;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const postExport = async (payload: { format: "csv" | "json" | "pdf"; query: any }) => {
  const { data } = await api.post("/export", payload, {
    responseType: payload.format === "pdf" ? "blob" : "json",
  });
  return data;
};

export function getTableMetadata(/*table: string*/): Promise<
  import("../hooks/useApiHooks").TableMetadata
> {
  throw new Error("Function not implemented.");
}
