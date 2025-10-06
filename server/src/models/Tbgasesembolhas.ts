export class Tbgasesembolhas {
  idGasesEmBolhas: number = 0;
  idCampanha: number = 0;
  idSitio: number = 0;
  profundidade: string = '';
  CO2: string = '';
  O2: string = '';
  N2: number = 0;
  CH4: number = 0;
  N2O: string = '';
  dataMedida: string = '';

  constructor(data: Partial<Tbgasesembolhas>) {
    Object.assign(this, data);
  }
}
