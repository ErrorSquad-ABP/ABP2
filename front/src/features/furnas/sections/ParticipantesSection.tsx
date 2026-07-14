import { JSX } from "react";
import { Block, BlockText, BlockTitle, Column, TwoColumnContainer } from "../ui/furnasContent";

export function ParticipantesSection(): JSX.Element {
  return (
    <>
      <TwoColumnContainer>
        <Column>
          <Block>
            <BlockTitle>Participantes</BlockTitle>
            <BlockText>
              <ul>
                <li>
                  <a href="https://www.furnas.com.br" target="_blank" rel="noopener noreferrer">
                    FURNAS Centrais Elétricas S.A.
                  </a>{" "}
                  – Coordenação do projeto.
                </li>
                <li>
                  <a href="https://coppe.ufrj.br" target="_blank" rel="noopener noreferrer">
                    Universidade Federal do Rio de Janeiro - COPPE
                  </a>{" "}
                  – Estimativa de fluxos de GHG (CO2, CH4 e N2) na interface água-atmosfera e
                  determinação do aporte e das taxas de sedimentação de carbono.
                </li>
                <li>
                  <a href="https://www2.ufjf.br/ufjf/" target="_blank" rel="noopener noreferrer">
                    Universidade Federal de Juiz de Fora
                  </a>{" "}
                  – Determinações da produção primária, metabolismo bacteriano e concentrações de
                  nutrientes na coluna d’água.
                </li>
                <li>
                  <a href="https://www.iie.com.br/" target="_blank" rel="noopener noreferrer">
                    Instituto Internacional de Ecologia e Gerenciamento Ambiental
                  </a>{" "}
                  – Estimativas de fluxos de GHG e das concentrações de carbono e nutrientes na
                  interface água-sedimento.
                </li>
                <li>
                  <a href="https://www.gov.br/inpe/pt-br" target="_blank" rel="noopener noreferrer">
                    Instituto Nacional de Pesquisas Espaciais
                  </a>{" "}
                  – Organização do banco de dados do projeto, instalação de plataformas telemétricas
                  de dados ambientais, estimativa de fluxos de GHG na interface água-atmosfera,
                  análise isotópica (CENA-USP) e modelagem dos fluxos de emissão de GHG.
                </li>
              </ul>
            </BlockText>
          </Block>
        </Column>
      </TwoColumnContainer>
    </>
  );
}
