import type { RefObject } from "react";
import { isoDate } from "@/utils/limnologicData";
import type { SimaStationRow } from "../api/simaTablesClient";
import { INSTITUTION_FILL_COLORS, POPUP_PAGE_SIZE, SERIES_COLORS } from "../model/constants";
import type { Dispatch, SetStateAction } from "react";
import type { SimaTablesTooltipState } from "../hooks/simaTablesUiReducer";
import { Tooltip, TooltipFooter, TooltipStationList } from "../ui/SimaTablesPage.styles";

type Props = {
  rows: Record<string, unknown>[];
  columns: string[];
  dataForTablePreview: Record<string, unknown>[] | null;
  stationsList: SimaStationRow[];
  chartMainRef: RefObject<HTMLDivElement | null>;
  tooltip: SimaTablesTooltipState;
  setTooltip: Dispatch<SetStateAction<SimaTablesTooltipState>>;
};

export function MultiSeriesSVG({
  rows,
  columns,
  dataForTablePreview,
  stationsList,
  chartMainRef,
  tooltip,
  setTooltip,
}: Props) {
  if (!Array.isArray(rows) || rows.length === 0 || !columns || columns.length === 0) {
    return <div style={{ padding: 16 }}>Sem dados para exibir.</div>;
  }

  const formatNum = (v: unknown) => {
    const n = Number(v);
    return Number.isFinite(n) ? n.toFixed(2) : "—";
  };

  const dayMap = new Map<string, Record<string, unknown>>();
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

  const seriesValues = columns.map((col) =>
    uniqueLabels.map((lab) => {
      const r = dayMap.get(lab);
      if (!r) return NaN;
      const colLower = col.toLowerCase();
      const colUpper = col.toUpperCase();
      const v = r[col] ?? r[colLower] ?? r[colUpper];
      const n = Number(v);
      return Number.isFinite(n) ? n : NaN;
    }),
  );

  const allNumbers = seriesValues.flat().filter((v) => !Number.isNaN(v));
  const max = allNumbers.length ? Math.max(...allNumbers) : 1;
  const min = allNumbers.length ? Math.min(...allNumbers) : 0;
  const range = max - min || 1;
  const yFor = (v: number) => ((max - v) / range) * (height - 80) + 40;

  const uniqueInsts = Array.from(new Set(rows.map((r) => String(r.instituicao ?? "—"))));
  const instColorMap: Record<string, string> = {};
  uniqueInsts.forEach(
    (inst, idx) =>
      (instColorMap[inst] = INSTITUTION_FILL_COLORS[idx % INSTITUTION_FILL_COLORS.length]),
  );

  const stationsDataByDay: Map<
    string,
    Array<{ stationName: string; stationId?: string; values: Record<string, number | string> }>
  > = new Map();

  if (Array.isArray(dataForTablePreview)) {
    for (const r of dataForTablePreview) {
      const dateVal =
        r.dataHora ?? r.datahora ?? r.datamedida ?? r.inicio ?? r.fim ?? r.data ?? null;
      if (!dateVal) continue;
      const d = new Date(dateVal as string | number | Date);
      if (isNaN(d.getTime())) continue;
      const day = isoDate(d);
      const sid = String(r.idestacao ?? r.id ?? r.estacao ?? r.station ?? "").trim();
      const stationName =
        sid && stationsList.find((s) => String(s.id).trim() === sid)?.name
          ? stationsList.find((s) => String(s.id).trim() === sid)!.name
          : sid || String(r.instituicao ?? r.reservatorio ?? sid ?? "—");

      const values: Record<string, number | string> = {};
      for (const col of columns) {
        const raw = r[col] ?? r[col.toLowerCase()] ?? r[col.toUpperCase()];
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
                const instKey = String(repRow.instituicao ?? "—");
                const valueAtPoint = seriesValues[sIdx][i];
                const stationsForDay = stationsDataByDay.get(dayLabel) ?? [];
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
                    fill={instColorMap[instKey] || "#fff"}
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
                        instituicao:
                          repRow.instituicao != null ? String(repRow.instituicao) : undefined,
                        reservatorio:
                          repRow.reservatorio != null ? String(repRow.reservatorio) : undefined,
                        color: instColorMap[instKey],
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
          const stations = tooltip.stations ?? [];
          const pageNum = tooltip.page ?? 0;
          const totalPages = Math.max(1, Math.ceil(stations.length / POPUP_PAGE_SIZE));
          const start = pageNum * POPUP_PAGE_SIZE;
          const paged = stations.slice(start, start + POPUP_PAGE_SIZE);
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
                      type="button"
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
                      type="button"
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
