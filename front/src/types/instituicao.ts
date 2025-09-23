// src/types/reservatorio.ts

// Interface de tipagem — ideal para props, estados, dados de API
export interface IInstituicao {
  id: number;
  nome: string;
}

// Classe de modelo — usada quando precisamos de comportamento extra
export class Instituicao implements IInstituicao {
  id: number;
  nome: string;
  instituicaoId?: number;
  instituicaoNome?: string;

  constructor(
    id: number,
    nome: string,
  ) {
    this.id = id;
    this.nome = nome;
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
  toJSON(): IInstituicao {
    return {
      id: this.id,
      nome: this.nome,
    };
  }

  // Atualizar nome
  updateNome(newName: string): void {
    this.nome = newName;
  }

  // Comparação entre objetos
  equals(other: Instituicao): boolean {
    return this.id === other.id;
  }
}