export class Tbfluxodifusivo {
  idFluxoDifusivo: number = 0;
  idCampanha: number = 0;
  idSitio: number = 0;
  batimetria: number = 0;
  intervalo: string = '';
  CH4: number = 0;
  CO2: number = 0;
  dataMedida: string = '';
  horaMedida: string= '';

  constructor(data: Partial<Tbfluxodifusivo>) {
    Object.assign(this, data);
  }
}
