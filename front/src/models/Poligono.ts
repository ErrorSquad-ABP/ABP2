// front/src/models/Poligono.ts

export type Vertice = { x: number; y: number };

export class Poligono {
  vertices: Vertice[];

  constructor(vertices: Vertice[]) {
    if (vertices.length < 3) {
      throw new Error("Um polígono precisa ter pelo menos 3 vértices.");
    }
    this.vertices = vertices;
  }

  calcularArea(): number {
    // Fórmula do polígono (Shoelace formula)
    let area = 0;
    const n = this.vertices.length;

    for (let i = 0; i < n; i++) {
      const { x: x1, y: y1 } = this.vertices[i];
      const { x: x2, y: y2 } = this.vertices[(i + 1) % n];
      area += x1 * y2 - x2 * y1;
    }

    return Math.abs(area) / 2;
  }

  calcularPerimetro(): number {
    let perimetro = 0;
    const n = this.vertices.length;

    for (let i = 0; i < n; i++) {
      const { x: x1, y: y1 } = this.vertices[i];
      const { x: x2, y: y2 } = this.vertices[(i + 1) % n];
      perimetro += Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    }

    return perimetro;
  }

  calcularCentroide(): Vertice {
    const n = this.vertices.length;
    let cx = 0, cy = 0;

    for (const { x, y } of this.vertices) {
      cx += x;
      cy += y;
    }

    return { x: cx / n, y: cy / n };
  }

  union(other: Poligono): Poligono {
    // ⚠️ Implementação simplificada:
    // Apenas gera o "bounding box" da união dos vértices
    // (não cobre casos complexos de interseção real de polígonos)

    const allVertices = [...this.vertices, ...other.vertices];

    const minX = Math.min(...allVertices.map(v => v.x));
    const maxX = Math.max(...allVertices.map(v => v.x));
    const minY = Math.min(...allVertices.map(v => v.y));
    const maxY = Math.max(...allVertices.map(v => v.y));

    const bboxVertices: Vertice[] = [
      { x: minX, y: minY },
      { x: minX, y: maxY },
      { x: maxX, y: maxY },
      { x: maxX, y: minY },
    ];

    return new Poligono(bboxVertices);
  }
}
