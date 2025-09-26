export class Tbabioticosuperficie {
  idAbioticoSuperficie: number;
  idCampanha: number;
  idSitio: number;
  dataMedida: string;
  horaMedida: string;
  dic: string;
  nt: string;
  pt: string;
  delta13c: string;
  delta15n: string;

  constructor(data: Partial<Tbabioticosuperficie>) {
    Object.assign(this, data);
  }
}
