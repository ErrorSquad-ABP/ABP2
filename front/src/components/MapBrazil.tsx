import { useEffect, useState } from "react";
import MapSvg from "./MapSvg.jsx";
import brStatesJson from "./../../public/br_states.json"; // JSON do Brasil
import * as turf from "@turf/turf";

export default function MapBrasil() {
  const [reservatorios, setReservatorios] = useState([]);
  const brStates = brStatesJson.features;

  useEffect(() => {
    fetch("http://localhost:3001/furnas/reservatorio/all")
      .then((res) => res.json())
      .then((data) => setReservatorios(data.data));
  }, []);

  const handleStateClick = (sigla) => {
    const state = brStates.find((s) => s.id === sigla);
    if (!state) return;

    const polygon = turf.multiPolygon(state.geometry.coordinates);

    const reservatoriosNoEstado = reservatorios.filter((r) => {
      if (!r.lat || !r.lng) return false;
      const point = turf.point([r.lng, r.lat]);
      return turf.booleanPointInPolygon(point, polygon);
    });

    console.log(`Reservatórios em ${state.properties.Estado}:`, reservatoriosNoEstado);
  };
  <MapSvg onClickState={handleStateClick} />;
  // ⚠️ Aqui está a linha chave:
  // você passa a função handleStateClick como prop "onClickState"
  return <MapSvg onClickState={handleStateClick} />;
}
