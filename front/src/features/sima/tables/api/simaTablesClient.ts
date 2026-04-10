import { simaTablesPath } from "../../api/simaEndpoints";
import { isoDate } from "../../../../utils/limnologicData";

export type SimaStationRow = { id: string; name: string; lat?: number; lng?: number };

/** Busca estações (com fallback sem lat/lng). */
export async function fetchSimaStationsList(): Promise<SimaStationRow[]> {
  try {
    const url = simaTablesPath("tbestacao", ["idestacao", "rotulo", "lat", "lng"]);
    const res = await fetch(url);
    if (!res.ok) {
      const url2 = simaTablesPath("tbestacao", ["idestacao", "rotulo"]);
      const res2 = await fetch(url2);
      if (!res2.ok) return [];
      const j2 = await res2.json();
      const rows2 = Array.isArray(j2) ? j2 : j2?.data || j2?.rows || [];
      const list2 = (rows2 || [])
        .map((r: Record<string, unknown>) => {
          const idRaw = r.idestacao ?? r.id ?? null;
          const nameRaw = r.rotulo ?? r.nome ?? r.name ?? null;
          if (!idRaw) return null;
          const id = String(idRaw).trim();
          const name = nameRaw ? String(nameRaw).trim() : `Estação ${id}`;
          return { id, name };
        })
        .filter(Boolean) as SimaStationRow[];
      return list2;
    }
    const j = await res.json();
    const rows = Array.isArray(j) ? j : j?.data || j?.rows || [];
    const list = (rows || [])
      .map((r: Record<string, unknown>) => {
        const idRaw = r.idestacao ?? r.id ?? null;
        const nameRaw = r.rotulo ?? r.nome ?? r.name ?? null;
        if (!idRaw) return null;
        const id = String(idRaw).trim();
        const name = nameRaw ? String(nameRaw).trim() : `Estação ${id}`;
        const lat = r.lat ?? r.latitude ?? null;
        const lng = r.lng ?? r.longitude ?? null;
        return {
          id,
          name,
          lat: typeof lat === "number" ? lat : lat ? Number(lat) : undefined,
          lng: typeof lng === "number" ? lng : lng ? Number(lng) : undefined,
        };
      })
      .filter(Boolean) as SimaStationRow[];
    const map: Record<string, { name: string; lat?: number; lng?: number }> = {};
    list.forEach((l) => (map[l.id] = { name: l.name, lat: l.lat, lng: l.lng }));
    return Object.entries(map)
      .map(([id, info]) => ({ id, name: info.name, lat: info.lat, lng: info.lng }))
      .sort((a, b) => a.name.localeCompare(b.name));
  } catch {
    return [];
  }
}

export async function fetchDatesForTableAndStations(
  tableName: string,
  stations: string[],
): Promise<string[]> {
  const endpoint =
    tableName === "tbsima"
      ? simaTablesPath("tbsima", ["dataHora", "idestacao"])
      : simaTablesPath("tbsimaoffline", ["dataHora", "idestacao"]);
  try {
    const resp = await fetch(endpoint);
    if (!resp.ok) return [];
    const json = await resp.json();
    const rows = Array.isArray(json) ? json : json?.data || json?.rows || [];
    const stationSet = new Set(stations.map((s) => String(s).trim()));
    const foundDates = new Set<string>();
    for (const r of rows) {
      const row = r as Record<string, unknown>;
      const sid = String(row.idestacao ?? row.id ?? "").trim();
      if (!stationSet.has(sid)) continue;
      const dtRaw = row.dataHora ?? row.datahora ?? row.datamedida ?? null;
      if (!dtRaw) continue;
      const d = new Date(dtRaw as string);
      if (!isNaN(d.getTime())) foundDates.add(isoDate(d));
      else {
        const maybe = String(dtRaw).slice(0, 10);
        if (/^\d{4}-\d{2}-\d{2}$/.test(maybe)) foundDates.add(maybe);
      }
    }
    return Array.from(foundDates).sort(
      (a, b) => new Date(a).getTime() - new Date(b).getTime(),
    );
  } catch {
    return [];
  }
}

export type ColumnMeta = { nome: string; label: string; type: string };

export async function fetchColumnsForTable(tableName: string): Promise<ColumnMeta[]> {
  try {
    const url = simaTablesPath(tableName);
    const res = await fetch(url);
    if (!res.ok) return [];
    const j = await res.json();
    const rows = j.data;
    if (rows && rows.length) {
      const first = rows[0] as Record<string, unknown>;
      return Object.keys(first || {}).map((k) => {
        const val = first[k];
        const type =
          typeof val === "number"
            ? "number"
            : /data|hora|inicio|fim/i.test(k)
              ? "date"
              : "string";
        return { nome: k, label: k, type };
      });
    }
  } catch {
    /* ignore */
  }
  return [];
}

export async function fetchSimaRows(
  table: "tbsima" | "tbsimaoffline",
  cols: string[],
): Promise<unknown[]> {
  const endpoint =
    table === "tbsima" ? simaTablesPath("tbsima", cols) : simaTablesPath("tbsimaoffline", cols);
  const resp = await fetch(endpoint);
  if (!resp.ok) {
    throw new Error(`fetch failed: ${resp.status} ${resp.statusText}`);
  }
  const json = await resp.json();
  const rows = Array.isArray(json) ? json : json?.data || json?.rows || [];
  return rows || [];
}
