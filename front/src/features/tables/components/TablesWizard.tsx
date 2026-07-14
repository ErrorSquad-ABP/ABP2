/* prettier-ignore-file */
/* eslint-disable @typescript-eslint/no-explicit-any -- linhas de reservatório/colunas da API */
import type { TablesPageController } from "../hooks/useTablesPage";
import { isIdOrDateColumn } from "@/utils/limnologicData";
import {
  Button,
  ColumnItem,
  ColumnsBox,
  Controls,
  Label,
  LeftColumn,
  MUTED_BLUE,
  Row,
  Select,
} from "../ui/TablesPage.styles";

export function TablesWizard(c: TablesPageController) {
  return (
    <LeftColumn>
      <Controls>
        {/* Stage 1: Reservatórios */}
        {c.stage >= 1 && (
          <>
            <div style={{ fontWeight: 700 }}>1) Escolha o(s) reservatório(s)</div>

            <div style={{ marginTop: 8 }}>
              <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <input
                  type="checkbox"
                  checked={c.selectAllReservatorios}
                  onChange={(e) => {
                    const v = e.target.checked;
                    c.setSelectAllReservatorios(v);

                    if (v) {
                      const allIds = c.reservatorios.map(
                        (r: any) => r.idreservatorio ?? r.id ?? r.idReservatorio,
                      );
                      c.setSelectedReservatorios(allIds);
                    } else {
                      c.setSelectedReservatorios([]);
                    }
                  }}
                />
                <span>Selecionar todos os reservatórios</span>
              </label>
            </div>

            <div
              style={{
                maxHeight: 220,
                overflowY: "auto",
                marginTop: 8,
                padding: 8,
                border: `1px solid ${MUTED_BLUE}`,
                borderRadius: 8,
              }}
            >
              {c.reservatorios.length ? (
                c.reservatorios.map((r: any) => {
                  const id = r.idreservatorio ?? r.id ?? r.idReservatorio;
                  const checked = c.selectedReservatorios.some((s) => String(s) === String(id));

                  return (
                    <div
                      key={String(id)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        marginBottom: 6,
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={(e) => {
                          c.setSelectAllReservatorios(false);
                          c.toggleReservatorio(id, e.target.checked);
                        }}
                      />
                      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                        <div>{r.nome ?? r.name ?? `Reservatório ${id}`}</div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div>Carregando reservatórios...</div>
              )}
            </div>

            <div style={{ marginTop: 12 }}>
              <Button
                $primary
                onClick={() => {
                  c.handleConfirmReservatorios();
                }}
              >
                Confirmar reservatórios
              </Button>
            </div>
          </>
        )}

        {/* Stage 2: Tabela */}
        {c.stage >= 2 && (
          <>
            <div style={{ marginTop: 12, fontWeight: 700 }}>2) Escolha a tabela</div>
            <div style={{ marginTop: 8 }}>
              <Select value={c.table} onChange={(e) => c.setTable(e.target.value)}>
                {c.tablesOptions && c.tablesOptions.length > 0 ? (
                  c.tablesOptions.map((opt) => (
                    <option key={opt.api} value={opt.api}>
                      {opt.label}
                    </option>
                  ))
                ) : (
                  <option value="">{`Carregando tabelas...`}</option>
                )}
              </Select>
              <div style={{ fontSize: 12, color: "#0b2740", marginTop: 6 }}>
                * Obrigatório selecionar tabela
              </div>
            </div>

            <div style={{ marginTop: 12 }}>
              <Button $primary onClick={c.handleConfirmTable}>
                Confirmar tabela
              </Button>
            </div>
          </>
        )}

        {/* Stage 3: Datas */}
        {c.stage >= 3 && (
          <>
            <div style={{ marginTop: 12, fontWeight: 700 }}>3) Escolha o período</div>

            <Row style={{ marginTop: 8 }}>
              <Label>Data início</Label>
              <Select value={c.startDate} onChange={(e) => c.handleStartDate(e)}>
                <option value="">Selecione...</option>
                {c.availableDates.map((d) => (
                  <option key={`s-${d}`} value={d}>
                    {d.split("-").reverse().join("/")}
                  </option>
                ))}
              </Select>
            </Row>

            <Row style={{ marginTop: 8 }}>
              <Label>Data fim</Label>
              <Select value={c.endDate} onChange={(e) => c.handleEndDate(e)}>
                <option value="">Selecione...</option>
                {c.availableDates.map((d) => (
                  <option key={`e-${d}`} value={d}>
                    {d.split("-").reverse().join("/")}
                  </option>
                ))}
              </Select>
            </Row>

            <div style={{ marginTop: 12 }}>
              <Button $primary onClick={c.handleConfirmPeriod}>
                Confirmar período
              </Button>
            </div>
          </>
        )}

        {/* Stage 4: Colunas */}
        {c.stage >= 4 && (
          <>
            <div style={{ marginTop: 12, fontWeight: 700 }}>4) Escolha colunas</div>
            <div style={{ fontSize: 12, color: "#64748b", marginTop: 6 }}>
              (colunas de id/data estão desabilitadas para visualização/export)
            </div>
            <div style={{ marginTop: 8, maxHeight: 320, overflowY: "auto" }}>
              {c.columnsForTable && c.columnsForTable.length ? (
                c.columnsForTable.map((c: any, idx: number) => {
                  const colName = (c?.nome ?? c?.name ?? String(c)).toString();
                  const disabled = isIdOrDateColumn(colName);
                  const checked = c.selectedColumns.includes(colName);
                  return (
                    <ColumnItem key={colName + "-" + idx}>
                      <input
                        type="checkbox"
                        checked={checked}
                        disabled={disabled}
                        onChange={() => c.toggleColumnLocal(colName)}
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
                <div>Carregando colunas...</div>
              )}
            </div>

            <div style={{ marginTop: 12 }}>
              <Button
                $primary
                onClick={() => c.handleGenerateTableForCurrentSelection()}
                disabled={c.loading || !(c.selectedColumns.length > 0)}
              >
                {c.loading ? "Gerando..." : "Gerar Tabela"}
              </Button>
            </div>
          </>
        )}

        {c.stage < 4 && (
          <ColumnsBox aria-label="Lista de colunas">
            <div style={{ fontWeight: 700 }}>Colunas disponíveis</div>
            <div style={{ marginTop: 8, fontSize: 12, color: "#64748b" }}>
              As colunas relacionadas à tabela selecionada aparecerão aqui após confirmar o período.
            </div>
          </ColumnsBox>
        )}
      </Controls>
    </LeftColumn>
  );
}
