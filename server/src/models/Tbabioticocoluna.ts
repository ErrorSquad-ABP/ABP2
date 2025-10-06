export class Tbabioticocoluna {
  idAbioticoColuna: number = 0;
  idCampanha: number = 0;
  idSitio: number = 0;
  dataMedida: string = "";
  horaMedida: string = "";
  profundidade: number = 0;
  dic: string = "";
  nt: string = "";
  pt: string = "";
  delta13c: string = "";
  delta15n: string = "";

  constructor(data: Partial<Tbabioticocoluna>) {
    Object.assign(this, data);
  }
}
