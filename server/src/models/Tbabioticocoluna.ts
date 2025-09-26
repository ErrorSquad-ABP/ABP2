export class Tbabioticocoluna {
  idAbioticoColuna: number;
  idCampanha: number;
  idSitio: number;
  dataMedida: string;
  horaMedida: string;
  profundidade: number;
  dic: string;
  nt: string;
  pt: string;
  delta13c: string;
  delta15n: string;

  constructor(data: Partial<Tbabioticocoluna>) {
    Object.assign(this, data);
  }
}
