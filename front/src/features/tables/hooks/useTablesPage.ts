/* prettier-ignore-file */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import MapBrazil from "@/shared/ui/MapBrazil";
import {
  fetchMergedTableRows,
  fetchTbcampanhaRows,
  tryFetchColumnsForTable,
} from "../api/tablesPageClient";
import { computeReservatoriosInsidePolygon } from "../model/computeReservatoriosInsidePolygon";
import {
  availableDatesForSelectedReservatoriosOnly,
  availableDatesForTableAndReservatorios,
} from "../model/campanhaDates";
import { getProviderForApi } from "../model/getProviderForApi";
import { createProjection, parseTransformString } from "../model/mapDrawingProjection";
import { resolveApiTableName } from "../model/resolveApiTableName";
import { isoDate, isIdOrDateColumn } from "@/utils/limnologicData";
import { useTablesCampanhaQuery } from "./useTablesCampanhaQuery";
import { useTablesMetadataQuery } from "./useTablesMetadataQuery";
import { useTablesReservatoriosQuery } from "./useTablesReservatoriosQuery";

const TABLES_CAMPANHA_KEY = ["tables", "campanha", "furnas", "tbcampanha"] as const;

const STABLE_EMPTY_METADATA: any[] = [];
const STABLE_EMPTY_TABLE_OPTIONS: Array<{ api: string; label: string }> = [];
const STABLE_EMPTY_COLUMNS_MAP: Record<string, any> = {};

export type TablesPageController = ReturnType<typeof useTablesPage>;

/**
 * Estado e efeitos da página genérica /tables/:slug (mapa, polígonos, dados).
 */
