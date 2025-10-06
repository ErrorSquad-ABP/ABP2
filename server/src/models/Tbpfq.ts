export class Tbpfq {
  idPFQ: number = 0;
  idCampanha: number = 0;
  idSitio: number = 0;
  dataMedida: string = '';
  horaMedida: string = '';
  profundidade: number = 0;
  batimetria: number = 0;
  tempar: string = '';
  tempagua: number = 0;
  DO: number = 0;
  pH: number = 0;
  redox: number = 0;
  vento: string = '';

  constructor(data: Partial<Tbpfq>) {
    Object.assign(this, data);
  }
}
