// src/types/reservatorio.ts

// Interface de tipagem — ideal para props, estados, dados de API
export interface IReservatorio {
  id: number;
  nome: string;
  instituicaoId?: number;
  instituicaoNome?: string;
}

// Classe de modelo — usada quando precisamos de comportamento extra
export class Reservatorio implements IReservatorio {
  id: number;
  nome: string;
  instituicaoId?: number;
  instituicaoNome?: string;

  constructor(
    id: number,
    nome: string,
    instituicaoId?: number,
    instituicaoNome?: string
  ) {
    this.id = id;
    this.nome = nome;
    this.instituicaoId = instituicaoId;
    this.instituicaoNome = instituicaoNome;
  }

  // Getters
  getId(): number {
    return this.id;
  }

  getNome(): string {
    return this.nome;
  }

  getInstituicaoNome(): string | undefined {
    return this.instituicaoNome;
  }

  // Serialização leve (para enviar em requisições, localStorage etc.)
  toJSON(): IReservatorio {
    return {
      id: this.id,
      nome: this.nome,
      instituicaoId: this.instituicaoId,
      instituicaoNome: this.instituicaoNome,
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
