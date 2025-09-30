export class Tbpfq {
  idPFQ: number;
  idCampanha: number;
  idSitio: number;
  dataMedida: string;
  horaMedida: string;
  profundidade: number;
  batimetria: number;
  tempar: string;
  tempagua: number;
  DO: number;
  pH: number;
  redox: number;
  vento: string;

  constructor(data: Partial<Tbpfq>) {
    Object.assign(this, data);
  }
}
