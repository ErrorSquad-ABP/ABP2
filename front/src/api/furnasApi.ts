import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || import.meta.env.VITE_SERVER_URL || `http://localhost:${import.meta.env.VITE_SERVER_PORT || 3001}`;
const API_BASE_URL = `${API_BASE}/api/furnas`;

export interface DownloadParams {
  startDate?: string;
  endDate?: string;
  columns?: string[];
  filters?: Record<string, string | number | boolean | null | undefined>;
}

export const furnasApi = {
  // Download endpoints
  downloadCSV: (table: string, params: DownloadParams) =>
    axios.get(`${API_BASE_URL}/${table}/download/csv`, {
      params,
      responseType: "blob",
    }),

  downloadJSON: (table: string, params: DownloadParams) =>
    axios.get(`${API_BASE_URL}/${table}/download/json`, {
      params,
      responseType: "blob",
    }),

  downloadPDF: (table: string, params: DownloadParams) =>
    axios.get(`${API_BASE_URL}/${table}/download/pdf`, {
      params,
      responseType: "blob",
    }),

  // Data endpoints existentes
  getTableData: (table: string, page: number = 1, limit: number = 10) =>
    axios.get(`${API_BASE_URL}/${table}/all`, {
      params: { page, limit },
    }),
};
