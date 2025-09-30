export class Tbsitio {
  idsitio: number;
  idreservatorio: number;
  nome: string;
  lat: number;
  lng: number;
  descricao: string;

  constructor(data: Partial<Tbsitio>) {
    Object.assign(this, data);
  }
}
