export class Tbdifusao {
  idDifusao: number;
  idCampanha: number;
  idSitio: number;
  dataMedida: string;
  horaMedida: string;
  CH4: string;
  CO2: string;
  N2O: string;
  pH: string;
  tempAgua: string;
  tempAr: string;
  profundidade: string;
  altitude: string;
  vento: string;

  constructor(data: Partial<Tbdifusao>) {
    Object.assign(this, data);
  }
}
