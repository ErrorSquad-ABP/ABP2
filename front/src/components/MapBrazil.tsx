import { useEffect, useState } from "react";
import MapSvg from "./MapSvg";

/**
 * MapBrazil
 *
 * Props (optionais):
 * - points: Array<{ id, lat, lon, label }>
 * - selectedPoints: Array<{ id, lat, lon, label }>
 * - polygons: Array<Array<{ lat, lon }>>  // cada item é um anel: [ {lat,lon}, ... ]
 * - height: number (px) or undefined -> MapSvg usa 100vh por padrão
 * - showPoints: boolean
 * - showPolygons: boolean
 * - showStateNames: boolean
 * - onClickPoint: (point) => void
 * - onClickCountry: (id) => void
 *
 * Caso nenhum "points" seja fornecido, o componente apenas desenha o mapa mundi (como antes).
 */
export default function MapBrazil({
  points = [],
  selectedPoints = [],
  polygons = [],
  height,
  showPoints = true,
  showPolygons = true,
  showStateNames = false,
  onClickPoint,
  onClickCountry,
}) {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    // mantém o comportamento anterior (world geojson), perfis offline podem trocar URL/local
    fetch("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson")
      .then((res) => res.json())
      .then((data) => setCountries(data.features))
      .catch((err) => {
        console.error("Erro carregando geojson:", err);
        setCountries([]);
      });
  }, []);

  return (
    <MapSvg
      countries={countries}
      onClickCountry={onClickCountry}
      points={points}
      selectedPoints={selectedPoints}
      polygons={polygons}
      height={height}
      showPoints={showPoints}
      showPolygons={showPolygons}
      showStateNames={showStateNames}
      onClickPoint={onClickPoint}
    />
  );
}
