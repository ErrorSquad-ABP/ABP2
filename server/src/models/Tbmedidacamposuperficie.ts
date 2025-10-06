export class Tbmedidacamposuperficie {
  idMedidaCampoSuperficie: number = 0;
  idCampanha: number = 0;
  idSitio: number = 0;
  secchi: string = '';
  tempAgua: string = '';
  condutividade: string = '';
  DO: string = '';
  pH: string = '';
  turbidez: string = '';
  materialEmSuspensao: string = '';
  dataMedida: string = '';
  horaMedida: string = '';

  constructor(data: Partial<Tbmedidacamposuperficie>) {
    Object.assign(this, data);
  }
}
