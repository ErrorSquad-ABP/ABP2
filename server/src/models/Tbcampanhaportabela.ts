export class Tbcampanhaportabela {
  idCampanha: number;
  idTabela: number;

  constructor(data: Partial<Tbcampanhaportabela>) {
    Object.assign(this, data);
  }
}
