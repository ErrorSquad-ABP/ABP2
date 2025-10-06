export class Tbparametrosbiologicosfisicosagua {
  idParametrosBiologicosFisicosAgua: number = 0;
  idCampanha: number = 0;
  idSitio: number = 0;
  dataMedida: string = '';
  profundidade: number = 0;
  secchi: string = '';
  tempagua: string = '';
  condutividade: string = '';
  DO: string = '';
  pH: string = '';
  turbidez: string = '';
  materialEmSuspensao: string = '';
  DOC: string = '';
  TOC: string = '';
  POC: string = '';
  DIC: string = '';
  NT: string = '';
  PT: string = '';
  densidadeBacteria: string = '';
  biomassaBacteria: string = '';
  clorofilaA: string = '';
  biomassaCarbonoTotalFito: string = '';
  densidadeTotalFito: string = '';
  biomassaZoo: string = '';
  densidadeTotalZoo: string = '';
  producaoFitoplanctonica: string = '';
  carbonoOrganicoExcretado: string = '';
  respiracaoFito: string = '';
  producaoBacteriana: string = '';
  respiracaoBacteriana: string = '';
  taxaSedimentacao: string = '';
  delta13C: string = '';
  delta15N: string = '';
  intensidadeLuminosa: string = '';

  constructor(data: Partial<Tbparametrosbiologicosfisicosagua>) {
    Object.assign(this, data);
  }
}
