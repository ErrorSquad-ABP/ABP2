import axios from "axios";
import type { PaginatedResponse, Sima } from "../types/sima";

// Monta a URL com a porta do backend vinda do compose
const SERVER_PORT = import.meta.env.VITE_SERVER_PORT || "3000";
const API_BASE = `http://localhost:${SERVER_PORT}`;

export const getSima = async (
  page: number = 1,
  limit: number = 20,
): Promise<PaginatedResponse<Sima>> => {
  const response = await axios.get<PaginatedResponse<Sima>>(
    `${API_BASE}/sima/sima/all?page=${page}&limit=${limit}`,
  );
  return response.data;
};
