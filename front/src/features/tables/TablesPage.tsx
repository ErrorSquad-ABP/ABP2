import { JSX } from "react";
import { Container, Page } from "./ui/TablesPage.styles";
import { TablesWizard } from "./components/TablesWizard";
import { TablesWorkspace } from "./components/TablesWorkspace";
import { useTablesPage } from "./hooks/useTablesPage";

export default function TablesPage(): JSX.Element {
  const c = useTablesPage();
  return (
    <Page>
      <Container>
        <TablesWizard {...c} />
        <TablesWorkspace {...c} />
      </Container>
    </Page>
  );
}
