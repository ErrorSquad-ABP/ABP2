export class Tbinstituicao {
  idInstituicao: number = 0;
  nome: string = "";

  constructor(data: Partial<Tbinstituicao>) {
    Object.assign(this, data);
  }
}
