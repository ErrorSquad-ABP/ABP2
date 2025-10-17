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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const API_BASE = (import.meta as any)?.env?.VITE_API_URL || "http://localhost:3001";

// paleta de cores para séries (linhas) e preenchimento por instituição
const SERIES_COLORS: string[] = ["#0b5394", "#2563EB", "#06B6D4", "#F59E0B", "#EF4444", "#10B981"];
const INSTITUTION_FILL_COLORS: string[] = [
  "#ffd6d6",
  "#fff0d6",
  "#d6ffe8",
  "#dff4ff",
  "#f0e6ff",
  "#fff8d6",
];

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
  name: string;
  label?: string;
  type?: "number" | "string" | "date" | "geom";
};

type TableMetadata = {
  id: string;
  name: string;
  description?: string;
  colunas: Array<object>;
};

function isoDate(date: Date) {
  return date.toISOString().slice(0, 10);
}

/* helper: produce month range inclusive in YYYY-MM-DD format (use first day of month) */
function monthsBetweenDatesISO(startISO: string, endISO: string) {
  const start = new Date(startISO + "T00:00:00");
  const end = new Date(endISO + "T00:00:00");
  const res: string[] = [];
  const s = new Date(start.getFullYear(), start.getMonth(), 1);
  const e = new Date(end.getFullYear(), end.getMonth(), 1);
  for (let dt = new Date(s); dt <= e; dt.setMonth(dt.getMonth() + 1)) {
    const y = dt.getFullYear();
    const m = (dt.getMonth() + 1).toString().padStart(2, "0");
    const d = "01";
    res.push(`${y}/${m}/${d}`); // ano/mes/dia format requested
  }
  return res;
}

/* ================= Styled ================= */

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

