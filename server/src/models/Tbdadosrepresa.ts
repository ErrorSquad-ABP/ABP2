export class Tbdadosrepresa {
  idDadosRepresa: number = 0;
  idReservatorio: number = 0;
  dataMedida: string = "";
  nivelReservatorio: string = "";
  volUtilReservatorio: string = "";
  porVolUtilReservatorio: string = "";
  geracao: string = "";
  vazaoAfluente: string = "";
  vazaoDefluente: number = 0;
  produtividade: string = "";
  vazaoTurbinada: number = 0;
  vazaoVertida: number = 0;
  vazaoTurbinadaVazio: string = "";
  idReservatorio_anterior: number = 0;

  constructor(data: Partial<Tbdadosrepresa>) {
    Object.assign(this, data);
  }
}
