import axios from "axios";

const API_BASE_URL = `http://localhost:${import.meta.env.VITE_SERVER_PORT || 3001}/api/furnas`;

export interface DownloadParams {
  startDate?: string;
  endDate?: string;
  columns?: string[];
  filters?: Record<string, any>;
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
