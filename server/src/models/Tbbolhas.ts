export class Tbbolhas {
  idBolhas: number = 0;
  idCampanha: number = 0;
  idSitio: number = 0;
  profundidade: number = 0;
  nroDeFunis: number = 0;
  volumeColetado: number = 0;
  CO2: string = "";
  O2: number = 0;
  N2: number = 0;
  CH4: number = 0;
  N2O: string = "";
  dataMedida: string = "";
  horaMedida: string = "";

  constructor(data: Partial<Tbbolhas>) {
    Object.assign(this, data);
  }
}
