export class Tbreservatorio {
  idReservatorio: number = 0;
  nome: string = '';
  lat: string = '';
  lng: string = '';

  constructor(data: Partial<Tbreservatorio>) {
    Object.assign(this, data);
  }
}
