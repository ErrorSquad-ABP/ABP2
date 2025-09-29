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

export const getDataUnion = async (params?: Record<string, any>) => {
  const { data } = await api.get("/data/union", { params });
  return data;
};

export const getTableColumns = async (table: string) => {
  const { data } = await api.get(`/tables/${encodeURIComponent(table)}/columns`);
  return data;
};

export const getTableData = async (table: string, params?: Record<string, any>) => {
  const { data } = await api.get(`/tables/${encodeURIComponent(table)}/data`, { params });
  return data;
};

export const getTableDataByReservatorio = async (
  table: string,
  reservatorioId: number,
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
  params?: Record<string, any>,
) => {
  const { data } = await api.get(`/tables/${encodeURIComponent(table)}/data/by-instituicao`, {
    params: { instituicaoId, ...params },
  });
  return data;
};

export const getTableMetadata = async (table: string) => {
  const { data } = await api.get(`/tables/${encodeURIComponent(table)}/metadata`);
  return data;
};

export const getTableAggregate = async (table: string, params?: Record<string, any>) => {
  const { data } = await api.get(`/tables/${encodeURIComponent(table)}/aggregate`, { params });
  return data;
};

export const getTableMap = async (table: string, params?: Record<string, any>) => {
  const { data } = await api.get(`/tables/${encodeURIComponent(table)}/map`, { params });
  return data;
};

export const postExport = async (payload: { format: "csv" | "json" | "pdf"; query: any }) => {
  const { data } = await api.post("/export", payload, {
    responseType: payload.format === "pdf" ? "blob" : "json",
  });
  return data;
};
