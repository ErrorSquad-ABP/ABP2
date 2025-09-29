export class Tbfluxocarbono {
  idFluxoCarbono: number;
  idCampanha: number;
  idSitio: number;
  producaoFitoplanctonica: number;
  carbonoOrganicoExcretado: number;
  respiracaoFito: number;
  producaoBacteriana: number;
  respiracaoBacteriana: number;
  taxaSedimentacao: string;
  dataMedida: string;
  horaMedida: string;

  constructor(data: Partial<Tbfluxocarbono>) {
    Object.assign(this, data);
  }
}
