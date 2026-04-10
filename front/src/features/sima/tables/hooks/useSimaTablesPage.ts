/* eslint-disable @typescript-eslint/no-explicit-any -- legado SIMA; estreitar tipos depois */
import { useCallback, useEffect, useMemo, useReducer, useRef, useState } from "react";
import MapBrazil from "../../../../components/MapBrazil";
import { useToast } from "../../../../components/Toast/useToast";
import { isoDate } from "../../../../utils/limnologicData";
import { simaDownloadPath, type SimaTableId } from "../../api/simaEndpoints";
import {
  fetchColumnsForTable,
  fetchDatesForTableAndStations,
  fetchSimaRows,
  type SimaStationRow,
} from "../api/simaTablesClient";
import { aggregateRowsByDay } from "../model/aggregateRowsByDay";
import { isDateColumn, isIdColumn } from "../model/columnGuards";
import { safeSimaExportBasename } from "../model/safeExportName";
import {
  initialSimaTablesUiState,
  simaTablesUiReducer,
  type SimaTablesTooltipState,
  type SimaTablesUiAction,
  type SimaTablesUiState,
} from "./simaTablesUiReducer";
import { useSimaStationsQuery } from "./useSimaStationsQuery";

export type SimaTablesPageController = {
  state: SimaTablesUiState;
  dispatch: React.Dispatch<SimaTablesUiAction>;
  stationsList: SimaStationRow[];
  stationsFetching: boolean;
  tooltip: SimaTablesTooltipState;
  setTooltip: React.Dispatch<React.SetStateAction<SimaTablesTooltipState>>;
  chartRef: React.RefObject<HTMLDivElement | null>;
  chartMainRef: React.RefObject<HTMLDivElement | null>;
  latLonPoints: { id: string | number; lat: number; lon: number; label?: string }[];
  MapBrazilAny: typeof MapBrazil;
  handleMouseMove: (e: React.MouseEvent<HTMLDivElement>) => void;
  handleDownloadCSV: () => Promise<void>;
  handleDownloadJSON: () => Promise<void>;
  handleDownloadPDF: () => Promise<void>;
  handleConfirmTable: () => Promise<void>;
  handleConfirmPeriod: () => Promise<void>;
  toggleStation: (id: string, checked: boolean) => void;
  toggleColumn: (name: string) => void;
  handleGenerateChart: () => Promise<void>;
  handleGenerateGraph: () => Promise<void>;
  resetWizard: () => void;
  showToast: (codigo?: number | null, conteudo?: string, cor?: string, emoji?: string) => void;
};

