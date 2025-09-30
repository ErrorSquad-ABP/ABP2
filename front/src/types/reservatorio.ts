// src/types/reservatorio.ts

// Interface de tipagem — ideal para props, estados, dados de API
export interface IReservatorio {
  id: number;
  nome: string;
  lat: number;
  long: number;
}

// Classe de modelo — usada quando precisamos de comportamento extra
export class Reservatorio implements IReservatorio {
  id: number;
  nome: string;
  lat: number;
  long: number;

  constructor(id: number, nome: string, lat: number, long: number) {
    this.id = id;
    this.nome = nome;
    this.lat = lat;
    this.long = long;
  }

  // Getters
  getId(): number {
    return this.id;
  }

  getNome(): string {
    return this.nome;
  }

  getlat(): number {
    return this.lat;
  }

  getlong(): number {
    return this.long;
  }

  // Serialização leve (para enviar em requisições, localStorage etc.)
  toJSON(): IReservatorio {
    return {
      id: this.id,
      nome: this.nome,
      lat: this.lat,
      long: this.long,
    };
  }

  // Atualizar nome
  updateNome(newName: string): void {
    this.nome = newName;
  }

  // Comparação entre objetos
  equals(other: Reservatorio): boolean {
    return this.id === other.id;
  }
}
