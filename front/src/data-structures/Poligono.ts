// Poligono.ts
import * as turf from "@turf/turf";

export type LatLon = { lat: number; lon: number };

/* 
  Poligono.ts
  Implementações relacionadas às tasks:
  - ED 089: métodos de cálculo e operações geométricas (ex.: contains, centroid, fallback de raycasting etc).
  - ED 091: métodos utilitários, criação e conversões (ex.: constructor, toTurfPolygon, toLatLonArray, getProjectedPoints).
*/
export default class Poligono {
  id: string;
  points: LatLon[]; // ordem: vértices em ordem
  createdAt: string;

  /* ED 091 — criação e conversões
     Implementação da criação/instanciação do Poligono.
     Aqui tratamos: entrada de dados (array de {lat,lon} ou array [lon,lat]), normalização
     e conversão interna para a representação usada pela classe.
     Tarefas: ED 091 (métodos utilitários, criação e conversões).
  */
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

  // Métodos auxiliares de manipulação — ED 091 (suporte à criação e edição do polígono)
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

  /* ED 091 — conversão para formato Turf (Turf.js)
     Método utilitário que converte o polígono interno para um objeto aceito
     pela biblioteca Turf — necessário para chamadas geométricas de alto nível.
     Tarefas: ED 091 (conversões utilitárias).
  */
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

  /* ED 089 — cálculo geométrico: ponto dentro do polígono
     Método responsável por verificar se um ponto (lat,lon) está dentro do polígono.
     Aqui implementamos o algoritmo principal (ray-casting / fallback),
     ou delegamos para a biblioteca Turf.
     Tarefas: ED 089 (métodos de cálculo geométrico).
  */
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

    // Fallback ray-cast manual — ainda ED 089 (cálculo geométrico)
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

  /* ED 091 — conversão para consumo em MapBrazil / UI 
     Retorna array plano em formato já normalizado (lat/lon).
     Tarefas: ED 091 (conversões utilitárias).
  */
  toLatLonArray() {
    return this.points.map((p) => ({ lat: Number(p.lat), lon: Number(p.lon) }));
  }

  /* ED 091 — conversão para coordenadas projetadas (d3)
     Usa projeção externa (proj) e retorna array de coordenadas [x,y].
     Tarefas: ED 091 (conversões utilitárias para visualização).
  */
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

  /* ED 089 — cálculo geométrico: centroide
     Retorna o centro geométrico do polígono (lon/lat).
     Primeiro usa Turf, e caso falhe aplica fallback manual (média das coordenadas).
     Tarefas: ED 089 (método de cálculo geométrico).
  */
  centroid() {
    if (!this.isValid()) return null;
    const poly = this.toTurfPolygon();
    if (poly) {
      const c = turf.centroid(poly);
      const coord = c?.geometry?.coordinates;
      if (coord && coord.length >= 2) return { lon: coord[0], lat: coord[1] };
    }
    // fallback average — ED 089 (cálculo geométrico manual)
    const n = this.points.length;
    const avg = this.points.reduce((acc, p) => ({ lat: acc.lat + p.lat, lon: acc.lon + p.lon }), {
      lat: 0,
      lon: 0,
    });
    return { lat: avg.lat / n, lon: avg.lon / n };
  }
}
