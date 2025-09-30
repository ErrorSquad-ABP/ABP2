export class Tbtc {
  idtc: number;
  idCampanha: number;
  idSitio: number;
  dataMedida: string;
  profundidade: string;
  tc: number;

  constructor(data: Partial<Tbtc>) {
    Object.assign(this, data);
  }
}
