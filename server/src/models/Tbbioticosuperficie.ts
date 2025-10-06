export class Tbbioticosuperficie {
  idBioticoSuperficie: number = 0;
  idCampanha: number = 0;
  idSitio: number = 0;
  dataMedida: string = "";
  horaMedida: string = "";
  doc: string = "";
  toc: string = "";
  poc: string = "";
  densidadeBacteria: string = "";
  biomassaBacteria: string = "";
  clorofilaA: string = "";
  biomassaCarbonoTotalFito: string = "";
  densidadeTotalFito: string = "";
  biomassaZoo: string = "";
  densidadeTotalZoo: string = "";

  constructor(data: Partial<Tbbioticosuperficie>) {
    Object.assign(this, data);
  }
}
