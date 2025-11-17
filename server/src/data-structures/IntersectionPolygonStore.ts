// server/src/data-structures/IntersectionPolygonStore.ts

export interface PolygonMetadata {
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  description?: string;
  color?: string;
}

export interface Polygon {
  id: string;
  name: string;
  coordinates: number[][]; // [longitude, latitude][]
  type: "rectangle" | "polygon" | "circle";
  metadata: PolygonMetadata;
}

export interface PolygonInput {
  name: string;
  coordinates: number[][];
  type: "rectangle" | "polygon" | "circle";
  metadata?: Partial<PolygonMetadata>;
}

export class IntersectionPolygonStore {
  private polygons: Map<string, Polygon>;
  private idCounter: number;

  constructor() {
    this.polygons = new Map();
    this.idCounter = 1;
  }

  /**
   * Adiciona um novo polígono ao store
   */
  adicionarPoligono(poligono: PolygonInput): Polygon {
    // Validação básica do polígono
    this.validarPoligono(poligono);

    const id = this.gerarId();
    const now = new Date();

    const polygonWithId: Polygon = {
      ...poligono,
      id,
      metadata: {
        createdBy: poligono.metadata?.createdBy || "system",
        createdAt: poligono.metadata?.createdAt || now,
        updatedAt: now,
        description: poligono.metadata?.description,
        color: poligono.metadata?.color || "#007bff",
      },
    };

    this.polygons.set(id, polygonWithId);
    return polygonWithId;
  }

  /**
   * Busca um polígono pelo ID
   */
  buscarPorId(id: string): Polygon | undefined {
    return this.polygons.get(id);
  }

  /**
   * Retorna todos os polígonos armazenados
   */
  buscarTodos(): Polygon[] {
    return Array.from(this.polygons.values());
  }

  /**
   * Remove um polígono pelo ID
   */
  removerPoligono(id: string): boolean {
    return this.polygons.delete(id);
  }

  /**
   * Atualiza um polígono existente
   */
  atualizarPoligono(id: string, updates: Partial<PolygonInput>): Polygon | undefined {
    const existing = this.polygons.get(id);
    if (!existing) {
      return undefined;
    }

    const updatedPolygon: Polygon = {
      ...existing,
      ...updates,
      metadata: {
        ...existing.metadata,
        ...updates.metadata,
        updatedAt: new Date(),
      },
    };

    // Validação do polígono atualizado
    this.validarPoligono(updatedPolygon);

    this.polygons.set(id, updatedPolygon);
    return updatedPolygon;
  }

  /**
   * Busca polígonos por tipo
   */
  buscarPorTipo(tipo: Polygon["type"]): Polygon[] {
    return this.buscarTodos().filter((polygon) => polygon.type === tipo);
  }

  /**
   * Limpa todos os polígonos
   */
  limparTodos(): void {
    this.polygons.clear();
    this.idCounter = 1;
  }

  /**
   * Retorna a quantidade de polígonos armazenados
   */
  getQuantidade(): number {
    return this.polygons.size;
  }

  /**
   * Gera ID único para o polígono
   */
  private gerarId(): string {
    return `poly_${this.idCounter++}_${Date.now()}`;
  }

  /**
   * Valida a estrutura do polígono
   */
  private validarPoligono(poligono: PolygonInput): void {
    if (!poligono.name || poligono.name.trim() === "") {
      throw new Error("Nome do polígono é obrigatório");
    }

    if (!poligono.coordinates || !Array.isArray(poligono.coordinates)) {
      throw new Error("Coordenadas do polígono são obrigatórias e devem ser um array");
    }

    if (poligono.coordinates.length < 3) {
      throw new Error("Um polígono deve ter pelo menos 3 coordenadas");
    }

    // Valida cada coordenada
    poligono.coordinates.forEach((coord, index) => {
      if (!Array.isArray(coord) || coord.length !== 2) {
        throw new Error(`Coordenada ${index} deve ser um array [longitude, latitude]`);
      }

      const [lng, lat] = coord;
      if (typeof lng !== "number" || typeof lat !== "number") {
        throw new Error(`Coordenada ${index} deve conter números válidos`);
      }

      // Valida ranges aproximados de latitude/longitude
      if (lat < -90 || lat > 90) {
        throw new Error(
          `Latitude ${lat} na coordenada ${index} está fora do range válido (-90 a 90)`,
        );
      }

      if (lng < -180 || lng > 180) {
        throw new Error(
          `Longitude ${lng} na coordenada ${index} está fora do range válido (-180 a 180)`,
        );
      }
    });

    // Validações específicas por tipo
    switch (poligono.type) {
      case "rectangle":
        if (poligono.coordinates.length !== 4) {
          throw new Error("Retângulo deve ter exatamente 4 coordenadas");
        }
        break;
      case "circle":
        if (poligono.coordinates.length !== 2) {
          throw new Error("Círculo deve ter 2 coordenadas: [centro, ponto_raio]");
        }
        break;
      case "polygon":
        // Polígono genérico - primeira e última coordenada devem ser iguais para fechar
        const first = poligono.coordinates[0];
        const last = poligono.coordinates[poligono.coordinates.length - 1];
        if (first[0] !== last[0] || first[1] !== last[1]) {
          throw new Error("Polígono deve ser fechado (primeira e última coordenada iguais)");
        }
        break;
      default:
        throw new Error(`Tipo de polígono inválido: ${poligono.type}`);
    }
  }
}

// Instância singleton para uso na aplicação
export const polygonStore = new IntersectionPolygonStore();
