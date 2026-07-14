import type { SimaTablesPageController } from "../hooks/useSimaTablesPage";
import { Button, DownloadButton, DownloadButtonsContainer } from "../ui/SimaTablesPage.styles";

type Props = { c: SimaTablesPageController };

export function ExportToolbar({ c }: Props) {
  const { state, dispatch, resetWizard, handleDownloadCSV, handleDownloadJSON, handleDownloadPDF } =
    c;
  const { view, dataForTablePreview, loading } = state;
  const disabledExport = !dataForTablePreview || dataForTablePreview.length === 0 || loading;

  return (
    <div style={{ display: "flex", gap: 8 }}>
      <Button type="button" onClick={resetWizard}>
        Reiniciar
      </Button>

      <Button
        type="button"
        onClick={() =>
          dispatch({ type: "patch", patch: { view: view === "chart" ? "map" : "chart" } })
        }
      >
        {view === "chart" ? "Ver mapa" : "Ver gráfico"}
      </Button>

      <DownloadButtonsContainer>
        <DownloadButton
          variant="csv"
          type="button"
          onClick={handleDownloadCSV}
          disabled={disabledExport}
        >
          Baixar CSV
        </DownloadButton>
        <DownloadButton
          variant="json"
          type="button"
          onClick={handleDownloadJSON}
          disabled={disabledExport}
        >
          Baixar JSON
        </DownloadButton>
        <DownloadButton
          variant="pdf"
          type="button"
          onClick={handleDownloadPDF}
          disabled={disabledExport}
        >
          Baixar PDF
        </DownloadButton>
      </DownloadButtonsContainer>
    </div>
  );
}
