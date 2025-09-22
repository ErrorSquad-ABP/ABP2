import { IReservatorio } from "./Reservatorio";

export interface IInstituicao {
  id: number;
  nome: string;
  sigla?: string;
  reservatorios?: IReservatorio[];
}
