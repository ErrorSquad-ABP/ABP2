export class Tbdupladessorcaoagua {
  idDuplaDessorcaoAgua: number = 0;
  idCampanha: number = 0;
  idSitio: number = 0;
  dataMedida: string = "";
  horaMedida: string = "";
  profundidade: number = 0;
  CO2: string = "";
  O2: string = "";
  N2: string = "";
  CH4: string = "";
  N2O: string = "";

  constructor(data: Partial<Tbdupladessorcaoagua>) {
    Object.assign(this, data);
  }
}
