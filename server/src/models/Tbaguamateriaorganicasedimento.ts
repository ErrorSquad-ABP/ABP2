export class Tbaguamateriaorganicasedimento {
  idAguaMateriaOrganicaSedimento: number = 0;
  idCampanha: number = 0;
  idSitio: number = 0;
  dataMedida: string = "";
  horaMedida: string = "";
  profundidade: number = 0;
  batimetria: number = 0;
  agua: number = 0;
  materiaOrganica: number = 0;

  constructor(data: Partial<Tbaguamateriaorganicasedimento>) {
    Object.assign(this, data);
  }
}
