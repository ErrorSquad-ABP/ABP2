export class Tbaguamateriaorganicasedimento {
  idAguaMateriaOrganicaSedimento: number;
  idCampanha: number;
  idSitio: number;
  dataMedida: string;
  horaMedida: string;
  profundidade: number;
  batimetria: number;
  agua: number;
  materiaOrganica: number;

  constructor(data: Partial<Tbaguamateriaorganicasedimento>) {
    Object.assign(this, data);
  }
}
