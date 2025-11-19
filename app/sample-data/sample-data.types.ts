// app/sample-data/sample-data.types.ts

export interface Instituicao {
  idinstituicao: string;
  nome: string;
  sigla: string;
}

export interface Reservatorio {
  idreservatorio: string;
  nome: string;
  lat: number;
  lng: number;
}

export interface Sitio {
  idsitio: string;
  nome: string;
  lat: number;
  lng: number;
  idreservatorio: string;
}

export interface Campanha {
  idcampanha: string;
  nrocampanha: string;
  datainicio: string;
  datafim: string;
  idreservatorio: string;
  idinstituicao: string;
}

export interface AbioticoColuna {
  idabioticocoluna: string;
  idcampanha: string;
  idsitio: string;
  datamedida: string;
  horamedida: string;
  profundidade: string;
  dic: string;
  nt: string;
  pt: string;
  delta13c: string;
  delta15n: string;
}

export interface SimaData {
  idsima: string;
  idestacao: string;
  idsensor: string;
  datamedicao: string;
  horamedicao: string;
  valor: string;
  unidade: string;
  lat: number;
  lng: number;
}

export interface FluxoINPE {
  idfluxo: string;
  idcampanha: string;
  datamedicao: string;
  co2_flux: string;
  ch4_flux: string;
  temperatura: string;
}

// Datasets completos
export interface FurnasDataset {
  instituicoes: Instituicao[];
  reservatorios: Reservatorio[];
  sitios: Sitio[];
  campanhas: Campanha[];
  dadosAbioticos: AbioticoColuna[];
}

export interface SimaDataset {
  dadosSima: SimaData[];
}

export interface BalcarDataset {
  fluxos: FluxoINPE[];
}