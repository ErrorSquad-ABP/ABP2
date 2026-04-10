import { MultiSeriesSVG } from "./MultiSeriesSVG";
import { ExportToolbar } from "./ExportToolbar";
import { MapPanel } from "./MapPanel";
import { SERIES_COLORS } from "../model/constants";
import type { SimaTablesPageController } from "../hooks/useSimaTablesPage";
import {
  Button,
  ChartMain,
  ChartWrapper,
  ControlsTopRight,
  Legend,
  LegendItem,
  Panel,
  RightPanel,
  Spinner,
  TableElement,
  TablePreview,
} from "../../../../pages/sima/SimaTablesPage.styles";

export function SimaTablesWorkspace(c: SimaTablesPageController) {
  const {
    state,
    dispatch,
    chartRef,
    chartMainRef,
    latLonPoints,
    MapBrazilTyped,
    handleMouseMove,
    tooltip,
    setTooltip,
    stationsList,
  } = c;

  const {
    stage,
    table,
    view,
    chartData,
    dataForTablePreview,
    selectedColumns,
    loading,
    showTableView,
    page,
    zoom,
    pan,
  } = state;

  return (
    <RightPanel>
      <ControlsTopRight>
        <ExportToolbar c={c} />
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
              typeof (chartData[0] as { day?: string })?.day === "string" &&
              selectedColumns.length ? (
                <>
                  <MultiSeriesSVG
                    rows={chartData as Record<string, unknown>[]}
                    columns={selectedColumns}
                    dataForTablePreview={
                      dataForTablePreview as Record<string, unknown>[] | null
                    }
                    stationsList={stationsList}
                    chartMainRef={chartMainRef}
                    tooltip={tooltip}
                    setTooltip={setTooltip}
                  />
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
                                    <td key={`${i}-${col}`}>
                                      {String((row as Record<string, unknown>)[col] ?? "—")}
                                    </td>
                                  ))
                                : Object.keys(row as object)
                                    .slice(0, 6)
                                    .map((k) => (
                                      <td key={`${i}-${k}`}>
                                        {String((row as Record<string, unknown>)[k] ?? "—")}
                                      </td>
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
                            ? selectedColumns.map((col) => {
                                const rec = row as Record<string, unknown>;
                                const lower = col.toLowerCase();
                                return (
                                  <td key={`${i}-${col}`}>
                                    {String(rec[col] ?? rec[lower] ?? "—")}
                                  </td>
                                );
                              })
                            : Object.keys(row as object)
                                .slice(0, 6)
                                .map((k) => (
                                  <td key={`${i}-${k}`}>
                                    {String((row as Record<string, unknown>)[k] ?? "—")}
                                  </td>
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

            <div style={{ marginTop: 8 }}>
              <Button
                type="button"
                onClick={() => dispatch({ type: "patch", patch: { page: Math.max(0, page - 1) } })}
              >
                {"<"}
              </Button>
              <Button
                type="button"
                onClick={() =>
                  dispatch({
                    type: "patch",
                    patch: {
                      page:
                        dataForTablePreview && dataForTablePreview.length
                          ? Math.min(page + 1, Math.floor((dataForTablePreview.length - 1) / 10))
                          : page + 1,
                    },
                  })
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
          <MapPanel
            latLonPoints={latLonPoints}
            zoom={zoom}
            pan={pan}
            dispatch={dispatch}
            MapBrazil={MapBrazilTyped}
            onMouseMove={handleMouseMove}
          />
        )}
      </Panel>
    </RightPanel>
  );
}
