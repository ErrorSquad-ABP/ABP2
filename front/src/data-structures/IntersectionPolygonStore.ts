// front/src/data-structures/IntersectionPolygonStore.ts

export interface PolygonMetadata {
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  description?: string;
  color?: string;
  isVisible?: boolean;
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
  private storageKey: string;

  constructor(storageKey: string = "inpe_polygons") {
    this.polygons = new Map();
    this.idCounter = 1;
    this.storageKey = storageKey;

    // Carrega polígonos do localStorage se disponível
    this.carregarDoLocalStorage();
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
        createdBy: poligono.metadata?.createdBy || "user",
        createdAt: poligono.metadata?.createdAt || now,
        updatedAt: now,
        description: poligono.metadata?.description,
        color: poligono.metadata?.color || "#007bff",
        isVisible: poligono.metadata?.isVisible ?? true,
      },
    };

    this.polygons.set(id, polygonWithId);
    this.salvarNoLocalStorage();
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
   * Retorna apenas polígonos visíveis
   */
  buscarVisiveis(): Polygon[] {
    return this.buscarTodos().filter((polygon) => polygon.metadata.isVisible !== false);
  }

  /**
   * Remove um polígono pelo ID
   */
  removerPoligono(id: string): boolean {
    const result = this.polygons.delete(id);
    if (result) {
      this.salvarNoLocalStorage();
    }
    return result;
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
    this.salvarNoLocalStorage();
    return updatedPolygon;
  }

  /**
   * Alterna visibilidade do polígono
   */
  alternarVisibilidade(id: string): boolean {
    const polygon = this.polygons.get(id);
    if (!polygon) return false;

    const isVisible = !polygon.metadata.isVisible;
    this.atualizarPoligono(id, {
      metadata: { ...polygon.metadata, isVisible },
    });

    return isVisible;
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
    this.salvarNoLocalStorage();
  }

  /**
   * Retorna a quantidade de polígonos armazenados
   */
  getQuantidade(): number {
    return this.polygons.size;
  }

  /**
   * Exporta polígonos para JSON
   */
  exportarParaJSON(): string {
    return JSON.stringify(this.buscarTodos(), null, 2);
  }

  /**
   * Importa polígonos de JSON
   */
  importarDeJSON(jsonString: string): Polygon[] {
    try {
      const polygons = JSON.parse(jsonString) as Polygon[];

      // Valida cada polígono antes de importar
      polygons.forEach((polygon) => {
        this.validarPoligono(polygon);

        // Se o polígono já existe, atualiza; senão, adiciona
        if (this.polygons.has(polygon.id)) {
          this.atualizarPoligono(polygon.id, polygon);
        } else {
          this.polygons.set(polygon.id, {
            ...polygon,
            metadata: {
              ...polygon.metadata,
              updatedAt: new Date(),
            },
          });
        }
      });

      this.salvarNoLocalStorage();
      return polygons;
    } catch (error) {
      throw new Error(`Erro ao importar polígonos: ${error}`);
    }
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

    if (poligono.coordinates.length < 2) {
      throw new Error("Um polígono deve ter pelo menos 2 coordenadas");
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
  }

  /**
   * Salva polígonos no localStorage
   */
  private salvarNoLocalStorage(): void {
    if (typeof window !== "undefined" && window.localStorage) {
      try {
        const data = JSON.stringify(this.buscarTodos());
        localStorage.setItem(this.storageKey, data);
      } catch (error) {
        console.warn("Não foi possível salvar polígonos no localStorage:", error);
      }
    }
  }

  /**
   * Carrega polígonos do localStorage
   */
  private carregarDoLocalStorage(): void {
    if (typeof window !== "undefined" && window.localStorage) {
      try {
        const data = localStorage.getItem(this.storageKey);
        if (data) {
          const polygons = JSON.parse(data) as Polygon[];
          polygons.forEach((polygon) => {
            this.polygons.set(polygon.id, {
              ...polygon,
              metadata: {
                ...polygon.metadata,
                createdAt: new Date(polygon.metadata.createdAt),
                updatedAt: new Date(polygon.metadata.updatedAt),
              },
            });
          });

          // Atualiza o contador baseado no maior ID encontrado
          this.atualizarContador();
        }
      } catch (error) {
        console.warn("Não foi possível carregar polígonos do localStorage:", error);
      }
    }
  }

  /**
   * Atualiza o contador de IDs baseado nos polígonos existentes
   */
  private atualizarContador(): void {
    let maxId = 0;
    this.polygons.forEach((polygon) => {
      const match = polygon.id.match(/poly_(\d+)_/);
      if (match) {
        const idNum = parseInt(match[1], 10);
        if (idNum > maxId) maxId = idNum;
      }
    });
    this.idCounter = maxId + 1;
  }
}

// Instância singleton para uso na aplicação
export const polygonStore = new IntersectionPolygonStore();
