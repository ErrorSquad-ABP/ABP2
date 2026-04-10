import { useQuery } from "@tanstack/react-query";
import { fetchTablesMetadataBundle } from "../api/tablesPageClient";

export function useTablesMetadataQuery(topicSlug: string) {
  return useQuery({
    queryKey: ["tables", "metadata", topicSlug],
    queryFn: () => fetchTablesMetadataBundle(topicSlug),
    staleTime: 5 * 60_000,
  });
}
