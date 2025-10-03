export class Tbmedidacampocoluna {
  idMedidaCampoColuna: number;
  idCampanha: number;
  idSitio: number;
  profundidade: number;
  secchi: string;
  tempAgua: string;
  condutividade: string;
  DO: string;
  pH: string;
  turbidez: string;
  materialEmSuspensao: string;
  intensidadeLuminosa: string;
  dataMedida: string;
  horaMedida: string;

  constructor(data: Partial<Tbmedidacampocoluna>) {
    Object.assign(this, data);
  }
}
