export class Tbdadosrepresa {
  idDadosRepresa: number;
  idReservatorio: number;
  dataMedida: string;
  nivelReservatorio: string;
  volUtilReservatorio: string;
  porVolUtilReservatorio: string;
  geracao: string;
  vazaoAfluente: string;
  vazaoDefluente: number;
  produtividade: string;
  vazaoTurbinada: number;
  vazaoVertida: number;
  vazaoTurbinadaVazio: string;
  idReservatorio_anterior: number;

  constructor(data: Partial<Tbdadosrepresa>) {
    Object.assign(this, data);
  }
}
