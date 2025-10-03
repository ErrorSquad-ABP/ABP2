export class Tbnutrientessedimento {
  idNutrientesSedimento: number;
  idCampanha: number;
  idSitio: number;
  profundidade: number;
  batimetria: number;
  N2: number;
  PT: number;
  TC: number;
  dataMedida: string;
  horaMedida: string;

  constructor(data: Partial<Tbnutrientessedimento>) {
    Object.assign(this, data);
  }
}
