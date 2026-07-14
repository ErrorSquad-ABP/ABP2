/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */
// MapSvg.tsx
import { useEffect, useRef } from "react";
import * as d3 from "d3";
import {
  MAP_MIN_WIDTH_PX,
  MAP_PROJECTION_CENTER,
  MAP_PROJECTION_SCALE,
  MAP_VERTICAL_TRANSLATE_DIVISOR,
} from "@/shared/lib/mapProjection";

/**
 * MapSvg
 *
 * Props:
 * - countries: GeoJSON features array
 * - onClickCountry: (idOrName) => void
 * - points: Array<{ id, lat, lon, label, color }>
 * - selectedPoints: Array<{ id, lat, lon, label, color }>
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
}: any) {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    // compute dims
    const width = Math.max(MAP_MIN_WIDTH_PX, window.innerWidth);
    const h = height ?? window.innerHeight;

    const svg = d3.select(svgRef.current);

    // --- Preserve current zoom transform (if present) so we don't "jump" when re-rendering ---
    // We capture the transform BEFORE removing children. If unavailable, keep null (identity).
    let previousTransform: { x: number; y: number; k: number } | null = null;
    try {
      const node = svgRef.current as any;
      if (node) {
        const t = d3.zoomTransform(node);
        if (t && typeof t.k === "number") previousTransform = { x: t.x, y: t.y, k: t.k };
      }
    } catch (err) {
      // ignore if not available
      previousTransform = null;
    }

    // clear and recreate drawing
    svg.selectAll("*").remove();

    // group wrapper
    const g = svg.append("g").attr("class", "map-group");

    // projection and path
    // NOTE: keep projection parameters consistent with the rest of app (MapBrazil)
    const projection = d3
      .geoMercator()
      // These params were used originally; keep them to ensure coordinates/projection match.
      .scale(MAP_PROJECTION_SCALE)
      .center(MAP_PROJECTION_CENTER)
      .translate([width / 2, h / MAP_VERTICAL_TRANSLATE_DIVISOR]);

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
        .on("click", (_event, d: any) => {
          if (typeof onClickCountry === "function") {
            onClickCountry(
              d.id ?? (d.properties && (d.properties.name || d.properties.admin)) ?? "unknown",
            );
          }
        });
    }

    // polygons layer (draw after countries so they appear on top)
    const polygonsG = g.append("g").attr("class", "polygons-layer");
    if (showPolygons && Array.isArray(polygons) && polygons.length) {
      const safeProjectedPolys = polygons
        .map((polyPts: any) => {
          const projPts = (polyPts || [])
            .map((p: any) => {
              const lon = Number(p.lon ?? p.longitude ?? p.lng ?? p.long);
              const lat = Number(p.lat ?? p.latitude);
              if (!Number.isFinite(lon) || !Number.isFinite(lat)) return null;
              const projected = projection([lon, lat]);
              if (!projected || !Number.isFinite(projected[0]) || !Number.isFinite(projected[1]))
                return null;
              return projected; // [x, y]
            })
            .filter(Boolean);
          if (!projPts || projPts.length < 3) return null;
          return projPts;
        })
        .filter(Boolean);

      const line = d3
        .line()
        .x((d: any) => d[0])
        .y((d: any) => d[1])
        .curve(d3.curveLinear);

      polygonsG
        .selectAll("path.poly")
        .data(safeProjectedPolys)
        .enter()
        .append("path")
        .attr("class", "poly")
        .attr("d", (pts: any) => {
          try {
            const pathStr = line(pts as any);
            return pathStr ? pathStr + "Z" : "";
          } catch (e) {
            return "";
          }
        })
        .attr("fill", "rgba(255,212,64,0.35)")
        .attr("stroke", "#FFD400")
        .attr("stroke-width", 2)
        .attr("stroke-linejoin", "round")
        .attr("fill-rule", "nonzero")
        .attr("pointer-events", "none");
    }

    // determine which set of points to render:
    const pointsToRender =
      Array.isArray(selectedPoints) && selectedPoints.length ? selectedPoints : points;

    // points layer (single small dots)
    const pointsG = g.append("g").attr("class", "points-layer");
    if (showPoints && Array.isArray(pointsToRender) && pointsToRender.length) {
      const normalized = pointsToRender
        .map((p: any) => {
          if (!p) return null;
          const lon = Number(p.lon ?? p.longitude ?? p.lng ?? p.long);
          const lat = Number(p.lat ?? p.latitude);
          if (!Number.isFinite(lon) || !Number.isFinite(lat)) return null;
          const projected = projection([lon, lat]);
          if (!projected || !Number.isFinite(projected[0]) || !Number.isFinite(projected[1]))
            return null;
          const color = p.color ?? p.fill ?? null;
          return {
            ...p,
            lon,
            lat,
            screenX: projected[0],
            screenY: projected[1],
            color,
          };
        })
        .filter(Boolean);

      pointsG
        .selectAll("circle.point")
        .data(normalized, (d: any) => d.id ?? `${d.lon}_${d.lat}`)
        .enter()
        .append("circle")
        .attr("class", "point")
        .attr("cx", (d: any) => d.screenX)
        .attr("cy", (d: any) => d.screenY)
        .attr("r", 5)
        .attr("fill", (d: any) => d.color ?? "#ffffff")
        .attr("stroke", (d: any) => {
          return d.color ?? "#0b5fff";
        })
        .attr("stroke-width", 1.5)
        .attr("opacity", 0.95)
        .on("mouseenter", function (_event) {
          d3.select(this).attr("r", 7);
        })
        .on("mouseleave", function (_event) {
          d3.select(this).attr("r", 5);
        })
        .on("click", function (_event, d: any) {
          _event.stopPropagation && _event.stopPropagation();
          if (typeof onClickPoint === "function") onClickPoint(d);
        });
    }

    // selectedPoints layer: draw a highlighted ring + inner dot (on top)
    const selG = g.append("g").attr("class", "selected-points-layer");
    if (showPoints && Array.isArray(selectedPoints) && selectedPoints.length) {
      const normalizedSel = selectedPoints
        .map((p: any) => {
          if (!p) return null;
          const lon = Number(p.lon ?? p.longitude ?? p.lng ?? p.long);
          const lat = Number(p.lat ?? p.latitude);
          if (!Number.isFinite(lon) || !Number.isFinite(lat)) return null;
          const projected = projection([lon, lat]);
          if (!projected || !Number.isFinite(projected[0]) || !Number.isFinite(projected[1]))
            return null;
          const color = p.color ?? p.fill ?? "#0b5fff";
          return {
            ...p,
            lon,
            lat,
            screenX: projected[0],
            screenY: projected[1],
            color,
          };
        })
        .filter(Boolean);

      selG
        .selectAll("g.selected-point")
        .data(normalizedSel, (d: any) => d.id ?? `${d.lon}_${d.lat}`)
        .enter()
        .append("g")
        .attr("class", "selected-point")
        .attr("transform", (d: any) => `translate(${d.screenX},${d.screenY})`)
        .each(function (d: any) {
          const container = d3.select(this);
          container
            .append("circle")
            .attr("r", 10)
            .attr("cx", 0)
            .attr("cy", 0)
            .attr("fill", d.color ?? "#0b5fff")
            .attr("opacity", 0.18)
            .attr("stroke", "none");

          container
            .append("circle")
            .attr("r", 5)
            .attr("cx", 0)
            .attr("cy", 0)
            .attr("fill", d.color ?? "#0b5fff")
            .attr("stroke", "#ffffff")
            .attr("stroke-width", 1.2);

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
        .attr("transform", function (d: any) {
          try {
            const centroid = path.centroid(d);
            if (!centroid || !Number.isFinite(centroid[0]) || !Number.isFinite(centroid[1])) {
              return `translate(-9999,-9999)`;
            }
            return `translate(${centroid[0]},${centroid[1]})`;
          } catch (e) {
            return `translate(-9999,-9999)`;
          }
        })
        .text((d: any) => (d.properties && d.properties.name ? d.properties.name : ""))
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
      .on("zoom", (event: any) => {
        g.attr("transform", event.transform);
      });

    // attach zoom to svg
    svg.call(zoom as any);

    // Reapply previous transform if we captured one earlier.
    // We re-create a d3 transform from previousTransform (x,y,k).
    try {
      if (previousTransform && typeof previousTransform.k === "number") {
        // Use d3.zoomIdentity to build transform and apply it via zoom.transform (updates internal state)
        const t = d3.zoomIdentity
          .translate(previousTransform.x, previousTransform.y)
          .scale(previousTransform.k);
        svg.call((zoom as any).transform, t);
      }
    } catch (err) {
      // if reapplying fails, ignore and continue with default view
      // console.warn("Could not reapply previous zoom transform", err);
    }

    // ensure svg sizing: width as percent, height either px or vh
    svg.attr("width", "100%").attr("height", height ? `${height}px` : "100vh");

    // cleanup on unmount/re-render
    return () => {
      svg.selectAll("*").remove();
    };
    // dependencies: if these change we re-run, but note we capture and reapply transform to avoid jumps
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
