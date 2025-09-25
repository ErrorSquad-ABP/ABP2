type TableMeta = {
  id: string;
  name: string;
  description?: string;
  colunas: Array<object>
};

const rawData: Record<string, TableMeta[]> = {
  abioticos: [
    {
      id: "tbabioticocoluna",
      name: "tbabioticocoluna",
      description: "Medições na coluna d'água (profundidade, DIC, delta15N, etc.)",
      colunas: [{nome:"nomedacoluna", label:"Nome Formatado", type:"tipodacoluna"}],
    },
    {
      id: "tbabioticosuperficie",
      name: "tbabioticosuperficie",
      description: "Medições na superfície",
      colunas: [],
    },
  ],

  bioticos: [
    {
      id: "tbbioticocoluna",
      name: "tbbioticocoluna",
      description: "Dados bióticos coletados na coluna d'água",
      colunas: [],
    },
    {
      id: "tbbioticosuperficie",
      name: "tbbioticosuperficie",
      description: "Dados bióticos coletados na superfície",
      colunas: [],
    },
  ],

  aguaSedimento: [
    {
      id: "tbaguamateriaorganicasedimento",
      name: "tbaguamateriaorganicasedimento",
      description: "Medições de matéria orgânica na água e sedimento",
      colunas: [],
    },
    {
      id: "tbconcentracaogasagua",
      name: "tbconcentracaogasagua",
      description: "Concentração de gases na água",
      colunas: [],
    },
    {
      id: "tbconcentracaogassedimento",
      name: "tbconcentracaogassedimento",
      description: "Concentração de gases no sedimento",
      colunas: [],
    },
    {
      id: "tbionsnaaguaintersticialdosedimento",
      name: "tbionsnaaguaintersticialdosedimento",
      description: "Íons na água intersticial do sedimento",
      colunas: [],
    },
  ],

  fluxosEGases: [
    {
      id: "tbbolhas",
      name: "tbbolhas",
      description: "Dados sobre bolhas de gás",
      colunas: [],
    },
    {
      id: "tbcamarasolo",
      name: "tbcamarasolo",
      description: "Medições com câmara de solo",
      colunas: [],
    },
    {
      id: "tbfluxobolhasinpe",
      name: "tbfluxobolhasinpe",
      description: "Fluxo de bolhas (dados do INPE)",
      colunas: [],
    },
    {
      id: "tbfluxocarbono",
      name: "tbfluxocarbono",
      description: "Fluxo de carbono atmosférico",
      colunas: [],
    },
    {
      id: "tbfluxodifusivo",
      name: "tbfluxodifusivo",
      description: "Fluxo difusivo de gases",
      colunas: [],
    },
    {
      id: "tbfluxodifusivoinpe",
      name: "tbfluxodifusivoinpe",
      description: "Fluxo difusivo (dados do INPE)",
      colunas: [],
    },
    {
      id: "tbgasesembolhas",
      name: "tbgasesembolhas",
      description: "Composição de gases em bolhas",
      colunas: [],
    },
    {
      id: "tbdifusao",
      name: "tbdifusao",
      description: "Dados de difusão de gases",
      colunas: [],
    },
    {
      id: "tbdupladessorcaoagua",
      name: "tbdupladessorcaoagua",
      description: "Medições de dessorção dupla na água",
      colunas: [],
    },
  ],

  campoMedidas: [
    {
      id: "tbmedidacampocoluna",
      name: "tbmedidacampocoluna",
      description: "Medições de campo na coluna d'água",
      colunas: [],
    },
    {
      id: "tbmedidacamposuperficie",
      name: "tbmedidacamposuperficie",
      description: "Medições de campo na superfície",
      colunas: [],
    },
  ],

  parametrosFisicoQuimicos: [
    {
      id: "tbpfq",
      name: "tbpfq",
      description: "Parâmetros físico-químicos diversos",
      colunas: [],
    },
    {
      id: "tbtc",
      name: "tbtc",
      description: "Medições de temperatura e condutividade",
      colunas: [],
    },
    {
      id: "tbvariaveisfisicasquimicasdaagua",
      name: "tbvariaveisfisicasquimicasdaagua",
      description: "Variáveis físico-químicas da água",
      colunas: [],
    },
  ],

  parametrosBiologicos: [
    {
      id: "tbparametrosbiologicosfisicosagua",
      name: "tbparametrosbiologicosfisicosagua",
      description: "Parâmetros biológicos e físicos da água",
      colunas: [],
    },
    {
      id: "tbnutrientessedimento",
      name: "tbnutrientessedimento",
      description: "Nutrientes presentes no sedimento",
      colunas: [],
    },
    {
      id: "tbcarbono",
      name: "tbcarbono",
      description: "Medições de carbono",
      colunas: [],
    },
  ],

  localizacoesCampanhas: [
    {
      id: "tbinstituicao",
      name: "tbinstituicao",
      description: "Instituições participantes das campanhas",
      colunas: [],
    },
    {
      id: "tbreservatorio",
      name: "tbreservatorio",
      description: "Reservatórios de coleta",
      colunas: [],
    },
    {
      id: "tbcampanha",
      name: "tbcampanha",
      description: "Campanhas realizadas em campo",
      colunas: [],
    },
    {
      id: "tbsitio",
      name: "tbsitio",
      description: "Sítios de amostragem",
      colunas: [],
    },
    {
      id: "tbtabela",
      name: "tbtabela",
      description: "Metadados das tabelas disponíveis",
      colunas: [],
    },
    {
      id: "tbcampanhaportabela",
      name: "tbcampanhaportabela",
      description: "Relacionamento entre campanhas e tabelas",
      colunas: [],
    },
  ],
};

export default rawData;
