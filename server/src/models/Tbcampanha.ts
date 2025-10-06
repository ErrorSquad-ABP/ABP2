export class Tbcampanha {
  idcampanha: number = 0;
  idreservatorio: number = 0;
  idinstituicao: number = 0;
  nrodacampanha: number = 0;
  datainicio: string = '';
  datafim: string = '';

  constructor(data: Partial<Tbcampanha>) {
    Object.assign(this, data);
  }
}
