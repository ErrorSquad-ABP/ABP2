import * as d3 from "d3";
import {
  MAP_PROJECTION_CENTER,
  MAP_PROJECTION_SCALE,
  MAP_VERTICAL_TRANSLATE_DIVISOR,
} from "@/shared/lib/mapProjection";

/** Projeção alinhada ao MapSvg / MapBrazil desta página (mercator). */
export function createProjection(widthPx: number, heightPx: number) {
  return d3
    .geoMercator()
    .scale(MAP_PROJECTION_SCALE)
    .center(MAP_PROJECTION_CENTER)
    .translate([widthPx / 2, heightPx / MAP_VERTICAL_TRANSLATE_DIVISOR]);
}

/** Interpreta `translate` / `scale` / `matrix` de um SVG transform. */
export function parseTransformString(transformStr: string | null): {
  x: number;
  y: number;
  k: number;
} {
  let x = 0,
    y = 0,
    k = 1;
  if (!transformStr) return { x, y, k };
  const tMatch = transformStr.match(/translate\(\s*([-\d.e]+)[ ,\s]*([-\d.e]+)\s*\)/i);
  if (tMatch) {
    x = Number(tMatch[1]) || 0;
    y = Number(tMatch[2]) || 0;
  }
  const sMatch = transformStr.match(/scale\(\s*([-\d.e]+)\s*\)/i);
  if (sMatch) {
    k = Number(sMatch[1]) || 1;
  } else {
    const mMatch = transformStr.match(
      /matrix\(\s*([-\d.e]+)\s*,\s*([-\d.e]+)\s*,\s*([-\d.e]+)\s*,\s*([-\d.e]+)\s*,\s*([-\d.e]+)\s*,\s*([-\d.e]+)\s*\)/i,
    );
    if (mMatch) {
      const a = Number(mMatch[1]),
        d = Number(mMatch[4]),
        e = Number(mMatch[5]),
        f = Number(mMatch[6]);
      if (Number.isFinite(a) && Number.isFinite(d)) {
        k = (Math.abs(a) + Math.abs(d)) / 2 || k;
      }
      x = Number(e) || x;
      y = Number(f) || y;
    }
  }
  return { x, y, k };
}
