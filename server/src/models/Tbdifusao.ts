export class Tbdifusao {
  idDifusao: number = 0;
  idCampanha: number = 0;
  idSitio: number = 0;
  dataMedida: string = '';
  horaMedida: string = '';
  CH4: string = '';
  CO2: string = '';
  N2O: string = '';
  pH: string = '';
  tempAgua: string = '';
  tempAr: string = '';
  profundidade: string = '';
  altitude: string = '';
  vento: string = '';

  constructor(data: Partial<Tbdifusao>) {
    Object.assign(this, data);
  }
}
