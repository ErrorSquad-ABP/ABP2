export class Tbbioticocoluna {
  idBioticoColuna: number = 0;
  idCampanha: number = 0;
  idSitio: number = 0;
  dataMedida: string = '';
  horaMedida: string = '';
  profundidade: number = 0;
  doc: string = '';
  toc: string = '';
  poc: string = '';
  densidadeBacteria: string = '';
  biomassaBacteria: string = '';
  clorofilaA: string = '';
  biomassaCarbonoTotalFito: string = '';
  densidadeTotalFito: string = '';
  biomassaZoo: string = '';
  densidadeTotalZoo: string = '';

  constructor(data: Partial<Tbbioticocoluna>) {
    Object.assign(this, data);
  }
}
