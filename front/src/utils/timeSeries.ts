/* eslint-disable @typescript-eslint/no-explicit-any */

type Aggregator = "sum" | "avg" | "min" | "max" | "count";

export interface PrepareTimeSeriesOptions {
  timestampKeys?: string[];
  valueKeys?: string[];
  groupKeys?: string[];
  aggregator?: Aggregator;
  pathSeparator?: string;
  timestampParser?: (raw: any) => string | null;
  valueParser?: (raw: any) => number | null;
}

export interface SeriesPoint {
  t: string;
  v: number;
}

export interface TimeSeries {
  seriesId: string;
  meta?: Record<string, any>;
  points: SeriesPoint[];
}

export function prepareTimeSeries(
  data: unknown[],
  options: PrepareTimeSeriesOptions = {},
): TimeSeries[] {
  const {
    timestampKeys = ["timestamp", "time", "ts", "date"],
    valueKeys = ["value", "val", "y", "v"],
    groupKeys = [],
    aggregator = "sum",
    pathSeparator = ".",
    timestampParser,
    valueParser,
  } = options;

  const parseTimestamp =
    timestampParser ??
    ((raw: any) => {
      if (raw == null) return null;

      if (raw instanceof Date) return raw.toISOString();

      if (typeof raw === "number") {
        const asMs = raw > 1e12 ? raw : raw > 1e9 ? raw * 1000 : raw;
        return new Date(asMs).toISOString();
      }

      if (typeof raw === "string") {
        const d = new Date(raw);
        if (!isNaN(d.getTime())) return d.toISOString();

        const num = Number(raw);
        if (!Number.isNaN(num)) {
          const asMs = num > 1e12 ? num : num > 1e9 ? num * 1000 : num;
          return new Date(asMs).toISOString();
        }
      }
      return null;
    });

  const parseValue =
    valueParser ??
    ((raw: any) => {
      if (raw == null) return null;
      if (typeof raw === "number") {
        if (!Number.isFinite(raw)) return null;
        return raw;
      }
      if (typeof raw === "string") {
        const n = Number(raw);
        if (!Number.isNaN(n)) return n;
        return null;
      }

      if (typeof raw === "boolean") return raw ? 1 : 0;
      return null;
    });

  const aggStore: Map<string, Map<string, number[]>> = new Map();
  const seriesMeta: Map<string, Record<string, any>> = new Map();

  const isPlainObject = (x: any) =>
    x !== null && typeof x === "object" && !Array.isArray(x) && !(x instanceof Date);

  function traverse(node: any, parentSeriesBase: Record<string, any>, pathParts: string[]) {
    if (node == null) return;

    if (Array.isArray(node)) {
      for (let i = 0; i < node.length; i++) {
        traverse(node[i], parentSeriesBase, [...pathParts, String(i)]);
      }
      return;
    }

    if (isPlainObject(node)) {
      const keys = Object.keys(node);

      let foundTimestampKey: string | null = null;
      let foundValueKey: string | null = null;
      for (const k of keys) {
        if (timestampKeys.includes(k)) foundTimestampKey = k;
        if (valueKeys.includes(k)) foundValueKey = k;
      }

      if (foundTimestampKey && foundValueKey) {
        const rawTs = node[foundTimestampKey];
        const rawVal = node[foundValueKey];
        const iso = parseTimestamp(rawTs);
        const val = parseValue(rawVal);
        if (iso !== null && val !== null) {
          const seriesId = makeSeriesId(parentSeriesBase, pathParts);
          storePoint(seriesId, iso, val);

          const metaCandidate = { ...node };
          delete (metaCandidate as any)[foundTimestampKey];
          delete (metaCandidate as any)[foundValueKey];
          if (!seriesMeta.has(seriesId)) seriesMeta.set(seriesId, {});
          Object.assign(seriesMeta.get(seriesId)!, metaCandidate);
        }
      }

      const timestampLikeKeys = keys.filter((k) => parseTimestamp(k) !== null);
      if (timestampLikeKeys.length >= Math.max(1, Math.floor(keys.length / 2))) {
        for (const k of timestampLikeKeys) {
          const iso = parseTimestamp(k)!;
          const val = parseValue((node as any)[k]);
          if (iso !== null && val !== null) {
            const seriesId = makeSeriesId(parentSeriesBase, pathParts);
            storePoint(seriesId, iso, val);
          }
        }
      }

      for (const k of keys) {
        const child = node[k];

        traverse(child, parentSeriesBase, [...pathParts, k]);
      }
      return;
    }

    return;
  }

  function makeSeriesId(parentSeriesBase: Record<string, any>, pathParts: string[]) {
    const parts: string[] = [];
    if (groupKeys && groupKeys.length > 0) {
      for (const gk of groupKeys) {
        const v = parentSeriesBase?.[gk];
        parts.push(`${gk}=${String(v ?? "null")}`);
      }
    }
    if (pathParts.length > 0) {
      parts.push(pathParts.join(pathSeparator));
    }
    const id = parts.length ? parts.join("|") : "series";
    return id;
  }

  function storePoint(seriesId: string, isoTs: string, value: number) {
    if (!aggStore.has(seriesId)) aggStore.set(seriesId, new Map());
    const tsMap = aggStore.get(seriesId)!;
    if (!tsMap.has(isoTs)) tsMap.set(isoTs, []);
    tsMap.get(isoTs)!.push(value);
  }

  for (const item of data) {
    const parentBase: Record<string, any> = {};
    if (groupKeys && groupKeys.length > 0 && isPlainObject(item)) {
      for (const gk of groupKeys) {
        parentBase[gk] = (item as any)[gk];
      }
    }

    traverse(item, parentBase, []);
  }

  const result: TimeSeries[] = [];
  for (const [seriesId, tsMap] of aggStore.entries()) {
    const entries: SeriesPoint[] = [];
    for (const [isoTs, vals] of tsMap.entries()) {
      let aggregated: number;
      if (aggregator === "sum") {
        aggregated = vals.reduce((a, b) => a + b, 0);
      } else if (aggregator === "avg") {
        aggregated = vals.reduce((a, b) => a + b, 0) / vals.length;
      } else if (aggregator === "min") {
        aggregated = vals.reduce((a, b) => (a < b ? a : b), vals[0]);
      } else if (aggregator === "max") {
        aggregated = vals.reduce((a, b) => (a > b ? a : b), vals[0]);
      } else if (aggregator === "count") {
        aggregated = vals.length;
      } else {
        aggregated = vals.reduce((a, b) => a + b, 0);
      }
      entries.push({ t: isoTs, v: aggregated });
    }

    entries.sort((a, b) => (a.t < b.t ? -1 : a.t > b.t ? 1 : 0));
    result.push({
      seriesId,
      meta: seriesMeta.get(seriesId),
      points: entries,
    });
  }

  result.sort((a, b) => (a.seriesId < b.seriesId ? -1 : a.seriesId > b.seriesId ? 1 : 0));
  return result;
}
