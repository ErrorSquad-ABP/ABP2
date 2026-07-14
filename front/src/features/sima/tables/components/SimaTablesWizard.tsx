import type { SimaTablesPageController } from "../hooks/useSimaTablesPage";
import { Controls, LeftColumn } from "../ui/SimaTablesPage.styles";
import { ColumnsStep } from "./ColumnsStep";
import { DateRangeStep } from "./DateRangeStep";
import { StationsStep } from "./StationsStep";
import { TableChoiceStep } from "./TableChoiceStep";

export function SimaTablesWizard(c: SimaTablesPageController) {
  return (
    <LeftColumn>
      <Controls>
        <StationsStep c={c} />
        <TableChoiceStep c={c} />
        <DateRangeStep c={c} />
        <ColumnsStep c={c} />
      </Controls>
    </LeftColumn>
  );
}
