import type { SimaTablesPageController } from "../hooks/useSimaTablesPage";
import { Button } from "../ui/SimaTablesPage.styles";

type Props = { c: SimaTablesPageController };

export function TableChoiceStep({ c }: Props) {
  const { state, dispatch, handleConfirmTable } = c;
  const { stage, table } = state;
  if (stage < 2) return null;

  return (
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
  );
}
