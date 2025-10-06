export class Tbionsnaaguaintersticialdosedimento {
  idIonsNaAguaIntersticialDoSedimento: number = 0;
  idCampanha: number = 0;
  idSitio: number = 0;
  profundidade: number = 0;
  batimetria: number = 0;
  F: string = "";
  Cl: string = "";
  NO2: string = "";
  Br: string = "";
  NO3: number = 0;
  PO4: string = "";
  SO4: number = 0;
  Na: string = "";
  NH4: number = 0;
  K: string = "";
  Mg: string = "";
  Ca: string = "";
  acetato: number = 0;
  dataMedida: string = "";
  horaMedida: string = "";

  constructor(data: Partial<Tbionsnaaguaintersticialdosedimento>) {
    Object.assign(this, data);
  }
}
