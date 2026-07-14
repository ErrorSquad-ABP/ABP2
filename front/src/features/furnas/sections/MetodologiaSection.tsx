import { JSX } from "react";
import { Block, BlockText, BlockTitle, Column, TwoColumnContainer } from "../ui/furnasContent";

export function MetodologiaSection(): JSX.Element {
  return (
    <>
      <TwoColumnContainer>
        <Column>
          <Block>
            <BlockTitle>Metodologia</BlockTitle>
            <BlockText>
              O projeto será composto por quatro subprojetos a serem desenvolvidos em paralelo:
            </BlockText>
          </Block>

          <Block>
            <BlockTitle>Variáveis monitoradas:</BlockTitle>
            <BlockText>
              <ul style={{ paddingLeft: "20px" }}>
                <li>
                  <strong>Água:</strong> temperatura, pH, turbidez, oxigênio e CO₂ dissolvidos,
                  condutividade, nitrato, amônia, profundidade relativa.
                </li>
                <li>
                  <strong>Atmosfera:</strong> temperatura do ar, pressão atmosférica, radiação
                  solar, direção e intensidade do vento, corrente e profundidade relativa.
                </li>
              </ul>
            </BlockText>
          </Block>
        </Column>
        <Column>
          {/* Subprojeto 1 */}
          <Block>
            <BlockTitle>
              1. Aquisição de dados micrometeorológicos e limnológicos em tempo real
            </BlockTitle>
            <BlockText>
              O Sistema Integrado de Monitoração Ambiental - SIMA - é um conjunto de hardware e
              software desenhado para a coleta de dados e a monitoração em tempo real de sistemas
              hidrológicos. Para a coleta dos dados, o SIMA faz uso de um sistema autônomo fundeado,
              constituído de um toróide, onde são instalados sensores, eletrônica de armazenamento,
              bateria, painel solar e antena de transmissão. Os dados coletados em intervalo de
              tempo pré-programado são transmitidos via satélite, em tempo quase real, para um
              usuário que pode estar situado até 2500 km distante do ponto de coleta. A associação
              destas componentes fornece uma poderosa ferramenta que pode ser empregada no
              gerenciamento e controle ambiental de recursos hídricos. Esse sistema foi desenvolvido
              a partir de uma parceria entre a Universidade do Vale do Paraíba e o INPE. A partir de
              1995, o projeto foi transferido para a Neuron Engenharia Ltda. Através de uma parceria
              com a Diretoria de Hidrografia e Navegação (DHN) a Neuron construiu um protótipo do
              SIMA, que ficou fundeado em águas do litoral do Rio de Janeiro durante um ano e os
              dados coletados foram disponibilizados pelo Programa Nacional de Bóia. Os dados
              coletados neste período foram comparados com dados in situ, o que confirmou o bom
              desempenho do sistema.
            </BlockText>
          </Block>
        </Column>
      </TwoColumnContainer>

      {/* Subprojeto 2 */}
      <TwoColumnContainer>
        <Column>
          <Block>
            <BlockTitle>
              2. Estimativa de Fluxos de CO₂, CH₄ e N₂O na interface água-atmosfera e coluna d’água
            </BlockTitle>
            <BlockText>
              O monitoramento envolve coletas de amostras de gases emitidos na interface
              água-atmosfera, tanto sob a forma de bolhas como por difusão, utilizando funis de
              captação e câmaras de difusão.
            </BlockText>
            <BlockText>
              <strong>Regiões estudadas:</strong>
              <ul style={{ paddingLeft: "20px" }}>
                <li>Próximo à barragem (áreas profundas e desmatadas previamente).</li>
                <li>Regiões abrigadas com vegetação não desmatada.</li>
                <li>Áreas de tributários com maior carga orgânica e presença de macrófitas.</li>
                <li>Região a jusante (água turbinada).</li>
              </ul>
            </BlockText>
          </Block>
        </Column>

        {/* Subprojeto 3 */}
        <Column>
          <Block>
            <BlockTitle>3. Ciclo do Carbono na coluna d’água</BlockTitle>
            <BlockText>
              O estudo visa compreender os processos de respiração, fotossíntese e produção
              bacteriana que regulam os fluxos de carbono em ecossistemas aquáticos, diferenciando
              sistemas autotróficos (produção &gt; respiração) de heterotróficos (respiração &gt;
              produção).
            </BlockText>
            <BlockText>
              <strong>Dados obtidos:</strong>
              <ul style={{ paddingLeft: "20px" }}>
                <li>Estoques biológicos de carbono (fitoplâncton e bactérias).</li>
                <li>Produção primária, produção bacteriana e respiração planctônica.</li>
                <li>
                  Parâmetros ambientais (DOC, DIC, POC, nutrientes, clorofila-a, pH, oxigênio,
                  turbidez, temperatura).
                </li>
                <li>Entrada de material alóctone a partir dos tributários.</li>
              </ul>
            </BlockText>
          </Block>
        </Column>
      </TwoColumnContainer>

      {/* Subprojeto 4 */}
      <Block>
        <BlockTitle>
          4. Estimativa de Fluxos de CO₂, CH₄ e N₂ na interface água-sedimento
        </BlockTitle>
        <BlockText>
          Os sedimentos são responsáveis pela produção significativa de gases de efeito estufa em
          ambientes aquáticos. Serão coletadas amostras para análise de CO₂, CH₄, N₂, oxigênio e
          argônio, utilizando técnicas de cromatografia gasosa e medidas isotópicas.
        </BlockText>
        <BlockText>
          <strong>Objetivos:</strong>
          <ul style={{ paddingLeft: "20px" }}>
            <li>Quantificar fluxos difusivos de gases na interface água-sedimento.</li>
            <li>Avaliar perda de gases para a coluna d’água e atmosfera.</li>
            <li>Medir potencial de desoxigenação e denitrificação.</li>
            <li>Estudar a composição isotópica do carbono e nitrogênio nos sedimentos.</li>
          </ul>
        </BlockText>
      </Block>
    </>
  );
}
