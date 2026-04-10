import { isoDate } from "../../../../utils/limnologicData";

/** Filtra linhas brutas da API SIMA por estações e intervalo de dias (ISO yyyy-mm-dd). */
export function filterSimaRowsByStationsAndDateRange(
  rows: unknown[],
  stationSet: Set<string>,
  startDate: string,
  endDate: string,
): Record<string, unknown>[] {
  const out: Record<string, unknown>[] = [];
  for (const raw of rows || []) {
    if (!raw || typeof raw !== "object") continue;
    const r = raw as Record<string, unknown>;
    const sid = String(r.idestacao ?? r.id ?? "").trim();
    if (!stationSet.has(sid)) continue;
    const dv = r.dataHora ?? r.datahora ?? r.datamedida ?? r.inicio ?? r.fim ?? r.data ?? null;
    if (dv == null) continue;
    const d = new Date(dv as string | number | Date);
    if (isNaN(d.getTime())) continue;
    const day = isoDate(d);
    if (day >= startDate && day <= endDate) out.push(r);
  }
  return out;
}
