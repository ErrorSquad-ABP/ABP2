export class Tbtabela {
  idTabela: number = 0;
  idInstituicao: number = 0;
  nome: string = '';
  rotulo: string = '';
  excecao: string = '';
  sitio: string = '';
  campanha: string = '';

  constructor(data: Partial<Tbtabela>) {
    Object.assign(this, data);
  }
}
