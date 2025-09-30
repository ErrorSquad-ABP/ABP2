export class Tbtabela {
  idTabela: number;
  idInstituicao: number;
  nome: string;
  rotulo: string;
  excecao: string;
  sitio: string;
  campanha: string;

  constructor(data: Partial<Tbtabela>) {
    Object.assign(this, data);
  }
}
