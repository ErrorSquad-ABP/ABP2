export class Tbreservatorio {
  idReservatorio: number;
  nome: string;
  lat: string;
  lng: string;

  constructor(data: Partial<Tbreservatorio>) {
    Object.assign(this, data);
  }
}
