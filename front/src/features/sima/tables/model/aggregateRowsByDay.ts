import { isoDate } from "../../../../utils/limnologicData";

/** Agrega linhas brutas por dia (média numérica por coluna). */
export function aggregateRowsByDay(rows: unknown[], cols: string[]): Record<string, unknown>[] {
  const map = new Map<string, Record<string, number[]>>();
  for (const r of rows) {
    if (!r || typeof r !== "object") continue;
    const row = r as Record<string, unknown>;
    const dateVal =
      row.dataHora ?? row.datahora ?? row.datamedida ?? row.inicio ?? row.fim ?? row.data ?? null;
    if (!dateVal) continue;
    const d = new Date(dateVal as string | number | Date);
    if (isNaN(d.getTime())) continue;
    const day = isoDate(d);
    if (!map.has(day)) map.set(day, {});
    const rec = map.get(day)!;
    for (const c of cols) {
      const raw = row[c] ?? null;
      const num = Number(raw);
      if (!Number.isFinite(num)) continue;
      if (!rec[c]) rec[c] = [];
      rec[c].push(num);
    }
  }
  return Array.from(map.entries())
    .sort((a, b) => new Date(a[0]).getTime() - new Date(b[0]).getTime())
    .map(([day, rec]) => {
      const obj: Record<string, unknown> = { day };
      for (const c of cols) {
        const arr = rec[c] ?? [];
        obj[c] = arr.length
          ? Number((arr.reduce((s, v) => s + v, 0) / arr.length).toFixed(6))
          : Number.NaN;
      }
      return obj;
    });
}
