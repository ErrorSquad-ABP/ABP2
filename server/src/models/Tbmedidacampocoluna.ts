export class Tbmedidacampocoluna {
  idMedidaCampoColuna: number = 0;
  idCampanha: number = 0;
  idSitio: number = 0;
  profundidade: number = 0;
  secchi: string = '';
  tempAgua: string = '';
  condutividade: string = '';
  DO: string = '';
  pH: string = '';
  turbidez: string = '';
  materialEmSuspensao: string = '';
  intensidadeLuminosa: string = '';
  dataMedida: string = '';
  horaMedida: string = '';

  constructor(data: Partial<Tbmedidacampocoluna>) {
    Object.assign(this, data);
  }
}
