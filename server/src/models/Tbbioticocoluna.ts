export class Tbbioticocoluna {
  idBioticoColuna: number;
  idCampanha: number;
  idSitio: number;
  dataMedida: string;
  horaMedida: string;
  profundidade: number;
  doc: string;
  toc: string;
  poc: string;
  densidadeBacteria: string;
  biomassaBacteria: string;
  clorofilaA: string;
  biomassaCarbonoTotalFito: string;
  densidadeTotalFito: string;
  biomassaZoo: string;
  densidadeTotalZoo: string;

  constructor(data: Partial<Tbbioticocoluna>) {
    Object.assign(this, data);
  }
}
