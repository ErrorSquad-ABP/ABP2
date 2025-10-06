export class Tbhoriba {
  idHoriba: number = 0;
  idCampanha: number = 0;
  idSitio: number = 0;
  profundidade: number = 0;
  tempAgua: number = 0;
  condutividade: number = 0;
  pH: number = 0;
  DO: number = 0;
  TDS: number = 0;
  redox: number = 0;
  turbidez: string = "";
  dataMedida: string = "";

  constructor(data: Partial<Tbhoriba>) {
    Object.assign(this, data);
  }
}
