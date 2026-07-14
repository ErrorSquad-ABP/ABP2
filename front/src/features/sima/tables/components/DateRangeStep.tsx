import type { SimaTablesPageController } from "../hooks/useSimaTablesPage";
import { Button, Label, Row, Select } from "../ui/SimaTablesPage.styles";

type Props = { c: SimaTablesPageController };

export function DateRangeStep({ c }: Props) {
  const { state, dispatch, showToast, handleConfirmPeriod } = c;
  const { stage, startDate, endDate, availableDates } = state;
  if (stage < 3) return null;

  return (
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
  );
}
