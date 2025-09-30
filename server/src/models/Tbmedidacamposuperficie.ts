export class Tbmedidacamposuperficie {
  idMedidaCampoSuperficie: number;
  idCampanha: number;
  idSitio: number;
  secchi: string;
  tempAgua: string;
  condutividade: string;
  DO: string;
  pH: string;
  turbidez: string;
  materialEmSuspensao: string;
  dataMedida: string;
  horaMedida: string;

  constructor(data: Partial<Tbmedidacamposuperficie>) {
    Object.assign(this, data);
  }
}
