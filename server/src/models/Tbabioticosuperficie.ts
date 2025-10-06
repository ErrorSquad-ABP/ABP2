export class Tbabioticosuperficie {
  idAbioticoSuperficie: number = 0;
  idCampanha: number = 0;
  idSitio: number = 0;
  dataMedida: string = "";
  horaMedida: string = "";
  dic: string = "";
  nt: string = "";
  pt: string = "";
  delta13c: string = "";
  delta15n: string = "";

  constructor(data: Partial<Tbabioticosuperficie>) {
    Object.assign(this, data);
  }
}
