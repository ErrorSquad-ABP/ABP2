export class Tbconcentracaogassedimento {
  idConcentracaoGasSedimento: number = 0;
  idCampanha: number = 0;
  idSitio: number = 0;
  dataMedida: string = "";
  horaMedida: string = "";
  batimetria: number = 0;
  profundidadeDoSedimento: number = 0;
  replica: string = "";
  CH4: number = 0;
  CO2: number = 0;

  constructor(data: Partial<Tbconcentracaogassedimento>) {
    Object.assign(this, data);
  }
}
