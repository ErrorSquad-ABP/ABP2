export class Tbvariaveisfisicasquimicasdaagua {
  idVariaveisFisicasQuimicasDaAgua: number;
  idCampanha: number;
  idSitio: number;
  dataMedida: string;
  horaMedida: string;
  profundidade: number;
  secchi: string;
  batimetria: number;
  F: string;
  Cl: string;
  NNO3: string;
  PPO43: string;
  SSO42: string;
  Li: string;
  Na: string;
  NNH4: string;
  K: string;
  Mg: string;
  Ca: string;
  clorofila: string;
  feofitina: string;
  turbidez: string;
  NT: string;
  PT: string;
  TDC: string;

  constructor(data: Partial<Tbvariaveisfisicasquimicasdaagua>) {
    Object.assign(this, data);
  }
}
