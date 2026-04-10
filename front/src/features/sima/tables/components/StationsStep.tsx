import type { SimaTablesPageController } from "../hooks/useSimaTablesPage";
import { Button, Spinner } from "../../../../pages/sima/SimaTablesPage.styles";

type Props = { c: SimaTablesPageController };

export function StationsStep({ c }: Props) {
  const { state, dispatch, stationsList, stationsFetching, showToast, toggleStation } = c;
  const { stage, loading, selectedStations, selectAllStations } = state;
  if (stage < 1) return null;

  return (
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
  );
}
