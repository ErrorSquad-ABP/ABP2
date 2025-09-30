export class Tbcampanha {
  idcampanha: number;
  idreservatorio: number;
  idinstituicao: number;
  nrodacampanha: number;
  datainicio: string;
  datafim: string;

  constructor(data: Partial<Tbcampanha>) {
    Object.assign(this, data);
  }
}
