import { useEffect, useRef } from "react";
import * as d3 from "d3";

interface CountryFeature {
  id?: string;
  properties?: {
    name?: string;
    [key: string]: unknown;
  };
  geometry?: unknown;
}

export default function MapSvg({ countries, onClickCountry }) {
  const svgRef = useRef(null);

  useEffect(() => {
    if (!countries || countries.length === 0) return;

    const width = window.innerWidth;
    const height = window.innerHeight;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const g = svg.append("g");

    // Projeção do mundo
    const projection = d3
      .geoMercator()
      .scale(300)
      .center([0, 20])
      .translate([width / 2, height / 1.8]);

    const path = d3.geoPath().projection(projection);

    // Desenha os países
    g.selectAll("path")
      .data(countries)
      .enter()
      .append("path")
      .attr("d", path)
      .attr("fill", "#1E3A5F")
      .attr("stroke", "#89A1C9")
      .attr("stroke-width", 0.5)
      .on("mouseenter", function () {
        d3.select(this).attr("fill", "#FF4C4C");
      })
      .on("mouseleave", function () {
        d3.select(this).attr("fill", "#1E3A5F");
      })
      .on("click", (_event, d: CountryFeature) => {
        onClickCountry(d.id || d.properties?.name || "unknown");
      });

    // Calcula os limites do mapa
    const [[x0, y0], [x1, y1]] = path.bounds({ type: "FeatureCollection", features: countries });

    // Limites de pan
    const zoom = d3
      .zoom()
      .scaleExtent([1, 8]) // limite de zoom
      .translateExtent([
        [Math.min(0, width - (x1 - x0)), Math.min(0, height - (y1 - y0))],
        [Math.max(width, x1 - x0), Math.max(height, y1 - y0)],
      ])
      .on("zoom", (event) => {
        g.attr("transform", event.transform);
      });

    svg.call(zoom);
  }, [countries, onClickCountry]);

  return (
    <svg
      ref={svgRef}
      style={{
        width: "100%",
        height: "100vh",
        backgroundColor: "#0a0f14",
        display: "block",
        overflow: "hidden",
        cursor: "grab",
      }}
    />
  );
}
