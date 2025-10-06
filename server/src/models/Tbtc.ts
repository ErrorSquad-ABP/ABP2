export class Tbtc {
  idtc: number = 0;
  idCampanha: number = 0;
  idSitio: number = 0;
  dataMedida: string = '';
  profundidade: string = '';
  tc: number = 0;

  constructor(data: Partial<Tbtc>) {
    Object.assign(this, data);
  }
}
