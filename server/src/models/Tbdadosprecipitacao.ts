export class Tbdadosprecipitacao {
  idDadosPrecipitacao: number = 0;
  idReservatorio: number = 0;
  dataMedida: string = "";
  precipitacao: number = 0;
  idReservatorio_anterior: number = 0;

  constructor(data: Partial<Tbdadosprecipitacao>) {
    Object.assign(this, data);
  }
}
