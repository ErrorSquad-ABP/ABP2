export class Tbionsnaaguaintersticialdosedimento {
  idIonsNaAguaIntersticialDoSedimento: number;
  idCampanha: number;
  idSitio: number;
  profundidade: number;
  batimetria: number;
  F: string;
  Cl: string;
  NO2: string;
  Br: string;
  NO3: number;
  PO4: string;
  SO4: number;
  Na: string;
  NH4: number;
  K: string;
  Mg: string;
  Ca: string;
  acetato: number;
  dataMedida: string;
  horaMedida: string;

  constructor(data: Partial<Tbionsnaaguaintersticialdosedimento>) {
    Object.assign(this, data);
  }
}
