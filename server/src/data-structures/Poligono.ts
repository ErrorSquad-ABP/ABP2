// Poligono.ts (ou dentro do topo do TablesPage.tsx)
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as turf from "@turf/turf";

export type LatLon = { lat: number; lon: number };

export default class Poligono {
  id: string;
  points: LatLon[]; // ordem: vértices em ordem
  createdAt: string;

  constructor(points?: LatLon[], id?: string) {
    this.id =
      id ??
      (typeof crypto !== "undefined" && (crypto as any).randomUUID
        ? (crypto as any).randomUUID()
        : String(Date.now()));
    this.points = Array.isArray(points)
      ? points.map((p) => ({ lat: Number(p.lat), lon: Number(p.lon) }))
      : [];
    this.createdAt = new Date().toISOString();
  }

  addPoint(p: LatLon) {
    this.points.push({ lat: Number(p.lat), lon: Number(p.lon) });
  }

  removePointAt(index: number) {
    if (index >= 0 && index < this.points.length) this.points.splice(index, 1);
  }

  clear() {
    this.points = [];
  }

  isValid(): boolean {
    return Array.isArray(this.points) && this.points.length >= 3;
  }

  // Return a turf polygon feature (closed ring)
  toTurfPolygon() {
    if (!this.isValid()) return null;
    const ring = this.points.map((p) => [Number(p.lon), Number(p.lat)]);
    // ensure closed ring
    if (
      ring.length &&
      (ring[0][0] !== ring[ring.length - 1][0] || ring[0][1] !== ring[ring.length - 1][1])
    ) {
      ring.push([ring[0][0], ring[0][1]]);
    }
    try {
      return turf.polygon([ring]);
    } catch (e) {
      return null;
    }
  }

  // test a lon/lat point is inside (uses turf if available)
  containsLonLat(lon: number, lat: number) {
    if (!this.isValid()) return false;
    const poly = this.toTurfPolygon();
    if (poly) {
      try {
        return turf.booleanPointInPolygon(turf.point([lon, lat]), poly);
      } catch (e) {
        // fallbacks to ray-cast
      }
    }
    // fallback ray-cast (lon,lat), using polygon ring in lon/lat order
    const ring = this.points.map((p) => [Number(p.lon), Number(p.lat)]);
    let inside = false;
    for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
      const xi = ring[i][0],
        yi = ring[i][1];
      const xj = ring[j][0],
        yj = ring[j][1];
      const intersect = yi > lat !== yj > lat && lon < ((xj - xi) * (lat - yi)) / (yj - yi) + xi;
      if (intersect) inside = !inside;
    }
    return inside;
  }

  // convert to plain points for MapBrazil
  toLatLonArray() {
    return this.points.map((p) => ({ lat: Number(p.lat), lon: Number(p.lon) }));
  }

  // project to screen coordinates using a d3 projection -> returns array of [x,y]
  getProjectedPoints(proj: any) {
    if (!proj || !this.points || !this.points.length) return [];
    return this.points
      .map((p) => {
        const xy = proj([Number(p.lon), Number(p.lat)]);
        if (!xy || !Array.isArray(xy)) return null;
        return [xy[0], xy[1]];
      })
      .filter(Boolean) as [number, number][];
  }

  // returns centroid lon/lat (approx)
  centroid() {
    if (!this.isValid()) return null;
    const poly = this.toTurfPolygon();
    if (poly) {
      const c = turf.centroid(poly);
      const coord = c?.geometry?.coordinates;
      if (coord && coord.length >= 2) return { lon: coord[0], lat: coord[1] };
    }
    // fallback average
    const n = this.points.length;
    const avg = this.points.reduce((acc, p) => ({ lat: acc.lat + p.lat, lon: acc.lon + p.lon }), {
      lat: 0,
      lon: 0,
    });
    return { lat: avg.lat / n, lon: avg.lon / n };
  }
}
