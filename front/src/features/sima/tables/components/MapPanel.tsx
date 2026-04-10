import type { SimaTablesUiAction } from "../hooks/simaTablesUiReducer";
import type { SimaMapBrazilComponent, SimaMapPoint } from "../types/mapBrazil";
import {
  MapPlaceholder,
  ZoomControls,
} from "../../../../pages/sima/SimaTablesPage.styles";

type Props = {
  latLonPoints: SimaMapPoint[];
  zoom: number;
  pan: { x: number; y: number };
  dispatch: React.Dispatch<SimaTablesUiAction>;
  MapBrazil: SimaMapBrazilComponent;
  onMouseMove: (e: React.MouseEvent<HTMLDivElement>) => void;
};

export function MapPanel({ latLonPoints, zoom, pan, dispatch, MapBrazil, onMouseMove }: Props) {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 8,
        }}
      >
        <div style={{ fontWeight: 800, color: "#0b2740" }}>Mapa — pontos de coleta</div>
        <div style={{ color: "#475569", fontSize: 13 }}>{latLonPoints.length} pontos</div>
      </div>

      <MapPlaceholder>
        <ZoomControls>
          <div>
            <button
              type="button"
              aria-label="Zoom Out"
              onClick={() =>
                dispatch({
                  type: "patch",
                  patch: { zoom: Math.max(0.5, +(zoom - 0.2).toFixed(2)) },
                })
              }
            >
              -
            </button>
            <button
              type="button"
              aria-label="Zoom In"
              onClick={() =>
                dispatch({
                  type: "patch",
                  patch: { zoom: Math.min(2.0, +(zoom + 0.2).toFixed(2)) },
                })
              }
            >
              +
            </button>
            <button
              type="button"
              aria-label="Center"
              onClick={() =>
                dispatch({ type: "patch", patch: { zoom: 1, pan: { x: 0, y: 0 } } })
              }
            >
              ⤾
            </button>
          </div>
        </ZoomControls>

        <div
          role="presentation"
          onMouseMove={onMouseMove}
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              maxWidth: 1100,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              transform: `scale(${zoom}) translate(${pan.x}px, ${pan.y}px)`,
              cursor: "grab",
              transformOrigin: "center top",
            }}
          >
            <MapBrazil
              height={760}
              showPolygons={true}
              points={latLonPoints.map((p) => ({
                id: p.id,
                lat: p.lat,
                lon: p.lon,
                label: p.label || `Ponto ${p.id}`,
              }))}
              showPoints={true}
            />
          </div>
        </div>
      </MapPlaceholder>
    </>
  );
}