export function useTablesPage() {
  const { slug } = useParams<{ slug: string }>();
  const topicSlug = slug || "abioticos";

  const queryClient = useQueryClient();
  const metadataQuery = useTablesMetadataQuery(topicSlug);
  const reservatoriosQuery = useTablesReservatoriosQuery();
  const campanhaQuery = useTablesCampanhaQuery();

  const bundle = metadataQuery.data;
  const metadata = bundle?.metadata ?? STABLE_EMPTY_METADATA;
  const tablesOptions = bundle?.tablesOptions ?? STABLE_EMPTY_TABLE_OPTIONS;
  const columnsFromMetadata = bundle?.columnsFromMetadata ?? STABLE_EMPTY_COLUMNS_MAP;
  const responsibleFromMetadata = bundle?.responsibleFromMetadata ?? null;
  const reservatorios = reservatoriosQuery.data ?? STABLE_EMPTY_METADATA;

  const [stage, setStage] = useState<number>(1);
  const [startDate, setStartDate] = useState<string>(() =>
    isoDate(new Date(Date.now() - 1000 * 60 * 60 * 24 * 90)),
  );
  const [endDate, setEndDate] = useState<string>(() => isoDate(new Date()));
  const [table, setTable] = useState<string>("");
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
  const [responsible, setResponsible] = useState<string>();

  const [campanhas] = useState<any[]>([]);
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

  // polygon related
  const [polygonReservoirs] = useState<any[]>([]); // temporary points used to form polygon (when using "consulta geográfica")
  const [insidePolygonReservatorios] = useState<any[]>([]);
  const [savedPolygons, setSavedPolygons] = useState<
    { id: string; points: { lat: number; lon: number }[]; createdAt?: string }[]
  >([]);
  const [polygonVisibility, setPolygonVisibility] = useState<Record<string, boolean>>({});
  const [polygonReservsMap, setPolygonReservsMap] = useState<Record<string, any[]>>({});
  const [showPolygonReservs, setShowPolygonReservs] = useState<Record<string, boolean>>({});

  // NEW: drawing state (user clicks on map to add vertices)
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [drawPoints, setDrawPoints] = useState<{ lat: number; lon: number }[]>([]);
  const drawSvgRef = useRef<SVGSVGElement | null>(null);
  const mapInnerRef = useRef<HTMLDivElement | null>(null);

  function handlePageChange(newPage: number) {
    setPage(newPage);
  }

  useEffect(() => {
    const firstApi = tablesOptions[0]?.api;
    if (firstApi) setTable(firstApi);
  }, [topicSlug, tablesOptions]);

  useEffect(() => {
    if (selectedReservatorios.length > 0) {
      const rows = campanhaQuery.data ?? [];
      const arr = availableDatesForSelectedReservatoriosOnly(rows, selectedReservatorios, campanhas);
      setAvailableDates(arr);
      setStartDate(arr[0] ?? "");
      setEndDate(arr[arr.length - 1] ?? "");
    } else {
      setAvailableDates([]);
      setStartDate("");
      setEndDate("");
    }
  }, [selectedReservatorios, campanhaQuery.data, campanhas]);

  const getProvider = useCallback(
    (apiName?: string) => getProviderForApi(apiName, metadata, responsibleFromMetadata),
    [metadata, responsibleFromMetadata],
  );

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
      return [];
    }

    let rows: any[] = [];
    try {
      rows =
        queryClient.getQueryData<any[]>(TABLES_CAMPANHA_KEY) ??
        (await queryClient.fetchQuery({
          queryKey: TABLES_CAMPANHA_KEY,
          queryFn: fetchTbcampanhaRows,
        }));
    } catch (err) {
      console.error("[dates] tbcampanha fetch failed:", err);
      setAvailableDates([]);
      setStartDate("");
      setEndDate("");
      return [];
    }

    const arr = availableDatesForTableAndReservatorios(rows, selectedReservatorios);
    setAvailableDates(arr);
    if (arr.length) {
      setStartDate(arr[0]);
      setEndDate(arr[arr.length - 1]);
      return arr;
    }
    setStartDate("");
    setEndDate("");
    return [];
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
    const dates = await fetchAvailableDatesForTableAndReservatorios(
      selectedReservatorios,
      apiTable,
    );
    if (dates.length == 0) {
      alert("Nenhum dado encontrado!");
      setLoading(false);
      return;
    }
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
    const provider = getProvider(apiTable) || "furnas";
    const keys = await tryFetchColumnsForTable(apiTable, provider);
    setColumnsForTable(keys);
  }

  function toggleColumnLocal(name: string) {
    if (isIdOrDateColumn(name)) return;
    setSelectedColumns((s) => (s.includes(name) ? s.filter((x) => x !== name) : [...s, name]));
  }

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
      const provider = getProvider(apiTable) || "furnas";
      const dataCol = provider === "furnas" ? "dataMedida" : "dataHora";

      const merged = await fetchMergedTableRows({
        apiTable,
        provider,
        dataCol,
        selectedColumns,
        idsToUse,
      });

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

  useEffect(() => {
    if (table) {
      setColumnsForTable(columnsFromMetadata[table] || []);
      setResponsible(responsibleFromMetadata ? responsibleFromMetadata[table] : undefined);
    }
  }, [table, columnsFromMetadata, responsibleFromMetadata]);

  const latLonPoints = useMemo(() => {
    return (reservatorios || [])
      .map((r: any) => {
        const lat = Number(r.latitude ?? r.lat ?? r.latitude_deg ?? NaN);
        const lon = Number(r.longitude ?? r.lng ?? r.lon ?? r.long ?? NaN);
        return {
          id: r.id ?? r.idreservatorio ?? null,
          latitude: Number.isFinite(lat) ? lat : null,
          longitude: Number.isFinite(lon) ? lon : null,
          nome: r.nome ?? r.name ?? "",
          raw: r.raw ?? r,
        };
      })
      .filter(
        (p) =>
          p &&
          (Number.isFinite(Number(p.latitude)) || Number.isFinite(Number(p.longitude)) || true),
      ); // keep entries even if missing coords
  }, [reservatorios]);

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

  function computeInsideForPoly(poly: { id?: string; points: any[] }) {
    return computeReservatoriosInsidePolygon(poly, latLonPoints);
  }

  function getInternalTransformFromMap(): { x: number; y: number; k: number } {
    try {
      const container = mapInnerRef.current;
      if (!container) return { x: 0, y: 0, k: 1 };
      const mapSvg = container.querySelector("svg");
      if (!mapSvg) return { x: 0, y: 0, k: 1 };
      const g = mapSvg.querySelector<SVGGElement>(".map-group");
      if (!g) return { x: 0, y: 0, k: 1 };
      const transformStr = g.getAttribute("transform");
      return parseTransformString(transformStr);
    } catch (err) {
      return { x: 0, y: 0, k: 1 };
    }
  }

  // click handler on overlay to add a vertex
  // MC 100 função de desenhar poligono e obter reservatorios
  // ED: aqui levamos em conta o transform externo (zoom/pan) e o transform interno (d3.zoom aplicado ao grupo .map-group),
  // e convertemos coordenadas de clique na tela para lon/lat via projection.invert.
  function handleMapClickForDrawing(e: React.MouseEvent) {
    if (!isDrawing) return;

    const container = mapInnerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const cx = e.clientX - rect.left;
    const cy = e.clientY - rect.top;

    // external CSS transform inversion (matches transform: scale(${zoom}) translate(${pan.x}px, ${pan.y}px))
    const S = zoom;
    const T = { x: pan.x, y: pan.y };
    const originX = container.clientWidth / 2;
    const originY = 0;
    const preX = (cx - originX * (1 - S) - T.x) / S;
    const preY = (cy - originY * (1 - S) - T.y) / S;

    // account for internal d3 transform
    const internal = getInternalTransformFromMap(); // { x, y, k }
    const preX2 = (preX - internal.x) / internal.k;
    const preY2 = (preY - internal.y) / internal.k;

    const widthPx = Math.max(800, window.innerWidth);
    const heightPx = 760; // we pass height={760} to MapBrazil in this page

    const proj = createProjection(widthPx, heightPx);

    try {
      const lngLat = (proj as any).invert?.([preX2, preY2]);
      if (lngLat && Array.isArray(lngLat)) {
        const lon = Number(lngLat[0]);
        const lat = Number(lngLat[1]);
        if (Number.isFinite(lat) && Number.isFinite(lon)) {
          setDrawPoints((prev) => [...prev, { lat, lon }]);
        } else {
          console.warn("projection.invert returned invalid numeric values", lngLat);
        }
      } else {
        console.warn("projection.invert not available or returned invalid", proj as any);
      }
    } catch (err) {
      console.warn("error inverting projection", err);
    }
  }

  function cancelDrawing() {
    setIsDrawing(false);
    setDrawPoints([]);
  }

  // finalize drawing: save polygon and compute reservoirs inside
  // MC 104 Criar função de geração do poligono com base nos reservatorios
  // MC 100 (continuação) - ao criar o polígono usamos computeReservatoriosInsidePolygon (MC 92)
  function createPolygonFromDrawing() {
    if (!drawPoints || drawPoints.length < 3) {
      alert("Desenhe pelo menos 3 pontos para formar um polígono válido.");
      return;
    }

    const newPoly = {
      id:
        typeof crypto !== "undefined" && (crypto as any).randomUUID
          ? (crypto as any).randomUUID()
          : String(Date.now()),
      points: drawPoints.map((p) => ({ lat: Number(p.lat), lon: Number(p.lon) })),
      createdAt: new Date().toISOString(),
    };

    // MC 104 Criar função de geração do poligono com base nos reservatorios: aqui usamos drawPoints -> poly
    const found = computeInsideForPoly(newPoly); // MC 92

    setSavedPolygons((prev) => {
      setPolygonVisibility((pv) => ({ ...pv, [newPoly.id]: true }));
      setPolygonReservsMap((pm) => ({ ...pm, [newPoly.id]: found }));
      setShowPolygonReservs((s) => ({ ...s, [newPoly.id]: true }));
      return [...prev, newPoly];
    });

    // stop drawing and clear drawPoints
    setIsDrawing(false);
    setDrawPoints([]);
  }

  // mapPoints & polygons for MapBrazil
  const displayedReservoirs = useMemo(() => {
    if (polygonReservoirs && polygonReservoirs.length) return polygonReservoirs;
    if (selectedReservatorios && selectedReservatorios.length) {
      return latLonPoints.filter((p) =>
        selectedReservatorios.some((sid) => String(sid) === String(p.id)),
      );
    }
    return [];
  }, [polygonReservoirs, selectedReservatorios, latLonPoints]);

  const colorMap = useMemo(() => {
    const map: Record<string, string> = {};
    const ids = displayedReservoirs.map((d) => String(d.id));
    for (let i = 0; i < ids.length; i++) {
      const hue = Math.round((i * 137.508) % 360);
      map[ids[i]] = `hsl(${hue} 75% 50%)`;
    }
    return map;
  }, [displayedReservoirs]);

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

  const mapSelectedPoints = useMemo(() => mapPoints.map((p) => ({ ...p })), [mapPoints]);

  // MC 112 Criar função para exibir poligonos separadamente
  // ED: o resultado consumido pelo MapBrazil é um array de arrays de {lat,lon}.
  const mapPolygons = useMemo(() => {
    // pass polygons that are visible in polygonVisibility, but MapBrazil expects arrays of {lat,lon}
    return savedPolygons.filter((poly) => polygonVisibility[poly.id]).map((poly) => poly.points);
  }, [savedPolygons, polygonVisibility]);

  function setShowAllPolygons(show: boolean) {
    const next: Record<string, boolean> = {};
    for (const p of savedPolygons) next[p.id] = show;
    setPolygonVisibility(next);
  }

  /* ================= Drawing overlay rendering helpers ================= */

  function getOverlayProjectedPoints(points: { lat: number; lon: number }[]) {
    if (!points || !points.length) return [];
    const widthPx = Math.max(800, window.innerWidth);
    const heightPx = 760;
    const proj = createProjection(widthPx, heightPx);
    const internal = getInternalTransformFromMap(); // { x, y, k }

    const pts = points
      .map((p) => {
        try {
          const xy = proj([p.lon, p.lat]); // projected BEFORE internal transform
          if (!xy || !Array.isArray(xy)) return null;
          // apply internal transform (scale + translate) so overlay aligns with transformed map-group
          const sx = xy[0] * internal.k + internal.x;
          const sy = xy[1] * internal.k + internal.y;
          return [sx, sy];
        } catch {
          return null;
        }
      })
      .filter(Boolean) as [number, number][];
    return pts;
  }

  return {
    stage,
    setStage,
    startDate,
    endDate,
    table,
    setTable,
    selectedColumns,
    responsible,
    tablesOptions,
    reservatorios,
    selectedReservatorios,
    setSelectedReservatorios,
    selectAllReservatorios,
    setSelectAllReservatorios,
    campanhas,
    data,
    loading,
    showTable,
    showTableView,
    availableDates,
    zoom,
    setZoom,
    pan,
    setPan,
    columnsForTable,
    view,
    setView,
    chartRef,
    chartMainRef,
    page,
    pageSize,
    polygonReservoirs,
    insidePolygonReservatorios,
    savedPolygons,
    polygonVisibility,
    setPolygonVisibility,
    polygonReservsMap,
    setPolygonReservsMap,
    showPolygonReservs,
    setShowPolygonReservs,
    isDrawing,
    setIsDrawing,
    drawPoints,
    setDrawPoints,
    drawSvgRef,
    mapInnerRef,
    MapBrazilAny,
    metadata,
    columnsFromMetadata,
    responsibleFromMetadata,
    toggleReservatorio,
    handleConfirmReservatorios,
    handleConfirmTable,
    handleConfirmPeriod,
    handleStartDate,
    handleEndDate,
    toggleColumnLocal,
    handleGenerateTableForCurrentSelection,
    handlePageChange,
    handleMapClickForDrawing,
    cancelDrawing,
    createPolygonFromDrawing,
    displayedReservoirs,
    colorMap,
    mapPoints,
    mapSelectedPoints,
    mapPolygons,
    getOverlayProjectedPoints,
    setShowAllPolygons,
    computeInsideForPoly,
    setSavedPolygons,
  };
}
