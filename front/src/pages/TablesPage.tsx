/* eslint-disable @typescript-eslint/no-explicit-any */
// front/src/pages/TablesPage.tsx
import { JSX, useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import MapBrazil from "../components/MapBrazil";
import SimaTable from "../components/SimaTable";
import axios from "axios";

/**
 * TablesPage
 *
 * Notes:
 * - Use Vite env via import.meta (not process.env).
 * - This file uses a small runtime-safe access to import.meta.env to avoid TS/Bundler errors.
 */

const API_BASE = (import.meta as any)?.env?.VITE_API_URL || "http://localhost:3001";

interface Campanha {
  idcampanha: number;
  idreservatorio: number;
  idinstituicao: number;
  nrocampanha: number;
  datainicio: string;
  datafim: string;
  responsible: string; // FURNAS ou BALCAR
}

type ColumnMeta = {
  name?: string;
  nome?: string;
  label?: string;
  type?: "number" | "string" | "date" | "geom";
};

type TableMetadata = {
  id?: string;
  name?: string; // API table name (ex: tbabioticocoluna)
  title?: string; // display title (ex: "Abióticos coluna")
  label?: string;
  description?: string;
  colunas?: Array<object>;
  responsible?: string;
};

function isoDate(date: Date) {
  return date.toISOString().slice(0, 10);
}

/* ================= Styled (unchanged) ================= */

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
  align-items: stretch; /* ensure both columns stretch to same height */
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
  cursor: pointer;

  &:hover {
    background: rgba(37, 99, 235, 0.04);
  }
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

const Button = styled.button<{ $primary?: boolean }>`
  padding: 10px 14px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  font-weight: 700;
  background: ${(p) => (p.$primary ? p.theme.colors.primary : "rgba(2,6,23,0.06)")};
  color: ${(p) => (p.$primary ? "#fff" : "#04203a")};
  display: inline-flex;
  align-items: center;
  gap: 8px;

  &:hover {
    transform: translateY(-2px);
  }

  @media (max-width: 520px) {
    width: 100%;
  }
`;

const Panel = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 12px;
  height: 100%;
  box-shadow: 0 12px 36px rgba(9, 30, 66, 0.06);
  display: flex;
  flex-direction: column;
`;

const ChartWrapper = styled.div`
  flex: 1;
  display: flex;
  gap: 16px;
  align-items: stretch;
  justify-content: stretch;

  @media (max-width: 900px) {
    flex-direction: column;
  }
`;

const ChartMain = styled.div`
  flex: 1 1 0;
  min-width: 0;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 12px;
  border-radius: 8px;
  background: linear-gradient(180deg, #ffffff 0%, #f8fbff 100%);
  box-shadow: inset 0 4px 14px rgba(2, 6, 23, 0.02);
  position: relative;
  overflow: auto;
  min-height: 440px;
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

const DownloadButtonsContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  flex-wrap: wrap;
`;

const DownloadButton = styled.button<{ variant: "csv" | "json" | "pdf" }>`
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s;

  background-color: ${(props) => {
    switch (props.variant) {
      case "csv":
        return "#28a745";
      case "json":
        return "#17a2b8";
      case "pdf":
        return "#dc3545";
      default:
        return "#6c757d";
    }
  }};

  color: white;

  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

/* ================= helper: detect id/data columns ================= */
function isIdOrDateColumn(name?: string) {
  if (!name) return false;
  const n = String(name).toLowerCase();
  if (/^id/.test(n) || /id$/.test(n)) return true;
  if (/\b(id|idestacao|idsima|regno|nro|numero|num|uid|registro|idreservatorio)\b/.test(n))
    return true;
  if (
    /\bdatahora\b/.test(n) ||
    /\bdata_hour\b/.test(n) ||
    /\bdatamedida\b/.test(n) ||
    /\bdata\b/.test(n) ||
    /\bdatetime\b/.test(n)
  )
    return true;
  return false;
}

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
  const [table, setTable] = useState<string>(""); // stores API table name (ex: tbabioticocoluna)
  const [columns, setColumns] = useState<ColumnMeta[]>([]);
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
  const [responsible, setResponsible] = useState<string>();
  const [metadata, setMetadata] = useState<TableMetadata[] | null>(null);

  // columnsFromMetadata keyed by API name
  const [columnsFromMetadata, setColumnsFromMetadata] = useState<any>({});
  const [responsibleFromMetadata, setResponsibleFromMetadata] = useState<Record<string, any> | null>(null);

  // tablesOptions: array of { api: 'tb...', label: 'Abióticos coluna' }
  const [tablesOptions, setTablesOptions] = useState<Array<{ api: string; label: string }>>([]);

  const [campanhas, setCampanhas] = useState<Campanha[]>([]);
  const [orderedCampanhas, setOrderedCampanhas] = useState<Campanha[]>([]);
  const [reservatorios, setReservatorios] = useState<any[]>([]);

  // novo: selected reservatorios (etapa 1)
  const [selectedReservatorios, setSelectedReservatorios] = useState<(string | number)[]>([]);
  const [selectAllReservatorios, setSelectAllReservatorios] = useState<boolean>(false);

  // tabela preview state (dados da tabela e controle de exibição)
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [showTable, setShowTable] = useState<boolean>(false);

  // novo: controle de exibição do preview de tabela (botão Visualizar Tabela)
  const [showTableView, setShowTableView] = useState<boolean>(false);

  // available dates derived from table rows filtered by selectedReservatorios
  const [availableDates, setAvailableDates] = useState<string[]>([]);

  // zoom & labels
  const [zoom, setZoom] = useState<number>(1);
  const [showStateNames, setShowStateNames] = useState<boolean>(true);
  const [pan, setPan] = useState({ x: 0, y: 0 });

  // local columnsForTable state (for stage 4)
  const [columnsForTable, setColumnsForTable] = useState<any[]>([]);

  // view toggle between "chart" (table preview) and "map"
  const [view, setView] = useState<"chart" | "map">("chart");

  const chartRef = useRef<HTMLDivElement | null>(null);
  const chartMainRef = useRef<HTMLDivElement | null>(null);

  /* ================= helper download wrappers (added) ================= */

  function getProviderForApi(apiTable: string | undefined): "" | "furnas" | "balcar" | "sima" {
    if (!apiTable || !responsibleFromMetadata) return "";
    const r = responsibleFromMetadata[apiTable];
    if (!r) return "";
    const s = String(r).toLowerCase();
    if (s.includes("furnas")) return "furnas";
    if (s.includes("balcar")) return "balcar";
    if (s.includes("sima")) return "sima";
    // some metadata may contain multiple like "Furnas, Balcar"
    if (s.includes("furnas")) return "furnas";
    return "";
  }

  async function handleDownloadCSV() {
    if (!data || data.length === 0) {
      alert("Gere os dados da tabela primeiro para exportar.");
      return;
    }

    try {
      if (table) {
        const provider = getProviderForApi(table) || "furnas";
        const params = new URLSearchParams();
        if (startDate) params.append("startDate", startDate);
        if (endDate) params.append("endDate", endDate);
        if (selectedColumns.length > 0) params.append("columns", selectedColumns.join(","));

        const response = await axios.get(
          `${API_BASE}/${provider}/${encodeURIComponent(table)}/download/csv?${params.toString()}`,
          { responseType: "blob" },
        );

        const blob = new Blob([response.data]);
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${table}_${new Date().toISOString().split("T")[0]}.csv`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        return;
      } else {
        // fallback
        downloadCSV();
      }
    } catch (error) {
      console.error("Erro ao exportar CSV:", error);
      alert("Erro ao exportar CSV. Usando método alternativo...");
      downloadCSV(); // Fallback
    }
  }

  async function handleDownloadJSON() {
    if (!data || data.length === 0) {
      alert("Gere os dados da tabela primeiro para exportar.");
      return;
    }

    try {
      if (table) {
        const provider = getProviderForApi(table) || "furnas";
        const params = new URLSearchParams();
        if (startDate) params.append("startDate", startDate);
        if (endDate) params.append("endDate", endDate);
        if (selectedColumns.length > 0) params.append("columns", selectedColumns.join(","));

        const response = await axios.get(
          `${API_BASE}/${provider}/${encodeURIComponent(table)}/download/json?${params.toString()}`,
          { responseType: "blob" },
        );

        const blob = new Blob([response.data]);
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${table}_${new Date().toISOString().split("T")[0]}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        return;
      } else {
        // fallback to local JSON
        const jsonData = {
          table: table || "unknown",
          exportedAt: new Date().toISOString(),
          totalRecords: data.length,
          data: data,
        };

        const blob = new Blob([JSON.stringify(jsonData, null, 2)], { type: "application/json" });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${table || "data"}_${new Date().toISOString().split("T")[0]}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error("Erro ao exportar JSON:", error);
      alert("Erro ao exportar JSON. Verifique o console para mais detalhes.");
    }
  }

  async function handleDownloadPDF() {
    if (!data || data.length === 0) {
      alert("Gere os dados da tabela primeiro para exportar.");
      return;
    }

    try {
      if (table) {
        const provider = getProviderForApi(table) || "furnas";
        const params = new URLSearchParams();
        if (startDate) params.append("startDate", startDate);
        if (endDate) params.append("endDate", endDate);

        const response = await axios.get(
          `${API_BASE}/${provider}/${encodeURIComponent(table)}/download/pdf?${params.toString()}`,
          { responseType: "blob" },
        );

        const blob = new Blob([response.data], { type: "application/pdf" });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${table}_${new Date().toISOString().split("T")[0]}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        return;
      } else {
        // fallback to exportPDF
        exportPDF();
      }
    } catch (error) {
      console.error("Erro ao exportar PDF:", error);
      alert("Erro ao exportar PDF. Usando método alternativo...");
      exportPDF(); // Fallback
    }
  }

  /* ================= metadata load ================= */

  // Insira no início do componente TablesPage, junto com os outros useState/useEffect
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

          // Build tablesOptions using item.id as api when available.
          const opts = (Array.isArray(data) ? data : [])
            .map((item: any) => {
              const api = item.id || item.name || item.tableName || item.apiName;
              const label = item.name || item.title || item.label || String(api);
              return { api: String(api), label: String(label) };
            })
            .filter((opt) => !!opt.api);

          setTablesOptions(opts);

          // prepare columnsFromMetadata keyed by API name (use item.id when possible)
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

          // set initial table to first API name (if any)
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

      if (responsibleVal && typeof responsibleVal === "string" && responsibleVal.includes("Furnas")) {
        fetches.push(
          axios
            .get(`${API_BASE}/tables/furnas/tbcampanha`)
            .then((res) => res.data.data as Campanha[]),
        );
      }

      if (responsibleVal && typeof responsibleVal === "string" && responsibleVal.includes("Balcar")) {
        fetches.push(
          axios
            .get(`${API_BASE}/balcar/campanha`)
            .then((res) => res.data.data as Campanha[]),
        );
      }

      try {
        const results = await Promise.all(fetches);
        const combined = results.flat();

        const uniqueDates = combined.reduce((acc: Campanha[], curr) => {
          const exists = acc.some(
            (d) =>
              String(d.datainicio).slice(0, 10) === String(curr.datainicio).slice(0, 10) ||
              String(d.datafim).slice(0, 10) === String(curr.datafim).slice(0, 10) ||
              d.idcampanha === curr.idcampanha,
          );
          if (!exists) acc.push(curr);
          return acc;
        }, []);

        setCampanhas(uniqueDates);
      } catch (err) {
        console.error("Erro ao carregar campanhas", err);
      }
    };

    fetchCampanhas();
  }, [table, responsibleFromMetadata]);

  useEffect(() => {
    if (campanhas) {
      setOrderedCampanhas(
        campanhas.sort(
          (a: any, b: any) => new Date(a.datainicio).getTime() - new Date(b.datainicio).getTime(),
        ),
      );
    }
  }, [campanhas]);

  /* ---------------- fetch reservatórios (Furnas) - etapa 1 ---------------- */
  useEffect(() => {
    const fetchReservatorios = async () => {
      try {
        // endpoint solicitado: /tables/furnas/tbreservatorio?colunas=nome,idreservatorio
        const url = `${API_BASE}/tables/furnas/tbreservatorio?colunas=nome,idreservatorio`;
        const res = await fetch(url);
        if (!res.ok) {
          // fallback
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

  function testDates(c: Campanha) {
    if (!orderedCampanhas) {
      return "Carregando...";
    } else {
      return c.datainicio.slice(0, 10).split("-").reverse().join("/");
    }
  }

  /* ---------------- helper: resolveApiTableName (defensive) ---------------- */
function resolveApiTableName(tableName: string) {
  // remove espaços, acentos e transforma em lowercase
  return tableName
    .normalize("NFD") // separa acentos
    .replace(/[\u0300-\u036f]/g, "") // remove acentos
    .replace(/\s+/g, "") // remove espaços
    .toLowerCase()
    .replace(/^abiotico(s)?coluna$/, "tbabioticocoluna"); // exemplo específico se quiser mapear nomes
}


// ---------- add inside component (TablesPage), after resolveApiTableName ----------
function getProviderForApi(apiName?: string): string | null {
  if (!apiName) return null;
  const key = String(apiName);

  // 1) check responsibleFromMetadata (fast path)
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
  } catch (e) {
    // ignore
  }

  // 2) check metadata array (if present)
  try {
    if (metadata && Array.isArray(metadata)) {
      const found =
        metadata.find((m: any) => {
          if (!m) return false;
          // match by API name fields used in metadata
          const candidates = [
            m.name,
            m.id,
            m.tableName,
            (m as any).apiName,
            m.title,
            m.label,
          ].filter(Boolean).map((c: any) => String(c).toLowerCase());
          return candidates.includes(key.toLowerCase());
        }) ||
        metadata.find((m: any) => {
          if (!m) return false;
          const resp = String(m.responsible ?? m.source ?? "").toLowerCase();
          return resp && resp.includes("furnas") && (m.name === key || String(m.name).toLowerCase().includes(String(key).toLowerCase()));
        });

      if (found) {
        const r = String(found.responsible ?? found.source ?? "").toLowerCase();
        if (r.includes("furnas")) return "furnas";
        if (r.includes("balcar")) return "balcar";
        if (r.includes("sima")) return "sima";
      }
    }
  } catch (e) {
    // ignore
  }

  // 3) last-ditch heuristics: table name prefix/contains
  try {
    const n = key.toLowerCase();
    if (n.startsWith("tb") && n.includes("sima")) return "sima";
    if (n.startsWith("tb") && n.includes("balcar")) return "balcar";
    if (n.startsWith("tb")) return "furnas"; // heuristic: most tb* are furnas in your dataset
  } catch (e) {
    // ignore
  }

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

// Função para buscar datas disponíveis de acordo com os reservatórios selecionados
async function fetchAvailableDatesForTableAndReservatorios(
  selectedReservatorios: (string | number)[],
  tableApiName: string
) {
  if (!selectedReservatorios.length || !tableApiName) {
    setAvailableDates([]);
    setStartDate("");
    setEndDate("");
    return;
  }

  // tbcampanha é quem guarda as datas, sempre usar provider "furnas"
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

  // Filtra apenas as datas dos reservatórios selecionados
  const selectedSet = new Set(selectedReservatorios.map(String));
  const foundDates = new Set<string>();

  for (const r of rows) {
    const rid = r.idreservatorio ?? r.id_reservatorio ?? r.idReservatorio ?? r.reservatorio ?? null;
    if (rid != null && selectedSet.size && !selectedSet.has(String(rid))) continue;

    const dtRaw = r.dataMedida ?? r.datamedida ?? r.dataHora ?? r.datahora ?? r.data ?? null;
    if (!dtRaw) continue;

    const d = new Date(dtRaw);
    if (!isNaN(d.getTime())) foundDates.add(isoDate(d));
    else {
      const maybe = String(dtRaw).slice(0, 10);
      if (/^\d{4}-\d{2}-\d{2}$/.test(maybe)) foundDates.add(maybe);
    }
  }

  const arr = Array.from(foundDates).sort(
    (a, b) => new Date(a).getTime() - new Date(b).getTime()
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

// Função para buscar colunas da tabela selecionada
async function fetchColumnsForTable(tableName: string) {
  setColumnsForTable([]);
  if (!tableName) return;

  const apiTable = resolveApiTableName(tableName);
  const provider = getProviderForApi(apiTable);
  const isFurnas = provider === "furnas";

  const tryUrls: string[] = [];

  if (provider) {
    tryUrls.push(`${API_BASE}/tables/${provider}/${encodeURIComponent(apiTable)}`);
    tryUrls.push(`${API_BASE}/tables/${provider}/${encodeURIComponent(apiTable)}?colunas=dataMedida,idreservatorio`);
    tryUrls.push(`${API_BASE}/tables/${provider}/${encodeURIComponent(apiTable)}?colunas=dataMedida`);
    tryUrls.push(`${API_BASE}/${provider}/${encodeURIComponent(apiTable)}`);
  }

  // Fallbacks genéricos
  tryUrls.push(`${API_BASE}/tables/${encodeURIComponent(apiTable)}`);
  tryUrls.push(`${API_BASE}/tables/${encodeURIComponent(apiTable)}?colunas=dataHora,idreservatorio`);
  tryUrls.push(`${API_BASE}/tables/${encodeURIComponent(apiTable)}?colunas=dataHora`);
  tryUrls.push(`${API_BASE}/${encodeURIComponent(apiTable)}`);

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


// Função para buscar os dados da tabela selecionada
async function handleGenerateTableForCurrentSelection() {
  if (!selectedReservatorios.length) {
    alert("Selecione ao menos um reservatório.");
    return;
  }
  if (!selectedColumns.length) {
    alert("Selecione ao menos uma coluna para visualizar/exportar.");
    return;
  }
  if (!startDate || !endDate) {
    alert("Escolha período.");
    return;
  }

  setLoading(true);
  try {
    const apiTable = resolveApiTableName(table);
    const provider = getProviderForApi(apiTable); // ex: "furnas"
    const dataCol = provider === "furnas" ? "dataMedida" : "dataHora";

    const cols = ["idreservatorio", dataCol, ...selectedColumns].filter(Boolean);
    const colsParam = cols.map(encodeURIComponent).join(",");

    const endpoint = provider
      ? `${API_BASE}/tables/${provider}/${apiTable}?colunas=${colsParam}`
      : `${API_BASE}/tables/${apiTable}?colunas=${colsParam}`;

    const resp = await fetch(endpoint);
    if (!resp.ok) throw new Error(`fetch failed: ${resp.status}`);

    const json = await resp.json();
    const rows = Array.isArray(json) ? json : json?.data || json?.rows || [];

    const filtered = rows.filter((r: any) => {
      const rid = r.idreservatorio ?? r.id_reservatorio ?? r.idReservatorio ?? r.reservatorio ?? null;
      if (rid == null) return false;
      const matchesReserv = selectedReservatorios.some((sel) => {
        const a = Number(sel);
        const b = Number(rid);
        return !Number.isNaN(a) && !Number.isNaN(b) ? a === b : String(sel) === String(rid);
      });
      if (!matchesReserv) return false;

      const dv = r.dataMedida ?? r.datamedida ?? r.dataHora ?? r.datahora ?? r.data ?? null;
      if (!dv) return false;
      const d = new Date(dv);
      if (isNaN(d.getTime())) return false;
      const day = isoDate(d);
      return day >= startDate && day <= endDate;
    });

    setData(filtered);
    setShowTable(true);
    setView("chart");
    setTimeout(() => chartRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 50);
  } catch (err) {
    console.error("[generate-table] error fetching/processing data:", err);
    alert("Erro ao gerar tabela. Veja console para detalhes.");
  } finally {
    setLoading(false);
  }
}


async function fetchAvailableDatesForSelectedReservatorios(reservs: (string | number)[]) {
  if (!reservs.length) {
    setAvailableDates([]);
    setStartDate("");
    setEndDate("");
    return;
  }

  const endpoint = `${API_BASE}/tables/furnas/tbcampanha`; // ✅ garante /furnas/
  try {
    const resp = await fetch(endpoint);
    if (!resp.ok) throw new Error(`fetch failed: ${resp.status}`);
    const json = await resp.json();
    const rows: any[] = Array.isArray(json) ? json : json?.data || json?.rows || [];

    const filteredDates = new Set<string>();
    const selectedSet = new Set(reservs.map(r => String(r)));

    for (const r of rows) {
      const rid = r.idreservatorio ?? r.id_reservatorio ?? r.idReservatorio ?? r.reservatorio;
      if (!rid || (!selectedSet.has(String(rid)) && reservs.length !== rows.length)) continue;

      const dtRaw = r.dataMedida ?? r.datamedida ?? r.dataHora ?? r.datahora ?? r.data;
      if (!dtRaw) continue;

      const d = new Date(dtRaw);
      if (!isNaN(d.getTime())) filteredDates.add(d.toISOString().slice(0, 10));
    }

    const arr = Array.from(filteredDates).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
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


  async function fetchAvailableDatesForReservatorios(reservatorios: (string | number)[]) {
  if (!reservatorios.length) {
    setAvailableDates([]);
    setStartDate("");
    setEndDate("");
    return;
  }

  // Monta query para tbcampanha filtrando por idreservatorio
  const ids = reservatorios.map(String).join(",");
  const url = `${API_BASE}/tables/furnas/tbcampanha?colunas=dataMedida,idreservatorio&idreservatorio=${ids}`;

  try {
    const resp = await fetch(url);
    if (!resp.ok) throw new Error(`Fetch failed: ${resp.status}`);
    const json = await resp.json();
    const rows = Array.isArray(json) ? json : json?.data || json?.rows || [];

    const datesSet = new Set<string>();
    for (const r of rows) {
      const dtRaw = r.dataMedida ?? r.datamedida ?? r.dataHora ?? r.datahora ?? null;
      if (!dtRaw) continue;
      const d = new Date(dtRaw);
      if (!isNaN(d.getTime())) datesSet.add(isoDate(d));
    }

    const sortedDates = Array.from(datesSet).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
    setAvailableDates(sortedDates);
    setStartDate(sortedDates[0] ?? "");
    setEndDate(sortedDates[sortedDates.length - 1] ?? "");
  } catch (err) {
    console.error("Erro ao buscar datas:", err);
    setAvailableDates([]);
    setStartDate("");
    setEndDate("");
  }
}

  async function fetchColumnsForTable(tableName: string) {
    setColumnsForTable([]);
    if (!tableName) return;
    const apiTable = resolveApiTableName(tableName);
    const provider = getProviderForApi(apiTable);
    const isFurnas = provider === "furnas";

    // **IMPORTANTE**: não usar all=true nem limit=1 — tentar endpoints "limpos"
    const tryUrls: string[] = [];

    if (provider) {
      tryUrls.push(`${API_BASE}/tables/${provider}/${encodeURIComponent(apiTable)}`);
      tryUrls.push(`${API_BASE}/tables/${provider}/${encodeURIComponent(apiTable)}?colunas=dataMedida,idreservatorio`);
      tryUrls.push(`${API_BASE}/tables/${provider}/${encodeURIComponent(apiTable)}?colunas=dataMedida`);
      tryUrls.push(`${API_BASE}/${provider}/${encodeURIComponent(apiTable)}`);
    }

if (provider) {
  tryUrls.push(`${API_BASE}/tables/${provider}/${apiTable}`);
  tryUrls.push(`${API_BASE}/tables/${provider}/${apiTable}?colunas=dataMedida,idreservatorio`);
  tryUrls.push(`${API_BASE}/tables/${provider}/${apiTable}?colunas=dataMedida`);
} else {
  tryUrls.push(`${API_BASE}/tables/${apiTable}`);
  tryUrls.push(`${API_BASE}/tables/${apiTable}?colunas=dataHora,idreservatorio`);
  tryUrls.push(`${API_BASE}/tables/${apiTable}?colunas=dataHora`);
}


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

  async function handleGenerateTableForCurrentSelection() {
    if (!selectedReservatorios.length) {
      alert("Selecione ao menos um reservatório.");
      return;
    }
    if (!selectedColumns.length) {
      alert("Selecione ao menos uma coluna para visualizar/exportar.");
      return;
    }
    if (!startDate || !endDate) {
      alert("Escolha período.");
      return;
    }
    setLoading(true);
    try {
      const apiTable = resolveApiTableName(table);
      const provider = getProviderForApi(apiTable);
      const dataCol = provider === "furnas" ? "dataMedida" : "dataHora";
      const cols = ["idreservatorio", dataCol, ...selectedColumns].filter(Boolean);
      const colsParam = cols.map((c) => encodeURIComponent(c)).join(",");

      // provider-aware endpoint (no all=true, no limit)
     const endpoint = provider
      ? `${API_BASE}/tables/${provider}/${apiTable}?colunas=${colsParam}`
      : `${API_BASE}/tables/${apiTable}?colunas=${colsParam}`;


      console.debug("[generate-table] fetching endpoint:", endpoint);
      const resp = await fetch(endpoint);
      if (!resp.ok) {
        throw new Error(`fetch failed: ${resp.status} ${resp.statusText}`);
      }
      const json = await resp.json();
      const rows = Array.isArray(json) ? json : json?.data || json?.rows || [];
      console.debug("[generate-table] fetched rows:", rows?.length ?? 0);

      const filtered = (rows || []).filter((r: any) => {
        const rid = r.idreservatorio ?? r.id_reservatorio ?? r.idReservatorio ?? r.reservatorio ?? null;
        if (rid == null) return false;
        const matchesReserv = selectedReservatorios.some((sel) => {
          const a = Number(sel);
          const b = Number(rid);
          return !Number.isNaN(a) && !Number.isNaN(b) ? a === b : String(sel) === String(rid);
        });
        if (!matchesReserv) return false;

        const dv = r.dataMedida ?? r.datamedida ?? r.dataHora ?? r.datahora ?? r.data ?? null;
        if (!dv) return false;
        const d = new Date(dv);
        if (isNaN(d.getTime())) return false;
        const day = isoDate(d);
        return day >= startDate && day <= endDate;
      });

      console.debug("[generate-table] filtered rows:", filtered.length);

      setData(filtered);
      setShowTable(true);
      setView("chart");
      setTimeout(() => chartRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 50);
    } catch (err) {
      console.error("[generate-table] error fetching/processing data:", err);
      alert("Erro ao gerar tabela. Veja console para detalhes.");
    } finally {
      setLoading(false);
    }
  }

  function downloadCSV() {
    if (!data || !data.length) {
      alert("Gere o dado de tabela para ter dados para exportar.");
      return;
    }
    const headers = Object.keys(data[0] || {});
    const rows = data.map((r) => headers.map((h) => (r[h] === undefined ? "" : `${r[h]}`)));
    const csv = [
      headers.join(","),
      ...rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")),
    ].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${table || "table"}_export.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function exportPDF() {
    if (!chartRef.current) {
      alert("Gere/abra a tabela para ter conteúdo para exportar.");
      return;
    }
    const html = `
      <html>
        <head>
          <title>Export PDF</title>
          <style>
            body { font-family: Arial, Helvetica, sans-serif; padding: 16px; }
            .wrap { width: 100%; }
          </style>
        </head>
        <body>
          <h3>Export - ${table}</h3>
          <div class="wrap">${chartRef.current.innerHTML}</div>
        </body>
      </html>
    `;
    const w = window.open("", "_blank");
    if (!w) {
      alert("Permita popups para exportar PDF.");
      return;
    }
    w.document.write(html);
    w.document.close();
    setTimeout(() => {
      w.print();
    }, 500);
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
      setColumns(columnsFromMetadata[table] || []);
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
                        // selecionar apenas os reservatórios que estão habilitados (possuem campanha)
                        const enabled = reservatorios
                          .filter((r: any) => {
                            const id = r.idreservatorio ?? r.id ?? r.idReservatorio;
                            // se não houver dados de campanha carregados, considerar todos como habilitados
                            if (!campanhas || campanhas.length === 0) return true;
                            const hasCamp = campanhas.some((c: any) => {
                              const cid = c.idreservatorio ?? c.id_reservatorio ?? c.idReservatorio ?? c.reservatorio;
                              return String(cid) === String(id);
                            });
                            return hasCamp;
                          })
                          .map((r: any) => r.idreservatorio ?? r.id ?? r.idReservatorio);
                        setSelectedReservatorios(enabled);
                      } else {
                        setSelectedReservatorios([]);
                      }
                    }}
                    // deixar esse checkbox habilitado — seleção em massa respeita campanhas
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
                  border: "1px solid #eef2ff",
                  borderRadius: 8,
                }}
              >
                {reservatorios.length ? (
                  reservatorios.map((r: any) => {
                    const id = r.idreservatorio ?? r.id ?? r.idReservatorio;
                    const checked = selectedReservatorios.some((s) => String(s) === String(id));

                    // determinar se este reservatório tem campanha (usar 'campanhas' carregadas)
                    const hasCampaign =
                      campanhas && campanhas.length
                        ? campanhas.some((c: any) => {
                            const cid = c.idreservatorio ?? c.id_reservatorio ?? c.idReservatorio ?? c.reservatorio;
                            return String(cid) === String(id);
                          })
                        : true; // se campanhas não carregadas, assumir true para não bloquear UX

                    const disabled = !hasCampaign;

                    return (
                      <div
                        key={String(id)}
                        style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          disabled={disabled}
                          onChange={(e) => {
                            // apenas permitir toggle para itens habilitados (mas disabled previne a ação)
                            setSelectAllReservatorios(false);
                            toggleReservatorio(id, e.target.checked);
                          }}
                        />
                        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                          <div>{r.nome ?? r.name ?? `Reservatório ${id}`}</div>
                          {disabled ? (
                            <small style={{ color: "#94a3b8", marginLeft: 6 }} title="Sem campanhas disponíveis">
                              (sem campanhas)
                            </small>
                          ) : null}
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
                </div>
              </>
            )}
          </Controls>

          {stage < 4 && (
            <ColumnsBox aria-label="Lista de colunas">
              <div style={{ fontWeight: 700 }}>Colunas disponíveis</div>
              <div style={{ marginTop: 8, fontSize: 12, color: "#64748b" }}>
                As colunas relacionadas à tabela selecionada aparecerão aqui após confirmar o período.
              </div>
            </ColumnsBox>
          )}
        </LeftColumn>

        <RightPanel>
          <ControlsTopRight>
            <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
              <DownloadButtonsContainer>
                <DownloadButton
                  variant="csv"
                  onClick={async () => {
                    const apiTable = table;
                    const isFurnas = responsibleFromMetadata && apiTable && String(responsibleFromMetadata[apiTable]).includes("Furnas");
                    if (isFurnas) {
                      await handleDownloadCSV();
                    } else {
                      downloadCSV();
                    }
                  }}
                  disabled={!data || data.length === 0 || loading}
                >
                  📥 CSV
                </DownloadButton>
                <DownloadButton
                  variant="json"
                  onClick={handleDownloadJSON}
                  disabled={!data || data.length === 0 || loading}
                >
                  📥 JSON
                </DownloadButton>
                <DownloadButton
                  variant="pdf"
                  onClick={handleDownloadPDF}
                  disabled={!data || data.length === 0 || loading}
                >
                  📥 PDF
                </DownloadButton>
              </DownloadButtonsContainer>

              <Button onClick={() => setView((v) => (v === "chart" ? "map" : "chart"))}>
                {view === "chart" ? "Ver mapa" : "Ver tabela"}
              </Button>

              <Button onClick={() => setShowTableView((s) => !s)}>Visualizar Tabela ▾</Button>

              <Button onClick={() => {
                // fallback generator kept for convenience
                setLoading(true);
                axios.get(`${API_BASE}/sima/all`).then(res => {
                  const payload:any = res.data;
                  setData(payload?.data ?? payload ?? []);
                  setShowTable(true);
                }).catch(err => console.error(err)).finally(()=>setLoading(false));
              }} disabled={loading} style={{ marginLeft: 6 }}>
                {loading ? "Carregando..." : "Gerar Tabelas"}
              </Button>
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
                        <SimaTable
                          columns={
                            selectedColumns && selectedColumns.length
                              ? selectedColumns.map((c) => ({ key: c, label: c }))
                              : Object.keys(data[0] || {})
                                  .slice(0, 6)
                                  .map((k) => ({ key: k, label: k }))
                          }
                          data={data}
                          page={1}
                          pageSize={10}
                          onPageChange={() => {}}
                        />
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
                        points={latLonPoints
                          .filter(
                            (p) =>
                              typeof p.latitude === "number" && typeof p.longitude === "number",
                          )
                          .map((p) => ({

                            id: p.id,
                            lat: Number(p.latitude),
                            lon: Number(p.longitude),
                            label: p.nome || `Reservatório ${p.id}`,
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
}
