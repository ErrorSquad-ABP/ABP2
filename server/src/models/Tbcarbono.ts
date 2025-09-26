export class Tbcarbono {
  idCarbono: number;
  idCampanha: number;
  idSitio: number;
  dataMedida: string;
  horaMedida: string;
  DC: string;
  DOC: string;
  POC: number;
  TOC: string;
  DIC: string;
  TC: string;

  constructor(data: Partial<Tbcarbono>) {
    Object.assign(this, data);
  }
}
