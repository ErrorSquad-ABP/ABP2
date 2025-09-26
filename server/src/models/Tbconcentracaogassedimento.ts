export class Tbconcentracaogassedimento {
  idConcentracaoGasSedimento: number;
  idCampanha: number;
  idSitio: number;
  dataMedida: string;
  horaMedida: string;
  batimetria: number;
  profundidadeDoSedimento: number;
  replica: string;
  CH4: number;
  CO2: number;

  constructor(data: Partial<Tbconcentracaogassedimento>) {
    Object.assign(this, data);
  }
}
