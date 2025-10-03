// front/src/components/MapBrazil.tsx
import { Key, useMemo } from "react";
import brStates from "../../public/br_states.json";

type Point = {
  id: number | string;
  lat: number;
  lon: number;
  label?: string;
};

type Props = {
  points?: Point[]; // pontos de coleta
  height?: number; // altura do SVG em px
  stateFill?: string;
  stateStroke?: string;
  samplingFill?: string;
  samplingStroke?: string;
};

function coordsToPath(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  coords: any[][][] | any[][][][],
  project: (lon: number, lat: number) => [number, number],
) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const polygons = Array.isArray(coords[0][0][0]) ? (coords as any[][][][]) : (coords as any[][][]);
  let path = "";
  for (const poly of polygons) {
    const outer = poly[0];
    if (!outer || !outer.length) continue;
    path +=
      outer
        .map((pt: [number, number], i: number) => {
          const [x, y] = project(pt[0], pt[1]);
          return `${i === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`;
        })
        .join(" ") + " Z ";
  }
  return path.trim();
}

function regularPolygonPath(cx: number, cy: number, radius: number, sides = 6) {
  const pts: string[] = [];
  for (let i = 0; i < sides; i++) {
    const a = (i / sides) * Math.PI * 2 - Math.PI / 2;
    const x = cx + Math.cos(a) * radius;
    const y = cy + Math.sin(a) * radius;
    pts.push(`${i === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`);
  }
  pts.push("Z");
  return pts.join(" ");
}

export default function MapBrazil({
  points = [],
  height = 520,
  //stateFill = "#1e3a8a", // darker state fill to contrast on dark background
  stateStroke = "#14317a",
  samplingFill = "rgba(253, 224, 71, 0.9)", // bright sampling color
  samplingStroke = "rgba(250, 204, 21, 1)",
}: Props) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const geo = (brStates as any).features || [];

  const bounds = useMemo(() => {
    let minLon = Infinity,
      maxLon = -Infinity,
      minLat = Infinity,
      maxLat = -Infinity;
    for (const f of geo) {
      const geom = f.geometry;
      const coords = geom?.coordinates || [];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const stack: any[] = [coords];
      while (stack.length) {
        const cur = stack.pop();
        if (!cur) continue;
        if (typeof cur[0] === "number" && typeof cur[1] === "number") {
          const lon = cur[0];
          const lat = cur[1];
          if (lon < minLon) minLon = lon;
          if (lon > maxLon) maxLon = lon;
          if (lat < minLat) minLat = lat;
          if (lat > maxLat) maxLat = lat;
        } else {
          for (const c of cur) stack.push(c);
        }
      }
    }

    for (const p of points) {
      if (p.lon < minLon) minLon = p.lon;
      if (p.lon > maxLon) maxLon = p.lon;
      if (p.lat < minLat) minLat = p.lat;
      if (p.lat > maxLat) maxLat = p.lat;
    }

    const padLon = (maxLon - minLon) * 0.08 || 1;
    const padLat = (maxLat - minLat) * 0.08 || 1;

    return {
      minLon: minLon - padLon,
      maxLon: maxLon + padLon,
      minLat: minLat - padLat,
      maxLat: maxLat + padLat,
    };
  }, [geo, points]);

  const { viewBoxWidth, viewBoxHeight } = useMemo(() => {
    const lonSpan = bounds.maxLon - bounds.minLon || 1;
    const latSpan = bounds.maxLat - bounds.minLat || 1;
    const width = Math.max(360, Math.round((lonSpan / latSpan) * height));
    return { viewBoxWidth: width, viewBoxHeight: height };
  }, [bounds, height]);

  const project = (lon: number, lat: number): [number, number] => {
    const x = ((lon - bounds.minLon) / (bounds.maxLon - bounds.minLon || 1)) * viewBoxWidth;
    const y =
      viewBoxHeight -
      ((lat - bounds.minLat) / (bounds.maxLat - bounds.minLat || 1)) * viewBoxHeight;

    return [x, y];
  };

  const statePaths = useMemo(() => {
    return geo
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .map((f: any, idx: number) => {
        const geom = f.geometry;
        if (!geom) return null;
        const coords = geom.coordinates;
        if (!coords) return null;
        const path = coordsToPath(coords, project);
        return { id: f.id || idx, path };
      })
      .filter(Boolean) as { id: string | number; path: string }[];
  }, [geo, project]);

  const samplingPolygons = useMemo(() => {
    const r = Math.max(6, Math.round(Math.min(viewBoxWidth, viewBoxHeight) * 0.012));
    return points.map((p) => {
      const [cx, cy] = project(p.lon, p.lat);
      return { id: p.id, path: regularPolygonPath(cx, cy, r, 6) };
    });
  }, [points, project, viewBoxWidth, viewBoxHeight]);

  return (
    <div
      style={{
        width: "100%",
        height: `${height}px`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 18,
        borderRadius: 14,
        // darker surrounding background with subtle vignette
        background:
          "radial-gradient(1200px 600px at 20% 20%, rgba(8,30,63,0.18), rgba(2,6,23,0.32)), linear-gradient(180deg, rgba(2,6,23,0.24), rgba(2,6,23,0.34))",
        boxShadow: "0 18px 40px rgba(2,6,23,0.45), inset 0 2px 12px rgba(255,255,255,0.02)",
      }}
    >
      <svg
        viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
        width="100%"
        height={height}
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Mapa do Brasil (polígonos dos estados)"
      >
        <defs>
          <filter id="mapDrop" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow
              dx="0"
              dy="6"
              stdDeviation="18"
              floodColor="#001428"
              floodOpacity="0.55"
            />
          </filter>
          <linearGradient id="stateGrad" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#23408a" stopOpacity="1" />
            <stop offset="100%" stopColor="#0f2a66" stopOpacity="1" />
          </linearGradient>
        </defs>

        {/* subtle outer glow/background (no white rectangle) */}
        <g filter="url(#mapDrop)">
          {/* states fill */}
          <g stroke={stateStroke} strokeWidth={0.6} fill="url(#stateGrad)" opacity={0.98}>
            {statePaths.map((s: { id: Key | null | undefined; path: string | undefined }) => (
              <path key={s.id} d={s.path} />
            ))}
          </g>

          {/* state borders - slightly lighter */}
          <g stroke="rgba(255,255,255,0.04)" strokeWidth={0.6} fill="none">
            {statePaths.map((s: // eslint-disable-next-line @typescript-eslint/no-explicit-any
              { id: any; path: string | undefined }) => (
              <path key={`b-${s.id}`} d={s.path} />
            ))}
          </g>
        </g>

        {/* sampling polygons (hexagons) — bright on dark background */}
        <g>
          {samplingPolygons.map((poly: // eslint-disable-next-line @typescript-eslint/no-explicit-any
          { id: any; path: string | undefined }) => (
            <path
              key={`s-${poly.id}`}
              d={poly.path}
              fill={samplingFill}
              stroke={samplingStroke}
              strokeWidth={1.2}
              style={{ filter: "drop-shadow(0 6px 12px rgba(0,0,0,0.45))" }}
            />
          ))}
        </g>
      </svg>
    </div>
  );
}
