/* eslint-disable @typescript-eslint/no-explicit-any -- legado; reduzir any na Fase 5 do plano SIMA */
import { JSX, useEffect, useMemo, useRef, useState } from "react";
import MapBrazil from "../../../components/MapBrazil";
import { useToast } from "../../../components/Toast/useToast";
import { isoDate } from "../../../utils/limnologicData";
import { simaDownloadPath, simaTablesPath, type SimaTableId } from "../api/simaEndpoints";
import { isDateColumn, isIdColumn } from "./model/columnGuards";
import {
  Button,
  ChartMain,
  ChartWrapper,
  ColumnItem,
  Container,
  Controls,
  ControlsTopRight,
  DownloadButton,
  DownloadButtonsContainer,
  Label,
  LeftColumn,
  Legend,
  LegendItem,
  MapPlaceholder,
  Page,
  Panel,
  RightPanel,
  Row,
  Select,
  Spinner,
  TableElement,
  TablePreview,
  Tooltip,
  TooltipFooter,
  TooltipStationList,
  ZoomControls,
} from "../../../pages/sima/SimaTablesPage.styles";

/**
 * SimaTablesPage.tsx
 *
 * Fluxo:
 * 1) escolher estações (uma ou várias)
 * 2) escolher tabela (tbsima | tbsimaoffline)
 * 3) escolher período (datas filtradas por estação)
 * 4) escolher colunas (id/data desabilitadas) -> Gerar gráfico / Gerar tabela
 *
 * Alterações:
 * - centralizei fetch em fetchSimaRows(...) para que tabela e gráfico usem exatamente a mesma query/rows.
 * - quando gerar gráfico, agrego por dia com aggregateRowsByDay.
 * - quando gerar tabela, salvo os brutos em dataForTablePreview para export/pagination.
 * - popup nos pontos exibe valores com 2 casas decimais e, se houver várias estações, mostra cada estação separada com seu valor.
 * - adicionada paginação ao popup (POPUP_PAGE_SIZE).
 */

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
  "#eaf8ff",
  "#eef6ff",
  "#eaf6f9",
  "#eef8ff",
  "#f0f6ff",
  "#f7fbff",
];

