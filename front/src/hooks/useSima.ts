import { useEffect, useState } from "react";
import { getSima } from "../api/simaApi";
import type { PaginatedResponse, Sima } from "../types/sima";

export const useSima = (page: number = 1, limit: number = 20) => {
  const [data, setData] = useState<PaginatedResponse<Sima> | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    getSima(page, limit)
      .then((res) => {
        setData(res);
        setError(null);
      })
      .catch((err) => {
        setError(err.message || "Erro ao buscar dados de Sima");
      })
      .finally(() => setLoading(false));
  }, [page, limit]);

  return { data, loading, error };
};
