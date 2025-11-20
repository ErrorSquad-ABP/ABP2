/* eslint-disable @typescript-eslint/no-explicit-any */
// front/src/pages/TablesPage.tsx
import { JSX, useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import MapBrazil from "../components/MapBrazil";
import SimaTable from "../components/SimaTable";
import axios from "axios";
import * as turf from "@turf/turf";

/**
 * TablesPage
 *
 * - Visual estilo azul/branco (sem libs, apenas styled-components).
 * - Corrige fetch final (não pede idreservatorio nas colunas).
 * - Filtra linhas por reservatório usando idreservatorio direto ou via idcampanha -> campanhas.
 * - Alterações solicitadas:
 *   - Não mostrar nomes dos países no mapa
 *   - Não mostrar nomes/labels sobre os reservatórios no mapa (somente bolinhas)
 *   - Cada reservatório com cor única
 *   - Legenda abaixo do mapa relacionando cor <-> reservatório
 *   - Mostrar apenas reservatórios selecionados no mapa
 */

const API_BASE = (import.meta as any)?.env?.VITE_API_URL || "http://localhost:3001";

interface Campanha {
  idcampanha: number;
  idreservatorio: number;
  idinstituicao?: number;
  nrocampanha?: number;
  datainicio: string;
  datafim: string;
  // maybe other fields
}

type TableMetadata = {
  id?: string;
  name?: string;
  title?: string;
  label?: string;
  description?: string;
  colunas?: Array<object>;
  responsible?: string;
  source?: string;
};

function isoDate(date: Date) {
  return date.toISOString().slice(0, 10);
}

/* ================= small helpers to normalize fields ================= */

function getField(obj: any, candidates: string[] = []) {
  if (!obj || typeof obj !== "object") return undefined;
  for (const c of candidates) {
    if (c in obj && obj[c] != null) return obj[c];
    const lower = c.toLowerCase();
    for (const k of Object.keys(obj)) {
      if (k.toLowerCase() === lower) return obj[k];
    }
  }
  return undefined;
}

/* ================= Styled (azul / branco) ================= */

const PRIMARY_BLUE = "#0b5fff";
const PRIMARY_BLUE_HOVER = "#2a7bff";
const MUTED_BLUE = "#e8f1ff";
const TEXT_DARK = "#0b27440";
const SURFACE = "#ffffff";
const BORDER = "#e6eefb";
const LEGEND_BG = "#f8fbff";

const Page = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(180deg, #f6fbff 0%, #eef6ff 100%);
  color: ${TEXT_DARK};
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

  @media (max-width: 1100px) {
    grid-template-columns: 1fr;
    padding: 0 18px;
  }
`;

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  height: 100%;
`;

const Controls = styled.div`
  background: ${SURFACE};
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

  @media (max-width: 520px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const Label = styled.label`
  font-size: 13px;
  color: #334155;
  min-width: 100px;

  @media (max-width: 520px) {
    min-width: auto;
  }
`;

const Select = styled.select`
  padding: 8px 10px;
  border-radius: 8px;
  border: 1px solid rgba(2, 6, 23, 0.06);
  width: 100%;
  background: white;
`;

/* Column list item (checkbox row) */
const ColumnItem = styled.label`
  display: flex;
  gap: 10px;
  align-items: center;
  padding: 10px;
  border-radius: 8px;
  cursor: pointer;
  transition:
    background 0.12s ease,
    transform 0.12s ease;

  &:hover {
    background: rgba(11, 95, 255, 0.04);
    transform: translateY(-1px);
  }

  input[type="checkbox"] {
    width: 16px;
    height: 16px;
    accent-color: ${PRIMARY_BLUE};
  }
`;

/* ColumnsBox (list container) */
const ColumnsBox = styled.div`
  background: ${SURFACE};
  padding: 14px;
  border-radius: 12px;
  box-shadow: 0 8px 28px rgba(6, 58, 128, 0.04);
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow: auto;
  flex: 1 1 auto;
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

  @media (max-width: 720px) {
    justify-content: stretch;
    flex-direction: column;
    align-items: stretch;
  }
`;

const Panel = styled.div`
  background: ${SURFACE};
  padding: 20px;
  border-radius: 12px;
  height: 100%;
  box-shadow: 0 12px 36px rgba(9, 30, 66, 0.06);
  display: flex;
  flex-direction: column;
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

const MapPlaceholder = styled.div`
  position: relative;
  flex: 1;
  background: linear-gradient(180deg, #0b2340 0%, #082033 100%);
  border-radius: 8px;
  overflow: hidden;
  min-height: 260px;
  padding: 12px;
  display: flex;
  flex-direction: column;
`;

const MapInner = styled.div`
  flex: 1;
  width: 100%;
  /* Force the inner map to stretch and fill available area */
  display: flex;
  align-items: stretch;
  justify-content: stretch;
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
`;

/* Wrapper para aplicar estilo idêntico ao cabeçalho do SimaTablesPage nas tabelas internas */
const SimaTableWrapper = styled.div`
  table thead th {
    background: linear-gradient(180deg, ${PRIMARY_BLUE} 0%, ${PRIMARY_BLUE_HOVER} 100%) !important;
    color: #fff !important;
    font-weight: 700 !important;
    position: sticky !important;
    top: 0 !important;
    z-index: 3 !important;
    font-size: 13px !important;
    padding: 10px 12px !important;
  }

  table tbody tr:hover {
    background: ${MUTED_BLUE} !important;
  }

  table tbody td {
    padding: 10px 12px !important;
    color: ${TEXT_DARK} !important;
    font-size: 14px !important;
  }

  [role="toolbar"],
  .sima-table-toolbar,
  .table-toolbar,
  .table-actions,
  .rt-table__toolbar,
  .react-table-toolbar,
  .SimaTable__toolbar,
  .sima-toolbar,
  .MuiTableToolbar-root {
    display: none !important;
    visibility: hidden !important;
    height: 0 !important;
    margin: 0 !important;
    padding: 0 !important;
    overflow: hidden !important;
  }

  > div > .toolbar,
  > .toolbar {
    display: none !important;
  }
`;

const TablePreview = styled.div`
  margin-top: 12px;
  border-radius: 10px;
  overflow: auto;
  border: 1px solid ${BORDER};
  background: ${SURFACE};
  box-shadow: 0 8px 30px rgba(6, 58, 128, 0.04);
`;

const TableElement = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-family: "Inter", "Helvetica Neue", Arial, sans-serif;
  td,
  th {
    padding: 10px 12px;
    border-bottom: 1px solid ${BORDER};
    text-align: left;
    font-size: 14px;
    color: ${TEXT_DARK};
  }
  thead th {
    background: linear-gradient(180deg, ${PRIMARY_BLUE} 0%, ${PRIMARY_BLUE_HOVER} 100%);
    color: #fff;
    font-weight: 700;
    position: sticky;
    top: 0;
    z-index: 2;
    font-size: 13px;
  }
  tbody tr:hover {
    background: ${MUTED_BLUE};
  }
  tbody td {
    background: ${SURFACE};
  }
`;

/* ---------------- Download buttons & table visuals (Sima-style) ---------------- */

const DownloadButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 20px;
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
`;

const RightSection = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  flex-wrap: wrap;
`;

const DownloadButton = styled.button<{ variant: "csv" | "json" | "pdf" }>`
  padding: 8px 14px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 700;
  transition: all 0.12s ease;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-width: 86px;
  justify-content: center;

  background: ${SURFACE};
  color: ${TEXT_DARK};
  border: 1px solid ${BORDER};
  box-shadow: 0 6px 20px rgba(11, 95, 255, 0.06);

  &:hover {
    transform: translateY(-3px);
    background: ${MUTED_BLUE};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const Button = styled.button<{ $primary?: boolean }>`
  padding: 10px 14px;
  border-radius: 10px;
  border: ${(p) => (p.$primary ? "none" : `1px solid ${BORDER}`)};
  cursor: pointer;
  font-weight: 700;
  background: ${(p) => (p.$primary ? PRIMARY_BLUE : SURFACE)};
  color: ${(p) => (p.$primary ? "#fff" : TEXT_DARK)};
  display: inline-flex;
  align-items: center;
  gap: 8px;
  box-shadow: ${(p) => (p.$primary ? "0 6px 18px rgba(11,95,255,0.12)" : "none")};
  transition:
    transform 0.12s ease,
    background 0.12s ease,
    box-shadow 0.12s ease;

  &:hover {
    transform: translateY(-2px);
    background: ${(p) => (p.$primary ? PRIMARY_BLUE_HOVER : MUTED_BLUE)};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }

  @media (max-width: 520px) {
    width: 100%;
  }
`;

/* ================= helper: detect id/date columns ================= */
function isIdOrDateColumn(name?: string) {
  if (!name) return false;
  const n = String(name).toLowerCase();
  if (/^id/.test(n) || /id$/.test(n)) return true;
  if (
    /\b(id|idestacao|idsima|regno|nro|numero|num|uid|registro|idreservatorio|idcampanha)\b/.test(n)
  )
    return true;
  if (
    /\bdatahora\b/.test(n) ||
    /\bdatamedida\b/.test(n) ||
    /\bdatainicio\b/.test(n) ||
    /\bdata\b/.test(n)
  )
    return true;
  return false;
}

/* ================= Legend styled ================= */
const LegendBox = styled.div`
  margin-top: 12px;
  padding: 10px;
  background: ${LEGEND_BG};
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.04);
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
`;

const LegendItem = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  padding: 6px 8px;
  border-radius: 6px;
  background: white;
  box-shadow: 0 6px 16px rgba(6, 58, 128, 0.04);
  font-size: 13px;
  color: ${TEXT_DARK};
`;

const Swatch = styled.span<{ color: string }>`
  width: 14px;
  height: 14px;
  border-radius: 50%;
  display: inline-block;
  background: ${(p) => p.color};
  border: 1px solid rgba(0, 0, 0, 0.06);
`;

/* ================= Component ================= */

export default function TablesPage(): JSX.Element {
  const { slug } = useParams<{ slug: string }>();
  const topicSlug = slug || "abioticos";

  // stage: 1 = reservatórios, 2 = tabela, 3 = datas, 4 = colunas
  const [stage, setStage] = useState<number>(1);

  const [startDate, setStartDate] = useState<string>(() =>
    isoDate(new Date(Date.now() - 1000 * 60 * 60 * 24 * 90)),
  );
  const [endDate, setEndDate] = useState<string>(() => isoDate(new Date()));
  const [table, setTable] = useState<string>("");
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
  const [responsible, setResponsible] = useState<string>();
  const [metadata, setMetadata] = useState<TableMetadata[] | null>(null);

  // columnsFromMetadata keyed by API name
  const [columnsFromMetadata, setColumnsFromMetadata] = useState<any>({});
  const [responsibleFromMetadata, setResponsibleFromMetadata] = useState<Record<
    string,
    any
  > | null>(null);

  const [tablesOptions, setTablesOptions] = useState<Array<{ api: string; label: string }>>([]);

  const [campanhas, setCampanhas] = useState<Campanha[]>([]);
  const [reservatorios, setReservatorios] = useState<any[]>([]);

  // novo: selected reservatorios (etapa 1)
  const [selectedReservatorios, setSelectedReservatorios] = useState<(string | number)[]>([]);
  const [selectAllReservatorios, setSelectAllReservatorios] = useState<boolean>(false);

  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [showTable, setShowTable] = useState<boolean>(false);

  const [showTableView] = useState<boolean>(false);

  const [availableDates, setAvailableDates] = useState<string[]>([]);

  const [zoom, setZoom] = useState<number>(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });

  const [columnsForTable, setColumnsForTable] = useState<any[]>([]);

  const [view, setView] = useState<"chart" | "map">("chart");
  const chartRef = useRef<HTMLDivElement | null>(null);
  const chartMainRef = useRef<HTMLDivElement | null>(null);
  const [page, setPage] = useState<number>(1);
  const [pageSize] = useState<number>(10);
  const [polygonReservoirs, setPolygonReservoirs] = useState<any[]>([]);
  const [insidePolygonReservoirs, setInsidePolygonReservoirs] = useState<any[]>([]);
  const [insidePolygonReservatorios, setInsidePolygonReservatorios] = useState({});
  const [showReservatoriosPolygons, setShowReservatoriosPolygons] = useState({});

  const [polygonsList, setPolygonsList] = useState([]);
  // Lista de polígonos salvos
  const [savedPolygons, setSavedPolygons] = useState<
    { id: string; points: { lat: number; lon: number }[] }[]
  >([]);

  // Novo: mapeamento polígonoId -> lista de reservatórios dentro dele
  const [polygonReservsMap, setPolygonReservsMap] = useState<Record<string, any[]>>({});
  // Novo: toggles para mostrar/ocultar listas de reservatórios por polígono
  const [showPolygonReservs, setShowPolygonReservs] = useState<Record<string, boolean>>({});

  function handlePageChange(newPage: number) {
    setPage(newPage);
  }

  /* ================= metadata load ================= */

  useEffect(() => {
    if (selectedReservatorios.length > 0) {
      fetchAvailableDatesForSelectedReservatorios(selectedReservatorios);
    } else {
      setAvailableDates([]);
      setStartDate("");
      setEndDate("");
    }
  }, [selectedReservatorios]);

  useEffect(() => {
    async function load() {
      try {
        const metaRes = await fetch(`${API_BASE}/metadata/${encodeURIComponent(topicSlug)}`);

        if (metaRes.ok) {
          const m = await metaRes.json();
          const data = m.data ?? [];
          setMetadata(Array.isArray(data) ? data : []);

          const opts = (Array.isArray(data) ? data : [])
            .map((item: any) => {
              const api = item.id || item.name || item.tableName || item.apiName;
              const label = item.name || item.title || item.label || String(api);
              return { api: String(api), label: String(label) };
            })
            .filter((opt) => !!opt.api);

          setTablesOptions(opts);

          const clms: Record<string, any> = {};
          const resp: Record<string, any> = {};
          (Array.isArray(data) ? data : []).forEach((tb: any) => {
            const apiName = tb.id || tb.name || tb.tableName || tb.apiName;
            if (apiName) {
              clms[apiName] = tb.colunas ?? tb.columns ?? tb.coluna ?? [];
              resp[apiName] = tb.responsible ?? tb.responsibleName ?? tb.source ?? "";
            }
          });
          setColumnsFromMetadata(clms);
          setResponsibleFromMetadata(resp);

          const firstApi = opts[0]?.api;
          if (firstApi) setTable(firstApi);
        } else {
          setMetadata([]);
          setTablesOptions([]);
        }
      } catch (err) {
        console.error("Error fetching metadata: ", err);
        setMetadata([]);
        setTablesOptions([]);
      }
    }

    load();
  }, [topicSlug]);

  /* ---------------- fetch campanhas (kept) ---------------- */
  useEffect(() => {
    const fetchCampanhas = async () => {
      if (!table || !responsibleFromMetadata) return;
      const responsibleVal = responsibleFromMetadata[table];

      const fetches: Promise<Campanha[]>[] = [];

      if (
        responsibleVal &&
        typeof responsibleVal === "string" &&
        responsibleVal.toLowerCase().includes("furnas")
      ) {
        fetches.push(
          axios
            .get(`${API_BASE}/tables/furnas/tbcampanha`)
            .then((res) => (res.data?.data ?? res.data) as Campanha[]),
        );
      }

      if (
        responsibleVal &&
        typeof responsibleVal === "string" &&
        responsibleVal.toLowerCase().includes("balcar")
      ) {
        fetches.push(
          axios
            .get(`${API_BASE}/balcar/campanha`)
            .then((res) => (res.data?.data ?? res.data) as Campanha[]),
        );
      }

      try {
        const results = await Promise.all(fetches);
        const combined = results.flat();

        const unique: Campanha[] = [];
        for (const c of combined) {
          const exists = unique.some((u) => u.idcampanha === c.idcampanha);
          if (!exists) unique.push(c);
        }

        setCampanhas(unique);
      } catch (err) {
        console.error("Erro ao carregar campanhas", err);
      }
    };

    fetchCampanhas();
  }, [table, responsibleFromMetadata]);

  /* ---------------- fetch reservatórios (Furnas) - etapa 1 ---------------- */
  useEffect(() => {
    const fetchReservatorios = async () => {
      try {
        const url = `${API_BASE}/tables/furnas/tbreservatorio?colunas=nome,idreservatorio,lat,lng`;
        const res = await fetch(url);
        if (!res.ok) {
          const res2 = await fetch(`${API_BASE}/furnas/reservatorio/all`);
          if (!res2.ok) {
            setReservatorios([]);
            return;
          }
          const json2 = await res2.json();
          const list2 = json2?.data ?? json2;
          setReservatorios(Array.isArray(list2) ? list2 : []);
          return;
        }
        const json = await res.json();
        const rows = json?.data ?? json;
        setReservatorios(Array.isArray(rows) ? rows : []);
      } catch (err) {
        console.error("Erro ao buscar reservatórios:", err);
      }
    };

    fetchReservatorios();
  }, []);

  /* ---------------- helper: resolveApiTableName (defensive) ---------------- */
  function resolveApiTableName(tableName: string) {
    if (!tableName) return "";

    let t = String(tableName)
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, "")
      .toLowerCase();

    if (!t.startsWith("tb")) t = "tb" + t;

    const FIXES: Record<string, string> = {
      tbabioticoscoluna: "tbabioticocoluna",
      abioticoscoluna: "tbabioticocoluna",
      abiotico_coluna: "tbabioticocoluna",
      "abiotico-coluna": "tbabioticocoluna",
    };

    if (FIXES[t]) return FIXES[t];

    t = t.replace(/scoluna$/, "coluna");
    t = t.replace(/abioticoscoluna$/, "abioticocoluna");
    t = t.replace(/[^a-z0-9_]/g, "");

    return t;
  }

  function getProviderForApi(apiName?: string): string | null {
    if (!apiName) return null;
    const key = String(apiName);

    try {
      if (responsibleFromMetadata && typeof responsibleFromMetadata === "object") {
        const resp = responsibleFromMetadata[key] ?? responsibleFromMetadata[key.toLowerCase()];
        if (resp) {
          const r = String(resp).toLowerCase();
          if (r.includes("furnas")) return "furnas";
          if (r.includes("balcar")) return "balcar";
          if (r.includes("sima")) return "sima";
        }
      }
    } catch {}

    try {
      if (metadata && Array.isArray(metadata)) {
        const found =
          metadata.find((m: any) => {
            if (!m) return false;
            const candidates = [m.name, m.id, m.tableName, (m as any).apiName, m.title, m.label]
              .filter(Boolean)
              .map((c: any) => String(c).toLowerCase());
            return candidates.includes(key.toLowerCase());
          }) ||
          metadata.find((m: any) => {
            if (!m) return false;
            const resp = String(m.responsible ?? m.source ?? "").toLowerCase();
            return (
              resp &&
              resp.includes("furnas") &&
              (m.name === key || String(m.name).toLowerCase().includes(String(key).toLowerCase()))
            );
          });

        if (found) {
          const r = String(found.responsible ?? found.source ?? "").toLowerCase();
          if (r.includes("furnas")) return "furnas";
          if (r.includes("balcar")) return "balcar";
          if (r.includes("sima")) return "sima";
        }
      }
    } catch {}

    try {
      const n = key.toLowerCase();
      if (n.startsWith("tb") && n.includes("sima")) return "sima";
      if (n.startsWith("tb") && n.includes("balcar")) return "balcar";
      if (n.startsWith("tb")) return "furnas";
    } catch {}

    return null;
  }

  /* ---------------- UI helpers and actions ---------------- */

  function toggleReservatorio(id: string | number, checked: boolean) {
    if (checked) {
      setSelectedReservatorios((s) => Array.from(new Set([...s, id])));
    } else {
      setSelectedReservatorios((s) => s.filter((x) => x !== id));
    }
  }

  async function fetchAvailableDatesForTableAndReservatorios(
    selectedReservatorios: (string | number)[],
    tableApiName: string,
  ) {
    if (!selectedReservatorios.length || !tableApiName) {
      setAvailableDates([]);
      setStartDate("");
      setEndDate("");
      return;
    }

    const endpoint = `${API_BASE}/tables/furnas/tbcampanha`;

    let rows: any[] = [];
    try {
      const resp = await fetch(endpoint);
      if (!resp.ok) throw new Error(`fetch failed: ${resp.status}`);
      const json = await resp.json();
      rows = Array.isArray(json) ? json : json?.data || json?.rows || [];
    } catch (err) {
      console.error("[dates] tbcampanha fetch failed:", err);
      setAvailableDates([]);
      setStartDate("");
      setEndDate("");
      return;
    }

    const selectedSet = new Set(selectedReservatorios.map(String));
    const foundDates = new Set<string>();

    for (const r of rows) {
      const rid = getField(r, [
        "idreservatorio",
        "id_reservatorio",
        "idReservatorio",
        "reservatorio",
      ]);
      if (rid != null && selectedSet.size && !selectedSet.has(String(rid))) continue;

      const dtRaw = getField(r, ["datainicio", "dataMedida", "dataHora", "data", "datahora"]);
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
      setStartDate(arr[0]);
      setEndDate(arr[arr.length - 1]);
    } else {
      setStartDate("");
      setEndDate("");
    }
  }

  async function fetchAvailableDatesForSelectedReservatorios(reservs: (string | number)[]) {
    if (!reservs.length) {
      setAvailableDates([]);
      setStartDate("");
      setEndDate("");
      return;
    }

    const endpoint = `${API_BASE}/tables/furnas/tbcampanha`;
    try {
      const resp = await fetch(endpoint);
      if (!resp.ok) throw new Error(`fetch failed: ${resp.status}`);
      const json = await resp.json();
      const rows: any[] = Array.isArray(json) ? json : json?.data || json?.rows || [];

      const filteredDates = new Set<string>();
      const selectedSet = new Set(reservs.map((r) => String(r)));

      for (const r of rows) {
        const rid = getField(r, [
          "idreservatorio",
          "id_reservatorio",
          "idReservatorio",
          "reservatorio",
        ]);
        if (!rid && campanhas && campanhas.length) {
          continue;
        }
        if (rid && !selectedSet.has(String(rid)) && reservs.length !== rows.length) continue;

        const dtRaw = getField(r, ["datainicio", "dataMedida", "dataHora", "data", "datahora"]);
        if (!dtRaw) continue;
        const d = new Date(dtRaw);
        if (!isNaN(d.getTime())) filteredDates.add(isoDate(d));
      }

      const arr = Array.from(filteredDates).sort(
        (a, b) => new Date(a).getTime() - new Date(b).getTime(),
      );
      setAvailableDates(arr);
      setStartDate(arr[0] ?? "");
      setEndDate(arr[arr.length - 1] ?? "");
    } catch (err) {
      console.error("[dates] tbcampanha fetch failed:", err);
      setAvailableDates([]);
      setStartDate("");
      setEndDate("");
    }
  }

  async function handleConfirmReservatorios() {
    if (!selectedReservatorios.length) {
      alert("Selecione ao menos um reservatório antes de continuar.");
      return;
    }
    setStage(2);
  }

  async function handleConfirmTable() {
    if (!selectedReservatorios.length) {
      alert("Selecione ao menos um reservatório antes de confirmar tabela.");
      return;
    }
    if (!table) {
      alert("Selecione uma tabela antes de confirmar.");
      return;
    }
    setLoading(true);
    const apiTable = resolveApiTableName(table);
    console.debug("[debug] resolved apiTable:", apiTable);
    await fetchAvailableDatesForTableAndReservatorios(selectedReservatorios, apiTable);
    setStage(3);
    setLoading(false);
  }

  async function handleConfirmPeriod() {
    if (!startDate || !endDate) {
      alert("Escolha data início e fim.");
      return;
    }
    setLoading(true);
    const apiTable = resolveApiTableName(table);
    console.debug("[debug] resolved apiTable:", apiTable);
    try {
      await fetchColumnsForTable(apiTable);
      setStage(4);
    } catch (err) {
      console.error("Erro ao buscar colunas:", err);
      setColumnsForTable([]);
      alert("Erro ao carregar colunas. Veja console.");
    } finally {
      setLoading(false);
    }
  }

  async function fetchColumnsForTable(tableName: string) {
    setColumnsForTable([]);
    if (!tableName) return;

    const apiTable = resolveApiTableName(tableName);
    const provider = getProviderForApi(apiTable) || "furnas";

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
          setColumnsForTable(keys);
          return;
        }
      } catch (err) {
        console.warn("[fetchColumnsForTable] attempt error:", err);
        continue;
      }
    }

    setColumnsForTable([]);
    console.warn("[fetchColumnsForTable] no columns found for", apiTable);
  }

  function toggleColumnLocal(name: string) {
    if (isIdOrDateColumn(name)) return;
    setSelectedColumns((s) => (s.includes(name) ? s.filter((x) => x !== name) : [...s, name]));
  }

  /**
   * handleGenerateTableForCurrentSelection
   */
  async function handleGenerateTableForCurrentSelection(reservatoriosOverride?: string[]) {
    if (!reservatoriosOverride && !selectedReservatorios.length) {
      alert("Selecione ao menos um reservatório.");
      return;
    }
    const idsToUse = Array.isArray(reservatoriosOverride)
      ? reservatoriosOverride
      : selectedReservatorios;

    if (!selectedColumns.length) {
      alert("Selecione ao menos uma coluna para visualizar/exportar.");
      return;
    }

    setLoading(true);
    try {
      const apiTable = resolveApiTableName(table);
      const provider = getProviderForApi(apiTable) || "furnas";
      const dataCol = provider === "furnas" ? "dataMedida" : "dataHora";

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

      const merged = responses.flat();

      const filtered = (merged || []).filter((r: any) => {
        const dv = r.dataMedida ?? r.datamedida ?? r.dataHora ?? r.datahora ?? r.data ?? null;
        if (!dv) return true;
        const d = new Date(dv);
        if (isNaN(d.getTime())) return false;
        if (!startDate || !endDate) return true;
        const day = isoDate(d);
        return day >= startDate && day <= endDate;
      });

      setData(filtered);
      setShowTable(true);
      setView("chart");

      setTimeout(
        () => chartRef.current?.scrollIntoView?.({ behavior: "smooth", block: "center" }),
        50,
      );
    } catch (err) {
      console.error("[generate-table] error:", err);
      alert("Erro ao gerar tabela. Veja console.");
    } finally {
      setLoading(false);
    }
  }

  /* ================= metadata-derived helpers ================= */
  useEffect(() => {
    if (metadata) {
      const newColumns = getColumnsFromMetadata(metadata);
      const newResp = getResponsibleFromMetadata(metadata);
      setColumnsFromMetadata(newColumns);
      setResponsibleFromMetadata(newResp);
      setTable("");
    }
  }, [metadata]);

  useEffect(() => {
    if (columnsFromMetadata) {
      const firstItem = Object.keys(columnsFromMetadata)[0];
      setTable(firstItem);
    }
  }, [columnsFromMetadata, responsibleFromMetadata]);

  useEffect(() => {
    if (table) {
      setColumnsForTable(columnsFromMetadata[table] || []);
      setResponsible(responsibleFromMetadata ? responsibleFromMetadata[table] : undefined);
    }
  }, [table, columnsFromMetadata, responsibleFromMetadata]);

  function getColumnsFromMetadata(meta: any) {
    const clms: Record<string, any> = {};
    meta.forEach((tb: any) => {
      clms[tb.name] = tb.colunas;
    });
    return clms;
  }

  function getResponsibleFromMetadata(meta: any) {
    const resp: Record<string, any> = {};
    meta.forEach((tb: any) => {
      resp[tb.name] = tb.responsible;
    });
    return resp;
  }

  const latLonPoints = useMemo(() => {
    return reservatorios
      .filter(
        (r) =>
          (typeof r.lat === "number" && typeof r.lng === "number") ||
          (typeof r.latitude === "number" && typeof r.longitude === "number"),
      )
      .map((r) => ({
        id: r.idreservatorio ?? r.id ?? null,
        latitude: typeof r.lat === "number" ? r.lat : r.latitude,
        longitude: typeof r.lng === "number" ? r.lng : r.longitude,
        nome: r.nome ?? r.name ?? "",
      }));
  }, [reservatorios]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const ev = e as any;
    if (ev.buttons === 1) {
      setPan((prevPan) => ({
        x: prevPan.x + (ev.movementX || 0),
        y: prevPan.y + (ev.movementY || 0),
      }));
    }
  };

  const MapBrazilAny = MapBrazil as any;

  function handleStartDate(e: React.ChangeEvent<HTMLSelectElement>) {
    const date = e.target.value;
    if (!date) {
      setStartDate("");
      return;
    }
    if (!endDate || date <= endDate) {
      setStartDate(date);
    } else {
      alert("Data de início deve ser menor ou igual à data final!");
    }
  }

  function handleEndDate(e: React.ChangeEvent<HTMLSelectElement>) {
    const date = e.target.value;
    if (!date) {
      setEndDate("");
      return;
    }
    if (!startDate || date >= startDate) {
      setEndDate(date);
    } else {
      alert("Data final deve ser maior ou igual à data de início!");
    }
  }

  // Criação dos poligonos e consulta
  async function handleGeoSearch() {
    if (!selectedReservatorios || selectedReservatorios.length === 0) {
      alert("Selecione ao menos um reservatório.");
      return;
    }

    setLoading(true);
    try {
      const resp = await fetch("http://localhost:3001/furnas/reservatorio/all");
      if (!resp.ok) {
        throw new Error(`Erro ao buscar reservatórios: ${resp.status} ${resp.statusText}`);
      }
      const allJson = await resp.json();
      const allReservsRaw = Array.isArray(allJson)
        ? allJson
        : (allJson?.data ?? allJson?.rows ?? []);
      const allReservs = allReservsRaw.map((r: any) => ({
        id: String(
          r.idreservatorio ?? r.id ?? r.idReservatorio ?? r.id_reservatorio ?? r.id_reservatorio,
        ),
        latitude:
          typeof r.lat === "number" ? r.lat : typeof r.latitude === "number" ? r.latitude : null,
        longitude:
          typeof r.lng === "number" ? r.lng : typeof r.longitude === "number" ? r.longitude : null,
        nome: r.nome ?? r.name ?? "",
        raw: r,
      }));

      const selectedPoints = allReservs.filter((r) =>
        selectedReservatorios.some((sid) => String(sid) === r.id),
      );

      if (selectedPoints.length >= 3) {
        const coords = selectedPoints.map((p) => [Number(p.longitude), Number(p.latitude)]);
        const ring = [...coords, coords[0]];

        const inside = allReservs.filter((r) => {
          if (r.latitude == null || r.longitude == null) return false;
          try {
            if (typeof turf !== "undefined" && typeof turf.booleanPointInPolygon === "function") {
              return turf.booleanPointInPolygon(
                turf.point([Number(r.longitude), Number(r.latitude)]),
                turf.polygon([ring]),
              );
            }
          } catch (e) {}
          const x = Number(r.longitude),
            y = Number(r.latitude);
          let insideFlag = false;
          for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
            const xi = ring[i][0],
              yi = ring[i][1];
            const xj = ring[j][0],
              yj = ring[j][1];
            const intersect = yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
            if (intersect) insideFlag = !insideFlag;
          }
          return insideFlag;
        });

        setPolygonReservoirs(selectedPoints);
        setInsidePolygonReservoirs(inside);

        const insideIds = inside.map((p) => String(p.id));

        await handleGenerateTableForCurrentSelection(insideIds);

        setSelectedReservatorios(insideIds);

        setView("map");
        return;
      } else {
        await handleGenerateTableForCurrentSelection(selectedReservatorios);

        setPolygonReservoirs(selectedPoints);
        setInsidePolygonReservoirs([]);

        setView("map");
      }
    } catch (err) {
      console.error("handleGeoSearch error:", err);
      alert("Erro ao processar consulta geográfica. Veja console.");
    } finally {
      setLoading(false);
    }
  }

  function handleSavePolygon() {
    // garante que exista um polígono temporário (mesmo comportamento do handleGeoSearch)
    if (!polygonReservoirs || polygonReservoirs.length < 3) {
      alert("É necessário ter pelo menos 3 reservatórios para formar um polígono antes de salvar.");
      return;
    }

    const newPoly = {
      id:
        typeof crypto !== "undefined" && crypto.randomUUID
          ? crypto.randomUUID()
          : String(Date.now()),
      points: polygonReservoirs.map((p) => ({
        lat: Number(p.latitude),
        lon: Number(p.longitude),
      })),
    };

    setSavedPolygons((prev) => [...prev, newPoly]);

    // compute which reservoirs are inside this new polygon and store in map
    try {
      const ring = newPoly.points.map((pt) => [pt.lon, pt.lat]);
      // ensure closed ring
      if (ring.length && !(ring[0][0] === ring[ring.length - 1][0] && ring[0][1] === ring[ring.length - 1][1])) {
        ring.push([ring[0][0], ring[0][1]]);
      }
      const found = (reservatorios || [])
        .map((r: any) => ({
          id: String(r.idreservatorio ?? r.id ?? r.idReservatorio ?? r.id_reservatorio ?? r.id_reservatorio),
          lat: typeof r.lat === "number" ? r.lat : r.latitude,
          lon: typeof r.lng === "number" ? r.lng : r.longitude,
          nome: r.nome ?? r.name ?? "",
          raw: r,
        }))
        .filter((r: any) => {
          if (!Number.isFinite(r.lat) || !Number.isFinite(r.lon)) return false;
          try {
            return turf.booleanPointInPolygon(turf.point([Number(r.lon), Number(r.lat)]), turf.polygon([ring]));
          } catch (e) {
            return false;
          }
        });
      setPolygonReservsMap((prev) => ({ ...prev, [newPoly.id]: found }));
    } catch (e) {
      // ignore
    }

    // LIMPA seleção e polígono temporário para permitir novas seleções
    setSelectedReservatorios([]);
    setSelectAllReservatorios(false);
    setPolygonReservoirs([]);
    setInsidePolygonReservories?.length && setInsidePolygonReservoirs([]); // ignore if not set
  }

  function handleDeletePolygon(id) {
    setSavedPolygons((prev) => prev.filter((p) => p.id !== id));
    setPolygonReservsMap((prev) => {
      const copy = { ...prev };
      delete copy[id];
      return copy;
    });
    setShowPolygonReservs((prev) => {
      const copy = { ...prev };
      delete copy[id];
      return copy;
    });
  }

  // NEW: compute reservoirs inside a polygon on-demand (also used when showing)
  function computeReservatoriosInsidePolygon(poly: { id: string; points: { lat: number; lon: number }[] }) {
    if (!poly || !Array.isArray(poly.points) || poly.points.length < 3) return [];
    try {
      const ring = poly.points.map((pt) => [pt.lon, pt.lat]);
      if (ring.length && !(ring[0][0] === ring[ring.length - 1][0] && ring[0][1] === ring[ring.length - 1][1])) {
        ring.push([ring[0][0], ring[0][1]]);
      }
      const found = (reservatorios || [])
        .map((r: any) => ({
          id: String(r.idreservatorio ?? r.id ?? r.idReservatorio ?? r.id_reservatorio ?? r.id_reservatorio),
          lat: typeof r.lat === "number" ? r.lat : r.latitude,
          lon: typeof r.lng === "number" ? r.lng : r.longitude,
          nome: r.nome ?? r.name ?? "",
          raw: r,
        }))
        .filter((r: any) => {
          if (!Number.isFinite(r.lat) || !Number.isFinite(r.lon)) return false;
          try {
            return turf.booleanPointInPolygon(turf.point([Number(r.lon), Number(r.lat)]), turf.polygon([ring]));
          } catch (e) {
            return false;
          }
        });
      return found;
    } catch (e) {
      return [];
    }
  }

  // Determine which reservoirs are currently the ones to show in the map legend (priority: polygonReservoirs, else selectedReservatorios)
  const displayedReservoirs = useMemo(() => {
    if (polygonReservoirs && polygonReservoirs.length) return polygonReservoirs;
    if (selectedReservatorios && selectedReservatorios.length) {
      // map ids to latLonPoints entries
      return latLonPoints.filter((p) =>
        selectedReservatorios.some((sid) => String(sid) === String(p.id)),
      );
    }
    return [];
  }, [polygonReservoirs, selectedReservatorios, latLonPoints]);

  // create deterministic unique colors for each displayed reservoir (based on order)
  const colorMap = useMemo(() => {
    const map: Record<string, string> = {};
    const ids = displayedReservoirs.map((d) => String(d.id));
    for (let i = 0; i < ids.length; i++) {
      const hue = Math.round((i * 137.508) % 360);
      map[ids[i]] = `hsl(${hue} 75% 50%)`;
    }
    return map;
  }, [displayedReservoirs]);

  // Provide points for MapBrazil: only include selected/displayed reservoirs
  const mapPoints = useMemo(() => {
    return displayedReservoirs
      .map((p: any) => {
        const lat = Number(p.latitude);
        const lon = Number(p.longitude);
        return {
          id: p.id,
          lat,
          lon,
          nome: p.nome ?? `Reservatório ${p.id}`,
        };
      })
      .filter((p: any) => Number.isFinite(p.lat) && Number.isFinite(p.lon))
      .map((p: any) => {
        const idStr = String(p.id);
        const color = colorMap[idStr] ?? "#ffffff";
        return {
          id: p.id,
          lat: p.lat,
          lon: p.lon,
          color,
        };
      });
  }, [displayedReservoirs, colorMap]);

  // Selected points for highlighting (same as mapPoints here, but kept separate if MapBrazil expects them)
  const mapSelectedPoints = useMemo(() => {
    return mapPoints.map((p) => ({ ...p })); // já são filtrados/numéricos
  }, [mapPoints]);

  /* ---------------- UI render ---------------- */
  return (
    <Page>
      <Container>
        <LeftColumn>
          <Controls>
            {/* Stage 1: Reservatórios */}
            {stage >= 1 && (
              <>
                <div style={{ fontWeight: 700 }}>1) Escolha o(s) reservatório(s)</div>

                <div style={{ marginTop: 8 }}>
                  <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <input
                      type="checkbox"
                      checked={selectAllReservatorios}
                      onChange={(e) => {
                        const v = e.target.checked;
                        setSelectAllReservatorios(v);

                        if (v) {
                          const allIds = reservatorios.map(
                            (r: any) => r.idreservatorio ?? r.id ?? r.idReservatorio,
                          );
                          setSelectedReservatorios(allIds);
                        } else {
                          setSelectedReservatorios([]);
                        }
                      }}
                    />
                    <span>Selecionar todos os reservatórios</span>
                  </label>
                </div>

                <div
                  style={{
                    maxHeight: 220,
                    overflowY: "auto",
                    marginTop: 8,
                    padding: 8,
                    border: `1px solid ${MUTED_BLUE}`,
                    borderRadius: 8,
                  }}
                >
                  {reservatorios.length ? (
                    reservatorios.map((r: any) => {
                      const id = r.idreservatorio ?? r.id ?? r.idReservatorio;
                      const checked = selectedReservatorios.some((s) => String(s) === String(id));

                      return (
                        <div
                          key={String(id)}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                            marginBottom: 6,
                          }}
                        >
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={(e) => {
                              setSelectAllReservatorios(false);
                              toggleReservatorio(id, e.target.checked);
                            }}
                          />
                          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                            <div>{r.nome ?? r.name ?? `Reservatório ${id}`}</div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div>Carregando reservatórios...</div>
                  )}
                </div>

                <div style={{ marginTop: 12 }}>
                  <Button
                    $primary
                    onClick={() => {
                      handleConfirmReservatorios();
                    }}
                  >
                    Confirmar reservatórios
                  </Button>
                </div>
              </>
            )}

            {/* Stage 2: Tabela */}
            {stage >= 2 && (
              <>
                <div style={{ marginTop: 12, fontWeight: 700 }}>2) Escolha a tabela</div>
                <div style={{ marginTop: 8 }}>
                  <Select value={table} onChange={(e) => setTable(e.target.value)}>
                    {tablesOptions && tablesOptions.length > 0 ? (
                      tablesOptions.map((opt) => (
                        <option key={opt.api} value={opt.api}>
                          {opt.label}
                        </option>
                      ))
                    ) : (
                      <option value="">{`Carregando tabelas...`}</option>
                    )}
                  </Select>
                  <div style={{ fontSize: 12, color: "#0b2740", marginTop: 6 }}>
                    * Obrigatório selecionar tabela
                  </div>
                </div>

                <div style={{ marginTop: 12 }}>
                  <Button $primary onClick={handleConfirmTable}>
                    Confirmar tabela
                  </Button>
                </div>
              </>
            )}

            {/* Stage 3: Datas */}
            {stage >= 3 && (
              <>
                <div style={{ marginTop: 12, fontWeight: 700 }}>3) Escolha o período</div>

                <Row style={{ marginTop: 8 }}>
                  <Label>Data início</Label>
                  <Select value={startDate} onChange={(e) => handleStartDate(e)}>
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
                  <Select value={endDate} onChange={(e) => handleEndDate(e)}>
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

            {/* Stage 4: Colunas */}
            {stage >= 4 && (
              <>
                <div style={{ marginTop: 12, fontWeight: 700 }}>4) Escolha colunas</div>
                <div style={{ fontSize: 12, color: "#64748b", marginTop: 6 }}>
                  (colunas de id/data estão desabilitadas para visualização/export)
                </div>
                <div style={{ marginTop: 8, maxHeight: 320, overflowY: "auto" }}>
                  {columnsForTable && columnsForTable.length ? (
                    columnsForTable.map((c: any, idx: number) => {
                      const colName = (c?.nome ?? c?.name ?? String(c)).toString();
                      const disabled = isIdOrDateColumn(colName);
                      const checked = selectedColumns.includes(colName);
                      return (
                        <ColumnItem key={colName + "-" + idx}>
                          <input
                            type="checkbox"
                            checked={checked}
                            disabled={disabled}
                            onChange={() => toggleColumnLocal(colName)}
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

                <div style={{ marginTop: 12 }}>
                  <Button
                    $primary
                    onClick={handleGenerateTableForCurrentSelection}
                    disabled={loading || !(selectedColumns.length > 0)}
                  >
                    {loading ? "Gerando..." : "Gerar Tabela"}
                  </Button>
                  <Button
                    $primary
                    onClick={() => handleGeoSearch()}
                    disabled={loading || !(selectedColumns.length > 0)}
                  >
                    {selectedReservatorios.length >= 3
                      ? "Consulta geográfica (polígono)"
                      : "Gerar Tabela"}
                  </Button>
                </div>
              </>
            )}

            {stage < 4 && (
              <ColumnsBox aria-label="Lista de colunas">
                <div style={{ fontWeight: 700 }}>Colunas disponíveis</div>
                <div style={{ marginTop: 8, fontSize: 12, color: "#64748b" }}>
                  As colunas relacionadas à tabela selecionada aparecerão aqui após confirmar o
                  período.
                </div>
              </ColumnsBox>
            )}
          </Controls>
        </LeftColumn>

        <RightPanel>
          <ControlsTopRight>
            <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
              <DownloadButtonsWrapper>
                <LeftSection>
                  <Button onClick={() => setView((v) => (v === "chart" ? "map" : "chart"))}>
                    {view === "chart" ? "Ver mapa" : "Ver tabela"}
                  </Button>
                </LeftSection>

                <RightSection>
                  <DownloadButton variant="csv">Baixar CSV</DownloadButton>
                  <DownloadButton variant="json">Baixar JSON</DownloadButton>
                  <DownloadButton variant="pdf">Baixar PDF</DownloadButton>
                </RightSection>
              </DownloadButtonsWrapper>
            </div>
          </ControlsTopRight>

          <Panel ref={chartRef}>
            {view === "chart" ? (
              <>
                <div
                  style={{
                    display: "flex",
                    gap: 12,
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 8,
                  }}
                >
                  <div style={{ fontWeight: 800, color: "#0b2740", fontSize: 16 }}>
                    Visualização — {table} — {responsible}
                  </div>
                  <div style={{ color: "#475569", fontSize: 13 }}>
                    {data && data.length ? `${data.length} registros` : "Nenhum dado carregado"}
                  </div>
                </div>

                {showTableView && (
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
                        {data && data.length
                          ? data.slice(0, 5).map((row, i) => (
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

                <ChartWrapper>
                  <ChartMain ref={chartMainRef}>
                    {showTable ? (
                      <div
                        style={{
                          background: "#fff",
                          borderRadius: 10,
                          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                          padding: "16px",
                          maxWidth: "95%",
                          maxHeight: "600px",
                          overflowY: "auto",
                          margin: "0 auto",
                          width: "100%",
                        }}
                      >
                        <SimaTableWrapper>
                          <SimaTable
                            columns={
                              selectedColumns && selectedColumns.length
                                ? selectedColumns.map((c) => ({ key: c, label: c }))
                                : Object.keys(data[0] || {})
                                    .slice(0, 6)
                                    .map((k) => ({ key: k, label: k }))
                            }
                            data={data}
                            page={page}
                            pageSize={pageSize}
                            onPageChange={(newPage: number) => handlePageChange(newPage)}
                          />
                        </SimaTableWrapper>
                        {(polygonReservoirs.length > 0 || insidePolygonReservoirs.length > 0) && (
                          <div
                            style={{
                              marginTop: 20,
                              padding: 16,
                              background: "#f8fafc",
                              borderRadius: 10,
                              border: "1px solid #e2e8f0",
                            }}
                          >
                            <h3
                              style={{
                                margin: 0,
                                marginBottom: 10,
                                fontSize: 16,
                                fontWeight: 700,
                                color: "#0f172a",
                              }}
                            >
                              Reservatórios usados na consulta geográfica
                            </h3>

                            {polygonReservoirs.length > 0 && (
                              <div style={{ marginBottom: 12 }}>
                                <div style={{ fontWeight: 600, marginBottom: 6, color: "#1e293b" }}>
                                  Reservatórios selecionados para formar o polígono:
                                </div>
                                <ul style={{ margin: 0, paddingLeft: 18, color: "#334155" }}>
                                  {polygonReservoirs.map((r) => (
                                    <li key={`poly-${r.id}`}>
                                      <strong>{r.nome || `Reservatório ${r.id}`}</strong>
                                      {` — id: ${r.id} — (${Number(r.latitude).toFixed(6)}, ${Number(r.longitude).toFixed(6)})`}
                                    </li>
                                  ))}
                                </ul>

                                {/* button to show which reservoirs are inside the TEMP polygon */}
                                <div style={{ marginTop: 8 }}>
                                  <Button
                                    onClick={() => {
                                      if (!polygonReservory) return;
                                    }}
                                  >
                                    Ver reservatórios dentro (temporário)
                                  </Button>
                                </div>
                              </div>
                            )}

                            {insidePolygonReservoirs.length > 0 && (
                              <div>
                                <div style={{ fontWeight: 600, marginBottom: 6, color: "#1e293b" }}>
                                  Reservatórios dentro do polígono:
                                </div>
                                <ul style={{ margin: 0, paddingLeft: 18, color: "#334155" }}>
                                  {insidePolygonReservoirs.map((r) => (
                                    <li key={`inside-${r.id}`}>
                                      <strong>{r.nome || `Reservatório ${r.id}`}</strong>
                                      {` — id: ${r.id} — (${Number(r.latitude).toFixed(6)}, ${Number(r.longitude).toFixed(6)})`}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div style={{ padding: 16, color: "#64748b" }}>
                        Clique em <strong>Gerar Tabela</strong> para carregar e visualizar os dados.
                      </div>
                    )}
                  </ChartMain>
                </ChartWrapper>
              </>
            ) : (
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
                  <div style={{ color: "#475569", fontSize: 13 }}>
                    {displayedReservoirs.length} pontos
                  </div>
                </div>

                <MapPlaceholder>
                  <ZoomControls>
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
                    <MapInner>
                      <div
                        style={{
                          width: "100%",
                          height: "100%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          transform: `scale(${zoom}) translate(${pan.x}px, ${pan.y}px)`,
                          transformOrigin: "center top",
                        }}
                      >
                        <MapBrazilAny
                          height={760} // passar número (px) — evita "100%px" inválido no SVG
                          showPolygons={true}
                          showStateNames={false}
                          points={mapPoints}
                          selectedPoints={mapSelectedPoints}
                          polygons={[
                            // polígono temporário (quando existir)
                            ...(polygonReservoirs && polygonReservoirs.length
                              ? [
                                  polygonReservoirs.map((p) => ({
                                    lat: Number(p.latitude),
                                    lon: Number(p.longitude),
                                  })),
                                ]
                              : []),

                            // poligonos salvos
                            ...savedPolygons.map((poly) => poly.points),
                          ]}
                          showPoints={true}
                        />
                      </div>
                    </MapInner>
                  </div>

                  {/* legenda abaixo do mapa */}
                  <div style={{ padding: 12 }}>
                    {displayedReservoirs && displayedReservoirs.length ? (
                      <LegendBox>
                        {displayedReservoirs.map((r: any) => {
                          const idStr = String(r.id);
                          const color = colorMap[idStr] ?? "#999";
                          return (
                            <LegendItem key={`legend-${idStr}`}>
                              <Swatch color={color} />
                              <div style={{ display: "flex", flexDirection: "column" }}>
                                <div style={{ fontWeight: 700, fontSize: 13 }}>
                                  {r.nome || `Reservatório ${idStr}`}
                                </div>
                                <div
                                  style={{ fontSize: 12, color: "#64748b" }}
                                >{`id: ${idStr}`}</div>
                              </div>
                            </LegendItem>
                          );
                        })}
                      </LegendBox>
                    ) : (
                      <div style={{ color: "#e6f0ff", marginTop: 8 }}>
                        Nenhuma seleção para legenda.
                      </div>
                    )}
                  </div>
                </MapPlaceholder>
                {/* Botão para salvar o polígono atual */}
                <div
                  style={{
                    marginTop: 12,
                    display: "flex",
                    gap: 8,
                    alignItems: "center",
                    flexWrap: "wrap",
                  }}
                >
                  <Button
                    $primary
                    onClick={handleSavePolygon}
                    disabled={!polygonReservoirs || polygonReservoirs.length < 3}
                  >
                    Adicionar polígono
                  </Button>

                  <div style={{ color: "#64748b", fontSize: 13 }}>
                    {polygonReservoirs && polygonReservoirs.length
                      ? `${polygonReservoirs.length} pontos no polígono temporário`
                      : "Nenhum polígono temporário"}
                  </div>
                </div>

                {/* Lista de polígonos salvos */}
                <div style={{ marginTop: 16 }}>
                  <h4 style={{ margin: 0, marginBottom: 8 }}>Polígonos adicionados</h4>

                  {savedPolygons.length === 0 ? (
                    <div style={{ color: "#94a3b8" }}>Nenhum polígono criado.</div>
                  ) : (
                    savedPolygons.map((poly, idx) => {
                      const insideList = polygonReservsMap[poly.id] ?? [];
                      const isShown = !!showPolygonReservs[poly.id];
                      return (
                        // container vertical para manter a lista abaixo do cartão
                        <div
                          key={poly.id}
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 8,
                            padding: 10,
                            marginBottom: 8,
                            background: "#f8fafc",
                            borderRadius: 8,
                            border: "1px solid #e2e8f0",
                            position: "relative",
                          }}
                        >
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <div>
                              <div style={{ fontWeight: 700 }}>Polígono #{idx + 1}</div>
                              <div style={{ fontSize: 13, color: "#475569" }}>
                                {poly.points.length} pontos
                              </div>
                            </div>

                            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                              <Button
                                onClick={() => {
                                  // toggle show list; compute if needed
                                  setShowPolygonReservs((prev) => {
                                    const next = { ...prev, [poly.id]: !prev[poly.id] };
                                    return next;
                                  });
                                  if (!polygonReservsMap[poly.id]) {
                                    const found = computeReservatoriosInsidePolygon(poly);
                                    setPolygonReservsMap((prev) => ({ ...prev, [poly.id]: found }));
                                  }
                                }}
                              >
                                {isShown ? "Ocultar reservatórios" : "Ver reservatórios dentro"}
                              </Button>

                              <Button
                                onClick={() => {
                                  handleDeletePolygon(poly.id);
                                }}
                              >
                                Remover
                              </Button>
                            </div>
                          </div>

                          {/* expanded list area — agora inline, renderizada logo abaixo do cartão */}
                          {isShown && (
                            <div
                              style={{
                                marginTop: 8,
                                background: "#fff",
                                padding: 12,
                                borderRadius: 8,
                                boxShadow: "0 8px 30px rgba(6,58,128,0.08)",
                                border: "1px solid #e2e8f0",
                                maxHeight: 220,
                                overflowY: "auto",
                              }}
                            >
                              <div style={{ fontWeight: 700, marginBottom: 8 }}>
                                Reservatórios dentro do Polígono #{idx + 1} — ({insideList.length})
                              </div>
                              {insideList.length === 0 ? (
                                <div style={{ color: "#64748b" }}>Nenhum reservatório dentro.</div>
                              ) : (
                                <ul style={{ margin: 0, paddingLeft: 18 }}>
                                  {insideList.map((r) => (
                                    <li key={`poly-${poly.id}-res-${r.id}`} style={{ marginBottom: 8 }}>
                                      <strong>{r.nome}</strong> — id: {r.id} — (
                                      {Number(r.lat).toFixed(6)}, {Number(r.lon).toFixed(6)})
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })
                  )}
                </div>
              </>
            )} 
          </Panel>
        </RightPanel>
      </Container>
    </Page>
  );
} 
