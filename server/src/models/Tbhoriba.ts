export class Tbhoriba {
  idHoriba: number;
  idCampanha: number;
  idSitio: number;
  profundidade: number;
  tempAgua: number;
  condutividade: number;
  pH: number;
  DO: number;
  TDS: number;
  redox: number;
  turbidez: string;
  dataMedida: string;

  constructor(data: Partial<Tbhoriba>) {
    Object.assign(this, data);
  }
}
