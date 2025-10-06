export class Tbnutrientessedimento {
  idNutrientesSedimento: number = 0;
  idCampanha: number = 0;
  idSitio: number = 0;
  profundidade: number = 0;
  batimetria: number = 0;
  N2: number = 0;
  PT: number = 0;
  TC: number = 0;
  dataMedida: string = "";
  horaMedida: string = "";

  constructor(data: Partial<Tbnutrientessedimento>) {
    Object.assign(this, data);
  }
}
