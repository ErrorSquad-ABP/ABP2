import { isDateColumn, isIdColumn } from "../model/columnGuards";
import type { SimaTablesPageController } from "../hooks/useSimaTablesPage";
import {
  Button,
  ColumnItem,
  Controls,
  Label,
  LeftColumn,
  Row,
  Select,
  Spinner,
} from "../../../../pages/sima/SimaTablesPage.styles";

export function SimaTablesWizard(c: SimaTablesPageController) {
  const {
    state,
    dispatch,
    stationsList,
    stationsFetching,
    showToast,
    handleConfirmTable,
    handleConfirmPeriod,
    toggleStation,
    toggleColumn,
    handleGenerateChart,
    handleGenerateGraph,
  } = c;
  const loading = state.loading;

  const {
    stage,
    selectedStations,
    selectAllStations,
    table,
    availableDates,
    startDate,
    endDate,
    columnsForTable,
    selectedColumns,
  } = state;

  return (
    <LeftColumn>
      <Controls>
        {stage >= 1 && (
          <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
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
                    dispatch({
                      type: "patch",
                      patch: {
                        selectAllStations: v,
                        selectedStations: v ? stationsList.map((s) => String(s.id).trim()) : [],
                      },
                    });
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
                          dispatch({ type: "patch", patch: { selectAllStations: false } });
                          toggleStation(s.id, e.target.checked);
                        }}
                      />
                      <div>{s.name}</div>
                    </div>
                  );
                })
              ) : (
                <div>
                  Carregando estações... {stationsFetching || loading ? <Spinner /> : null}
                </div>
              )}
            </div>

            <div style={{ marginTop: 12 }}>
              <Button
                $primary
                onClick={() => {
                  if (!selectedStations.length) {
                    showToast(null, "Marque ao menos uma estação para continuar.");
                    return;
                  }
                  dispatch({ type: "patch", patch: { stage: 2 } });
                }}
              >
                Confirmar estações
              </Button>
            </div>
          </>
        )}

        {stage >= 2 && (
          <>
            <div style={{ marginTop: 12, fontWeight: 700 }}>2) Escolha a tabela</div>
            <div style={{ marginTop: 8 }}>
              <label style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <input
                  type="radio"
                  name="tb"
                  checked={table === "tbsima"}
                  onChange={() => dispatch({ type: "patch", patch: { table: "tbsima" } })}
                />
                <span>tbsima (online)</span>
              </label>
              <label style={{ display: "flex", gap: 12, alignItems: "center", marginTop: 6 }}>
                <input
                  type="radio"
                  name="tb"
                  checked={table === "tbsimaoffline"}
                  onChange={() => dispatch({ type: "patch", patch: { table: "tbsimaoffline" } })}
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

        {stage >= 3 && (
          <>
            <div style={{ marginTop: 12, fontWeight: 700 }}>3) Escolha o período</div>

            <Row style={{ marginTop: 8 }}>
              <Label>Data início</Label>
              <Select
                value={startDate}
                onChange={(e) => {
                  const v = e.target.value;
                  dispatch({ type: "patch", patch: { startDate: v } });
                  if (endDate && new Date(v).getTime() > new Date(endDate).getTime()) {
                    setTimeout(() => {
                      if (new Date(v).getTime() > new Date(endDate).getTime()) {
                        showToast(null, "Data início não pode ser posterior à data fim.");
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
                  dispatch({ type: "patch", patch: { endDate: v } });
                  if (startDate && new Date(v).getTime() < new Date(startDate).getTime()) {
                    setTimeout(() => {
                      if (new Date(v).getTime() < new Date(startDate).getTime()) {
                        showToast(null, "Data fim não pode ser menor que data início.");
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

        {stage >= 4 && (
          <>
            <div style={{ fontWeight: 700 }}>4) Escolha colunas a plotar</div>
            <div style={{ fontSize: 12, color: "#64748b", marginTop: 6 }}>
              (colunas de id/data estão desabilitadas para plotagem)
            </div>

            <div style={{ marginTop: 8, maxHeight: 320, overflowY: "auto" }}>
              {columnsForTable && columnsForTable.length ? (
                columnsForTable.map((col, idx) => {
                  const colName = (col?.nome ?? (col as { name?: string }).name ?? String(col)).toString();
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
                          {col.label ?? colName}
                          {disabled ? (
                            <small style={{ marginLeft: 8, color: "#94a3b8" }}>
                              (não selecionável)
                            </small>
                          ) : null}
                        </div>
                        <small style={{ color: "#64748b" }}>{col.type ?? "—"}</small>
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
  );
}
