import { useQuery } from "@tanstack/react-query";
import { fetchSimaStationsList, type SimaStationRow } from "../api/simaTablesClient";

export function useSimaStationsQuery() {
  return useQuery({
    queryKey: ["sima", "stations", "tbestacao"],
    queryFn: fetchSimaStationsList,
    staleTime: 5 * 60_000,
  });
}

export type { SimaStationRow };
