export class Tbdadosprecipitacao {
  idDadosPrecipitacao: number;
  idReservatorio: number;
  dataMedida: string;
  precipitacao: number;
  idReservatorio_anterior: number;

  constructor(data: Partial<Tbdadosprecipitacao>) {
    Object.assign(this, data);
  }
}
