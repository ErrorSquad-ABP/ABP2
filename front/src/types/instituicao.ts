import { IReservatorio } from "./reservatorio.ts";

export interface IInstituicao {
  id: number;
  nome: string;
  sigla?: string;
  reservatorios?: IReservatorio[];
}
