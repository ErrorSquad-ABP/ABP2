import * as turf from "@turf/turf";

export interface Coordenada {
  x: number;
  y: number;
}

export class Poligono {
  private _vertices: Coordenada[];
  private _area: number;
  private _perimetro: number;

  constructor(vertices: Coordenada[]) {
    if (!this.validarVertices(vertices)) {
      throw new Error(
        "Polígono inválido: deve ter pelo menos 3 vértices e não pode ser auto-intersectante",
      );
    }

    this._vertices = [...vertices];
    this._perimetro = this.calcularPerimetro();
    this._area = this.calcularArea();
  }

  // Validação do polígono
  private validarVertices(vertices: Coordenada[]): boolean {
    // Mínimo de 3 vértices
    if (vertices.length < 3) {
      return false;
    }

    // Verifica se há vértices duplicados consecutivos
    for (let i = 0; i < vertices.length; i++) {
      const current = vertices[i];
      const next = vertices[(i + 1) % vertices.length];

      if (current.x === next.x && current.y === next.y) {
        return false;
      }
    }

    // Verifica auto-interseção
    return !this.verificarAutoIntersecao(vertices);
  }

  // Algoritmo para verificar auto-interseção
  private verificarAutoIntersecao(vertices: Coordenada[]): boolean {
    const n = vertices.length;

    for (let i = 0; i < n; i++) {
      const a1 = vertices[i];
      const a2 = vertices[(i + 1) % n];

      for (let j = i + 2; j < n; j++) {
        // Evita verificar arestas consecutivas
        if (j === (i + 1) % n || i === (j + 1) % n) {
          continue;
        }

        const b1 = vertices[j];
        const b2 = vertices[(j + 1) % n];

        if (this.segmentosSeIntersectam(a1, a2, b1, b2)) {
          return true;
        }
      }
    }

    return false;
  }

  // Verifica se dois segmentos de reta se intersectam
  private segmentosSeIntersectam(
    a: Coordenada,
    b: Coordenada,
    c: Coordenada,
    d: Coordenada,
  ): boolean {
    const orientacao = (p: Coordenada, q: Coordenada, r: Coordenada): number => {
      const val = (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);
      if (val === 0) return 0; // Colineares
      return val > 0 ? 1 : 2; // Horário ou anti-horário
    };

    const o1 = orientacao(a, b, c);
    const o2 = orientacao(a, b, d);
    const o3 = orientacao(c, d, a);
    const o4 = orientacao(c, d, b);

    // Caso geral
    if (o1 !== o2 && o3 !== o4) return true;

    // Casos especiais (colineares)
    if (o1 === 0 && this.estaNoSegmento(a, c, b)) return true;
    if (o2 === 0 && this.estaNoSegmento(a, d, b)) return true;
    if (o3 === 0 && this.estaNoSegmento(c, a, d)) return true;
    if (o4 === 0 && this.estaNoSegmento(c, b, d)) return true;

    return false;
  }

  // Verifica se o ponto q está no segmento pr
  private estaNoSegmento(p: Coordenada, q: Coordenada, r: Coordenada): boolean {
    return (
      q.x <= Math.max(p.x, r.x) &&
      q.x >= Math.min(p.x, r.x) &&
      q.y <= Math.max(p.y, r.y) &&
      q.y >= Math.min(p.y, r.y)
    );
  }

  // Cálculo do perímetro usando distância euclidiana
  private calcularPerimetro(): number {
    let perimetro = 0;
    const n = this._vertices.length;

    for (let i = 0; i < n; i++) {
      const current = this._vertices[i];
      const next = this._vertices[(i + 1) % n];

      const dx = next.x - current.x;
      const dy = next.y - current.y;
      perimetro += Math.sqrt(dx * dx + dy * dy);
    }

    return perimetro;
  }

  // Cálculo da área usando fórmula do shoelace
  private calcularArea(): number {
    let area = 0;
    const n = this._vertices.length;

    for (let i = 0; i < n; i++) {
      const current = this._vertices[i];
      const next = this._vertices[(i + 1) % n];

      area += current.x * next.y - next.x * current.y;
    }

    return Math.abs(area) / 2;
  }

  // Getters
  get vertices(): Coordenada[] {
    return [...this._vertices]; // Retorna cópia para evitar mutação
  }

