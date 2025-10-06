export class Tbcarbono {
  idCarbono: number = 0;
  idCampanha: number = 0;
  idSitio: number = 0;
  dataMedida: string = '';
  horaMedida: string = '';
  DC: string = '';
  DOC: string = '';
  POC: number = 0;
  TOC: string = '';
  DIC: string = '';
  TC: string = '';

  constructor(data: Partial<Tbcarbono>) {
    Object.assign(this, data);
  }
}
