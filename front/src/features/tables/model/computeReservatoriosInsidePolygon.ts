/* eslint-disable @typescript-eslint/no-explicit-any -- pontos de polígono em vários formatos */
import * as turf from "@turf/turf";
import type { LatLonReservoirPoint, PolygonLike } from "./latLonTypes";

/**
 * Reservatórios cujo ponto está dentro do polígono (turf ou ray-casting de fallback).
 */
export function computeReservatoriosInsidePolygon(
  poly: PolygonLike,
  latLonPoints: LatLonReservoirPoint[],
): Array<{ id: unknown; nome: string; lat: number; lon: number; raw?: unknown }> {
  const pts = poly.points || [];
  if (!pts || pts.length < 3) return [];

  try {
    const ring = pts
      .map((p: any) => {
        const lon = Number(p.lon ?? p.longitude ?? p.lng ?? p[0] ?? NaN);
        const lat = Number(p.lat ?? p.latitude ?? p[1] ?? NaN);
        return [lon, lat];
      })
      .filter((c) => Number.isFinite(c[0]) && Number.isFinite(c[1]));
    if (ring.length < 3) return [];

    const polyFeature = turf.polygon([ring.concat([ring[0]])]);

    const found = (latLonPoints || [])
      .filter((r) => Number.isFinite(Number(r.longitude)) && Number.isFinite(Number(r.latitude)))
      .map((r) => ({
        id: r.id,
        nome: r.nome ?? "",
        lat: Number(r.latitude),
        lon: Number(r.longitude),
        raw: r.raw,
      }))
      .filter((r) =>
        turf.booleanPointInPolygon(turf.point([Number(r.lon), Number(r.lat)]), polyFeature),
      );

    return found;
  } catch (e) {
    console.warn("computeReservatoriosInsidePolygon fallback:", e);
    const ring = poly.points
      .map((p: any) => [Number(p.lon), Number(p.lat)])
      .filter((c: number[]) => Number.isFinite(c[0]) && Number.isFinite(c[1]));
    if (ring.length < 3) return [];

    return (latLonPoints || [])
      .filter((r) => Number.isFinite(Number(r.longitude)) && Number.isFinite(Number(r.latitude)))
      .map((r) => ({ id: r.id, nome: r.nome ?? "", lat: Number(r.latitude), lon: Number(r.longitude) }))
      .filter((r) => {
        const x = Number(r.lon),
          y = Number(r.lat);
        let insideFlag = false;
        for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
          const xi = ring[i][0],
            yi = ring[i][1];
          const xj = ring[j][0],
            yj = ring[j][1];
          const intersect = yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
          if (intersect) insideFlag = !insideFlag;
        }
        return insideFlag;
      });
  }
}
