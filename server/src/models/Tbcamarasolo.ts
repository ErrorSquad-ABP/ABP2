export class Tbcamarasolo {
  idCamaraSolo: number;
  idCampanha: number;
  idSitio: number;
  dataMedida: string;
  horaMedida: string;
  CH4: string;
  CO2: string;
  N2O: string;
  tempAr: string;
  tempSolo: string;
  vento: string;
  altitude: string;

  constructor(data: Partial<Tbcamarasolo>) {
    Object.assign(this, data);
  }
}