export default function SimaTablesPage(): JSX.Element {
  const { showToast } = useToast();

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
    value?: number | string;
    stations?: string[]; // array of "StationName: 23.45"
    page?: number;
  }>({ visible: false, left: 0, top: 0, page: 0 });

  const [view, setView] = useState<"chart" | "map" | "table">("chart");
  const [loading, setLoading] = useState(false);
  const [showTableView /*setShowTableView*/] = useState<boolean>(false);
  const [, /*showTable*/ setShowTable] = useState<boolean>(false);

  const [zoom, setZoom] = useState<number>(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });

  const [page, setPage] = useState(0);

  const MapBrazilAny = MapBrazil as any;

  // popup page size (quantas estações por "página" do popup)
  const POPUP_PAGE_SIZE = 4;

  /* ---------------- Funções de Download ---------------- */

  const handleDownloadCSV = async () => {
    if (!dataForTablePreview || dataForTablePreview.length === 0) {
      showToast(null,"Gere os dados da tabela primeiro para exportar.");
      return;
    }

    try {
      // Tentar usar endpoint específico do SIMA
      const params = new URLSearchParams();
      if (startDate) params.append("startDate", startDate);
      if (endDate) params.append("endDate", endDate);
      if (selectedStations.length > 0) params.append("stations", selectedStations.join(","));
      if (selectedColumns.length > 0) params.append("columns", selectedColumns.join(","));

      const response = await fetch(`${simaDownloadPath(table as SimaTableId, "csv")}?${params.toString()}`, {
        method: "GET",
        headers: {
          Accept: "text/csv",
        },
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${table}_${new Date().toISOString().split("T")[0]}.csv`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      } else {
        // Fallback para download local dos dados
        downloadCSV();
      }
    } catch (error) {
      console.error("Erro ao exportar CSV:", error);
      showToast(null,"Erro ao exportar CSV. Usando método alternativo...");
      downloadCSV(); // Fallback
    }
  };

  const handleDownloadJSON = async () => {
    if (!dataForTablePreview || dataForTablePreview.length === 0) {
      showToast(null,"Gere os dados da tabela primeiro para exportar.");
      return;
    }

    try {
      const params = new URLSearchParams();
      if (startDate) params.append("startDate", startDate);
      if (endDate) params.append("endDate", endDate);
      if (selectedStations.length > 0) params.append("stations", selectedStations.join(","));
      if (selectedColumns.length > 0) params.append("columns", selectedColumns.join(","));

      const response = await fetch(`${simaDownloadPath(table as SimaTableId, "json")}?${params.toString()}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${table}_${new Date().toISOString().split("T")[0]}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      } else {
        // Fallback para dados atuais
        const jsonData = {
          table: table,
          exportedAt: new Date().toISOString(),
          totalRecords: dataForTablePreview.length,
          stations: selectedStations,
          period: { startDate, endDate },
          data: dataForTablePreview,
        };

        const blob = new Blob([JSON.stringify(jsonData, null, 2)], { type: "application/json" });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${table}_${new Date().toISOString().split("T")[0]}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error("Erro ao exportar JSON:", error);
      showToast(null,"Erro ao exportar JSON. Verifique o console para mais detalhes.");
    }
  };

  const handleDownloadPDF = async () => {
    if (!dataForTablePreview || dataForTablePreview.length === 0) {
      showToast(null,"Gere os dados da tabela primeiro para exportar.");
      return;
    }

    try {
      const params = new URLSearchParams();
      if (startDate) params.append("startDate", startDate);
      if (endDate) params.append("endDate", endDate);

      const response = await fetch(`${simaDownloadPath(table as SimaTableId, "pdf")}?${params.toString()}`, {
        method: "GET",
        headers: {
          Accept: "application/pdf",
        },
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${table}_${new Date().toISOString().split("T")[0]}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      } else {
        // Fallback para o método atual
        exportPDF();
      }
    } catch (error) {
      console.error("Erro ao exportar PDF:", error);
      showToast(null,"Erro ao exportar PDF. Usando método alternativo...");
      exportPDF(); // Fallback
    }
  };

  // Funções de fallback existentes
  function downloadCSV() {
    if (!dataForTablePreview || !dataForTablePreview.length) {
      showToast(null,"Gere o dado de tabela para ter dados para exportar.");
      return;
    }
    const headers = Object.keys(dataForTablePreview[0] || {});
    const rows = dataForTablePreview.map((r) =>
      headers.map((h) => (r[h] === undefined ? "" : `${r[h]}`)),
    );
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
      showToast(null,"Gere/abra a tabela para ter conteúdo para exportar.");
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
      showToast(null,"Permita popups para exportar PDF.");
      return;
    }
    w.document.write(html);
    w.document.close();
    setTimeout(() => {
      w.print();
    }, 500);
  }

  /* ---------------- fetch stations ---------------- */

  useEffect(() => {
    async function fetchStations() {
      try {
        const url = simaTablesPath("tbestacao", ["idestacao", "rotulo", "lat", "lng"]);
        const res = await fetch(url);
        if (!res.ok) {
          const url2 = simaTablesPath("tbestacao", ["idestacao", "rotulo"]);
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
              const id = String(idRaw).trim();
              const name = nameRaw ? String(nameRaw).trim() : `Estação ${id}`;
              return { id, name };
            })
            .filter(Boolean);
          setStationsList(list2 as any);
          setSelectedStations([]);
          setSelectAllStations(false);
          return;
        }
        const j = await res.json();
        const rows = Array.isArray(j) ? j : j?.data || j?.rows || [];
        const list = (rows || [])
          .map((r: any) => {
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

  /* ---------------- when table confirmed: fetch dates (filtered by selected stations) ---------------- */
  async function fetchDatesForTableAndStations(tableName: string, stations: string[]) {
    const endpoint =
      tableName === "tbsima"
        ? simaTablesPath("tbsima", ["dataHora", "idestacao"])
        : simaTablesPath("tbsimaoffline", ["dataHora", "idestacao"]);
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
      if (arr.length) {
        setAvailableDates(arr);
        setStartDate((p) => (p ? p : arr[0]));
        setEndDate((p) => (p ? p : arr[arr.length - 1]));
        return arr;
      } else {
        setAvailableDates([]);
        return [];
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
      showToast(null,"Selecione ao menos uma estação antes de confirmar tabela.");
      return;
    }
    setLoading(true);
    const dates = await fetchDatesForTableAndStations(table, selectedStations);
    if (dates.length == 0) {
      showToast(null,"Nenhum registro encontrado!");
      setLoading(false);
      return;
    }
    setStage(3);
    setLoading(false);
  }

  /* ---------------- fetch columns for chosen table (sample 1 row) ---------------- */
  async function fetchColumnsForTable(tableName: string) {
    try {
      const url = simaTablesPath(tableName);
      const res = await fetch(url);
      if (!res.ok) {
        setColumnsForTable([]);
        return;
      }
      const j = await res.json();
      const rows = j.data;
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
      showToast(null,"Escolha data início e fim.");
      return;
    }
    // validação de período: end >= start
    if (new Date(endDate).getTime() < new Date(startDate).getTime()) {
      showToast(null,"Data fim não pode ser menor que data início.");
      return;
    }
    setLoading(true);
    await fetchColumnsForTable(table);
    setStage(4);
    setLoading(false);
  }

  /* ---------------- station toggles ---------------- */
  function toggleStation(id: string, checked: boolean) {
    const normalized = String(id).trim();
    if (checked) setSelectedStations((s) => Array.from(new Set([...s, normalized])));
    else setSelectedStations((s) => s.filter((x) => x !== normalized));
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
            : Number.NaN;
        }
        return obj;
      });
    return out;
  }

  /* ---------------- centralized fetch helper ---------------- */
  async function fetchSimaRows(cols: string[]) {
    // retorna todas as rows para as colunas pedidas (sem filtrar por estação/data)
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

  /* ---------------- handleGenerate: fetch full dataset for chosen columns, filter by station/date, aggregate ---------------- */

  async function handleGenerateChart() {
    // agora usa fetchSimaRows para garantir mesmo conjunto de dados que a tabela
    console.log("[generate] start", {
      table,
      selectedColumns,
      startDate,
      endDate,
      selectedStations,
    });
    if (!selectedStations.length) {
      showToast(null,"Selecione ao menos uma estação.");
      return;
    }

    if (!selectedColumns.length) {
      showToast(null,"Selecione ao menos uma coluna para plotar.");
      return;
    }
    if (!startDate || !endDate) {
      showToast(null,"Escolha período.");
      return;
    }
    if (new Date(endDate).getTime() < new Date(startDate).getTime()) {
      showToast(null,"Data fim não pode ser menor que data início.");
      return;
    }
    setLoading(true);

    try {
      // Build cols param including idestacao and dataHora (server expects these names)
      const cols = ["idestacao", "dataHora", ...selectedColumns];

      console.debug("[generate] fetching (via helper) cols:", cols);
      const rows = await fetchSimaRows(cols);
      console.debug("[generate] fetched rows:", rows?.length ?? 0);

      // filter by selectedStations and date range
      const stationSet = new Set(selectedStations.map((s) => String(s).trim()));
      const filtered = (rows || []).filter((r: any) => {
        const sid = String(r.idestacao ?? r.id ?? "").trim();
        if (!stationSet.has(sid)) return false;
        const dv = r.dataHora ?? r.datahora ?? r.datamedida ?? r.inicio ?? r.fim ?? r.data ?? null;
        if (!dv) return false;
        const d = new Date(dv);
        if (isNaN(d.getTime())) return false;
        const day = isoDate(d);
        return day >= startDate && day <= endDate;
      });

      console.debug("[generate] filtered rows:", filtered.length);

      // sempre salvar os brutos (para tabela/export)
      setDataForTablePreview(filtered);
      setShowTable(true);

      if (!filtered.length) {
        showToast(null, "Nenhum dado no período para as estações e colunas selecionadas.");
        setChartData([]);
        setView("chart");
        setLoading(false);
        return;
      }

      // aggregate by day across filtered rows (para gráfico)
      const aggregated = aggregateRowsByDay(filtered, selectedColumns);
      setChartData(aggregated);
      setView("chart");
      setTimeout(
        () => chartRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }),
        50,
      );
    } catch (err) {
      console.error("[generate] error fetching/processing data:", err);
      showToast(null,"Erro ao gerar gráfico. Veja console para detalhes.");
    } finally {
      setLoading(false);
    }
  }

  /* ---------------- handleGenerateGraph: gera tabela (dados brutos) ---------------- */

  async function handleGenerateGraph() {
    // agora usa fetchSimaRows para garantir mesmo conjunto de dados que o gráfico
    console.debug("[generate-table] start", {
      table,
      selectedColumns,
      startDate,
      endDate,
      selectedStations,
    });
    if (!selectedStations.length) {
      showToast(null,"Selecione ao menos uma estação.");
      return;
    }
    if (!selectedColumns.length) {
      showToast(null,"Selecione ao menos uma coluna para visualizar.");
      return;
    }
    if (!startDate || !endDate) {
      showToast(null,"Escolha período.");
      return;
    }
    if (new Date(endDate).getTime() < new Date(startDate).getTime()) {
      showToast(null,"Data fim não pode ser menor que data início.");
      return;
    }
    setLoading(true);

    try {
      const cols = ["idestacao", "dataHora", ...selectedColumns];
      console.debug("[generate-table] fetching (via helper) cols:", cols);
      const rows = await fetchSimaRows(cols);
      console.log("[generate-table] fetched rows:", rows?.length ?? 0);

      const stationSet = new Set(selectedStations.map((s) => String(s).trim()));
      const filtered = (rows || []).filter((r: any) => {
        const sid = String(r.idestacao ?? r.id ?? "").trim();
        if (!stationSet.has(sid)) return false;
        const dv = r.dataHora ?? r.datahora ?? r.datamedida ?? r.inicio ?? r.fim ?? r.data ?? null;
        if (!dv) return false;
        const d = new Date(dv);
        if (isNaN(d.getTime())) return false;
        const day = isoDate(d);
        return day >= startDate && day <= endDate;
      });

      console.debug("[generate-table] filtered rows:", filtered.length);

      // dados brutos para tabela (export/pagination)
      setDataForTablePreview(filtered);

      // também preparar chartData (agregado) caso o usuário mude para view=chart
      const aggregated = aggregateRowsByDay(filtered, selectedColumns);
      setChartData(aggregated);

      setView("table");
      setShowTable(true);
      setTimeout(
        () => chartRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }),
        50,
      );
    } catch (err) {
      console.error("[generate-table] error:", err);
      showToast(null,"Erro ao gerar tabela. Veja console para detalhes.");
    } finally {
      setLoading(false);
    }
  }

  /* ---------------- derive map points ---------------- */
  const latLonPoints = useMemo(() => {
    const points: { id: string | number; lat: number; lon: number; label?: string }[] = [];

    for (const id of selectedStations) {
      const s = stationsList.find((x) => x.id === String(id).trim());
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
                  {loading && <Spinner />}
                </div>

                <div style={{ marginTop: 8 }}>
                  <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <input
                      type="checkbox"
                      checked={selectAllStations}
                      onChange={(e) => {
                        const v = e.target.checked;
                        setSelectAllStations(v);
                        if (v) setSelectedStations(stationsList.map((s) => String(s.id).trim()));
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
                      const checked = selectedStations.includes(String(s.id).trim());
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
                    <div>Carregando estações... {loading ? <Spinner /> : null}</div>
                  )}
                </div>

                <div style={{ marginTop: 12 }}>
                  <Button
                    $primary
                    onClick={() => {
                      if (!selectedStations.length) {
                        showToast(null,"Marque ao menos uma estação para continuar.");
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
                  <Select
                    value={startDate}
                    onChange={(e) => {
                      const v = e.target.value;
                      setStartDate(v);
                      if (endDate && new Date(v).getTime() > new Date(endDate).getTime()) {
                        setTimeout(() => {
                          if (new Date(v).getTime() > new Date(endDate).getTime()) {
                            showToast(null,"Data início não pode ser posterior à data fim.");
                          }
                        }, 50);
                      }
                    }}
                  >
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
                  <Select
                    value={endDate}
                    onChange={(e) => {
                      const v = e.target.value;
                      setEndDate(v);
                      if (startDate && new Date(v).getTime() < new Date(startDate).getTime()) {
                        setTimeout(() => {
                          if (new Date(v).getTime() < new Date(startDate).getTime()) {
                            showToast(null,"Data fim não pode ser menor que data início.");
                          }
                        }, 50);
                      }
                    }}
                  >
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

            {/* Stage 4: columns */}
            {stage >= 4 && (
              <>
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
                    <div>Carregando colunas... {loading ? <Spinner /> : null}</div>
                  )}
                </div>
                <div style={{ margin: 12 }}>
                  <Button
                    style={{ marginRight: 10 }}
                    $primary
                    onClick={handleGenerateChart}
                    disabled={loading || !(selectedColumns.length > 0)}
                  >
                    {loading ? "Gerando..." : "Gerar gráfico"}
                  </Button>
                  <Button
                    $primary
                    onClick={handleGenerateGraph}
                    disabled={loading || !(selectedColumns.length > 0)}
                  >
                    {loading ? "Gerando..." : "Gerar tabela"}
                  </Button>
                </div>
              </>
            )}
          </Controls>
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

              {/* Botão superior "Gerar Gráfico" removido conforme solicitado */}

              <Button onClick={() => setView((v) => (v === "chart" ? "map" : "chart"))}>
                {view === "chart" ? "Ver mapa" : "Ver gráfico"}
              </Button>

              {/* Botões de Download Diretos */}
              <DownloadButtonsContainer>
                <DownloadButton
                  variant="csv"
                  onClick={handleDownloadCSV}
                  disabled={!dataForTablePreview || dataForTablePreview.length === 0 || loading}
                >
                  Baixar CSV
                </DownloadButton>
                <DownloadButton
                  variant="json"
                  onClick={handleDownloadJSON}
                  disabled={!dataForTablePreview || dataForTablePreview.length === 0 || loading}
                >
                  Baixar JSON
                </DownloadButton>
                <DownloadButton
                  variant="pdf"
                  onClick={handleDownloadPDF}
                  disabled={!dataForTablePreview || dataForTablePreview.length === 0 || loading}
                >
                  Baixar PDF
                </DownloadButton>
              </DownloadButtonsContainer>
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
                {view === "table"
                  ? dataForTablePreview
                    ? `${dataForTablePreview.length} registros`
                    : "Nenhum dado"
                  : chartData
                    ? `${chartData.length} registros`
                    : "Nenhum dado gerado"}
              </div>
            </div>

            {view === "chart" ? (
              <ChartWrapper>
                <ChartMain
                  ref={chartMainRef}
                  onMouseLeave={() => setTooltip({ visible: false, left: 0, top: 0, page: 0 })}
                >
                  {Array.isArray(chartData) &&
                  chartData.length > 0 &&
                  typeof chartData[0]?.day === "string" &&
                  selectedColumns.length ? (
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
                      {loading ? (
                        <div style={{ marginTop: 8 }}>
                          <Spinner />
                        </div>
                      ) : null}
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
            ) : view === "table" ? (
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
                      {dataForTablePreview && dataForTablePreview.length
                        ? dataForTablePreview.slice(10 * page, 10 * page + 10).map((row, i) => (
                            <tr key={`row-${i}`}>
                              {selectedColumns.length
                                ? selectedColumns.map((col) => (
                                    <td key={`${i}-${col}`}>
                                      {String(row[col] ?? row[col.toLowerCase?.()] ?? "—")}
                                    </td>
                                  ))
                                : Object.keys(row)
                                    .slice(0, 6)
                                    .map((k) => <td key={`${i}-${k}`}>{String(row[k] ?? "—")}</td>)}
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

                <div style={{ marginTop: 8 }}>
                  <Button onClick={() => setPage((p) => Math.max(0, p - 1))}>{"<"}</Button>
                  <Button
                    onClick={() =>
                      setPage((p) =>
                        dataForTablePreview && dataForTablePreview.length
                          ? Math.min(p + 1, Math.floor((dataForTablePreview.length - 1) / 10))
                          : p + 1,
                      )
                    }
                  >
                    {">"}
                  </Button>
                  {loading ? (
                    <span style={{ marginLeft: 12 }}>
                      <Spinner />
                    </span>
                  ) : null}
                </div>
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
    // proteção extra: precisa ser array e ter pelo menos 1 entry com 'day'
    if (!Array.isArray(rows) || rows.length === 0 || !columns || columns.length === 0) {
      return <div style={{ padding: 16 }}>Sem dados para exibir.</div>;
    }

    // small helper para formatar números com 2 casas
    const formatNum = (v: any) => {
      const n = Number(v);
      return Number.isFinite(n) ? n.toFixed(2) : "—";
    };

    // normalize days and build a map day -> row (pick first occurrence)
    const dayMap = new Map<string, any>();
    for (const r of rows) {
      const dayVal = r?.day ?? null;
      if (!dayVal) continue;
      const dayStr = String(dayVal).slice(0, 10);
      if (!dayMap.has(dayStr)) dayMap.set(dayStr, r);
    }

    const uniqueLabels = Array.from(dayMap.keys()).sort(
      (a, b) => new Date(a).getTime() - new Date(b).getTime(),
    );

    if (uniqueLabels.length === 0) {
      return <div style={{ padding: 16 }}>Sem dados para exibir.</div>;
    }

    const height = 480;
    const viewBoxWidth = Math.max(1000, uniqueLabels.length * 40);
    const count = Math.max(1, uniqueLabels.length);
    const xFor = (i: number) => (i / (count - 1 || 1)) * (viewBoxWidth - 100) + 50;

    // Precompute series values efficiently (no rows.find inside loops)
    const seriesValues = columns.map((col) =>
      uniqueLabels.map((lab) => {
        const r = dayMap.get(lab);
        if (!r) return NaN;
        const v = r[col] ?? r[col.toLowerCase?.()] ?? r[col.toUpperCase?.()];
        const n = Number(v);
        return Number.isFinite(n) ? n : NaN;
      }),
    );

    const allNumbers = seriesValues.flat().filter((v) => !Number.isNaN(v));
    const max = allNumbers.length ? Math.max(...allNumbers) : 1;
    const min = allNumbers.length ? Math.min(...allNumbers) : 0;
    const range = max - min || 1;
    const yFor = (v: number) => ((max - v) / range) * (height - 80) + 40;

    // institution colors (try to take from rows if present)
    const uniqueInsts = Array.from(new Set(rows.map((r) => r?.instituicao ?? "—")));
    const instColorMap: Record<string, string> = {};
    uniqueInsts.forEach(
      (inst, idx) =>
        (instColorMap[inst] = INSTITUTION_FILL_COLORS[idx % INSTITUTION_FILL_COLORS.length]),
    );

    // Build a map day -> array of { stationName, values: { col: number|string } }
    // using dataForTablePreview (raw rows) so we can show per-station values in tooltip
    const stationsDataByDay: Map<
      string,
      Array<{ stationName: string; stationId?: string; values: Record<string, number | string> }>
    > = new Map();

    if (Array.isArray(dataForTablePreview)) {
      for (const r of dataForTablePreview) {
        const dateVal =
          r.dataHora ?? r.datahora ?? r.datamedida ?? r.inicio ?? r.fim ?? r.data ?? null;
        if (!dateVal) continue;
        const d = new Date(dateVal);
        if (isNaN(d.getTime())) continue;
        const day = isoDate(d);
        const sid = String(r.idestacao ?? r.id ?? r.estacao ?? r.station ?? "").trim();
        const stationName =
          sid && stationsList.find((s) => String(s.id).trim() === sid)?.name
            ? stationsList.find((s) => String(s.id).trim() === sid)!.name
            : sid || String(r.instituicao ?? r.reservatorio ?? sid ?? "—");

        const values: Record<string, number | string> = {};
        for (const col of columns) {
          const raw = r[col] ?? r[col.toLowerCase?.()] ?? r[col.toUpperCase?.()];
          const n = Number(raw);
          values[col] = Number.isFinite(n) ? Number(n) : "—";
        }

        if (!stationsDataByDay.has(day)) stationsDataByDay.set(day, []);
        stationsDataByDay.get(day)!.push({ stationName, stationId: sid || undefined, values });
      }
    }

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
                  const dayLabel = uniqueLabels[i];
                  const repRow = dayMap.get(dayLabel) || {};
                  const valueAtPoint = seriesValues[sIdx][i];
                  // fetch per-station entries for this day (if exist)
                  const stationsForDay = stationsDataByDay.get(dayLabel) ?? [];

                  // build array of "StationName: value" for this column
                  const stationLines =
                    stationsForDay.length > 0
                      ? stationsForDay.map((st) => {
                          const rawVal = st.values[columns[sIdx]];
                          return `${st.stationName}: ${
                            rawVal === "—" ? "—" : Number(rawVal).toFixed(2)
                          }`;
                        })
                      : [];

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
                          value: Number.isFinite(valueAtPoint)
                            ? Number(valueAtPoint).toFixed(2)
                            : "—",
                          stations: stationLines.length ? stationLines : undefined,
                          page: 0,
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
                      onMouseLeave={() =>
                        setTooltip({
                          visible: false,
                          left: 0,
                          top: 0,
                          page: 0,
                        })
                      }
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
            {allNumbers.length ? formatNum(Math.max(...allNumbers)) : formatNum(1)}
          </text>
          <text x="14" y={height - 22} fontSize="13" fill="#5b6b7a">
            {allNumbers.length ? formatNum(Math.min(...allNumbers)) : formatNum(0)}
          </text>
        </svg>

        {tooltip.visible &&
          (() => {
            // compute page & slicing
            const stations = tooltip.stations ?? [];
            const pageNum = tooltip.page ?? 0;
            const totalPages = Math.max(1, Math.ceil(stations.length / POPUP_PAGE_SIZE));
            const start = pageNum * POPUP_PAGE_SIZE;
            const paged = stations.slice(start, start + POPUP_PAGE_SIZE);

            // decide above/below display to avoid overlapping topbar (if tooltip.top is small show below)
            const showBelow = tooltip.top < 120;

            return (
              <Tooltip
                left={tooltip.left}
                top={tooltip.top}
                color={tooltip.color}
                style={{
                  transform: showBelow ? "translate(-8px, 8px)" : undefined,
                }}
              >
                <div style={{ fontWeight: 800 }}>
                  {tooltip.value !== undefined ? `Dado: ${String(tooltip.value)}` : "Dado: —"}
                </div>

                <TooltipStationList>
                  {paged.length ? (
                    paged.map((s, idx) => (
                      <div key={idx} style={{ fontSize: 13, color: "#475569" }}>
                        {s}
                      </div>
                    ))
                  ) : (
                    <div style={{ fontSize: 13, color: "#475569" }}>Estação(s): —</div>
                  )}
                </TooltipStationList>

                <TooltipFooter>
                  <div style={{ fontSize: 12, color: "#64748b" }}>
                    {tooltip.instituicao ? (
                      <>
                        Instituição: <strong>{tooltip.instituicao}</strong>
                      </>
                    ) : null}
                  </div>

                  <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                    <div style={{ fontSize: 12, color: "#64748b" }}>
                      {stations.length
                        ? `${start + 1}-${Math.min(start + POPUP_PAGE_SIZE, stations.length)} / ${stations.length}`
                        : ""}
                    </div>

                    <div style={{ display: "flex", gap: 6 }}>
                      <button
                        aria-label="Anterior"
                        onClick={() =>
                          setTooltip((t) => {
                            const p = t.page ?? 0;
                            const np = Math.max(0, p - 1);
                            return { ...t, page: np };
                          })
                        }
                        disabled={(tooltip.page ?? 0) <= 0}
                        style={{
                          padding: "6px 8px",
                          borderRadius: 6,
                          border: "1px solid #e6eefb",
                          background: (tooltip.page ?? 0) <= 0 ? "#f3f4f6" : "#fff",
                          cursor: (tooltip.page ?? 0) <= 0 ? "not-allowed" : "pointer",
                          fontWeight: 700,
                        }}
                      >
                        «
                      </button>
                      <button
                        aria-label="Próximo"
                        onClick={() =>
                          setTooltip((t) => {
                            const p = t.page ?? 0;
                            const np = Math.min(totalPages - 1, p + 1);
                            return { ...t, page: np };
                          })
                        }
                        disabled={(tooltip.page ?? 0) >= totalPages - 1}
                        style={{
                          padding: "6px 8px",
                          borderRadius: 6,
                          border: "1px solid #e6eefb",
                          background: (tooltip.page ?? 0) >= totalPages - 1 ? "#f3f4f6" : "#fff",
                          cursor: (tooltip.page ?? 0) >= totalPages - 1 ? "not-allowed" : "pointer",
                          fontWeight: 700,
                        }}
                      >
                        »
                      </button>
                    </div>
                  </div>
                </TooltipFooter>
              </Tooltip>
            );
          })()}
      </div>
    );
  }
}
