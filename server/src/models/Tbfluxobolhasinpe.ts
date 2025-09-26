export class Tbfluxobolhasinpe {
  idFluxoBolhasInpe: number;
  idCampanha: number;
  idSitio: number;
  profundidade: number;
  CH4: number;
  CH4_desvioPadrao: number;
  CH4_amostras: number;
  dataMedida: string;
  horaMedida: string;

  constructor(data: Partial<Tbfluxobolhasinpe>) {
    Object.assign(this, data);
  }
}
