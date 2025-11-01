import React, { useState, useEffect } from "react";
import * as d3 from "d3";
import brStatesJson from "./../../public/br_states.json";

export default function MapSvg({ onClickState, reservatorios }) {
  const [paths, setPaths] = useState([]);

  useEffect(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    // Ajuste dinâmico para manter a proporção correta
    const scale = width < 768 ? 650 : 850;
    const center = width < 768 ? [-55, -16] : [-55, -15];
    const translate = width < 768 ? [width / 2, height / 2.1] : [350, 325];

    const projection = d3.geoMercator().scale(scale).center(center).translate(translate);

    const pathGenerator = d3.geoPath().projection(projection);

    const statePaths = brStatesJson.features.map((feature) => ({
      id: feature.id,
      d: pathGenerator(feature.geometry),
    }));

    setPaths(statePaths);
  }, []);

  // Cria novamente a projeção para os reservatórios (fora do useEffect)
  const width = window.innerWidth;
  const height = window.innerHeight;
  const scale = width < 768 ? 650 : 850;
  const center = width < 768 ? [-55, -16] : [-55, -15];
  const translate = width < 768 ? [width / 2, height / 2.1] : [350, 325];
  const projection = d3.geoMercator().scale(scale).center(center).translate(translate);

  return (
    <svg
      viewBox="0 0 700 650"
      preserveAspectRatio="xMidYMid meet"
      style={{
        width: "100%",
        height: "auto",
        maxHeight: "90vh",
        display: "block",
        margin: "0 auto",
        cursor: "pointer",
        backgroundColor: "transparent",
      }}
    >
      {/* Estados */}
      {paths.map((p, index) => (
        <path
          key={index}
          id={p.id}
          d={p.d}
          fill="#1E3A5F"
          stroke="#89A1C9"
          strokeWidth="0.5"
          style={{ transition: "fill 0.25s ease" }}
          onMouseEnter={(e) => (e.target.style.fill = "#FF4C4C")}
          onMouseLeave={(e) => (e.target.style.fill = "#1E3A5F")}
          onClick={() => {
            console.log("Estado clicado:", p.id);
            onClickState(p.id);
          }}
        />
      ))}

      {/* Reservatórios */}
      {reservatorios.map((r, i) => {
        if (!r.lat || !r.lng) return null;
        const [x, y] = projection([r.lng, r.lat]);
        return (
          <polygon
            key={i}
            points={`${x},${y - 5} ${x + 5},${y} ${x},${y + 5} ${x - 5},${y}`}
            fill="#FFD700"
            stroke="#FFA500"
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
