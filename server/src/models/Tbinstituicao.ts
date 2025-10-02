export class Tbinstituicao {
  idInstituicao: number;
  nome: string;

  constructor(data: Partial<Tbinstituicao>) {
    Object.assign(this, data);
  }
}
