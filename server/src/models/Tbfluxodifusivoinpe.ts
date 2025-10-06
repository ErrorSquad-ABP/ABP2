export class Tbfluxodifusivoinpe {
  idFluxoDifusivoInpe: number = 0;
  idCampanha: number = 0;
  idSitio: number = 0;
  profundidade: number = 0;
  CO2: number = 0;
  CO2_desvioPadrao: number = 0;
  CO2_amostras: number = 0;
  CH4: number = 0;
  CH4_desvioPadrao: number = 0;
  CH4_amostras: number = 0;
  dataMedida: string = "";
  horaMedida: string = "";

  constructor(data: Partial<Tbfluxodifusivoinpe>) {
    Object.assign(this, data);
  }
}
