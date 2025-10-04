// front/src/pages/TablesPage.tsx
import { JSX, useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import MapBrazil from "../components/MapBrazil";

/**
 * TablesPage
 *
 * Notes:
 * - Use Vite env via import.meta (not process.env).
 * - This file uses a small runtime-safe access to import.meta.env to avoid TS/Bundler errors.
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const API_BASE = (import.meta as any)?.env?.VITE_API_URL || "http://localhost:3001";

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

/* ================= Mock / Defaults ================= */
/* NOTE: datamedida removed from selectable columns as requested */
const mockColumns: ColumnMeta[] = [
  { name: "dic", label: "DIC (mg/L)", type: "number" },
  { name: "ph", label: "pH", type: "number" },
  { name: "profundidade", label: "Profundidade (m)", type: "number" },
];

//ARRUMAR MOCK / TIRAR O QUE USA
/*
const mockMetadata: any = 
   [
    {
      id: "tbabioticocoluna",
      name: "tbabioticocoluna",
      description: "Medições na coluna d'água (profundidade, DIC, delta15N, etc.)",
      colunas: [
        {
          nome: "nomedacoluna",
          label: "Nome Formatado",
          type: "tipodacoluna"
        }
      ]
    },
    {
      id: "tbabioticosuperficie",
      name: "tbabioticosuperficie",
      description: "Medições na superfície",
      colunas: []
    }
  ]
;
*/
const MOCK_INSTITUTIONS = ["INPE", "FURNAS", "BALCAR", "UFRJ", "USP"];
/*
 simple color palette for multiple series */
const SERIES_COLORS = ["#0b5394", "#2563EB", "#06B6D4", "#F59E0B", "#EF4444", "#10B981"];
const INSTITUTION_FILL_COLORS = ["#ffd6d6", "#fff0d6", "#d6ffe8", "#dff4ff", "#f0e6ff", "#fff8d6"];

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

const Input = styled.input`
  padding: 8px 10px;
  border-radius: 8px;
  border: 1px solid rgba(2, 6, 23, 0.06);
  width: 100%;
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

const Button = styled.button<{ primary?: boolean }>`
  padding: 10px 14px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  font-weight: 700;
  background: ${(p) => (p.primary ? p.theme.colors.primary : "rgba(2,6,23,0.06)")};
  color: ${(p) => (p.primary ? "#fff" : "#04203a")};
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

/* ================= Component ================= */

export default function TablesPage(): JSX.Element {
  const { slug } = useParams<{ slug: string }>();
  const topicSlug = slug || "abioticos";

  const [startDate, setStartDate] = useState<string>(() =>
    isoDate(new Date(Date.now() - 1000 * 60 * 60 * 24 * 90)),
  );
  const [endDate, setEndDate] = useState<string>(() => isoDate(new Date()));
  const [table, setTable] = useState<string>("");
  const [columns, setColumns] = useState<ColumnMeta[]>(mockColumns);
  const [selectedColumns, setSelectedColumns] = useState<string[]>(() =>
    mockColumns.slice(0, 3).map((c) => c.name),
  );
  const [responsible, setResponsible] = useState<string>();
  const [metadata, setMetadata] = useState<TableMetadata | null>();
  const [tablesFromMetadata, setTablesFromMetadata] = useState<Array<string>>();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [columnsFromMetadata, setColumnsFromMetadata] = useState<any>();
  const [responsibleFromMetadata, setResponsibleFromMetadata] = useState<string>();

  const [view, setView] = useState<"chart" | "map">("chart");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [chartData, setChartData] = useState<any[] | null>(null);
  const chartRef = useRef<HTMLDivElement | null>(null);
  const chartMainRef = useRef<HTMLDivElement | null>(null);
  const [showExportOptions, setShowExportOptions] = useState(false);

  // tooltip state
  const [tooltip, setTooltip] = useState<{
    visible: boolean;
    left: number;
    top: number;
    instituicao?: string;
    reservatorio?: string;
    color?: string;
  }>({ visible: false, left: 0, top: 0 });

  useEffect(() => {
    async function load() {
      try {
        const metaRes = await fetch(`${API_BASE}/metadata/${encodeURIComponent(topicSlug)}`);

        if (metaRes.ok) {
          const m = await metaRes.json();
          const data = m.data;
          setMetadata(data);
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
      setColumns(columnsFromMetadata[table]);
      setResponsible(responsibleFromMetadata[table]);
    }
  }, [table, columnsFromMetadata]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function getColumnsFromMetadata(meta: any) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const clms: Record<string, any> = {}; // Define que o objeto terá chaves do tipo string e valores de qualquer tipo
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    meta.forEach((tb: any) => {
      clms[tb.name] = tb.colunas;
    });
    return clms;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function getResponsibleFromMetadata(meta: any) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const resp: Record<string, any> = {}; // Define que o objeto terá chaves do tipo string e valores de qualquer tipo
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    meta.forEach((tb: any) => {
      resp[tb.name] = tb.responsible; // Chave dinâmica e valor
    });
    return resp;
  }

  function toggleColumn(name: string) {
    setSelectedColumns((s) => (s.includes(name) ? s.filter((x) => x !== name) : [...s, name]));
  }

  function handleStartDate(e:React.ChangeEvent<HTMLInputElement>):void {
    const date:string = e.target.value;
    if (date <= endDate) {
      setStartDate(date)
    } else {
      alert('Data de início deve ser menor que data final!')
    }
  }

   function handleEndDate(e:React.ChangeEvent<HTMLInputElement>):void {
    const date:string = e.target.value;
    if (date >= startDate) {
      setEndDate(date)
    } else {
      alert('Data final deve ser menor que data de início!')
    }
  }

  // try backend aggregate, fallback to mock
  async function handleGenerate() {
    if (!selectedColumns.length) {
      alert("Selecione ao menos uma coluna para gerar o gráfico.");
      return;
    }

    // use month range as x-axis sampling
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
        const data = await res.json();
        const rows = Array.isArray(data) ? data : data?.rows || data?.data || [];
        if (Array.isArray(rows) && rows.length) {
          setChartData(rows);
        } else {
          // fallback: produce one row per month
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

  /*
  function normalizePoints(points: { lat: number; lon: number }[]) {
    if (!points.length) return [];
    const lats = points.map((p) => p.lat);
    const lons = points.map((p) => p.lon);
    const minLat = Math.min(...lats);
    const maxLat = Math.max(...lats);
    const minLon = Math.min(...lons);
    const maxLon = Math.max(...lons);
    const latSpan = maxLat - minLat || 1;
    const lonSpan = maxLon - minLon || 1;
    return points.map((p) => ({
      left: ((p.lon - minLon) / lonSpan) * 100,
      top: 100 - ((p.lat - minLat) / latSpan) * 100,
    }));
  } */

  /* const normalizedMarkers = useMemo(() => normalizePoints(latLonPoints), [latLonPoints]); */

  /* Multi-series SVG chart: plots all selected numeric columns on the same coordinate system
     and shows colored points per institution with tooltip on hover.
     X axis now uses monthsBetweenDatesISO(start,end) so we always show every month label in YYYY/MM/DD. */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function MultiSeriesSVG({ rows, columns }: { rows: any[]; columns: string[] }) {
    if (!rows || !rows.length || !columns || !columns.length)
      return <div style={{ padding: 16 }}>Sem dados para exibir.</div>;

    // derive months from rows if datamedida exists or fallback to monthsBetweenDatesISO
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

    const height = 520; // bigger chart
    const viewBoxWidth = Math.max(1000, months.length * 100);
    const count = months.length;
    const xFor = (i: number) => (i / (count - 1 || 1)) * (viewBoxWidth - 100) + 50;

    // build rowsByMonth aligned to months (first matching row per month)
    const rowsByMonth = months.map((m, i) => {
      const ymd = m.replace(/\//g, "-").slice(0, 7); // YYYY-MM
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

    // compute global min/max across series ignoring NaN
    const allNumbers = seriesValues.flat().filter((v) => !Number.isNaN(v));
    const max = allNumbers.length ? Math.max(...allNumbers) : 1;
    const min = allNumbers.length ? Math.min(...allNumbers) : 0;
    const range = max - min || 1;
    const yFor = (v: number) => ((max - v) / range) * (height - 80) + 40;

    // institution -> color mapping (fill)
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
          {/* grid lines */}
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

          {/* series lines */}
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

          {/* x axis labels: show every month label (YYYY/MM/DD) */}
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

          {/* left axis labels */}
          <text x="14" y={34} fontSize="13" fill="#5b6b7a">
            {max}
          </text>
          <text x="14" y={height - 22} fontSize="13" fill="#5b6b7a">
            {min}
          </text>
        </svg>

        {/* tooltip rendered over SVG using absolute positioning - only while hovered */}
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

  return (
    <Page>
      <Container>
        <LeftColumn>
          <Controls>
            <Row>
              <Label>Data início</Label>
              <Input type="date" value={startDate} onChange={(e) => handleStartDate(e)} />
            </Row>

            <Row>
              <Label>Data fim</Label>
              <Input type="date" value={endDate} onChange={(e) => handleEndDate(e)} />
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
                  <option value={[]}>Carregando tabelas...</option>
                )}{" "}
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
            {/*eslint-disable-next-line @typescript-eslint/no-explicit-any*/}
            {columns.map((c: any) => (
              <ColumnItem key={c.nome}>
                <input
                  key={c.nome}
                  type="checkbox"
                  checked={selectedColumns.includes(c.nome)}
                  onChange={() => toggleColumn(c.nome)}
                  id={`col-${c.nome}`}
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
              <Button primary onClick={handleGenerate}>
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

                <ChartWrapper>
                  <ChartMain
                    ref={chartMainRef}
                    onMouseLeave={() => {
                      // ensure tooltip hides when mouse leaves chart area
                      setTooltip({ visible: false, left: 0, top: 0 });
                    }}
                  >
                    {chartData && chartData.length && plottedColumns.length ? (
                      <div style={{ width: "100%" }}>
                        <MultiSeriesSVG rows={chartData} columns={plottedColumns} />
                        {/* legend placed under SVG */}
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
                        Clique em <strong>Gerar Gráfico</strong> para criar uma visualização
                        (protótipo).
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
                  {latLonPoints.length ? (
                    <div style={{ padding: 12, width: "100%", height: "100%" }}>
                      <MapBrazil
                        points={latLonPoints.map((p) => ({
                          id: p.id,
                          lat: p.lat,
                          lon: p.lon,
                          label: `Ponto ${p.id}`,
                        }))}
                        height={520}
                        /*showPolygons={true}*/
                      />
                    </div>
                  ) : (
                    <div style={{ padding: 16, color: "#334155" }}>
                      Não há coordenadas disponíveis. Gere o gráfico com colunas contendo{" "}
                      <code>latitude</code> / <code>longitude</code>.
                    </div>
                  )}
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

function makeMockMeasurementsForMonths(months: string[]) {
  return months.map((m, i) => {
    const inst = MOCK_INSTITUTIONS[i % MOCK_INSTITUTIONS.length];
    const reserv = `Represa ${String.fromCharCode(65 + (i % 6))}`;
    // produce a datamedida as first day of month in ISO-ish
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
