export class Tbdupladessorcaoagua {
  idDuplaDessorcaoAgua: number;
  idCampanha: number;
  idSitio: number;
  dataMedida: string;
  horaMedida: string;
  profundidade: number;
  CO2: string;
  O2: string;
  N2: string;
  CH4: string;
  N2O: string;

  constructor(data: Partial<Tbdupladessorcaoagua>) {
    Object.assign(this, data);
  }
}
