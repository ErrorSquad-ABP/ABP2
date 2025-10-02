export class Tbfluxodifusivoinpe {
  idFluxoDifusivoInpe: number;
  idCampanha: number;
  idSitio: number;
  profundidade: number;
  CO2: number;
  CO2_desvioPadrao: number;
  CO2_amostras: number;
  CH4: number;
  CH4_desvioPadrao: number;
  CH4_amostras: number;
  dataMedida: string;
  horaMedida: string;

  constructor(data: Partial<Tbfluxodifusivoinpe>) {
    Object.assign(this, data);
  }
}
