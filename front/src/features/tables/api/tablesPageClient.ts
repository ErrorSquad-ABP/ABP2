/* eslint-disable @typescript-eslint/no-explicit-any -- respostas da API limnológica são heterogéneas */
import { API_BASE } from "../../../config/apiBase";

export type TableOption = { api: string; label: string };

export type TablesMetadataBundle = {
  metadata: any[];
  tablesOptions: TableOption[];
  columnsFromMetadata: Record<string, any>;
  responsibleFromMetadata: Record<string, any>;
};

export type NormalizedReservoir = {
  idreservatorio: unknown;
  id: string;
  nome: string;
  latitude: number | null;
  longitude: number | null;
  raw: unknown;
};

export async function fetchTablesMetadataBundle(topicSlug: string): Promise<TablesMetadataBundle> {
  const empty: TablesMetadataBundle = {
    metadata: [],
    tablesOptions: [],
    columnsFromMetadata: {},
    responsibleFromMetadata: {},
  };

  try {
    const metaRes = await fetch(`${API_BASE}/metadata/${encodeURIComponent(topicSlug)}`);
    if (!metaRes.ok) return empty;

    const m = await metaRes.json();
    const data = m.data ?? [];
    const metadata = Array.isArray(data) ? data : [];

    const opts = metadata
      .map((item: any) => {
        const api = item.id || item.name || item.tableName || item.apiName;
        const label = item.name || item.title || item.label || String(api);
        return { api: String(api), label: String(label) };
      })
      .filter((opt) => !!opt.api);

    const clms: Record<string, any> = {};
    const resp: Record<string, any> = {};
    metadata.forEach((tb: any) => {
      const apiName = tb.id || tb.name || tb.tableName || tb.apiName;
      if (apiName) {
        clms[apiName] = tb.colunas ?? tb.columns ?? tb.coluna ?? [];
        resp[apiName] = tb.responsible ?? tb.responsibleName ?? tb.source ?? "";
      }
    });

    return {
      metadata,
      tablesOptions: opts,
      columnsFromMetadata: clms,
      responsibleFromMetadata: resp,
    };
  } catch (err) {
    console.error("Error fetching metadata: ", err);
    return empty;
  }
}

function parseNumber(v: unknown): number | null {
  if (v == null) return null;
  if (typeof v === "number") return Number.isFinite(v) ? v : null;
  const s = String(v).replace(",", ".").trim();
  const n = Number(s);
  return Number.isFinite(n) ? n : null;
}

export async function fetchNormalizedReservatorios(): Promise<NormalizedReservoir[]> {
  try {
    const url = `${API_BASE}/tables/furnas/tbreservatorio?colunas=nome,idreservatorio,lat,lng`;
    const res = await fetch(url);
    let rowsRaw: any[] = [];
    if (!res.ok) {
      const res2 = await fetch(`${API_BASE}/furnas/reservatorio/all`);
      if (!res2.ok) return [];
      const json2 = await res2.json();
      rowsRaw = Array.isArray(json2) ? json2 : (json2?.data ?? json2?.rows ?? []);
    } else {
      const json = await res.json();
      rowsRaw = Array.isArray(json) ? json : (json?.data ?? json?.rows ?? []);
    }

    return (rowsRaw || []).map((r: any) => {
      const rawLat =
        r.lat ??
        r.latitude ??
        r.Latitude ??
        r.latitude_deg ??
        r.latitude_deg_str ??
        r.latitud ??
        r.latitud_str ??
        r.coords?.lat ??
        r.coordinates?.lat ??
        null;
      const rawLon =
        r.lng ??
        r.longitude ??
        r.Longitude ??
        r.longitude_deg ??
        r.longitude_deg_str ??
        r.lon ??
        r.long ??
        r.coords?.lon ??
        r.coordinates?.lon ??
        null;

      const latitude = parseNumber(rawLat);
      const longitude = parseNumber(rawLon);

      return {
        idreservatorio: r.idreservatorio ?? r.id ?? r.idReservatorio ?? r.id_reservatorio ?? null,
        id: String(r.idreservatorio ?? r.id ?? r.idReservatorio ?? r.id_reservatorio ?? ""),
        nome: r.nome ?? r.name ?? r.label ?? "",
        latitude,
        longitude,
        raw: r,
      };
    });
  } catch (err) {
    console.error("Erro ao buscar reservatórios:", err);
    return [];
  }
}