export function useSimaTablesPage(): SimaTablesPageController {
  const { showToast } = useToast();
  const [state, dispatch] = useReducer(simaTablesUiReducer, initialSimaTablesUiState);
  const stateRef = useRef(state);
  stateRef.current = state;

  const [tooltip, setTooltip] = useState<SimaTablesTooltipState>({
    visible: false,
    left: 0,
    top: 0,
    page: 0,
  });

  const chartRef = useRef<HTMLDivElement | null>(null);
  const chartMainRef = useRef<HTMLDivElement | null>(null);

  const { data: stationsList = [], isFetching: stationsFetching, isSuccess: stationsReady } =
    useSimaStationsQuery();

  useEffect(() => {
    if (stationsReady) {
      dispatch({ type: "patch", patch: { selectedStations: [], selectAllStations: false } });
    }
  }, [stationsReady]);

  const downloadCSV = useCallback(() => {
    const dataForTablePreview = stateRef.current.dataForTablePreview;
    const table = stateRef.current.table;
    if (!dataForTablePreview || !dataForTablePreview.length) {
      showToast(null, "Gere o dado de tabela para ter dados para exportar.");
      return;
    }
    const headers = Object.keys(dataForTablePreview[0] || {});
    const rows = dataForTablePreview.map((r: any) =>
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
    a.download = `${safeSimaExportBasename(table)}_export.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }, [showToast]);

  const exportPDF = useCallback(() => {
    const table = stateRef.current.table;
    if (!chartRef.current) {
      showToast(null, "Gere/abra a tabela para ter conteúdo para exportar.");
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
      showToast(null, "Permita popups para exportar PDF.");
      return;
    }
    w.document.write(html);
    w.document.close();
    setTimeout(() => {
      w.print();
    }, 500);
  }, [showToast]);

  const handleDownloadCSV = useCallback(async () => {
    const { dataForTablePreview, startDate, endDate, selectedStations, selectedColumns, table } =
      stateRef.current;
    if (!dataForTablePreview || dataForTablePreview.length === 0) {
      showToast(null, "Gere os dados da tabela primeiro para exportar.");
      return;
    }
    try {
      const params = new URLSearchParams();
      if (startDate) params.append("startDate", startDate);
      if (endDate) params.append("endDate", endDate);
      if (selectedStations.length > 0) params.append("stations", selectedStations.join(","));
      if (selectedColumns.length > 0) params.append("columns", selectedColumns.join(","));
      const response = await fetch(`${simaDownloadPath(table as SimaTableId, "csv")}?${params}`, {
        method: "GET",
        headers: { Accept: "text/csv" },
      });
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${safeSimaExportBasename(table)}_${new Date().toISOString().split("T")[0]}.csv`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      } else {
        downloadCSV();
      }
    } catch (error) {
      console.error("Erro ao exportar CSV:", error);
      showToast(null, "Erro ao exportar CSV. Usando método alternativo...");
      downloadCSV();
    }
  }, [downloadCSV, showToast]);

  const handleDownloadJSON = useCallback(async () => {
    const {
      dataForTablePreview,
      startDate,
      endDate,
      selectedStations,
      selectedColumns,
      table,
    } = stateRef.current;
    if (!dataForTablePreview || dataForTablePreview.length === 0) {
      showToast(null, "Gere os dados da tabela primeiro para exportar.");
      return;
    }
    try {
      const params = new URLSearchParams();
      if (startDate) params.append("startDate", startDate);
      if (endDate) params.append("endDate", endDate);
      if (selectedStations.length > 0) params.append("stations", selectedStations.join(","));
      if (selectedColumns.length > 0) params.append("columns", selectedColumns.join(","));
      const response = await fetch(`${simaDownloadPath(table as SimaTableId, "json")}?${params}`, {
        method: "GET",
        headers: { Accept: "application/json" },
      });
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${safeSimaExportBasename(table)}_${new Date().toISOString().split("T")[0]}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      } else {
        const jsonData = {
          table,
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
        link.download = `${safeSimaExportBasename(table)}_${new Date().toISOString().split("T")[0]}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error("Erro ao exportar JSON:", error);
      showToast(null, "Erro ao exportar JSON. Verifique o console para mais detalhes.");
    }
  }, [showToast]);

  const handleDownloadPDF = useCallback(async () => {
    const { dataForTablePreview, startDate, endDate, table } = stateRef.current;
    if (!dataForTablePreview || dataForTablePreview.length === 0) {
      showToast(null, "Gere os dados da tabela primeiro para exportar.");
      return;
    }
    try {
      const params = new URLSearchParams();
      if (startDate) params.append("startDate", startDate);
      if (endDate) params.append("endDate", endDate);
      const response = await fetch(`${simaDownloadPath(table as SimaTableId, "pdf")}?${params}`, {
        method: "GET",
        headers: { Accept: "application/pdf" },
      });
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${safeSimaExportBasename(table)}_${new Date().toISOString().split("T")[0]}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      } else {
        exportPDF();
      }
    } catch (error) {
      console.error("Erro ao exportar PDF:", error);
      showToast(null, "Erro ao exportar PDF. Usando método alternativo...");
      exportPDF();
    }
  }, [exportPDF, showToast]);

  const handleConfirmTable = useCallback(async () => {
    const { selectedStations, table, startDate, endDate } = stateRef.current;
    if (!selectedStations.length) {
      showToast(null, "Selecione ao menos uma estação antes de confirmar tabela.");
      return;
    }
    dispatch({ type: "patch", patch: { loading: true } });
    const dates = await fetchDatesForTableAndStations(table, selectedStations);
    if (dates.length === 0) {
      showToast(null, "Nenhum registro encontrado!");
      dispatch({
        type: "patch",
        patch: { loading: false, availableDates: [], startDate: "", endDate: "" },
      });
      return;
    }
    dispatch({
      type: "patch",
      patch: {
        loading: false,
        availableDates: dates,
        startDate: startDate || dates[0],
        endDate: endDate || dates[dates.length - 1],
        stage: 3,
      },
    });
  }, [showToast]);

  const handleConfirmPeriod = useCallback(async () => {
    const { startDate, endDate, table } = stateRef.current;
    if (!startDate || !endDate) {
      showToast(null, "Escolha data início e fim.");
      return;
    }
    if (new Date(endDate).getTime() < new Date(startDate).getTime()) {
      showToast(null, "Data fim não pode ser menor que data início.");
      return;
    }
    dispatch({ type: "patch", patch: { loading: true } });
    const cols = await fetchColumnsForTable(table);
    dispatch({
      type: "patch",
      patch: { loading: false, columnsForTable: cols, stage: 4 },
    });
  }, [showToast]);

  const toggleStation = useCallback((id: string, checked: boolean) => {
    const normalized = String(id).trim();
    const { selectedStations } = stateRef.current;
    if (checked) {
      dispatch({
        type: "patch",
        patch: { selectedStations: Array.from(new Set([...selectedStations, normalized])) },
      });
    } else {
      dispatch({
        type: "patch",
        patch: { selectedStations: selectedStations.filter((x) => x !== normalized) },
      });
    }
  }, []);

  const toggleColumn = useCallback((name: string) => {
    if (isIdColumn(name) || isDateColumn(name)) return;
    const { selectedColumns } = stateRef.current;
    dispatch({
      type: "patch",
      patch: {
        selectedColumns: selectedColumns.includes(name)
          ? selectedColumns.filter((x) => x !== name)
          : [...selectedColumns, name],
      },
    });
  }, []);

  const handleGenerateChart = useCallback(async () => {
    const { table, selectedColumns, startDate, endDate, selectedStations } = stateRef.current;
    if (!selectedStations.length) {
      showToast(null, "Selecione ao menos uma estação.");
      return;
    }
    if (!selectedColumns.length) {
      showToast(null, "Selecione ao menos uma coluna para plotar.");
      return;
    }
    if (!startDate || !endDate) {
      showToast(null, "Escolha período.");
      return;
    }
    if (new Date(endDate).getTime() < new Date(startDate).getTime()) {
      showToast(null, "Data fim não pode ser menor que data início.");
      return;
    }
    dispatch({ type: "patch", patch: { loading: true } });
    try {
      const cols = ["idestacao", "dataHora", ...selectedColumns];
      const rows = await fetchSimaRows(table, cols);
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
      dispatch({ type: "patch", patch: { dataForTablePreview: filtered as any[] } });
      if (!filtered.length) {
        showToast(null, "Nenhum dado no período para as estações e colunas selecionadas.");
        dispatch({ type: "patch", patch: { chartData: [], view: "chart", loading: false } });
        return;
      }
      const aggregated = aggregateRowsByDay(filtered, selectedColumns) as Record<string, unknown>[];
      dispatch({
        type: "patch",
        patch: { chartData: aggregated, view: "chart", loading: false },
      });
      setTimeout(
        () => chartRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }),
        50,
      );
    } catch (err) {
      console.error("[generate] error fetching/processing data:", err);
      showToast(null, "Erro ao gerar gráfico. Veja console para detalhes.");
      dispatch({ type: "patch", patch: { loading: false } });
    }
  }, [showToast]);

  const handleGenerateGraph = useCallback(async () => {
    const { table, selectedColumns, startDate, endDate, selectedStations } = stateRef.current;
    if (!selectedStations.length) {
      showToast(null, "Selecione ao menos uma estação.");
      return;
    }
    if (!selectedColumns.length) {
      showToast(null, "Selecione ao menos uma coluna para visualizar.");
      return;
    }
    if (!startDate || !endDate) {
      showToast(null, "Escolha período.");
      return;
    }
    if (new Date(endDate).getTime() < new Date(startDate).getTime()) {
      showToast(null, "Data fim não pode ser menor que data início.");
      return;
    }
    dispatch({ type: "patch", patch: { loading: true } });
    try {
      const cols = ["idestacao", "dataHora", ...selectedColumns];
      const rows = await fetchSimaRows(table, cols);
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
      const aggregated = aggregateRowsByDay(filtered, selectedColumns) as Record<string, unknown>[];
      dispatch({
        type: "patch",
        patch: {
          dataForTablePreview: filtered as any[],
          chartData: aggregated,
          view: "table",
          loading: false,
        },
      });
      setTimeout(
        () => chartRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }),
        50,
      );
    } catch (err) {
      console.error("[generate-table] error:", err);
      showToast(null, "Erro ao gerar tabela. Veja console para detalhes.");
      dispatch({ type: "patch", patch: { loading: false } });
    }
  }, [showToast]);

  const { selectedStations, dataForTablePreview } = state;
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
        const row = r as Record<string, unknown>;
        if (typeof row.latitude === "number" && typeof row.longitude === "number") {
          points.push({
            id: (row.id ?? row.idestacao ?? Math.random()) as string | number,
            lat: row.latitude,
            lon: row.longitude,
            label: (row.reservatorio ?? row.instituicao) as string | undefined,
          });
        }
      }
    }
    return points;
  }, [stationsList, selectedStations, dataForTablePreview]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (e.buttons === 1) {
      dispatch({ type: "panDelta", dx: e.movementX || 0, dy: e.movementY || 0 });
    }
  }, []);

  const resetWizard = useCallback(() => {
    dispatch({ type: "resetWizard" });
    setTooltip({ visible: false, left: 0, top: 0, page: 0 });
  }, []);

  const MapBrazilAny = MapBrazil as any;

  return {
    state,
    dispatch,
    stationsList,
    stationsFetching,
    tooltip,
    setTooltip,
    chartRef,
    chartMainRef,
    latLonPoints,
    MapBrazilAny,
    handleMouseMove,
    handleDownloadCSV,
    handleDownloadJSON,
    handleDownloadPDF,
    handleConfirmTable,
    handleConfirmPeriod,
    toggleStation,
    toggleColumn,
    handleGenerateChart,
    handleGenerateGraph,
    resetWizard,
    showToast,
  };
}
