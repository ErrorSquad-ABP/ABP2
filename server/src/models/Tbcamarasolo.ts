export class Tbcamarasolo {
  idCamaraSolo: number = 0;
  idCampanha: number = 0;
  idSitio: number = 0;
  dataMedida: string = "";
  horaMedida: string = "";
  CH4: string = "";
  CO2: string = "";
  N2O: string = "";
  tempAr: string = "";
  tempSolo: string = "";
  vento: string = "";
  altitude: string = "";

  constructor(data: Partial<Tbcamarasolo>) {
    Object.assign(this, data);
  }
}
