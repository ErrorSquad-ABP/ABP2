import axios from "axios";
import type { PaginatedResponse, Sima } from "../types/sima";

// Monta a URL com a porta do backend vinda do compose
const API_BASE =
  import.meta.env.VITE_API_URL ||
  import.meta.env.VITE_SERVER_URL ||
  `http://localhost:${import.meta.env.VITE_SERVER_PORT || 3000}`;

export const getSima = async (
  page: number = 1,
  limit: number = 20,
): Promise<PaginatedResponse<Sima>> => {
  const response = await axios.get<PaginatedResponse<Sima>>(
    `${API_BASE}/sima/sima/all?page=${page}&limit=${limit}`,
  );
  return response.data;
};
