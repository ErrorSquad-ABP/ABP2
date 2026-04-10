import axios from "axios";
import type { PaginatedResponse, Sima } from "../types/sima";
import { simaRecordsListPath } from "../features/sima/api/simaEndpoints";

export const getSima = async (
  page: number = 1,
  limit: number = 20,
): Promise<PaginatedResponse<Sima>> => {
  const response = await axios.get<PaginatedResponse<Sima>>(simaRecordsListPath(page, limit));
  return response.data;
};