export async function fetchTbcampanhaRows(): Promise<any[]> {
  const endpoint = `${API_BASE}/tables/furnas/tbcampanha`;
  const resp = await fetch(endpoint);
  if (!resp.ok) throw new Error(`fetch failed: ${resp.status}`);
  const json = await resp.json();
  return Array.isArray(json) ? json : json?.data || json?.rows || [];
}

export function inferColumnsFromFirstRow(rows: any[]): Array<{ nome: string; label: string; type: string }> {
  if (!rows?.length) return [];
  const keys = Object.keys(rows[0] || {}).map((k) => {
    const val = rows[0][k];
    const type =
      typeof val === "number"
        ? "number"
        : /data|hora|inicio|fim|medida/i.test(k)
          ? "date"
          : "string";
    return { nome: k, label: k, type };
  });
  return keys;
}

export async function tryFetchColumnsForTable(
  apiTable: string,
  provider: string,
): Promise<Array<{ nome: string; label: string; type: string }>> {
  if (!apiTable) return [];

  const tryUrls: string[] = [
    `${API_BASE}/tables/${provider}/${encodeURIComponent(apiTable)}`,
    `${API_BASE}/tables/${provider}/${encodeURIComponent(apiTable)}?colunas=dataMedida,idreservatorio`,
    `${API_BASE}/tables/${provider}/${encodeURIComponent(apiTable)}?colunas=dataMedida`,
    `${API_BASE}/${provider}/${encodeURIComponent(apiTable)}`,
    `${API_BASE}/tables/${encodeURIComponent(apiTable)}`,
    `${API_BASE}/${encodeURIComponent(apiTable)}`,
  ];

  for (const url of tryUrls) {
    try {
      console.debug("[fetchColumnsForTable] trying url:", url);
      const res = await fetch(url);
      if (!res.ok) {
        console.debug("[fetchColumnsForTable] not ok:", res.status, url);
        continue;
      }
      const j = await res.json();
      const rows = Array.isArray(j) ? j : j?.data || j?.rows || [];
      if (rows && rows.length) {
        return inferColumnsFromFirstRow(rows);
      }
    } catch (err) {
      console.warn("[fetchColumnsForTable] attempt error:", err);
      continue;
    }
  }

  console.warn("[fetchColumnsForTable] no columns found for", apiTable);
  return [];
}

export async function fetchMergedTableRows(params: {
  apiTable: string;
  provider: string;
  dataCol: string;
  selectedColumns: string[];
  idsToUse: (string | number)[];
}): Promise<any[]> {
  const { apiTable, provider, dataCol, selectedColumns, idsToUse } = params;
  const cols = [dataCol, ...selectedColumns].filter(Boolean);
  const colsParam = cols.map((c) => encodeURIComponent(c)).join(",");

  const endpoint = `${API_BASE}/tables/${provider}/${encodeURIComponent(apiTable)}?colunas=${colsParam}`;

  const responses = await Promise.all(
    idsToUse.map(async (id) => {
      const url = `${endpoint}&reservatorio=${encodeURIComponent(String(id))}`;
      const resp = await fetch(url);
      if (!resp.ok) {
        console.warn("fetch failed for id", id, resp.status);
        return [];
      }
      const j = await resp.json();
      return Array.isArray(j) ? j : (j?.data ?? j?.rows ?? []);
    }),
  );

  return responses.flat();
}
