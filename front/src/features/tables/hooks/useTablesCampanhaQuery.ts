import { useQuery } from "@tanstack/react-query";
import { fetchTbcampanhaRows } from "../api/tablesPageClient";

export function useTablesCampanhaQuery() {
  return useQuery({
    queryKey: ["tables", "campanha", "furnas", "tbcampanha"],
    queryFn: fetchTbcampanhaRows,
    staleTime: 5 * 60_000,
  });
}
