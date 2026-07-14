import { JSX } from "react";
import { Block, BlockText, BlockTitle, Column, TwoColumnContainer } from "../ui/balcarContent";

export function HomeSection(): JSX.Element {
  return (
    <TwoColumnContainer>
      <Column>
        <Block>
          <BlockTitle> Portal</BlockTitle>
          <BlockText>
            Este portal constitui a interface de acesso aos dados do Projeto Balanço de Carbono nos
            Reservatórios de FURNAS Centrais Elétricas S.A. A base de dados é formada por coletas in
            situ de equipes que tinham como objetivo obter dados para: determinar as emissões de
            gases de efeito estufa: gás carbônico, metano e óxido nitroso, dos reservatórios das
            hidrelétricas; identificar as rotas do ciclo do carbono nesses reservatórios e os
            fatores ambientais envolvidos; avaliar a influência dos fatores morfológicos,
            morfométricos, biogeoquímicos e operacionais dos reservatórios na emissão de gases de
            efeito estufa; determinar o padrão de emissão existente, anteriormente à construção de
            reservatórios; elaborar um modelo espacial e temporal de emissão de gases para
            reservatórios implantados em ambientes de cerrado. A interface de acesso permite
            personalizar consultas aos dados para o download, visualização em tabelas dinâmicas e
            visualizar a distribuição espacial dos dados em mapa interativo do Google Maps.
          </BlockText>
        </Block>

        <Block>
          <BlockTitle>Fomento </BlockTitle>
          <BlockText>
            Os recursos utilizados para a coleta da base de dados foram fornecidos por FURNAS
            Centrais Elétricas S.A. no âmbito da lei 9.991/2000, que estabelece um investimento
            mínimo anual de 1% de seu lucro líquido, das companhias geradoras de eletricidade, em
            pesquisa e desenvolvimento no setor elétrico. Os procedimentos para os projetos são
            determinados pela Agência Nacional de Energia Elétrica (ANEEL).
          </BlockText>
        </Block>
      </Column>

      <Column>
        <Block>
          <BlockTitle>Participantes</BlockTitle>
          <BlockText>
            <ul style={{ listStyle: "none" }}>
              <li>FURNAS Centrais Elétricas S.A.</li>
              <li>IIE - Instituto Internacional de EcologiaINPE</li>
              <li>Instituto Nacional de Pesquisas EspaciaisUFJF</li>
              <li>Universidade Federal de Juiz de ForaUFRJ/COPPE</li>
              <li>
                Distribuição dos dados: este portal é usado para a consulta e visualização dos dados
                armazenados;
              </li>
              <li>Universidade Federal do Rio de Janeiro</li>
            </ul>
          </BlockText>
        </Block>

        <Block>
          <BlockTitle> Dados Armazenados</BlockTitle>
          <BlockText style={{ overflowY: "auto", maxHeight: "80vh", paddingRight: "10px" }}>
            <div style={{ gap: "7px" }}></div>
            Os dados são formados por coletas realizadas em 79 campanhas com datas e localidades
            (reservatórios) distintos com o objetivo de coletar parâmetros na interface
            água-sedimento, coluna d’água e interface água-atmosfera. Mais detalhes sobre a base de
            dados podem ser encontrados em "descrição". Cada instituição participante tinha como
            objetivo estudar uma componente, e por consequência fazer leituras de parâmetros
            relacionados:
            <ul>
              <li>
                IIE: estimativas de fluxos de gases de efeito estufa e das concentrações de carbono
                e nutrientes na interface água-sedimento;
              </li>
              <li>
                INPE: fluxos de gases metano (CH4) e dióxido de carbono (CO2) na interface
                água-atmosfera;
              </li>
              <li>
                UFJF: determinação da produção primária, metabolismo bacteriano e concentrações de
                nutrientes na coluna d’água;
              </li>
              <li>
                UFRJ/COPPE: estimativa de fluxos de gases de efeito estufa na interface
                água-atmosfera e determinação do aporte e das taxas de sedimentação de carbono.
              </li>
            </ul>
          </BlockText>
        </Block>
      </Column>
    </TwoColumnContainer>
  );
}
