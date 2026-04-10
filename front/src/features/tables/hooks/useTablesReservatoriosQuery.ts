import { useQuery } from "@tanstack/react-query";
import { fetchNormalizedReservatorios } from "../api/tablesPageClient";

export function useTablesReservatoriosQuery() {
  return useQuery({
    queryKey: ["tables", "reservatorios", "furnas"],
    queryFn: fetchNormalizedReservatorios,
    staleTime: 30 * 60_000,
  });
}
