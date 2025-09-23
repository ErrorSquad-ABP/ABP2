import { IInstituicao } from "../types/instituicao.ts";
import { IReservatorio } from "../types/reservatorio";

export class Instituicao implements IInstituicao {
  id: number;
  nome: string;
  sigla?: string;
  reservatorios: IReservatorio[];

  constructor(id: number, nome: string, sigla?: string, reservatorios: IReservatorio[] = []) {
    this.id = id;
    this.nome = nome;
    this.sigla = sigla;
    this.reservatorios = reservatorios;
  }

  // Getters
  getId(): number {
    return this.id;
  }

  getNome(): string {
    return this.nome;
  }

  getReservatorios(): IReservatorio[] {
    return this.reservatorios;
  }

  // Métodos de manipulação
  addReservatorio(r: IReservatorio): void {
    this.reservatorios.push(r);
  }

  removeReservatorioById(id: number): boolean {
    const index = this.reservatorios.findIndex(r => r.id === id);
    if (index !== -1) {
      this.reservatorios.splice(index, 1);
      return true;
    }
    return false;
  }

  findReservatorio(id: number): IReservatorio | undefined {
    return this.reservatorios.find(r => r.id === id);
  }

  // Serialização
  toJSON(): IInstituicao {
    return {
      id: this.id,
      nome: this.nome,
      sigla: this.sigla,
      reservatorios: this.reservatorios,
    };
  }
}
