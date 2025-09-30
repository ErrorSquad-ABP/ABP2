export class Tbbioticosuperficie {
  idBioticoSuperficie: number;
  idCampanha: number;
  idSitio: number;
  dataMedida: string;
  horaMedida: string;
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

  constructor(data: Partial<Tbbioticosuperficie>) {
    Object.assign(this, data);
  }
}
