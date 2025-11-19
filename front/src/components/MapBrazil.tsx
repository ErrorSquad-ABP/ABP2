import { useEffect, useState } from "react";
import MapSvg from "./MapSvg";

/**
 * MapBrazil
 *
 * Props (optionais):
 * - points: Array<{ id, lat, lon, label, color }>
 * - selectedPoints: Array<{ id, lat, lon, label, color }>
 * - polygons: Array<Array<{ lat, lon }>>  // cada item é um anel: [ {lat,lon}, ... ]
 * - height: number (px) or undefined -> MapSvg usa 100vh por padrão
 * - showPoints: boolean
 * - showPolygons: boolean
 * - showStateNames: boolean
 * - onClickPoint: (point) => void
 * - onClickCountry: (id) => void
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
  const [countries, setCountries] = useState<any[]>([]);

  useEffect(() => {
    // mantém o comportamento anterior (world geojson)
    // (se der 404, substitua pela sua cópia local do geojson)
    fetch("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.features) setCountries(data.features);
        else setCountries([]);
      })
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