  get area(): number {
    return this._area;
  }

  get perimetro(): number {
    return this._perimetro;
  }

  // Métodos utilitários
  public toString(): string {
    return `Polígono com ${this._vertices.length} vértices, Área: ${this._area.toFixed(2)}, Perímetro: ${this._perimetro.toFixed(2)}`;
  }

  public toJSON(): object {
    return {
      vertices: this._vertices,
      area: this._area,
      perimetro: this._perimetro,
    };
  }

  // Método para verificar se um ponto está dentro do polígono (algoritmo ray casting)
  public contemPonto(ponto: Coordenada): boolean {
    let dentro = false;
    const n = this._vertices.length;

    for (let i = 0, j = n - 1; i < n; j = i++) {
      const vi = this._vertices[i];
      const vj = this._vertices[j];

      if (
        vi.y > ponto.y !== vj.y > ponto.y &&
        ponto.x < ((vj.x - vi.x) * (ponto.y - vi.y)) / (vj.y - vi.y) + vi.x
      ) {
        dentro = !dentro;
      }
    }

    return dentro;
  }

  // Método estático para criar polígono a partir de JSON
  public static fromJSON(data: any): Poligono {
    if (!data.vertices || !Array.isArray(data.vertices)) {
      throw new Error("Dados inválidos para criar polígono");
    }

    return new Poligono(data.vertices);
  }

  // ------------------- Novos métodos solicitados -------------------

  private toTurfPolygon(): any {
    if (!this._vertices || this._vertices.length < 3) return null;
    const ring: [number, number][] = this._vertices.map((v) => [v.x, v.y]);
    const first = ring[0];
    const last = ring[ring.length - 1];
    if (first[0] !== last[0] || first[1] !== last[1]) ring.push([first[0], first[1]]);
    return turf.polygon([ring]);
  }

  private static fromTurfFeatureToVertices(feature: any): Coordenada[] | null {
    if (!feature || !feature.geometry) return null;
    const geom = feature.geometry;
    if (geom.type === "Polygon") {
      const coords: number[][] = geom.coordinates[0];
      const last = coords[coords.length - 1];
      const first = coords[0];
      const trimmed = coords.slice(
        0,
        coords.length - (last[0] === first[0] && last[1] === first[1] ? 1 : 0),
      );
      return trimmed.map((c) => ({ x: c[0], y: c[1] }));
    } else if (geom.type === "MultiPolygon") {
      if (!Array.isArray(geom.coordinates) || geom.coordinates.length === 0) return null;
      const coords: number[][] = geom.coordinates[0][0];
      const last = coords[coords.length - 1];
      const first = coords[0];
      const trimmed = coords.slice(
        0,
        coords.length - (last[0] === first[0] && last[1] === first[1] ? 1 : 0),
      );
      return trimmed.map((c) => ({ x: c[0], y: c[1] }));
    }
    return null;
  }

  public calcularIntersecao(outro: Poligono): Poligono | null {
    try {
      const a = this.toTurfPolygon();
      const b = outro.toTurfPolygon();
      if (!a || !b) return null;

      const inter = turf.intersect(a, b);
      if (!inter) return null;

      const verts = Poligono.fromTurfFeatureToVertices(inter);
      if (!verts || verts.length < 3) return null;

      try {
        return new Poligono(verts);
      } catch {
        return null;
      }
    } catch (err) {
      console.error("calcularIntersecao error:", err);
      return null;
    }
  }

  public calcularAreaSobreposta(outro: Poligono): number {
    try {
      const a = this.toTurfPolygon();
      const b = outro.toTurfPolygon();
      if (!a || !b) return 0;

      const inter = turf.intersect(a, b);
      if (!inter) return 0;

      const area = turf.area(inter);
      return typeof area === "number" ? area : 0;
    } catch (err) {
      console.error("calcularAreaSobreposta error:", err);
      return 0;
    }
  }

  public verificarIntersecao(outro: Poligono): boolean {
    try {
      const a = this.toTurfPolygon();
      const b = outro.toTurfPolygon();
      if (!a || !b) return false;

      const inter = turf.intersect(a, b);
      if (!inter) return false;

      const area = turf.area(inter);
      return typeof area === "number" && area > 0;
    } catch (err) {
      console.error("verificarIntersecao error:", err);
      return false;
    }
  }
}
