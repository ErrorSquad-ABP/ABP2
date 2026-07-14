import type { IReservatorio } from "./reservatorio";

/**
 * Contrato de tipagem de uma instituição — ideal para props, estados e dados
 * de API. O comportamento (métodos) fica na classe `Instituicao` em
 * `@/models/instituicao`.
 */
export interface IInstituicao {
  id: number;
  nome: string;
  sigla?: string;
  reservatorios?: IReservatorio[];
}