/* left column wrapper so controls + columns share the same full height */
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
  flex: 1 1 auto; /* take remaining height so left column matches right */
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
  /* make panel stretch to full left column height */
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
  align-items: flex-start; /* align top so legend (if any) lines up */
  justify-content: center;
  padding: 12px;
  border-radius: 8px;
  background: linear-gradient(180deg, #ffffff 0%, #f8fbff 100%);
  box-shadow: inset 0 4px 14px rgba(2, 6, 23, 0.02);
  position: relative; /* for tooltip placement */
  overflow: auto;
  min-height: 440px;
`;

/* tooltip */
const Tooltip = styled.div<{ left: number; top: number; color: string }>`
  position: absolute;
  left: ${(p) => p.left}px;
  top: ${(p) => p.top}px;
  transform: translate(-8px, -100%);
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 6px 20px rgba(2, 6, 23, 0.12);
  padding: 8px 10px;
  z-index: 60;
  min-width: 160px;
  font-size: 13px;
  pointer-events: none;

  .color {
    display: inline-block;
    width: 12px;
    height: 12px;
    border-radius: 3px;
    background: ${(p) => p.color};
    margin-right: 8px;
    vertical-align: middle;
    border: 1px solid rgba(0, 0, 0, 0.06);
  }

  .title {
    font-weight: 800;
    color: #0b2740;
  }

  .meta {
    color: #475569;
    margin-top: 6px;
    font-size: 12px;
  }
`;

/* legend container */
const Legend = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-top: 12px;
  align-items: center;
`;

const LegendItem = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  font-size: 14px;
  color: #0b2740;
`;

const MapPlaceholder = styled.div`
  position: relative;
  flex: 1;
  background: linear-gradient(180deg, #0b2340 0%, #082033 100%); /* darker backdrop */
  border-radius: 8px;
  overflow: hidden;
  min-height: 260px;
  padding: 12px;
`;

/* zoom controls positioned on top-right of map */
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

/* small table preview skeleton */
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

export default function TablesPage(): JSX.Element {
  const { slug } = useParams<{ slug: string }>();
  const topicSlug = slug || "abioticos";

  const [startDate, setStartDate] = useState<string>(() =>
    isoDate(new Date(Date.now() - 1000 * 60 * 60 * 24 * 90)),
  );
  const [endDate, setEndDate] = useState<string>(() => isoDate(new Date()));
  const [table, setTable] = useState<string>("");
  const [columns, setColumns] = useState<ColumnMeta[]>([]);
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
  const [responsible, setResponsible] = useState<string>();
  const [metadata, setMetadata] = useState<TableMetadata | null>();
  const [tablesFromMetadata, setTablesFromMetadata] = useState<Array<string>>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [columnsFromMetadata, setColumnsFromMetadata] = useState<any>();

  const [responsibleFromMetadata, setResponsibleFromMetadata] = useState<Record<
    string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any
  > | null>(null);

  const [view, setView] = useState<"chart" | "map">("chart");
  const [chartData, setChartData] = useState<any[] | null>(null);
  const chartRef = useRef<HTMLDivElement | null>(null);
  const chartMainRef = useRef<HTMLDivElement | null>(null);
  const [showExportOptions, setShowExportOptions] = useState(false);
  const [campanhas, setCampanhas] = useState<Campanha[]>([]);
  const [orderedCampanhas, setOrderedCampanhas] = useState<Campanha[]>([]);

  // tooltip state
  const [tooltip, setTooltip] = useState<{
    visible: boolean;
    left: number;
    top: number;
    instituicao?: string;
    reservatorio?: string;
    color?: string;
  }>({ visible: false, left: 0, top: 0 });

  // tabela preview state (dados da tabela e controle de exibição)
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [showTable, setShowTable] = useState<boolean>(false);

  // novo: controle de exibição do preview de tabela (botão Visualizar Tabela)
  const [showTableView, setShowTableView] = useState<boolean>(false);

  // zoom & labels
  const [zoom, setZoom] = useState<number>(1);
  const [showStateNames, setShowStateNames] = useState<boolean>(true);
  const [pan, setPan] = useState({ x: 0, y: 0 });

  async function handleGenerateTables(): Promise<void> {
    setShowTable(false);
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE}/sima/all`);
      const payload: any = res.data;
      setData(payload?.data ?? payload ?? []);
      setShowTable(true);
      setChartData(null);
      setView("chart");
    } catch (err) {
      console.error("Erro ao carregar dados da SIMA:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    async function load() {
      try {
        const metaRes = await fetch(`${API_BASE}/metadata/${encodeURIComponent(topicSlug)}`);

        if (metaRes.ok) {
          const m = await metaRes.json();
          const data = m.data;
          setMetadata(data);
          const tfm = data.map((item: any) => item.name);
          setTablesFromMetadata(tfm);
        }
      } catch (err) {
        console.log("Error fetching metadata: ", err);
      }
    }

    load();
  }, [topicSlug]);

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

  useEffect(() => {
    const fetchCampanhas = async () => {
      if (!table || !responsibleFromMetadata) return;

      const responsibleVal = responsibleFromMetadata[table];
      const fetches: Promise<Campanha[]>[] = [];

      if (
        responsibleVal &&
        typeof responsibleVal === "string" &&
        responsibleVal.includes("Furnas")
      ) {
        fetches.push(
          axios
            .get("http://localhost:3001/tables/furnas/tbcampanha?all=true")
            .then((res) => res.data.data as Campanha[]),
        );
      }

      if (
        responsibleVal &&
        typeof responsibleVal === "string" &&
        responsibleVal.includes("Balcar")
      ) {
        fetches.push(
          axios
            .get("http://localhost:3001/balcar/campanha")
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

        console.log("Sem diplicatas; ", uniqueDates);
        setCampanhas(uniqueDates);
      } catch (err) {
        console.error("Erro ao carregar campanhas", err);
      }
    };

    fetchCampanhas();
  }, [table, responsibleFromMetadata]);

  useEffect(() => {
    //Ordenar campanhas
    if (campanhas) {
      setOrderedCampanhas(
        campanhas.sort(
          (a: any, b: any) => new Date(a.datainicio).getTime() - new Date(b.datainicio).getTime(),
        ),
      );
    } else {
      return;
    }
  }, [campanhas]);

  function testDates(c) {
    if (!orderedCampanhas) {
      return "Carregando...";
    } else {
      return c.datainicio.slice(0, 10).split("-").reverse().join("/");
    }
  }

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

  function toggleColumn(name: string) {
    setSelectedColumns((s) => (s.includes(name) ? s.filter((x) => x !== name) : [...s, name]));
  }

  function handleStartDate(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void {
    const date: string = e.target.value;
    if (date <= endDate) {
      setStartDate(date);
    } else {
      alert("Data de início deve ser menor que data final!");
    }
  }

  function handleEndDate(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void {
    const date: string = e.target.value;
    if (date >= startDate) {
      setEndDate(date);
    } else {
      alert("Data final deve ser menor que data de início!");
    }
  }

  async function handleGenerate() {
    if (!selectedColumns.length) {
      alert("Selecione ao menos uma coluna para gerar o gráfico.");
      return;
    }

    const months = monthsBetweenDatesISO(startDate, endDate);
    try {
      const params = new URLSearchParams();
      params.set("start", startDate);
      params.set("end", endDate);
      params.set("cols", selectedColumns.join(","));
      params.set("aggregate_by", "month");

      const url = `${API_BASE}/tables/${encodeURIComponent(table)}/aggregate?${params.toString()}`;
      const res = await fetch(url);

      if (res.ok) {
        const dataRes = await res.json();
        const rows = Array.isArray(dataRes) ? dataRes : dataRes?.rows || dataRes?.data || [];
        if (Array.isArray(rows) && rows.length) {
          setChartData(rows);
        } else {
          setChartData(makeMockMeasurementsForMonths(months));
        }
      } else {
        setChartData(makeMockMeasurementsForMonths(months));
      }
    } catch (err) {
      setChartData(makeMockMeasurementsForMonths(months));
      console.log(err);
    }

    setView("chart");
    chartRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  function downloadCSV() {
    if (!chartData || !chartData.length) {
      alert("Gere o gráfico para ter dados para exportar.");
      return;
    }
    const headers = ["id", "datamedida", ...selectedColumns];
    const rows = chartData.map((r) => headers.map((h) => (r[h] === undefined ? "" : `${r[h]}`)));
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
      alert("Gere o gráfico para ter conteúdo para exportar.");
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

  const latLonPoints = useMemo(() => {
    if (!chartData || !chartData.length) return [];
    return chartData
      .filter((r) => typeof r.latitude === "number" && typeof r.longitude === "number")
      .map((r) => ({ lat: r.latitude, lon: r.longitude, id: r.id }));
  }, [chartData]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const ev = e as any;
    if (ev.buttons === 1) {
      setPan((prevPan) => ({
        x: prevPan.x + (ev.movementX || 0),
        y: prevPan.y + (ev.movementY || 0),
      }));
    }
  };

  function MultiSeriesSVG({ rows, columns }: { rows: any[]; columns: string[] }) {
    if (!rows || !rows.length || !columns || !columns.length)
      return <div style={{ padding: 16 }}>Sem dados para exibir.</div>;

    const months = (() => {
      const found = rows.map((r) => {
        if (!r.datamedida) return "";
        const d = new Date(r.datamedida);
        if (!isNaN(d.getTime()))
          return `${d.getFullYear()}/${String(d.getMonth() + 1).padStart(2, "0")}/01`;
        const s = String(r.datamedida).slice(0, 10).replace(/-/g, "/");
        return s.length ? s : "";
      });
      if (found.every((m) => m)) return found;
      return monthsBetweenDatesISO(startDate, endDate);
    })();

    const height = 520;
    const viewBoxWidth = Math.max(1000, months.length * 100);
    const count = months.length;
    const xFor = (i: number) => (i / (count - 1 || 1)) * (viewBoxWidth - 100) + 50;

    const rowsByMonth = months.map((m, i) => {
      const ymd = m.replace(/\//g, "-").slice(0, 7);
      const found = rows.find((r) => {
        if (!r.datamedida) return false;
        const d = new Date(r.datamedida);
        if (isNaN(d.getTime())) return false;
        const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
        return key === ymd;
      });
      return found || rows[Math.min(rows.length - 1, i)] || rows[0];
    });

    const seriesValues = columns.map((col) =>
      rowsByMonth.map((r) => {
        const v = Number(r[col]);
        return Number.isFinite(v) ? v : NaN;
      }),
    );

    const allNumbers = seriesValues.flat().filter((v) => !Number.isNaN(v));
    const max = allNumbers.length ? Math.max(...allNumbers) : 1;
    const min = allNumbers.length ? Math.min(...allNumbers) : 0;
    const range = max - min || 1;
    const yFor = (v: number) => ((max - v) / range) * (height - 80) + 40;

    const uniqueInsts = Array.from(new Set(rows.map((r) => r.instituicao || "—")));
    const instColorMap: Record<string, string> = {};
    uniqueInsts.forEach((inst, idx) => {
      instColorMap[inst] = INSTITUTION_FILL_COLORS[idx % INSTITUTION_FILL_COLORS.length];
    });

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
                  const repRow = rowsByMonth[i] || {};
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
                          chartMainRef.current.getBoundingClientRect()) || {
                          left: 0,
                          top: 0,
                        };
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
                          chartMainRef.current.getBoundingClientRect()) || {
                          left: 0,
                          top: 0,
                        };
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

          {months.map((m, i) => (
            <text
              key={`lbl-${i}`}
              x={xFor(i)}
              y={height - 10}
              fontSize="12"
              fill="#5b6b7a"
              textAnchor="middle"
            >
              {m}
            </text>
          ))}

          <text x="14" y={34} fontSize="13" fill="#5b6b7a">
            {max}
          </text>
          <text x="14" y={height - 22} fontSize="13" fill="#5b6b7a">
            {min}
          </text>
        </svg>

        {tooltip.visible && tooltip.instituicao && (
          <Tooltip left={tooltip.left} top={tooltip.top} color={tooltip.color || "#ccc"}>
            <div className="title">
              <span className="color" />
              {tooltip.instituicao}
            </div>
            <div className="meta">
              Reservatório: <strong>{tooltip.reservatorio || "—"}</strong>
            </div>
          </Tooltip>
        )}
      </div>
    );
  }

  const numericColumns = columns.filter(
    (c) => c.type === "number" || /dic|ph|profundidade|temp|conduct/i.test(c.name),
  );
  const plotColumns = selectedColumns.filter((s) => numericColumns.some((c) => c.name === s));
  const plottedColumns = plotColumns.length ? plotColumns : [selectedColumns[0]].filter(Boolean);

  // criar alias any para MapBrazil para evitar erro de tipagem temporariamente
  const MapBrazilAny = MapBrazil as any;

  return (
    <Page>
      <Container>
        <LeftColumn>
          <Controls>
            <Row>
              <Label>Data início</Label>
              <select
                value={startDate}
                onChange={(e) => handleStartDate(e)}
                style={{
                  width: "100%",
                  padding: "8px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                }}
              >
                <option value="">Selecione...</option>
                {campanhas.map((c) => (
                  <option key={`ini-${c.idcampanha}`} value={c.datainicio.slice(0, 10)}>
                    {testDates(c)}
                  </option>
                ))}
              </select>
            </Row>

            <Row>
              <Label>Data fim</Label>
              <select
                value={endDate}
                onChange={(e) => handleEndDate(e)}
                style={{
                  width: "100%",
                  padding: "8px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                }}
              >
                <option value="">Selecione...</option>
                {campanhas.map((c) => (
                  <option key={`fim-${c.idcampanha}`} value={c.datafim.slice(0, 10)}>
                    {testDates(c)}
                  </option>
                ))}
              </select>
            </Row>

            <Row>
              <Label>Tabela</Label>
              <Select value={table} onChange={(e) => setTable(e.target.value)}>
                {tablesFromMetadata && tablesFromMetadata.length > 0 ? (
                  tablesFromMetadata.map((tableName) => (
                    <option key={tableName} value={tableName}>
                      {tableName}
                    </option>
                  ))
                ) : (
                  <option value={[] as any}>Carregando tabelas...</option>
                )}
              </Select>
              <div style={{ fontSize: 12, color: "#0b2740", marginLeft: 8 }}>
                * Obrigatório selecionar tabela
              </div>
            </Row>

            <div style={{ fontSize: 13, color: "#475569", marginTop: 6 }}>
              <strong>Colunas disponíveis</strong>
              <div style={{ marginTop: 8, fontSize: 12, color: "#64748b" }}>
                Marque as colunas que deseja incluir no gráfico
              </div>
            </div>
          </Controls>

          <ColumnsBox aria-label="Lista de colunas">
            {columns &&
              columns.map((c: any, index: number) => (
                <ColumnItem key={c.nome || `column-${index}`}>
                  <input
                    type="checkbox"
                    checked={selectedColumns.includes(c.nome)}
                    onChange={() => toggleColumn(c.nome)}
                    id={`col-${c.nome || index}`}
                  />
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <span style={{ fontWeight: 700 }}>{c.label || c.nome}</span>
                    <small style={{ color: "#64748b" }}>{c.type || "—"}</small>
                  </div>
                </ColumnItem>
              ))}
          </ColumnsBox>
        </LeftColumn>

        <RightPanel>
          <ControlsTopRight>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <Button $primary onClick={handleGenerate}>
                Gerar Gráfico
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
                      zIndex: 40,
                    }}
                  >
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      <button
                        style={{ padding: 8, borderRadius: 6, border: "none", cursor: "pointer" }}
                        onClick={() => {
                          downloadCSV();
                          setShowExportOptions(false);
                        }}
                      >
                        CSV
                      </button>
                      <button
                        style={{ padding: 8, borderRadius: 6, border: "none", cursor: "pointer" }}
                        onClick={() => {
                          exportPDF();
                          setShowExportOptions(false);
                        }}
                      >
                        PDF
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <Button onClick={() => setView((v) => (v === "chart" ? "map" : "chart"))}>
                {view === "chart" ? "Ver mapa" : "Ver gráfico"}
              </Button>

              <Button onClick={() => setShowTableView((s) => !s)}>Visualizar Tabela ▾</Button>

              <Button onClick={handleGenerateTables} disabled={loading} style={{ marginLeft: 6 }}>
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
                    {chartData ? `${chartData.length} registros` : "Nenhum dado gerado"}
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
                        {chartData && chartData.length
                          ? chartData.slice(0, 5).map((row, i) => (
                              <tr key={`row-${i}`}>
                                {selectedColumns.map((col) => (
                                  <td key={`${i}-${col}`}>{String(row[col] ?? "—")}</td>
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
                  <ChartMain
                    ref={chartMainRef}
                    onMouseLeave={() => {
                      setTooltip({ visible: false, left: 0, top: 0 });
                    }}
                  >
                    {chartData && chartData.length && plottedColumns.length ? (
                      <div style={{ width: "100%" }}>
                        <MultiSeriesSVG rows={chartData} columns={plottedColumns} />
                        <Legend aria-hidden>
                          {plottedColumns.map((col, i) => (
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
                      </div>
                    ) : (
                      <div style={{ padding: 16, color: "#64748b" }}>
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
                            }}
                          >
                            <SimaTable
                              columns={[
                                { key: "idsima", label: "ID SIMA" },
                                { key: "idestacao", label: "Estação" },
                                { key: "datahora", label: "Data e Hora" },
                                { key: "tempar", label: "Temperatura" },
                                { key: "precipitacao", label: "Precipitação" },
                              ]}
                              data={data}
                              page={1}
                              pageSize={10}
                              onPageChange={() => {}}
                            />
                          </div>
                        ) : (
                          <>
                            Clique em <strong>Gerar Tabelas</strong> para criar uma visualização
                            (protótipo).
                          </>
                        )}
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
                        points={latLonPoints.map((p) => ({
                          id: p.id,
                          lat: p.lat,
                          lon: p.lon,
                          label: `Ponto ${p.id}`,
                        }))}
                        height={760}
                        showPolygons={true}
                        showStateNames={showStateNames}
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
/* ================= helpers (mock) ================= */

/**
 * Produz um array de objetos mock, um por mês (usado apenas como fallback).
 */
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
