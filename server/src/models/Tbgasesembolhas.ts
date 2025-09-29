export class Tbgasesembolhas {
  idGasesEmBolhas: number;
  idCampanha: number;
  idSitio: number;
  profundidade: string;
  CO2: string;
  O2: string;
  N2: number;
  CH4: number;
  N2O: string;
  dataMedida: string;

  constructor(data: Partial<Tbgasesembolhas>) {
    Object.assign(this, data);
  }
}
