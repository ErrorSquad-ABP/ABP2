export class Tbcampanhaportabela {
  idCampanha: number = 0;
  idTabela: number = 0;

  constructor(data: Partial<Tbcampanhaportabela>) {
    Object.assign(this, data);
  }
}
