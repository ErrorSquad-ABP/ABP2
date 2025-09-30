export class Tbconcentracaogasagua {
  idConcentracaoGasAgua: number;
  idCampanha: number;
  idSitio: number;
  dataMedida: string;
  horaMedida: string;
  batimetria: number;
  altura: number;
  replica: string;
  CH4: number;
  CO2: number;

  constructor(data: Partial<Tbconcentracaogasagua>) {
    Object.assign(this, data);
  }
}
