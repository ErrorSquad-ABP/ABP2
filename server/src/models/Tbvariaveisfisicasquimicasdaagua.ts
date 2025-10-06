export class Tbvariaveisfisicasquimicasdaagua {
  idVariaveisFisicasQuimicasDaAgua: number = 0;
  idCampanha: number = 0;
  idSitio: number = 0;
  dataMedida: string = '';
  horaMedida: string = '';
  profundidade: number = 0;
  secchi: string = '';
  batimetria: number = 0;
  F: string = '';
  Cl: string = '';
  NNO3: string = '';
  PPO43: string = '';
  SSO42: string = '';
  Li: string = '';
  Na: string = '';
  NNH4: string = '';
  K: string = '';
  Mg: string = '';
  Ca: string = '';
  clorofila: string = '';
  feofitina: string = '';
  turbidez: string = '';
  NT: string = '';
  PT: string = '';
  TDC: string = '';

  constructor(data?: Partial<Tbvariaveisfisicasquimicasdaagua>) {
    if (data) {
      Object.assign(this, data);
    }
  }
}
