import React, { useState, useEffect } from "react";
import * as d3 from "d3";
import brStatesJson from "./../../public/br_states.json";

export default function MapSvg({ onClickState, reservatorios }) {
  const [paths, setPaths] = useState([]);

  useEffect(() => {
    const projection = d3.geoMercator().scale(850).center([-55, -15]).translate([350, 325]);

    const pathGenerator = d3.geoPath().projection(projection);

    const statePaths = brStatesJson.features.map((feature) => ({
      id: feature.id,
      d: pathGenerator(feature.geometry),
    }));

    setPaths(statePaths);
  }, []);

  const projection = d3.geoMercator().scale(850).center([-55, -15]).translate([350, 325]);

  return (
    <svg
      width={700}
      height={650}
      style={{
        backgroundColor: "transparent", // 👈 combina com o degradê
        cursor: "pointer",
      }}
    >
      {/* Estados */}
      {paths.map((p, index) => (
        <path
          key={index}
          id={p.id}
          d={p.d}
          fill="#1E3A5F" // azul médio elegante
          stroke="#89A1C9" // borda azul prateada
          strokeWidth="0.5"
          style={{ transition: "fill 0.25s ease" }} // suaviza transição de hover
          onMouseEnter={(e) => (e.target.style.fill = "#FF4C4C")} // hover vermelho
          onMouseLeave={(e) => (e.target.style.fill = "#1E3A5F")}
          onClick={() => {
            console.log("Estado clicado:", p.id);
            onClickState(p.id);
          }}
        />
      ))}

      {/* Reservatórios (losangos dourados) */}
      {reservatorios.map((r, i) => {
        if (!r.lat || !r.lng) return null;
        const [x, y] = projection([r.lng, r.lat]);
        return (
          <polygon
            key={i}
            points={`${x},${y - 5} ${x + 5},${y} ${x},${y + 5} ${x - 5},${y}`}
            fill="#FFD700" // dourado principal
            stroke="#FFA500" // contorno laranja suave
            strokeWidth="1"
            style={{ transition: "fill 0.25s ease" }}
            onMouseEnter={(e) => (e.target.style.fill = "#FFF275")}
            onMouseLeave={(e) => (e.target.style.fill = "#FFD700")}
          />
        );
      })}
    </svg>
  );
}
