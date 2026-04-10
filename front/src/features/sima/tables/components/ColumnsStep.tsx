import { isDateColumn, isIdColumn } from "../model/columnGuards";
import type { SimaTablesPageController } from "../hooks/useSimaTablesPage";
import { Button, ColumnItem, Spinner } from "../../../../pages/sima/SimaTablesPage.styles";

type Props = { c: SimaTablesPageController };

export function ColumnsStep({ c }: Props) {
  const { state, toggleColumn, handleGenerateChart, handleGenerateGraph } = c;
  const { stage, loading, columnsForTable, selectedColumns } = state;
  if (stage < 4) return null;

  return (
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
                      <small style={{ marginLeft: 8, color: "#94a3b8" }}>(não selecionável)</small>
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
  );
}
