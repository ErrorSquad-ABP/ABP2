import { useEffect, useRef } from "react";
import * as d3 from "d3";

/**
 * MapSvg
 *
 * Props:
 * - countries: GeoJSON features array
 * - onClickCountry: (idOrName) => void
 * - points: Array<{ id, lat, lon, label }>
 * - selectedPoints: Array<{ id, lat, lon, label }>
 * - polygons: Array<Array<{ lat, lon }>>  // anéis (cada anel é array de points)
 * - height: number (px) optional
 * - showPoints: boolean
 * - showPolygons: boolean
 * - showStateNames: boolean
 * - onClickPoint: (point) => void
 */
export default function MapSvg({
  countries = [],
  onClickCountry,
  points = [],
  selectedPoints = [],
  polygons = [],
  height,
  showPoints = true,
  showPolygons = true,
  showStateNames = false,
  onClickPoint,
}) {
  const svgRef = useRef(null);

  useEffect(() => {
    if (!countries || countries.length === 0) {
      // still render points/polygons even if countries empty — but prefer country base
    }

    // compute dims
    const width = Math.max(800, window.innerWidth);
    const h = height ?? window.innerHeight;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    // layers: map -> polygons -> points -> labels
    const g = svg.append("g").attr("class", "map-group");

    // projection and path
    const projection = d3
      .geoMercator()
      .scale(300)
      .center([0, 20])
      .translate([width / 2, h / 1.8]);

    const path = d3.geoPath().projection(projection);

    // countries layer
    const countriesG = g.append("g").attr("class", "countries-layer");
    if (countries && countries.length) {
      countriesG
        .selectAll("path.country")
        .data(countries)
        .enter()
        .append("path")
        .attr("class", "country")
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
        .on("click", (_event, d) => {
          if (typeof onClickCountry === "function") {
            onClickCountry(d.id || (d.properties && d.properties.name) || "unknown");
          }
        });
    }

    // polygons layer (draw after countries so they appear on top)
    const polygonsG = g.append("g").attr("class", "polygons-layer");
    if (showPolygons && Array.isArray(polygons) && polygons.length) {
      // each polygon: array of {lat, lon}
      polygonsG
        .selectAll("path.poly")
        .data(polygons)
        .enter()
        .append("path")
        .attr("class", "poly")
        .attr("d", (polyPts) => {
          // build GeoJSON polygon from lat/lon points (d3 expects [lon, lat])
          const coords = polyPts.map((p) => [Number(p.lon), Number(p.lat)]);
          // close ring if necessary
          if (
            coords.length &&
            (coords[0][0] !== coords[coords.length - 1][0] ||
              coords[0][1] !== coords[coords.length - 1][1])
          ) {
            coords.push(coords[0]);
          }
          try {
            return path({ type: "Polygon", coordinates: [coords] });
          } catch (e) {
            // fallback: build simple line
            const line = d3
              .line()
              .x((d) => d[0])
              .y((d) => d[1]);
            const pts = coords.map((c) => projection(c));
            return line(pts) + "Z";
          }
        })
        .attr("fill", "rgba(11,95,255,0.12)")
        .attr("stroke", "#0b5fff")
        .attr("stroke-width", 2)
        .attr("pointer-events", "none"); // polygons are visual only (no pointer)
    }

    // points layer
    const pointsG = g.append("g").attr("class", "points-layer");
    if (showPoints && Array.isArray(points) && points.length) {
      // normalize points with valid coords and projection
      const normalized = points
        .map((p) => {
          if (p == null) return null;
          const lon = Number(p.lon ?? p.longitude ?? p.lng ?? p.long);
          const lat = Number(p.lat ?? p.latitude);
          if (Number.isFinite(lon) && Number.isFinite(lat)) {
            const projected = projection([lon, lat]);
            if (!projected) return null;
            return {
              ...p,
              lon,
              lat,
              screenX: projected[0],
              screenY: projected[1],
            };
          }
          return null;
        })
        .filter(Boolean);

      // draw all points
      pointsG
        .selectAll("circle.point")
        .data(normalized, (d) => d.id ?? `${d.lon}_${d.lat}`)
        .enter()
        .append("circle")
        .attr("class", "point")
        .attr("cx", (d) => d.screenX)
        .attr("cy", (d) => d.screenY)
        .attr("r", 4)
        .attr("fill", "#fff")
        .attr("stroke", "#0b5fff")
        .attr("stroke-width", 1.5)
        .attr("opacity", 0.95)
        .on("mouseenter", function (_event, d) {
          d3.select(this).attr("r", 6).attr("fill", "#0b5fff").attr("stroke", "#fff");
        })
        .on("mouseleave", function (_event, d) {
          d3.select(this).attr("r", 4).attr("fill", "#fff").attr("stroke", "#0b5fff");
        })
        .on("click", function (_event, d) {
          d3.event && d3.event.stopPropagation && d3.event.stopPropagation();
          if (typeof onClickPoint === "function") onClickPoint(d);
        });
    }

    // selectedPoints layer: draw on top with different style
    const selG = g.append("g").attr("class", "selected-points-layer");
    if (showPoints && Array.isArray(selectedPoints) && selectedPoints.length) {
      const normalizedSel = selectedPoints
        .map((p) => {
          if (!p) return null;
          const lon = Number(p.lon ?? p.longitude ?? p.lng ?? p.long);
          const lat = Number(p.lat ?? p.latitude);
          if (Number.isFinite(lon) && Number.isFinite(lat)) {
            const projected = projection([lon, lat]);
            if (!projected) return null;
            return {
              ...p,
              lon,
              lat,
              screenX: projected[0],
              screenY: projected[1],
            };
          }
          return null;
        })
        .filter(Boolean);

      selG
        .selectAll("g.selected-point")
        .data(normalizedSel, (d) => d.id ?? `${d.lon}_${d.lat}`)
        .enter()
        .append("g")
        .attr("class", "selected-point")
        .attr("transform", (d) => `translate(${d.screenX},${d.screenY})`)
        .each(function (d) {
          const container = d3.select(this);
          // highlight circle
          container
            .append("circle")
            .attr("r", 8)
            .attr("cx", 0)
            .attr("cy", 0)
            .attr("fill", "#0b5fff")
            .attr("opacity", 0.18)
            .attr("stroke", "none");
          // inner dot
          container
            .append("circle")
            .attr("r", 4)
            .attr("cx", 0)
            .attr("cy", 0)
            .attr("fill", "#0b5fff")
            .attr("stroke", "#fff")
            .attr("stroke-width", 1.2);

          // optional label (small)
          if (d.label) {
            container
              .append("text")
              .text(d.label)
              .attr("x", 10)
              .attr("y", -10)
              .attr("font-size", 11)
              .attr("fill", "#fff")
              .attr("stroke", "rgba(0,0,0,0.25)")
              .attr("paint-order", "stroke")
              .style("pointer-events", "none");
          }

          container.on("click", () => {
            if (typeof onClickPoint === "function") onClickPoint(d);
          });
        });
    }

    // optional: draw state names (country names) - simple labels at centroid
    if (showStateNames && countries && countries.length) {
      const labelsG = g.append("g").attr("class", "labels-layer");
      labelsG
        .selectAll("text.country-label")
        .data(countries)
        .enter()
        .append("text")
        .attr("class", "country-label")
        .attr("transform", function (d) {
          try {
            const centroid = path.centroid(d);
            return `translate(${centroid[0]},${centroid[1]})`;
          } catch (e) {
            return `translate(-9999,-9999)`;
          }
        })
        .text((d) => (d.properties && d.properties.name ? d.properties.name : ""))
        .attr("font-size", 10)
        .attr("fill", "#e6f0ff")
        .style("pointer-events", "none");
    }

    // zoom behavior (applies transform to the main group)
    const [[x0, y0], [x1, y1]] =
      countries && countries.length
        ? path.bounds({ type: "FeatureCollection", features: countries })
        : [
            [0, 0],
            [width, h],
          ];

    const zoom = d3
      .zoom()
      .scaleExtent([1, 8])
      .translateExtent([
        [Math.min(0, width - (x1 - x0)), Math.min(0, h - (y1 - y0))],
        [Math.max(width, x1 - x0), Math.max(h, y1 - y0)],
      ])
      .on("zoom", (event) => {
        g.attr("transform", event.transform);
      });

    svg.call(zoom);

    // ensure svg sizing
    svg.attr("width", "100%").attr("height", height ? `${height}px` : "100vh");

    // cleanup on unmount/re-render
    return () => {
      svg.selectAll("*").remove();
    };
  }, [
    countries,
    onClickCountry,
    points,
    selectedPoints,
    polygons,
    height,
    showPoints,
    showPolygons,
    showStateNames,
    onClickPoint,
  ]);

  return (
    <svg
      ref={svgRef}
      style={{
        width: "100%",
        height: height ? `${height}px` : "100vh",
        backgroundColor: "#0a0f14",
        display: "block",
        overflow: "hidden",
        cursor: "grab",
      }}
    />
  );
}
