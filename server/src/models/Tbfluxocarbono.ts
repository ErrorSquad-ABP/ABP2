export class Tbfluxocarbono {
  idFluxoCarbono: number = 0;
  idCampanha: number = 0;
  idSitio: number = 0;
  producaoFitoplanctonica: number = 0;
  carbonoOrganicoExcretado: number = 0;
  respiracaoFito: number = 0;
  producaoBacteriana: number = 0;
  respiracaoBacteriana: number = 0;
  taxaSedimentacao: string = '';
  dataMedida: string = '';
  horaMedida: string = '';

  constructor(data: Partial<Tbfluxocarbono>) {
    Object.assign(this, data);
  }
}
