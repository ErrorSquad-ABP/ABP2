/* prettier-ignore-file */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { TablesPageController } from "../hooks/useTablesPage";
import SimaTable from "../../../components/SimaTable";
import {
  Button,
  ChartMain,
  ChartWrapper,
  ControlsTopRight,
  DownloadButton,
  DownloadButtonsContainer,
  LegendBox,
  LegendItem,
  MapInner,
  MapPlaceholder,
  Panel,
  RightPanel,
  SimaTableWrapper,
  Swatch,
  TableElement,
  TablePreview,
  ZoomControls,
} from "../../../pages/tables/TablesPage.styles";

export function TablesWorkspace(c: TablesPageController) {
  const MapBrazilAny = c.MapBrazilAny;
  return (
    <RightPanel>
      <ControlsTopRight>
                  <div style={{ display: "flex", gap: 8 }}>
                    <Button onClick={() => c.setView((v) => (v === "chart" ? "map" : "chart"))}>
                      {c.view === "chart" ? "Ver mapa" : "Ver tabela"}
                    </Button>
                    <DownloadButtonsContainer>
                      <DownloadButton variant="csv" disabled={true}>
                        Baixar CSV
                      </DownloadButton>
                      <DownloadButton variant="json" disabled={true}>
                        Baixar JSON
                      </DownloadButton>
                      <DownloadButton variant="pdf" disabled={true}>
                        Baixar PDF
                      </DownloadButton>
                    </DownloadButtonsContainer>
                  </div>
                </ControlsTopRight>
      
                <Panel ref={c.chartRef}>
                  {c.view === "chart" ? (
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
                          Visualização — {c.table} — {c.responsible}
                        </div>
                        <div style={{ color: "#475569", fontSize: 13 }}>
                          {c.data && c.data.length ? `${c.data.length} registros` : "Nenhum dado carregado"}
                        </div>
                      </div>
      
                      {c.showTableView && (
                        <TablePreview>
                          <TableElement>
                            <thead>
                              <tr>
                                {c.selectedColumns && c.selectedColumns.length ? (
                                  c.selectedColumns.map((col) => <th key={col}>{col}</th>)
                                ) : (
                                  <th>Sem colunas selecionadas</th>
                                )}
                              </tr>
                            </thead>
                            <tbody>
                              {c.data && c.data.length
                                ? c.data.slice(0, 5).map((row, i) => (
                                    <tr key={`row-${i}`}>
                                      {c.selectedColumns.length
                                        ? c.selectedColumns.map((col) => (
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
                                      {c.selectedColumns && c.selectedColumns.length ? (
                                        c.selectedColumns.map((col) => <td key={`ph-${r}-${col}`}>—</td>)
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
                        <ChartMain ref={c.chartMainRef}>
                          {c.showTable ? (
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
                                    c.selectedColumns && c.selectedColumns.length
                                      ? c.selectedColumns.map((col) => ({ key: col, label: col }))
                                      : Object.keys(c.data[0] || {})
                                          .slice(0, 6)
                                          .map((k) => ({ key: k, label: k }))
                                  }
                                  data={c.data}
                                  page={c.page}
                                  pageSize={c.pageSize}
                                  onPageChange={(newPage: number) => c.handlePageChange(newPage)}
                                />
                              </SimaTableWrapper>
                              {(c.polygonReservoirs.length > 0 ||
                                c.insidePolygonReservatorios.length > 0) && (
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
      
                                  {c.polygonReservoirs.length > 0 && (
                                    <div style={{ marginBottom: 12 }}>
                                      <div style={{ fontWeight: 600, marginBottom: 6, color: "#1e293b" }}>
                                        Reservatórios selecionados para formar o polígono:
                                      </div>
                                      <ul style={{ margin: 0, paddingLeft: 18, color: "#334155" }}>
                                        {c.polygonReservoirs.map((r) => (
                                          <li key={`poly-${r.id}`}>
                                            <strong>{r.nome || `Reservatório ${r.id}`}</strong>
                                            {` — id: ${r.id} — (${Number(r.latitude).toFixed(6)}, ${Number(r.longitude).toFixed(6)})`}
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  )}
      
                                  {c.insidePolygonReservatorios.length > 0 && (
                                    <div>
                                      <div style={{ fontWeight: 600, marginBottom: 6, color: "#1e293b" }}>
                                        Reservatórios dentro do polígono:
                                      </div>
                                      <ul style={{ margin: 0, paddingLeft: 18, color: "#334155" }}>
                                        {c.insidePolygonReservatorios.map((r) => {
                                          // r pode vir de c.computeInsideForPoly (tem lat/lon) ou de outras fontes
                                          const latVal = r.lat ?? r.latitude ?? r.latitude_deg ?? null;
                                          const lonVal = r.lon ?? r.longitude ?? r.longitude_deg ?? null;
                                          const latNum = Number(latVal);
                                          const lonNum = Number(lonVal);
                                          const latStr = Number.isFinite(latNum)
                                            ? latNum.toFixed(6)
                                            : "—";
                                          const lonStr = Number.isFinite(lonNum)
                                            ? lonNum.toFixed(6)
                                            : "—";
                                          return (
                                            <li key={`inside-${String(r.id)}`}>
                                              <strong>{r.nome || `Reservatório ${String(r.id)}`}</strong>
                                              {` — id: ${String(r.id)} — (${latStr}, ${lonStr})`}
                                            </li>
                                          );
                                        })}
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
                          {c.displayedReservoirs.length} pontos
                        </div>
                      </div>
      
                      <MapPlaceholder>
                        <ZoomControls>
                          <div>
                            <button
                              aria-label="Zoom Out"
                              onClick={() => c.setZoom((z) => Math.max(0.5, +(z - 0.2).toFixed(2)))}
                            >
                              -
                            </button>
                            <button
                              aria-label="Zoom In"
                              onClick={() => c.setZoom((z) => Math.min(2.0, +(z + 0.2).toFixed(2)))}
                            >
                              +
                            </button>
                            <button
                              aria-label="Center"
                              onClick={() => {
                                c.setZoom(1);
                                c.setPan({ x: 0, y: 0 });
                              }}
                            >
                              ⤾
                            </button>
                          </div>
                        </ZoomControls>
      
                        <div
                          style={{
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <MapInner ref={c.mapInnerRef}>
                            <div
                              style={{
                                width: "100%",
                                height: "100%",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                transform: `scale(${c.zoom}) translate(${c.pan.x}px, ${c.pan.y}px)`,
                                transformOrigin: "center top",
                                position: "relative",
                              }}
                            >
                              <MapBrazilAny
                                height={760}
                                showPolygons={true}
                                showStateNames={false}
                                points={c.mapPoints}
                                selectedPoints={c.mapSelectedPoints}
                                polygons={c.mapPolygons}
                                showPoints={true}
                              />
      
                              {/* SVG overlay for drawing (sits on top) */}
                              <svg
                                ref={c.drawSvgRef}
                                onClick={c.handleMapClickForDrawing}
                                style={{
                                  position: "absolute",
                                  left: 0,
                                  top: 0,
                                  width: "100%",
                                  height: "100%",
                                  pointerEvents: c.isDrawing ? "auto" : "none",
                                  zIndex: 80,
                                }}
                              >
                                {/* draw temporary polygon (polyline) */}
                                {c.drawPoints && c.drawPoints.length > 0 && (
                                  <>
                                    {(() => {
                                      const ptsScreen = c.getOverlayProjectedPoints(c.drawPoints);
                                      const polyPointsAttr = ptsScreen
                                        .map((p: any) => `${p[0]},${p[1]}`)
                                        .join(" ");
                                      return (
                                        <>
                                          <polyline
                                            points={polyPointsAttr}
                                            fill="none"
                                            stroke="#ffffff"
                                            strokeWidth={2}
                                            strokeDasharray="4 4"
                                            opacity={0.85}
                                          />
                                          {/* small circles on vertices */}
                                          {ptsScreen.map((p: any, i: number) => (
                                            <circle
                                              key={`dp-${i}`}
                                              cx={p[0]}
                                              cy={p[1]}
                                              r={4}
                                              fill="#ffffff"
                                              opacity={0.95}
                                            />
                                          ))}
                                        </>
                                      );
                                    })()}
                                  </>
                                )}
                              </svg>
                            </div>
                          </MapInner>
                        </div>
      
                        {/* legenda abaixo do mapa */}
                        <div style={{ padding: 12 }}>
                          {c.displayedReservoirs && c.displayedReservoirs.length ? (
                            <LegendBox>
                              {c.displayedReservoirs.map((r: any) => {
                                const idStr = String(r.id);
                                const color = c.colorMap[idStr] ?? "#999";
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
                          $primary={!c.isDrawing}
                          onClick={() => {
                            // start drawing mode
                            c.setIsDrawing(true);
                            c.setDrawPoints([]);
                          }}
                        >
                          Desenhar polígono
                        </Button>
      
                        <Button
                          onClick={() => {
                            c.cancelDrawing();
                          }}
                          disabled={!c.isDrawing && c.drawPoints.length === 0}
                        >
                          Cancelar desenho
                        </Button>
      
                        <Button
                          $primary
                          onClick={() => {
                            c.createPolygonFromDrawing();
                          }}
                          disabled={c.drawPoints.length < 3}
                        >
                          Criar polígono
                        </Button>
      
                        <Button onClick={() => c.setShowAllPolygons(true)}>Mostrar todos</Button>
                        <Button onClick={() => c.setShowAllPolygons(false)}>Ocultar todos</Button>
      
                        <div style={{ color: "#64748b", fontSize: 13 }}>
                          {c.savedPolygons.length
                            ? `${c.savedPolygons.length} polígono(s) salvo(s)`
                            : "Nenhum polígono salvo"}
                        </div>
                      </div>
      
                      {/* Lista de polígonos salvos */}
                      <div style={{ marginTop: 16 }}>
                        <h4 style={{ margin: 0, marginBottom: 8 }}>Polígonos adicionados</h4>
      
                        {c.savedPolygons.length === 0 ? (
                          <div style={{ color: "#94a3b8" }}>Nenhum polígono criado.</div>
                        ) : (
                          c.savedPolygons.map((poly, idx) => {
                            const insideList = c.polygonReservsMap[poly.id] ?? [];
                            const isShown = !!c.showPolygonReservs[poly.id];
                            const isVisibleOnMap = !!c.polygonVisibility[poly.id];
                            return (
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
                                <div
                                  style={{ display: "flex", justifyContent: "space-between", gap: 12 }}
                                >
                                  <div>
                                    <div style={{ fontWeight: 700 }}>Polígono #{idx + 1}</div>
                                    <div style={{ fontSize: 13, color: "#475569" }}>
                                      {poly.points.length} pontos
                                    </div>
                                  </div>
      
                                  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                                    <label style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                      <input
                                        type="checkbox"
                                        checked={isVisibleOnMap}
                                        onChange={(e) =>
                                          c.setPolygonVisibility((prev) => ({
                                            ...prev,
                                            [poly.id]: !!e.target.checked,
                                          }))
                                        }
                                      />
                                      <span style={{ fontSize: 13 }}>Mostrar no mapa</span>
                                    </label>
      
                                    <Button
                                      onClick={() => {
                                        // MC 112: alterna exibição da lista de reservatórios dentro do polígono
                                        c.setShowPolygonReservs((prev) => {
                                          const next = { ...prev, [poly.id]: !prev[poly.id] };
                                          return next;
                                        });
                                        // MC 92: se não tivermos calculado ainda, calcule agora
                                        if (!c.polygonReservsMap[poly.id]) {
                                          const found = c.computeInsideForPoly(poly);
                                          c.setPolygonReservsMap((prev) => ({ ...prev, [poly.id]: found }));
                                        }
                                      }}
                                    >
                                      {isShown ? "Ocultar reservatórios" : "Ver reservatórios dentro"}
                                    </Button>
      
                                    <Button
                                      onClick={() => {
                                        // remove polygon
                                        c.setSavedPolygons((prev) => prev.filter((p) => p.id !== poly.id));
                                        c.setPolygonVisibility((prev) => {
                                          const n = { ...prev };
                                          delete n[poly.id];
                                          return n;
                                        });
                                        c.setPolygonReservsMap((prev) => {
                                          const n = { ...prev };
                                          delete n[poly.id];
                                          return n;
                                        });
                                        c.setShowPolygonReservs((prev) => {
                                          const n = { ...prev };
                                          delete n[poly.id];
                                          return n;
                                        });
                                      }}
                                    >
                                      Remover
                                    </Button>
                                  </div>
                                </div>
      
                                {/* expanded list area - shown below the card (inline) */}
                                {isShown && (
                                  <div
                                    style={{
                                      marginTop: 8,
                                      padding: 12,
                                      background: "#fff",
                                      borderRadius: 8,
                                      boxShadow: "0 8px 30px rgba(6,58,128,0.08)",
                                      border: "1px solid #e2e8f0",
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
                                          <li key={`poly-${poly.id}-res-${r.id}`}>
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
  );
}
