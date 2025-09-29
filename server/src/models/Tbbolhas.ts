export class Tbbolhas {
  idBolhas: number;
  idCampanha: number;
  idSitio: number;
  profundidade: number;
  nroDeFunis: number;
  volumeColetado: number;
  CO2: string;
  O2: number;
  N2: number;
  CH4: number;
  N2O: string;
  dataMedida: string;
  horaMedida: string;

  constructor(data: Partial<Tbbolhas>) {
    Object.assign(this, data);
  }
}
