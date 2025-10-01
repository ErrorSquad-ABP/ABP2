// front/src/pages/TablesPage.tsx
import React, { useEffect, useMemo, useRef, useState } from "react";
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
  colunas: Array<object>

};

function isoDate(date: Date) {
  return date.toISOString().slice(0, 10);
}

const mockColumns: ColumnMeta[] = [
  { name: "datamedida", label: "Data", type: "date" },
  { name: "dic", label: "DIC (mg/L)", type: "number" },
  { name: "ph", label: "pH", type: "number" },
  { name: "profundidade", label: "Profundidade (m)", type: "number" },
  { name: "latitude", label: "Latitude", type: "number" },
  { name: "longitude", label: "Longitude", type: "number" },
];

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

function simpleRange(startISO: string, endISO: string, n = 12) {
  const start = new Date(startISO);
  const end = new Date(endISO);
  const arr: string[] = [];
  for (let i = 0; i < n; i++) {
    const t = start.getTime() + ((end.getTime() - start.getTime()) * i) / (n - 1 || 1);
    arr.push(new Date(t).toISOString().slice(0, 10));
  }
  return arr;
}

function makeMockMeasurements(dates: string[]) {
  return dates.map((d, i) => ({
    id: i + 1,
    datamedida: d,
    dic: +(5 + Math.sin(i / 2) * 2 + Math.random() * 0.6).toFixed(2),
    ph: +(6 + Math.cos(i / 3) * 0.4 + Math.random() * 0.1).toFixed(2),
    profundidade: +(Math.abs(Math.sin(i / 2)) * 10).toFixed(2),
    latitude: -10 + Math.random() * 5,
    longitude: -50 + Math.random() * 5,
  }));
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

  @media (max-width: 1100px) {
    grid-template-columns: 1fr;
    padding: 0 18px;
  }
`;

const Controls = styled.div`
  background: #fff;
  padding: 16px;
  border-radius: 12px;
  box-shadow: 0 8px 28px rgba(6, 58, 128, 0.06);
  display: flex;
  flex-direction: column;
  gap: 12px;
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
  max-height: calc(100vh - 240px);
  overflow: auto;
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
  min-height: 480px; /* increased to make visualization area larger */
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
  align-items: center;
  justify-content: center;
  padding: 8px;
  border-radius: 8px;
  background: linear-gradient(180deg, #ffffff 0%, #f8fbff 100%);
  box-shadow: inset 0 4px 14px rgba(2, 6, 23, 0.02);
`;

const ChartSide = styled.div`
  width: 260px;
  display: flex;
  flex-direction: column;
  gap: 8px;

  @media (max-width: 900px) {
    width: 100%;
  }
`;

const MapPlaceholder = styled.div`
  position: relative;
  flex: 1;
  background: linear-gradient(180deg, #dbeafe 0%, #bfdbfe 100%);
  border-radius: 8px;
  overflow: hidden;
  min-height: 260px;
`;

const Marker = styled.div<{ left: number; top: number }>`
  position: absolute;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: rgba(220, 38, 38, 0.95);
  left: ${(p) => p.left}%;
  top: ${(p) => p.top}%;
  transform: translate(-50%, -50%);
  box-shadow: 0 4px 10px rgba(2, 6, 23, 0.2);
`;

/* simple color palette for multiple series */
const SERIES_COLORS = ["#0b5394", "#2563EB", "#06B6D4", "#F59E0B", "#EF4444", "#10B981"];

/* ================= Component ================= */

export default function TablesPage(): JSX.Element {
  const { slug } = useParams<{ slug: string }>();
  const topicSlug = slug || "abioticos";

  const [startDate, setStartDate] = useState<string>(() =>
    isoDate(new Date(Date.now() - 1000 * 60 * 60 * 24 * 90)),
  );
  const [endDate, setEndDate] = useState<string>(() => isoDate(new Date()));
  const [table, setTable] = useState<string>(() => topicSlug);
  const [responsavel, setResponsavel] = useState<string>("");

  // sensible defaults
  const [columns, setColumns] = useState<ColumnMeta[]>(mockColumns);
  const [selectedColumns, setSelectedColumns] = useState<string[]>(() =>
    mockColumns.slice(0, 3).map((c) => c.nome),
  );
  const [metadata, setMetadata] = useState<TableMetadata | null>();
  const [tablesFromMetadata, setTablesFromMetadata] = useState<Array<string>>();
  const [columnsFromMetadata, setColumnsFromMetadata] = useState<any>();

  const [view, setView] = useState<"chart" | "map">("chart");
  const [chartData, setChartData] = useState<any[] | null>(null);
  const chartRef = useRef<HTMLDivElement | null>(null);
  const [showExportOptions, setShowExportOptions] = useState(false);

  useEffect(() => { //Get metadata useEffect
    let mounted = true;

    async function load() {
      try {
        const metaRes = await fetch(`${API_BASE}/metadata/${encodeURIComponent(table)}`);

        if (metaRes.ok) {
          const m = await metaRes.json();
          const data = m.data;
          setMetadata(data)

          const tfm = data.map((item:any) => item.name);
          setTablesFromMetadata(tfm)
        }
      } catch (err) {
        console.log("Erro ao adicionar metadata: ", err)
      }
    }
    load();
     return () => {
      mounted = false;
    };
  },[])


useEffect(() => {
  if (metadata) {
    setColumnsFromMetadata(getColumnsFromMetadata(metadata)); 
  }
}, [metadata]); 

  useEffect(() => {
    console.log("Metadata atualizado: ", metadata)
    console.log("Tfm atualizado: ", tablesFromMetadata)
    if(columnsFromMetadata) {
    console.log("Meta columns atualizado: ", Object.keys(columnsFromMetadata))
    console.log("Meta columns atualizado: ", columnsFromMetadata[table])
    }
  }, [metadata, tablesFromMetadata, columnsFromMetadata])

  useEffect(() => {
        if(columnsFromMetadata) {

    console.log(columnsFromMetadata[table])
    setColumns(columnsFromMetadata[table])
        }
    // setColumns(columnsFromMetadata[table])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [table]);

  function getColumnsFromMetadata(meta:any){
    const clms: Record<string, any> = {}; // Define que o objeto terá chaves do tipo string e valores de qualquer tipo
    meta.forEach((tb:any) => {
     clms[tb.name] = tb.colunas; // Chave dinâmica e valor
    });
    console.log("CLMS: ", clms)
    return clms
  }

  function toggleColumn(name: string) {
    setSelectedColumns((s) => (s.includes(name) ? s.filter((x) => x !== name) : [...s, name]));
  }

  // try backend aggregate, fallback to mock
  async function handleGenerate() {
    if (!selectedColumns.length) {
      alert("Selecione ao menos uma coluna para gerar o gráfico.");
      return;
    }

    try {
      const params = new URLSearchParams();
      params.set("start", startDate);
      params.set("end", endDate);
      if (responsavel) params.set("responsavel", responsavel);
      params.set("cols", selectedColumns.join(","));

      const url = `${API_BASE}/tables/${encodeURIComponent(table)}/aggregate?${params.toString()}`;
      const res = await fetch(url);

      if (res.ok) {
        const data = await res.json();
        const rows = Array.isArray(data) ? data : data?.rows || data?.data || [];
        if (Array.isArray(rows) && rows.length) {
          setChartData(rows);
        } else {
          const dates = simpleRange(startDate, endDate, 20);
          setChartData(makeMockMeasurements(dates));
        }
      } else {
        const dates = simpleRange(startDate, endDate, 20);
        setChartData(makeMockMeasurements(dates));
      }
    } catch (err) {
      const dates = simpleRange(startDate, endDate, 20);
      setChartData(makeMockMeasurements(dates));
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
  }

  const normalizedMarkers = useMemo(() => normalizePoints(latLonPoints), [latLonPoints]);

  /* Multi-series SVG chart: plots all selected numeric columns on the same coordinate system */
  function MultiSeriesSVG({ rows, columns }: { rows: any[]; columns: string[] }) {
    if (!rows || !rows.length || !columns || !columns.length)
      return <div style={{ padding: 16 }}>Sem dados para exibir.</div>;

    const height = 340;
    const viewBoxWidth = 820;
    // prepare x positions
    const count = rows.length;
    const xFor = (i: number) => (i / (count - 1 || 1)) * (viewBoxWidth - 60) + 30;

    // build value arrays for each column
    const seriesValues = columns.map((col) =>
      rows.map((r) => {
        const v = Number(r[col]);
        return Number.isFinite(v) ? v : NaN;
      }),
    );

    // compute global min/max across series ignoring NaN
    const allNumbers = seriesValues.flat().filter((v) => !Number.isNaN(v));
    const max = allNumbers.length ? Math.max(...allNumbers) : 1;
    const min = allNumbers.length ? Math.min(...allNumbers) : 0;
    const range = max - min || 1;
    const yFor = (v: number) => ((max - v) / range) * (height - 40) + 20;

    return (
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
            x1={30}
            x2={viewBoxWidth - 30}
            y1={20 + t * (height - 40)}
            y2={20 + t * (height - 40)}
            stroke="#e6eefb"
            strokeWidth={1}
          />
        ))}

        {/* series */}
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
                strokeWidth={2.2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {points.map((pt, i) => {
                const [xStr, yStr] = pt.split(",");
                return (
                  <circle
                    key={i}
                    cx={+xStr}
                    cy={+yStr}
                    r={3.5}
                    fill={stroke}
                    stroke="#fff"
                    strokeWidth={0.8}
                  />
                );
              })}
            </g>
          );
        })}

        {/* labels: left axis min/max */}
        <text x="8" y={18} fontSize="11" fill="#5b6b7a">
          {max}
        </text>
        <text x="8" y={height - 2} fontSize="11" fill="#5b6b7a">
          {min}
        </text>

        {/* legend */}
        {columns.map((c, i) => (
          <g key={c} transform={`translate(${viewBoxWidth - 200}, ${20 + i * 18})`}>
            <rect width="12" height="10" rx="2" fill={SERIES_COLORS[i % SERIES_COLORS.length]} />
            <text x="18" y="9" fontSize="12" fill="#0b2740">
              {c}
            </text>
          </g>
        ))}
      </svg>
    );
  }

  const numericColumns = columns.filter(
    (c) => c.type === "number" || /dic|ph|profundidade|temp|conduct/i.test(c.nome),
  );
  // selected numeric columns to plot (prefer numeric ones)
  const plotColumns = selectedColumns.filter((s) => numericColumns.some((c) => c.nome === s));
  const plottedColumns = plotColumns.length ? plotColumns : [selectedColumns[0]].filter(Boolean);

  return (
    <Page>
      <Container>
        <div>
          <Controls>
            <Row>
              <Label>Data início</Label>
              <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            </Row>

            <Row>
              <Label>Data fim</Label>
              <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            </Row>

            <Row>
              <Label>Tabela</Label>
              <Select value={table} onChange={(e) => setTable(e.target.value)}>
                {tablesFromMetadata && tablesFromMetadata != 0 ? tablesFromMetadata.map((tableName) => <option key={tableName} value={tableName}>{tableName}</option>) : <option value={null}>Carregando tabelas...</option>}
              </Select>
              <div style={{ fontSize: 12, color: "#0b2740", marginLeft: 8 }}>
                * Obrigatório selecionar tabela
              </div>
            </Row>

            <Row>
              <Label>Responsável</Label>
              <Select value={responsavel} onChange={(e) => setResponsavel(e.target.value)}>
                {(metadata?.responsaveis || ["a","b"]).map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </Select>
            </Row>

            <div style={{ fontSize: 13, color: "#475569", marginTop: 6 }}>
              <strong>Colunas disponíveis</strong>
              <div style={{ marginTop: 8, fontSize: 12, color: "#64748b" }}>
                Marque as colunas que deseja incluir no gráfico / export.
              </div>
            </div>
          </Controls>

          <ColumnsBox aria-label="Lista de colunas">
            {columns.map((c) => (
              <ColumnItem key={c.nome}>
                {console.log(c.nome)}
                <input
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
        </div>

        <RightPanel>
          <ControlsTopRight>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <Button primary onClick={handleGenerate}>
                Gerar Gráfico
              </Button>

              {/* Export button shares the same styling */}
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
                  <div style={{ fontWeight: 800, color: "#0b2740" }}>Visualização — {table}</div>
                  <div style={{ color: "#475569", fontSize: 13 }}>
                    {chartData ? `${chartData.length} registros` : "Nenhum dado gerado"}
                  </div>
                </div>

                <ChartWrapper>
                  <ChartMain>
                    {chartData && chartData.length && plottedColumns.length ? (
                      <div style={{ width: "100%" }}>
                        <MultiSeriesSVG rows={chartData} columns={plottedColumns} />
                      </div>
                    ) : (
                      <div style={{ padding: 16, color: "#64748b" }}>
                        Clique em <strong>Gerar Gráfico</strong> para criar uma visualização
                        (protótipo).
                      </div>
                    )}
                  </ChartMain>

                  <ChartSide>
                    {/* show small stats for selected columns */}
                    {selectedColumns.slice(0, 3).map((col) => {
                      const values = (chartData || [])
                        .map((r) => Number(r[col]))
                        .filter((v) => Number.isFinite(v));
                      const avg = values.length
                        ? (values.reduce((a, b) => a + b, 0) / values.length).toFixed(2)
                        : "—";
                      return (
                        <div
                          key={col}
                          style={{ background: "#f8fafc", borderRadius: 8, padding: 12 }}
                        >
                          <div
                            style={{
                              fontSize: 13,
                              color: "#334155",
                              marginBottom: 6,
                              fontWeight: 800,
                            }}
                          >
                            {col}
                          </div>
                          <div style={{ fontSize: 12, color: "#475569" }}>
                            média: <strong style={{ color: "#0b2740" }}>{avg}</strong>
                          </div>
                        </div>
                      );
                    })}
                  </ChartSide>
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
                        points={latLonPoints.map((p) => ({ id: p.id, lat: p.lat, lon: p.lon, label: `Ponto ${p.id}` }))}
                        height={520}
                      />
                    </div>
                  ) : (
                    <div style={{ padding: 16, color: "#334155" }}>
                      Não há coordenadas disponíveis. Gere o gráfico com colunas contendo <code>latitude</code> / <code>longitude</code>.
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
