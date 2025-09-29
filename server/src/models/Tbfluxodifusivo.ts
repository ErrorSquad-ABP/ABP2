export class Tbfluxodifusivo {
  idFluxoDifusivo: number;
  idCampanha: number;
  idSitio: number;
  batimetria: number;
  intervalo: string;
  CH4: number;
  CO2: number;
  dataMedida: string;
  horaMedida: string;

  constructor(data: Partial<Tbfluxodifusivo>) {
    Object.assign(this, data);
  }
}
