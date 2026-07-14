import { JSX } from "react";
import { Container, Page } from "./ui/SimaTablesPage.styles";
import { SimaTablesWizard } from "./components/SimaTablesWizard";
import { SimaTablesWorkspace } from "./components/SimaTablesWorkspace";
import { useSimaTablesPage } from "./hooks/useSimaTablesPage";

export default function SimaTablesPage(): JSX.Element {
  const controller = useSimaTablesPage();
  return (
    <Page>
      <Container>
        <SimaTablesWizard {...controller} />
        <SimaTablesWorkspace {...controller} />
      </Container>
    </Page>
  );
}
