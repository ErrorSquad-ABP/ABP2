/* eslint-disable @typescript-eslint/no-explicit-any */
// front/src/pages/SimaTablesPage.tsx
import { JSX, useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import MapBrazil from "../components/MapBrazil";
// import SimaTable from "../components/SimaTable";

/**
 * SimaTablesPage.tsx
 *
 * Fluxo:
 * 1) escolher estações (uma ou várias)
 * 2) escolher tabela (tbsima | tbsimaoffline)
 * 3) escolher período (datas filtradas por estação)
 * 4) escolher colunas (id/data desabilitadas) -> Gerar gráfico
 *
 * Alteração principal: handleGenerate() agora solicita diretamente:
 *  /tables/sima/{tbsima|tbsimaoffline}?all=true&colunas=idestacao,dataHora,<colunas selecionadas>
 * e filtra localmente por idestacao e intervalo de datas.
 */

const API_BASE = (import.meta as any)?.env?.VITE_API_URL || "http://localhost:3001";

/* ---------------- helpers & constants ---------------- */

function isoDate(date: Date) {
  return date.toISOString().slice(0, 10);
}

const SERIES_COLORS: string[] = [
  "#0B8A3E",
  "#2563EB",
  "#06B6D4",
  "#F59E0B",
  "#EF4444",
  "#10B981",
  "#7C3AED",
];
const INSTITUTION_FILL_COLORS: string[] = [
  "#ffd6d6",
  "#fff0d6",
  "#d6ffe8",
  "#dff4ff",
  "#f0e6ff",
  "#fff8d6",
];

function monthsBetweenDatesISO(startISO: string, endISO: string) {
  const start = new Date(startISO + "T00:00:00");
  const end = new Date(endISO + "T00:00:00");
  const res: string[] = [];
  const s = new Date(start.getFullYear(), start.getMonth(), 1);
  const e = new Date(end.getFullYear(), end.getMonth(), 1);
  for (let dt = new Date(s); dt <= e; dt.setMonth(dt.getMonth() + 1)) {
    const y = dt.getFullYear();
    const m = (dt.getMonth() + 1).toString().padStart(2, "0");
    res.push(`${y}/${m}/01`);
  }
  return res;
}

function makeMockMeasurementsForMonths(months: string[]) {
  return months.map((m, i) => {
    const inst = ["INPE", "FURNAS", "BALCAR", "UFRJ", "USP"][i % 5];
    const reserv = `Represa ${String.fromCharCode(65 + (i % 6))}`;
    const datamedida = m.replace(/\//g, "-").slice(0, 10);
    return {
      id: i + 1,
      datamedida,
      dic: +(5 + Math.sin(i / 2) * 2 + Math.random() * 0.6).toFixed(2),
      ph: +(6 + Math.cos(i / 3) * 0.4 + Math.random() * 0.1).toFixed(2),
      profundidade: +(Math.abs(Math.sin(i / 2)) * 10).toFixed(2),
      latitude: -10 + Math.random() * 5,
      longitude: -50 + Math.random() * 5,
      instituicao: inst,
      reservatorio: reserv,
    };
  });
}

/* ================= Styled (adaptado) ================= */

const Page = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(180deg, #f6fbff 0%, #eef6ff 100%);
  color: ${({ theme }) => theme.colors.text.default};
  font-family: "Helvetica Neue", Arial, sans-serif;
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 22px auto;
  padding: 0 24px;
  width: 100%;
  display: grid;
  grid-template-columns: minmax(300px, 460px) minmax(0, 1fr);
  gap: 24px;
  align-items: stretch;
  min-height: 640px;
`;

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  height: 100%;
`;

const Controls = styled.div`
  background: #fff;
  padding: 16px;
  border-radius: 12px;
  box-shadow: 0 8px 28px rgba(6, 58, 128, 0.06);
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 0 0 auto;
`;

const Row = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const Label = styled.label`
  font-size: 13px;
  color: #334155;
  min-width: 100px;
`;

const Select = styled.select`
  padding: 8px 10px;
  border-radius: 8px;
  border: 1px solid rgba(2, 6, 23, 0.06);
  width: 100%;
  background: white;
`;

const ColumnsBox = styled.div`
  background: #fff;
  padding: 14px;
  border-radius: 12px;
  box-shadow: 0 8px 28px rgba(6, 58, 128, 0.04);
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow: auto;
  flex: 1 1 auto;
`;

const ColumnItem = styled.label`
  display: flex;
  gap: 8px;
  align-items: center;
  padding: 8px;
  border-radius: 8px;
`;

const RightPanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ControlsTopRight = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  align-items: center;
`;

const Button = styled.button<{ $primary?: boolean }>`
  padding: 10px 14px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  font-weight: 700;
  background: ${(p) => (p.$primary ? p.theme.colors.primary : "rgba(2,6,23,0.06)")};
  color: ${(p) => (p.$primary ? "#fff" : "#04203a")};
  margin-rigth: ${(p) => (p.$primary ? "12" : "0")};
`;

const Panel = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 12px;
  height: 100%;
  box-shadow: 0 12px 36px rgba(9, 30, 66, 0.06);
`;

const ChartWrapper = styled.div`
  flex: 1;
`;

const ChartMain = styled.div`
  padding: 12px;
  border-radius: 8px;
  background: linear-gradient(180deg, #ffffff 0%, #f8fbff 100%);
  position: relative;
  min-height: 420px;
`;

const Tooltip = styled.div<{ left: number; top: number; color: string }>`
  position: absolute;
  left: ${(p) => p.left}px;
  top: ${(p) => p.top}px;
  transform: translate(-8px, -100%);
  background: #ffffff;
  border-radius: 8px;
  padding: 8px 10px;
  box-shadow: 0 6px 20px rgba(2, 6, 23, 0.12);
  font-size: 13px;
`;

const Legend = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-top: 12px;
`;

const LegendItem = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const MapPlaceholder = styled.div`
  position: relative;
  flex: 1;
  background: linear-gradient(180deg, #0b2340 0%, #082033 100%);
  border-radius: 8px;
  overflow: hidden;
  min-height: 260px;
  padding: 12px;
`;

const ZoomControls = styled.div`
  position: absolute;
  right: 18px;
  top: 18px;
  display: flex;
  gap: 8px;
  z-index: 70;
  background: rgba(255, 255, 255, 0.05);
  padding: 6px;
  border-radius: 8px;
  backdrop-filter: blur(4px);

  button {
    background: rgba(255, 255, 255, 0.08);
    color: #fff;
    border: none;
    padding: 6px 10px;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 700;
  }

  label {
    color: #e6f0ff;
    font-size: 13px;
    display: flex;
    align-items: center;
    gap: 8px;
  }
`;

const TablePreview = styled.div`
  margin-top: 12px;
  border-radius: 8px;
  overflow: auto;
  border: 1px solid #e6eefb;
  background: #fff;
`;

const TableElement = styled.table`
  width: 100%;
  border-collapse: collapse;
  td,
  th {
    padding: 8px;
    border-bottom: 1px solid #f1f5f9;
    text-align: left;
  }
  thead th {
    background: #f8fafc;
    font-weight: 700;
  }
`;

/* ================= Component ================= */

export default function SimaTablesPage(): JSX.Element {
  // stage: 1 stations, 2 table, 3 dates, 4 columns
  const [stage, setStage] = useState<number>(1);

  const [stationsList, setStationsList] = useState<
    { id: string; name: string; lat?: number; lng?: number }[]
  >([]);
  const [selectedStations, setSelectedStations] = useState<string[]>([]);
  const [selectAllStations, setSelectAllStations] = useState(false);

  const [table, setTable] = useState<"tbsima" | "tbsimaoffline">("tbsima");

  const [availableDates, setAvailableDates] = useState<string[]>([]);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const [columnsForTable, setColumnsForTable] = useState<any[]>([]);
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);

  const [chartData, setChartData] = useState<any[] | null>(null);
  const [dataForTablePreview, setDataForTablePreview] = useState<any[] | null>(null);

  const chartRef = useRef<HTMLDivElement | null>(null);
  const chartMainRef = useRef<HTMLDivElement | null>(null);
  const [tooltip, setTooltip] = useState<{
    visible: boolean;
    left: number;
    top: number;
    instituicao?: string;
    reservatorio?: string;
    color?: string;
  }>({ visible: false, left: 0, top: 0 });

  const [view, setView] = useState<"chart" | "map">("chart");
  const [loading, setLoading] = useState(false);
  const [showExportOptions, setShowExportOptions] = useState(false);
  const [showTableView /*setShowTableView*/] = useState<boolean>(false);
  const [, /*showTable*/ setShowTable] = useState<boolean>(false);

  const [zoom, setZoom] = useState<number>(1);
  const [showStateNames, setShowStateNames] = useState<boolean>(true);
  const [pan, setPan] = useState({ x: 0, y: 0 });

  const [page, setPage] = useState(0)

  const MapBrazilAny = MapBrazil as any;

  /* ---------------- fetch stations ---------------- */

  useEffect(() => {
    async function fetchStations() {
      try {
        const url = `${API_BASE}/tables/sima/tbestacao?all=true&colunas=idestacao,rotulo,lat,lng`;
        const res = await fetch(url);
        if (!res.ok) {
          const url2 = `${API_BASE}/tables/sima/tbestacao?all=true&colunas=idestacao,rotulo`;
          const res2 = await fetch(url2);
          if (!res2.ok) {
            setStationsList([]);
            return;
          }
          const j2 = await res2.json();
          const rows2 = Array.isArray(j2) ? j2 : j2?.data || j2?.rows || [];
          const list2 = (rows2 || [])
            .map((r: any) => {
              const idRaw = r.idestacao ?? r.id ?? null;
              const nameRaw = r.rotulo ?? r.nome ?? r.name ?? null;
              if (!idRaw) return null;
              const id = idRaw
              const name = nameRaw ? String(nameRaw).trim() : `Estação ${id}`;
              return { id, name };
            })
            .filter(Boolean);
          setStationsList(list2 as any);
          return;
        }
        const j = await res.json();
        const rows = Array.isArray(j) ? j : j?.data || j?.rows || [];
        const list = (rows || [])
          .map((r: any) => {
            const idRaw = r.idestacao ?? r.id ?? null;
            const nameRaw = r.rotulo ?? r.nome ?? r.name ?? null;
            if (!idRaw) return null;
                        console.log(`Id raw  '${idRaw}'`)
            const id = idRaw
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
          .filter(Boolean) as { id: string; name: string; lat?: number; lng?: number }[];
        const map: Record<string, { name: string; lat?: number; lng?: number }> = {};
        list.forEach((l) => (map[l.id] = { name: l.name, lat: l.lat, lng: l.lng }));
        const final = Object.entries(map)
          .map(([id, info]) => ({ id, name: info.name, lat: info.lat, lng: info.lng }))
          .sort((a, b) => a.name.localeCompare(b.name));
        setStationsList(final);
        setSelectedStations([]);
        setSelectAllStations(false);
      } catch (err) {
        console.error("[stations] fetch error", err);
        setStationsList([]);
      }
    }
    fetchStations();
  }, []);

  /* ---------------- helpers to detect id/date columns ---------------- */
  function isIdColumn(col: string) {
    return /(^id|_id$|(^idestacao$)|\bidestacao\b|_id_|id$)/i.test(col);
  }
  function isDateColumn(col: string) {
    return (
      /^datahora$/i.test(col) ||
      /^data$/i.test(col) ||
      /^datamedida$/i.test(col) ||
      /^inicio$/i.test(col) ||
      /^fim$/i.test(col)
    );
  }

  /* ---------------- when table confirmed: fetch dates (filtered by selected stations) ---------------- */
  async function fetchDatesForTableAndStations(tableName: string, stations: string[]) {
    const endpoint =
      tableName === "tbsima"
        ? `${API_BASE}/tables/sima/tbsima?all=true&colunas=dataHora,idestacao`
        : `${API_BASE}/tables/sima/tbsimaoffline?all=true&colunas=dataHora,idestacao`;
    try {
      const resp = await fetch(endpoint);
      if (!resp.ok) {
        setAvailableDates([]);
        setStartDate("");
        setEndDate("");
        return;
      }
      const json = await resp.json();
      const rows = Array.isArray(json) ? json : json?.data || json?.rows || [];
      const stationSet = new Set(stations.map((s) => String(s).trim()));
      const foundDates = new Set<string>();
      for (const r of rows) {
        const sid = String(r.idestacao ?? r.id ?? "").trim();
        if (!stationSet.has(sid)) continue;
        const dtRaw = r.dataHora ?? r.datahora ?? r.datamedida ?? null;
        if (!dtRaw) continue;
        const d = new Date(dtRaw);
        if (!isNaN(d.getTime())) foundDates.add(isoDate(d));
        else {
          const maybe = String(dtRaw).slice(0, 10);
          if (/^\d{4}-\d{2}-\d{2}$/.test(maybe)) foundDates.add(maybe);
        }
      }
      const arr = Array.from(foundDates).sort(
        (a, b) => new Date(a).getTime() - new Date(b).getTime(),
      );
      setAvailableDates(arr);
      if (arr.length) {
        setStartDate((p) => (p ? p : arr[0]));
        setEndDate((p) => (p ? p : arr[arr.length - 1]));
      } else {
        setStartDate("");
        setEndDate("");
      }
    } catch (err) {
      console.error("[dates] error:", err);
      setAvailableDates([]);
      setStartDate("");
      setEndDate("");
    }
  }

  async function handleConfirmTable() {
    if (!selectedStations.length) {
      alert("Selecione ao menos uma estação antes de confirmar tabela.");
      return;
    }
    setLoading(true);
    await fetchDatesForTableAndStations(table, selectedStations);
    setStage(3);
    setLoading(false);
  }

  /* ---------------- fetch columns for chosen table (sample 1 row) ---------------- */
  async function fetchColumnsForTable(tableName: string) {
    try {
      const url = `${API_BASE}/tables/sima/${encodeURIComponent(tableName)}?all=true`;
      const res = await fetch(url);
      if (!res.ok) {
        setColumnsForTable([]);
        return;
      }
      const j = await res.json();
      console.log("cADU:",j)
      const rows = j.data;
      console.log(j.count)
      if (rows && rows.length) {
        const keys = Object.keys(rows[0] || {}).map((k) => {
          const val = rows[0][k];
          const type =
            typeof val === "number"
              ? "number"
              : /data|hora|inicio|fim/i.test(k)
                ? "date"
                : "string";
          return { nome: k, label: k, type };
        });
        setColumnsForTable(keys);
        return;
      }
    } catch (err) {
      console.warn("[cols] fetch error", err);
    }
    setColumnsForTable([]);
  }

  async function handleConfirmPeriod() {
    if (!startDate || !endDate) {
      alert("Escolha data início e fim.");
      return;
    }
    setLoading(true);
    await fetchColumnsForTable(table);
    setStage(4);
    setLoading(false);
  }

  /* ---------------- station toggles ---------------- */
  function toggleStation(id: string, checked: boolean) {
    if (checked) setSelectedStations((s) => Array.from(new Set([...s, id])));
    else setSelectedStations((s) => s.filter((x) => x !== id));
  }

  /* ---------------- column toggle (prevent id/date selection) ---------------- */
  function toggleColumn(name: string) {
    if (isIdColumn(name) || isDateColumn(name)) return;
    setSelectedColumns((s) => (s.includes(name) ? s.filter((x) => x !== name) : [...s, name]));
  }

  /* ---------------- aggregate rows by day ---------------- */
  function aggregateRowsByDay(rows: any[], cols: string[]) {
    const map = new Map<string, Record<string, number[]>>();
    for (const r of rows) {
      const dateVal =
        r.dataHora ?? r.datahora ?? r.datamedida ?? r.inicio ?? r.fim ?? r.data ?? null;
      if (!dateVal) continue;
      const d = new Date(dateVal);
      if (isNaN(d.getTime())) continue;
      const day = isoDate(d);
      if (!map.has(day)) map.set(day, {});
      const rec = map.get(day)!;
      for (const c of cols) {
        const raw = r[c] ?? r[c.toLowerCase?.()] ?? null;
        const num = Number(raw);
        if (!Number.isFinite(num)) continue;
        if (!rec[c]) rec[c] = [];
        rec[c].push(num);
      }
    }
    const out = Array.from(map.entries())
      .sort((a, b) => new Date(a[0]).getTime() - new Date(b[0]).getTime())
      .map(([day, rec]) => {
        const obj: any = { day };
        for (const c of cols) {
          const arr = rec[c] ?? [];
          obj[c] = arr.length
            ? Number((arr.reduce((s, v) => s + v, 0) / arr.length).toFixed(6))
            : NaN;
        }
        return obj;
      });
    return out;
  }

  /* ---------------- handleGenerate: fetch full dataset for chosen columns, filter by station/date, aggregate ---------------- */

   async function handleGenerateChart() {
    console.log("[generate] start", { table, selectedColumns, startDate, endDate, selectedStations });
    if (!selectedStations.length) {
      alert("Selecione ao menos uma estação.");
      return;
    }
    
    if (!selectedColumns.length) {
      alert("Selecione ao menos uma coluna para plotar.");
      return;
    }
    if (!startDate || !endDate) {
      alert("Escolha período.");
      return;
    }
    setLoading(true);

    try {
      // Build cols param including idestacao and dataHora (server expects these names)
      const cols = ["idestacao", "dataHora", ...selectedColumns];
      const colsParam = cols.map((c) => encodeURIComponent(c)).join(",");

      // choose endpoint based on table
      const endpoint =
        table === "tbsima"
          ? `${API_BASE}/tables/sima/tbsima?all=true&colunas=${colsParam}`
          : `${API_BASE}/tables/sima/tbsimaoffline?all=true&colunas=${colsParam}`;

      console.debug("[generate] fetching endpoint:", endpoint);
      const resp = await fetch(endpoint);
      if (!resp.ok) {
        throw new Error(`fetch failed: ${resp.status} ${resp.statusText}`);
      }

      const json = await resp.json();
      const rows = Array.isArray(json) ? json : json?.data || json?.rows || [];
      console.debug("[generate] fetched rows:", rows?.length ?? 0);

      // filter by selectedStations and date range
      const stationSet = new Set(selectedStations.map((s) => String(s).trim()));
      const filtered = (rows || []).filter((r: any) => {
        const sid = String(r.idestacao ?? r.id ?? "");
        if (!stationSet.has(sid)) return false;
        const dv = r.dataHora ?? r.datahora ?? r.datamedida ?? r.inicio ?? r.fim ?? r.data ?? null;
        if (!dv) return false;
        const d = new Date(dv);
        if (isNaN(d.getTime())) return false;
        const day = isoDate(d);
        return day >= startDate && day <= endDate;
      });

      console.debug("[generate] filtered rows:", filtered.length);

      if (!filtered.length) {
        // fallback to mock monthly data
        const months = monthsBetweenDatesISO(startDate, endDate);
        const mock = makeMockMeasurementsForMonths(months);
        const normalized = mock.map((m) => {
          const row: any = { day: m.datamedida };
          selectedColumns.forEach((c) => (row[c] = Number.NaN));
          return row;
        });
        setChartData(normalized);
        setDataForTablePreview(mock); // mock? Onde é usado essa variablçe?
        setShowTable(true); 
        setView("chart");
        setLoading(false);
        return;
      }

      // aggregate by day across filtered rows
      const aggregated = aggregateRowsByDay(filtered, selectedColumns);
      setChartData(aggregated);
      setDataForTablePreview(filtered.slice(0, 500)); // sample for preview
      setShowTable(true);
      setView("chart");
      setTimeout(
        () => chartRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }),
        50,
      );
    } catch (err) {
      console.error("[generate] error fetching/processing data:", err);
      alert("Erro ao gerar gráfico. Veja console para detalhes.");
    } finally {
      setLoading(false);
    }
  }

/* ESSE DADO AQUI É O QUE VOU USAR PARA GERAR AS TABELAS :) ! dataForTablePreview ! */

  useEffect(() => {
    if (dataForTablePreview) {console.log(dataForTablePreview)}
  }, [dataForTablePreview])

  /* ----------------- handle generate table ----------- */

async function handleGenerateGraph () {
    console.debug("[generate] start", { table, selectedColumns, startDate, endDate, selectedStations });
    if (!selectedStations.length) {
      alert("Selecione ao menos uma estação.");
      return;
    }
    if (!selectedColumns.length) {
      alert("Selecione ao menos uma coluna para plotar.");
      return;
    }
    if (!startDate || !endDate) {
      alert("Escolha período.");
      return;
    }
    setLoading(true);

    try {
      // Build cols param including idestacao and dataHora (server expects these names)
      const cols = ["idestacao", "dataHora", ...selectedColumns];
      const colsParam = cols.map((c) => encodeURIComponent(c)).join(",");

      // choose endpoint based on table
      const endpoint = table === "tbsima"
        ? `${API_BASE}/tables/sima/tbsima?all=true&colunas=${colsParam}`
        : `${API_BASE}/tables/sima/tbsimaoffline?all=true&colunas=${colsParam}`;

      console.debug("[generate] fetching endpoint:", endpoint);
      const resp = await fetch(endpoint);
      if (!resp.ok) {
        throw new Error(`fetch failed: ${resp.status} ${resp.statusText}`);
      }

      const json = await resp.json();
      const rows = Array.isArray(json) ? json : json?.data || json?.rows || [];
      console.log("[generate] fetched rows:", rows?.length ?? 0);

      // filter by selectedStations and date range
      const stationSet = new Set(selectedStations.map((s) => String(s) ));
      const filtered = (rows || []).filter((r: any) => {
        const sid = String(r.idestacao ?? r.id ?? "");
        if (!stationSet.has(sid)) return false;
        const dv = r.dataHora ?? r.datahora ?? r.datamedida ?? r.inicio ?? r.fim ?? r.data ?? null;
        if (!dv) return false;
        const d = new Date(dv);
        if (isNaN(d.getTime())) return false;
        const day = isoDate(d);
        return day >= startDate && day <= endDate;
      });

      console.debug("[generate] filtered rows:", filtered.length);

      if (!filtered.length) {
        // fallback to mock monthly data
        const months = monthsBetweenDatesISO(startDate, endDate);
        const mock = makeMockMeasurementsForMonths(months);
        const normalized = mock.map((m) => {
          const row: any = { day: m.datamedida };
          selectedColumns.forEach((c) => (row[c] = Number.NaN));
          return row;
        });
        setChartData(normalized);
        setDataForTablePreview(mock); // mock? Onde é usado essa variablçe?
        setShowTable(true); 
        setView("table");
        setLoading(false);
        return;
      }

      // aggregate by day across filtered rows
      const aggregated = aggregateRowsByDay(filtered, selectedColumns);
      setChartData(aggregated);
      setDataForTablePreview(rows); // sample for preview
      setShowTable(true);
      setView("table");
      setTimeout(() => chartRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 50);
    } catch (err) {
      console.error("[generate] error fetching/processing data:", err);
      alert("Erro ao gerar gráfico. Veja console para detalhes.");
    } finally {
      setLoading(false);
    }
  }

  /* ---------------- derive map points ---------------- */
  const latLonPoints = useMemo(() => {
    const points: { id: string | number; lat: number; lon: number; label?: string }[] = [];

    for (const id of selectedStations) {
      const s = stationsList.find((x) => x.id.trim() === String(id).trim());
      if (s && typeof s.lat === "number" && typeof s.lng === "number") {
        points.push({ id: s.id, lat: s.lat as number, lon: s.lng as number, label: s.name });
      }
    }

    if (!points.length && dataForTablePreview && dataForTablePreview.length) {
      for (const r of dataForTablePreview) {
        if (typeof r.latitude === "number" && typeof r.longitude === "number") {
          points.push({
            id: r.id ?? r.idestacao ?? Math.random(),
            lat: r.latitude,
            lon: r.longitude,
            label: r.reservatorio ?? r.instituicao,
          });
        }
      }
    }

    return points;
  }, [stationsList, selectedStations, dataForTablePreview]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const ev = e as any;
    if (ev.buttons === 1) {
      setPan((prevPan) => ({
        x: prevPan.x + (ev.movementX || 0),
        y: prevPan.y + (ev.movementY || 0),
      }));
    }
  };

  /* ---------------- render ---------------- */
  return (
    <Page>
      <Container>
        <LeftColumn>
          <Controls>
            {/* Stage 1: stations */}
            {stage >= 1 && (
              <>
                <div
                  style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
                >
                  <div style={{ fontWeight: 700 }}>1) Escolha a(s) estação(ões)</div>
                </div>

                <div style={{ marginTop: 8 }}>
                  <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <input
                      type="checkbox"
                      checked={selectAllStations}
                      onChange={(e) => {
                        const v = e.target.checked;
                        setSelectAllStations(v);
                        if (v) setSelectedStations(stationsList.map((s) => s.id));
                        else setSelectedStations([]);
                      }}
                    />
                    <span>Selecionar todas as estações</span>
                  </label>
                </div>

                <div
                  style={{
                    maxHeight: 220,
                    overflowY: "auto",
                    marginTop: 8,
                    padding: 8,
                    border: "1px solid #eef2ff",
                    borderRadius: 8,
                  }}
                >
                  {stationsList.length ? (
                    stationsList.map((s) => {
                      const checked = selectedStations.includes(s.id);
                      return (
                        <div
                          key={s.id}
                          style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}
                        >
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={(e) => {
                              setSelectAllStations(false);
                              toggleStation(s.id, e.target.checked);
                            }}
                          />
                          <div>{s.name}</div>
                        </div>
                      );
                    })
                  ) : (
                    <div>Carregando estações...</div>
                  )}
                </div>

                <div style={{ marginTop: 12 }}>
                  <Button
                    $primary
                    onClick={() => {
                      if (!selectedStations.length) {
                        alert("Marque ao menos uma estação para continuar.");
                        return;
                      }
                      setStage(2);
                    }}
                  >
                    Confirmar estações
                  </Button>
                </div>
              </>
            )}

            {/* Stage 2: table */}
            {stage >= 2 && (
              <>
                <div style={{ marginTop: 12, fontWeight: 700 }}>2) Escolha a tabela</div>
                <div style={{ marginTop: 8 }}>
                  <label style={{ display: "flex", gap: 12, alignItems: "center" }}>
                    <input
                      type="radio"
                      name="tb"
                      checked={table === "tbsima"}
                      onChange={() => setTable("tbsima")}
                    />
                    <span>tbsima (online)</span>
                  </label>
                  <label style={{ display: "flex", gap: 12, alignItems: "center", marginTop: 6 }}>
                    <input
                      type="radio"
                      name="tb"
                      checked={table === "tbsimaoffline"}
                      onChange={() => setTable("tbsimaoffline")}
                    />
                    <span>tbsimaoffline (offline)</span>
                  </label>
                </div>

                <div style={{ marginTop: 12 }}>
                  <Button $primary onClick={handleConfirmTable}>
                    Confirmar tabela
                  </Button>
                </div>
              </>
            )}

            {/* Stage 3: dates */}
            {stage >= 3 && (
              <>
                <div style={{ marginTop: 12, fontWeight: 700 }}>3) Escolha o período</div>

                <Row style={{ marginTop: 8 }}>
                  <Label>Data início</Label>
                  <Select value={startDate} onChange={(e) => setStartDate(e.target.value)}>
                    <option value="">Selecione...</option>
                    {availableDates.map((d) => (
                      <option key={`s-${d}`} value={d}>
                        {d.split("-").reverse().join("/")}
                      </option>
                    ))}
                  </Select>
                </Row>

                <Row style={{ marginTop: 8 }}>
                  <Label>Data fim</Label>
                  <Select value={endDate} onChange={(e) => setEndDate(e.target.value)}>
                    <option value="">Selecione...</option>
                    {availableDates.map((d) => (
                      <option key={`e-${d}`} value={d}>
                        {d.split("-").reverse().join("/")}
                      </option>
                    ))}
                  </Select>
                </Row>

                <div style={{ marginTop: 12 }}>
                  <Button $primary onClick={handleConfirmPeriod}>
                    Confirmar período
                  </Button>
                </div>
              </>
            )}
          </Controls>

          {/* Stage 4: columns */}
          {stage >= 4 && (
            <ColumnsBox aria-label="Lista de colunas">
              <div style={{ fontWeight: 700 }}>4) Escolha colunas a plotar</div>
              <div style={{ fontSize: 12, color: "#64748b", marginTop: 6 }}>
                (colunas de id/data estão desabilitadas para plotagem)
              </div>

              <div style={{ marginTop: 8, maxHeight: 320, overflowY: "auto" }}>
                {columnsForTable && columnsForTable.length ? (
                  columnsForTable.map((c: any, idx: number) => {
                    const colName = (c?.nome ?? c?.name ?? String(c)).toString();
                    const disabled = isIdColumn(colName) || isDateColumn(colName);
                    const checked = selectedColumns.includes(colName);
                    return (
                      <ColumnItem key={colName + "-" + idx}>
                        <input
                          type="checkbox"
                          checked={checked}
                          disabled={disabled}
                          onChange={() => toggleColumn(colName)}
                        />
                        <div style={{ display: "flex", flexDirection: "column" }}>
                          <div style={{ fontWeight: 700 }}>
                            {c.label ?? colName}
                            {disabled ? (
                              <small style={{ marginLeft: 8, color: "#94a3b8" }}>
                                (não selecionável)
                              </small>
                            ) : null}
                          </div>
                          <small style={{ color: "#64748b" }}>{c.type ?? "—"}</small>
                        </div>
                      </ColumnItem>
                    );
                  })
                ) : (
                  <div>Carregando colunas...</div>
                )}
              </div>
              <div style={{ margin: 12 }}>
                <Button style={{ marginRight: 10}} $primary onClick={handleGenerateChart} disabled={loading || !(selectedColumns.length > 0)}>{loading ? "Gerando..." : "Gerar gráfico"}</Button>
                <Button $primary onClick={handleGenerateGraph} disabled={loading || !(selectedColumns.length > 0)}>{loading ? "Gerando..." : "Gerar tabela"}</Button>
              </div>
            </ColumnsBox>
          )}
        </LeftColumn>

        <RightPanel>
          <ControlsTopRight>
            <div style={{ display: "flex", gap: 8 }}>
              <Button
                onClick={() => {
                  setStage(1);
                  setSelectedStations([]);
                  setSelectAllStations(false);
                  setColumnsForTable([]);
                  setSelectedColumns([]);
                  setChartData(null);
                  setDataForTablePreview(null);
                  setShowTable(false);
                }}
              >
                Reiniciar
              </Button>

              <Button
                $primary
                onClick={handleGenerateChart}
                disabled={loading || !(stage >= 4 && selectedColumns.length > 0)}
              >
                {loading ? "Gerando..." : "Gerar Gráfico"}
              </Button>

              <Button onClick={() => setView((v) => (v === "chart" ? "map" : "chart"))}>
                {view === "chart" ? "Ver mapa" : "Ver gráfico"}
              </Button>

              <div style={{ position: "relative" }}>
                <Button onClick={() => setShowExportOptions((s) => !s)}>Exportar ▾</Button>
                {showExportOptions && (
                  <div
                    style={{
                      position: "absolute",
                      right: 0,
                      marginTop: 8,
                      background: "#fff",
                      boxShadow: "0 6px 18px rgba(2,6,23,0.12)",
                      borderRadius: 8,
                      padding: 8,
                    }}
                  >
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      <button
                        onClick={() => {
                          /* CSV */
                        }}
                      >
                        CSV
                      </button>
                      <button
                        onClick={() => {
                          /* PDF */
                        }}
                      >
                        PDF
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </ControlsTopRight>

          <Panel ref={chartRef}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 8,
              }}
            >
              <div style={{ fontWeight: 800, color: "#0b2740", fontSize: 16 }}>
                Visualização — {table}
              </div>
              <div style={{ color: "#475569", fontSize: 13 }}>
                {chartData ? `${chartData.length} registros` : "Nenhum dado gerado"}
              </div>
            </div>

            {view === "chart" ? (
              <ChartWrapper>
                <ChartMain
                  ref={chartMainRef}
                  onMouseLeave={() => setTooltip({ visible: false, left: 0, top: 0 })}
                >
                  {chartData && chartData.length && selectedColumns.length ? (
                    <>
                      <MultiSeriesSVG rows={chartData} columns={selectedColumns} />
                      <Legend aria-hidden>
                        {selectedColumns.map((col, i) => (
                          <LegendItem key={col}>
                            <div
                              style={{
                                width: 14,
                                height: 14,
                                borderRadius: 3,
                                background: SERIES_COLORS[i % SERIES_COLORS.length],
                                border: "1px solid rgba(0,0,0,0.06)",
                              }}
                            />
                            <div>{col}</div>
                          </LegendItem>
                        ))}
                      </Legend>
                    </>
                  ) : (
                    <div style={{ padding: 16, color: "#64748b" }}>
                      {stage < 4
                        ? "Complete as etapas à esquerda para gerar o gráfico."
                        : 'Selecione colunas e clique em "Gerar gráfico".'}
                    </div>
                  )}

                  {showTableView && (
                    <TablePreview style={{ marginTop: 12 }}>
                      <TableElement>
                        <thead>
                          <tr>
                            {selectedColumns && selectedColumns.length ? (
                              selectedColumns.map((col) => <th key={col}>{col}</th>)
                            ) : (
                              <th>Sem colunas selecionadas</th>
                            )}
                          </tr>
                        </thead>
                        <tbody>
                          {chartData && chartData.length
                            ? chartData.slice(0, 5).map((row, i) => (
                                <tr key={`row-${i}`}>
                                  {selectedColumns.length
                                    ? selectedColumns.map((col) => (
                                        <td key={`${i}-${col}`}>{String(row[col] ?? "—")}</td>
                                      ))
                                    : Object.keys(row)
                                        .slice(0, 6)
                                        .map((k) => (
                                          <td key={`${i}-${k}`}>{String(row[k] ?? "—")}</td>
                                        ))}
                                </tr>
                              ))
                            : Array.from({ length: 3 }).map((_, r) => (
                                <tr key={`ph-${r}`}>
                                  {selectedColumns && selectedColumns.length ? (
                                    selectedColumns.map((col) => <td key={`ph-${r}-${col}`}>—</td>)
                                  ) : (
                                    <td>—</td>
                                  )}
                                </tr>
                              ))}
                        </tbody>
                      </TableElement>
                    </TablePreview>
                  )}
                </ChartMain>
              </ChartWrapper>
            ) : view === "table" ? 
            <>
            <TablePreview>
                    <TableElement>
                      <thead>
                        <tr>
                          {selectedColumns && selectedColumns.length ? (
                            selectedColumns.map((col) => <th key={col}>{col}</th>)
                          ) : (
                            <th>Sem colunas selecionadas</th>
                          )}
                        </tr>
                      </thead>
                      <tbody>
                        {/* Pagina inicial do slice: QUANTIDADEASERMOSTRADO * page + 1           Pagina final do sçlice: QUANTIDADEASERMOSTRADO * page + QUANTIDADEASERMOSTRADO*/}
                        {chartData && chartData.length
                          ? chartData.slice(10 * page, 10 * page + 10 ).map((row, i) => (
                              <tr key={`row-${i}`}>
                                {selectedColumns.length
                                  ? selectedColumns.map((col) => (
                                      <td key={`${i}-${col}`}>{String(row[col] ?? "—")}</td>
                                    ))
                                  : Object.keys(row)
                                      .slice(0, 6)
                                      .map((k) => (
                                        <td key={`${i}-${k}`}>{String(row[k] ?? "—")}</td>
                                      ))}
                              </tr>
                            ))
                          : Array.from({ length: 3 }).map((_, r) => (
                              <tr key={`ph-${r}`}>
                                {selectedColumns && selectedColumns.length ? (
                                  selectedColumns.map((col) => <td key={`ph-${r}-${col}`}>—</td>)
                                ) : (
                                  <td>—</td>
                                )}
                              </tr>
                            ))}
                      </tbody>
                    </TableElement>
                  </TablePreview>
                  <Button onClick={() => {setPage(page + 1)}}>{">"}</Button>
                  <Button onClick={() => {setPage(page - 1)}}>{"<"}</Button>
                  </>
            : (
              <>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 8,
                  }}
                >
                  <div style={{ fontWeight: 800, color: "#0b2740" }}>Mapa — pontos de coleta</div>
                  <div style={{ color: "#475569", fontSize: 13 }}>{latLonPoints.length} pontos</div>
                </div>

                <MapPlaceholder>
                  <ZoomControls>
                    <label>
                      <input
                        type="checkbox"
                        checked={showStateNames}
                        onChange={(e) => setShowStateNames(e.target.checked)}
                      />
                      <span>Mostrar nomes</span>
                    </label>
                    <div>
                      <button
                        aria-label="Zoom Out"
                        onClick={() => setZoom((z) => Math.max(0.5, +(z - 0.2).toFixed(2)))}
                      >
                        -
                      </button>
                      <button
                        aria-label="Zoom In"
                        onClick={() => setZoom((z) => Math.min(2.0, +(z + 0.2).toFixed(2)))}
                      >
                        +
                      </button>
                      <button
                        aria-label="Center"
                        onClick={() => {
                          setZoom(1);
                          setPan({ x: 0, y: 0 });
                        }}
                      >
                        ⤾
                      </button>
                    </div>
                  </ZoomControls>

                  <div
                    onMouseMove={handleMouseMove}
                    style={{
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        maxWidth: 1100,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        transform: `scale(${zoom}) translate(${pan.x}px, ${pan.y}px)`,
                        cursor: "grab",
                        transformOrigin: "center top",
                      }}
                    >
                      <MapBrazilAny
                        height={760}
                        showPolygons={true}
                        showStateNames={showStateNames}
                        points={latLonPoints.map((p) => ({
                          id: p.id,
                          lat: p.lat,
                          lon: p.lon,
                          label: p.label || `Ponto ${p.id}`,
                        }))}
                        showPoints={true}
                      />
                    </div>
                  </div>
                </MapPlaceholder>
              </>
            )}
          </Panel>
        </RightPanel>
      </Container>
    </Page>
  );

  /* ---------------- inner component: MultiSeriesSVG ---------------- */

  function MultiSeriesSVG({ rows, columns }: { rows: any[]; columns: string[] }) {
    if (!rows || !rows.length || !columns || !columns.length)
      return <div style={{ padding: 16 }}>Sem dados para exibir.</div>;

    // rows expected as [{ day: 'YYYY-MM-DD', col1: val, col2: val, ... }, ...]
    const labels = rows.map((r) => r.day).filter(Boolean);
    const uniqueLabels = Array.from(new Set(labels)).sort(
      (a, b) => new Date(a).getTime() - new Date(b).getTime(),
    );

    const height = 480;
    const viewBoxWidth = Math.max(1000, uniqueLabels.length * 40);
    const count = Math.max(1, uniqueLabels.length);
    const xFor = (i: number) => (i / (count - 1 || 1)) * (viewBoxWidth - 100) + 50;

    const seriesValues = columns.map((col) =>
      uniqueLabels.map((lab) => {
        const found = rows.find((r) => r.day === lab);
        if (!found) return NaN;
        const v = found[col];
        const n = Number(v);
        return Number.isFinite(n) ? n : NaN;
      }),
    );

    const allNumbers = seriesValues.flat().filter((v) => !Number.isNaN(v));
    const max = allNumbers.length ? Math.max(...allNumbers) : 1;
    const min = allNumbers.length ? Math.min(...allNumbers) : 0;
    const range = max - min || 1;
    const yFor = (v: number) => ((max - v) / range) * (height - 80) + 40;

    const uniqueInsts = Array.from(new Set(rows.map((r) => r.instituicao || "—")));
    const instColorMap: Record<string, string> = {};
    uniqueInsts.forEach(
      (inst, idx) =>
        (instColorMap[inst] = INSTITUTION_FILL_COLORS[idx % INSTITUTION_FILL_COLORS.length]),
    );

    return (
      <div style={{ width: "100%", position: "relative" }}>
        <svg
          viewBox={`0 0 ${viewBoxWidth} ${height}`}
          width="100%"
          height={height}
          preserveAspectRatio="xMidYMid meet"
        >
          {[0, 0.25, 0.5, 0.75, 1].map((t, i) => (
            <line
              key={i}
              x1={50}
              x2={viewBoxWidth - 50}
              y1={40 + t * (height - 80)}
              y2={40 + t * (height - 80)}
              stroke="#e6eefb"
              strokeWidth={1}
            />
          ))}

          {seriesValues.map((vals, sIdx) => {
            const points = vals
              .map((v, i) => {
                if (Number.isNaN(v)) return null;
                return `${xFor(i)},${yFor(v)}`;
              })
              .filter(Boolean) as string[];
            if (!points.length) return null;
            const stroke = SERIES_COLORS[sIdx % SERIES_COLORS.length];
            return (
              <g key={sIdx}>
                <polyline
                  points={points.join(" ")}
                  fill="none"
                  stroke={stroke}
                  strokeWidth={3}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {points.map((pt, i) => {
                  const [xStr, yStr] = pt.split(",");
                  const repRow = rows.find((r) => r.day === uniqueLabels[i]) || {};
                  return (
                    <circle
                      key={i}
                      cx={+xStr}
                      cy={+yStr}
                      r={6}
                      fill={instColorMap[repRow.instituicao || "—"] || "#fff"}
                      stroke={stroke}
                      strokeWidth={2}
                      style={{ cursor: "pointer" }}
                      onMouseEnter={(ev) => {
                        const rect = (chartMainRef.current &&
                          chartMainRef.current.getBoundingClientRect()) || { left: 0, top: 0 };
                        setTooltip({
                          visible: true,
                          left: ev.clientX - rect.left,
                          top: ev.clientY - rect.top,
                          instituicao: repRow.instituicao,
                          reservatorio: repRow.reservatorio,
                          color: instColorMap[repRow.instituicao || "—"],
                        });
                      }}
                      onMouseMove={(ev) => {
                        const rect = (chartMainRef.current &&
                          chartMainRef.current.getBoundingClientRect()) || { left: 0, top: 0 };
                        setTooltip((t) => ({
                          ...t,
                          left: ev.clientX - rect.left,
                          top: ev.clientY - rect.top,
                        }));
                      }}
                      onMouseLeave={() => setTooltip({ visible: false, left: 0, top: 0 })}
                    />
                  );
                })}
              </g>
            );
          })}

          {uniqueLabels.map((m, i) => (
            <text
              key={`lbl-${i}`}
              x={xFor(i)}
              y={height - 10}
              fontSize="12"
              fill="#5b6b7a"
              textAnchor="middle"
            >
              {m.replace(/-/g, "/").slice(0, 10)}
            </text>
          ))}

          <text x="14" y={34} fontSize="13" fill="#5b6b7a">
            {allNumbers.length ? Math.max(...allNumbers) : 1}
          </text>
          <text x="14" y={height - 22} fontSize="13" fill="#5b6b7a">
            {allNumbers.length ? Math.min(...allNumbers) : 0}
          </text>
        </svg>

        {tooltip.visible && tooltip.instituicao && (
          <Tooltip left={tooltip.left} top={tooltip.top} color={tooltip.color || "#ccc"}>
            <div style={{ fontWeight: 800 }}>{tooltip.instituicao}</div>
            <div style={{ fontSize: 12, color: "#475569" }}>
              Reservatório: <strong>{tooltip.reservatorio || "—"}</strong>
            </div>
          </Tooltip>
        )}
      </div>
    );
  }
}
