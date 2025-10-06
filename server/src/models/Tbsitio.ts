export class Tbsitio {
  idsitio: number = 0;
  idreservatorio: number = 0;
  nome: string = '';
  lat: number = 0;
  lng: number = 0;
  descricao: string = '';

  constructor(data: Partial<Tbsitio>) {
    Object.assign(this, data);
  }
}
