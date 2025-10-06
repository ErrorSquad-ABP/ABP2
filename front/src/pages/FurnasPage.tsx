import React, { useState } from "react";
import styled from "styled-components";
import PanoramaImg from "../assets/panorama1.png";
import PanoramaImg2 from "../assets/panorama2.png";
import PanoramaImg3 from "../assets/panorama3.png";
import PanoramaImg4 from "../assets/panorama4.png";
// ================= Styled Components =================
const PageContainer = styled.div`
  flex: 1;
  width: 1149px;
  margin: 5px auto;
  font-family: "Calibri", "Arial", "Helvetica", "Verdana", "sans-serif";
  font-size: 15px;
  background-color: #f0f0f5;
  padding: 1.5rem;
`;

const Menu = styled.div`
  width: 100%;
  height: 25px;
  line-height: 25px;
  font-size: 16px;
  margin-bottom: 20px;
`;

const MenuItem = styled.span<{ active?: boolean }>`
  float: right;
  height: 25px;
  line-height: 25px;
  padding: 0px 7px;
  margin-right: 15px;
  cursor: ${(props) => (props.active ? "default" : "pointer")};
  color: ${(props) => (props.active ? "#333" : "#0081d8")};
  border-bottom: 2px solid ${(props) => (props.active ? "#333" : "transparent")};
  &:hover {
    border-bottom-color: ${(props) => (props.active ? "#333" : "#0081d8")};
  }
`;

const TwoColumnContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

const Column = styled.div`
  flex: 1;
  min-width: 500px;
`;

const Block = styled.div`
  background-color: #e3e8f0;
  padding: 15px;
  margin-bottom: 20px;
  border-radius: 6px;
`;

const BlockTitle = styled.div`
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
  font-size: 18px;
`;

const BlockText = styled.div`
  color: #222;
  text-align: justify;
  font-size: 15px;
  line-height: 1.5;
`;

// ================= Seções =================
const sections = [
  { id: "home", label: "Home" },
  { id: "panorama", label: "Panorama" },
  { id: "metodologia", label: "Metodologia" },
  { id: "banco-dados", label: "Banco de Dados" },
  { id: "resultados", label: "Resultados Esperados" },
  { id: "participantes", label: "Participantes" },
  { id: "usinas", label: "Usinas Hidrelétricas" },
  { id: "pesquisas", label: "Pesquisas Correlatas" },
  { id: "publicacoes", label: "Publicações" },
];

const FurnasPage: React.FC = () => {
  const [active, setActive] = useState("home");

  return (
    <PageContainer>
      {/* MENU */}
      <Menu>
        {sections.map((sec) => (
          <MenuItem key={sec.id} active={active === sec.id} onClick={() => setActive(sec.id)}>
            {sec.label}
          </MenuItem>
        ))}
      </Menu>

      {/* CONTEÚDO DA SEÇÃO ATIVA */}
      {active === "home" && (
        <TwoColumnContainer>
          <Column>
            <Block>
              <BlockTitle>Objetivos Gerais</BlockTitle>
              <BlockText>
                <ul>
                  <li>
                    Determinar as emissões de gases de efeito estufa dos reservatórios de FURNAS;
                  </li>
                  <li>Identificar as rotas do ciclo do carbono nesses reservatórios;</li>
                  <li>Avaliar fatores ambientais e operacionais na emissão de gases;</li>
                  <li>Determinar o padrão de emissão antes da construção de reservatórios;</li>
                  <li>
                    Elaborar modelo espacial e temporal de emissão de gases em ambientes de Cerrado.
                  </li>
                </ul>
              </BlockText>
            </Block>
          </Column>

          <Column>
            <Block>
              <BlockTitle>Introdução</BlockTitle>
              <BlockText>
                A crescente emissão de gases de efeito estufa, devido às atividades humanas, pode
                causar severas conseqüências ambientais em escalas regionais e global, tendendo a
                afetar mais os países em desenvolvimento, localizados em baixas latitudes, do que os
                países do hemisfério Norte.
              </BlockText>
              <BlockText>
                O Brasil, ao ratificar a Convenção Quadro das Nações Unidas sobre Mudanças do Clima,
                comprometeu-se a elaborar e atualizar inventários de suas fontes de emissão, bem
                como das remoções por sumidouros dos principais gases de efeito estufa (GHG): gás
                carbônico, metano e óxido nitroso. O conhecimento dessas fontes e sumidouros é o
                primeiro passo na busca de medidas mitigadoras.
              </BlockText>
              <BlockText>
                A partir da última década, a comunidade científica tem questionado se os
                reservatórios destinados à geração hidrelétrica contribuem substancialmente para o
                aumento do efeito estufa. Assim, tornam-se necessárias investigações nessa área.
                Além disso, é importante que o setor elétrico nacional verifique as opções
                disponíveis para redução das emissões de gases de efeito estufa por unidade de
                energia gerada, de modo que possa se qualificar para o mercado mundial das Reduções
                Certificadas de Emissão.
              </BlockText>
              <BlockText>
                O presente projeto constitui a etapa inicial na realização do balanço de carbono de
                FURNAS CENTRAIS ELÉTRICAS S.A., onde as emissões originadas dos reservatórios das
                usinas hidrelétricas poderão ser comparadas às emissões produzidas pela geração
                termelétrica e, então, contrastadas com o carbono fixado por meio dos projetos de
                reflorestamento da Empresa.
              </BlockText>
              <BlockText>
                Este projeto foi desenvolvido de acordo com a lei 9.991/2000, que estabelece um
                investimento mínimo anual de 1% de seu lucro líquido, das companhias geradoras de
                eletricidade, em pesquisa e desenvolvimento no setor elétrico. Os procedimentos para
                os projetos são determinados pela Agência Nacional de Energia Elétrica (ANEEL).
              </BlockText>
              <BlockText>
                <strong>Gerente do Projeto:</strong> André Carlos Prates Cimbleris – Tel:
                (21)2528-5436
              </BlockText>
            </Block>
          </Column>
        </TwoColumnContainer>
      )}

      {active === "panorama" && (
        <Block>
          <BlockTitle>Panorama</BlockTitle>
          <BlockText>
            <strong>Mudanças Climáticas Globais e Reservatórios de Hidrelétricas</strong>
            <ul>
              <li>
                Comissão Mundial de Barragens (WCD): quando geração hidrelétrica é inferior a 0,1 W
                por m2 de área de reservatório, as emissões podem exceder àquelas originadas de
                termelétricas;
              </li>
              <li>
                Emissões parecem variar em função da profundidade e densidade da biomassa alagada;
              </li>
              <li>
                O ciclo do carbono: deve ser avaliado antes e após a instalação da formação do
                reservatório. Estudos devem abordar as interações com as bacias de drenagem;
              </li>
              <li>
                Convenção Quadro das Nações Unidas sobre Mudança do Clima (UNFCCC): Compromisso de
                elaborar e atualizar periodicamente inventários nacionais de emissões antrópicas por
                fontes e das remoções por sumidouro;
              </li>
            </ul>
          </BlockText>
          <figure style={{ textAlign: "center", margin: "20px 0" }}>
            <img
              src={PanoramaImg}
              alt="Ciclo do carbono"
              style={{ maxWidth: "100%", borderRadius: "6px" }}
            />
            <figcaption style={{ fontSize: "13px", fontStyle: "italic", marginTop: "8px" }}>
              Vista esquemática mostrando os processos lentos e rápidos do ciclo de carbono. Aqui é
              mostrado como ocorre a velocidade de trocas de carbono entre reservatórios, afetando
              todo o ciclo.
            </figcaption>
          </figure>
          <BlockText>
            Os reservatórios de carbono têm tamanhos muito diferentes e sua importância também é
            relacionada aos tempos de permanência. Sendo assim, um reservatório menor pode ter uma
            importância maior que um reservatório maior. Por exemplo, o biota possui 0,1% do carbono
            aproximadamente na Terra, mas é naturalmente responsável pela grande maioria de fluxos.
          </BlockText>
          <BlockText>
            Porém, como as atividades humanas queimam combustíveis fósseis, liberando grandes
            quantias de carbono, que levou milhões de anos para ser despejada na atmosfera em
            questão de minutos.
          </BlockText>
          <figure style={{ textAlign: "center", margin: "20px 0" }}>
            <img
              src={PanoramaImg2}
              alt="Influência humana"
              style={{ maxWidth: "100%", borderRadius: "6px" }}
            />
            <figcaption style={{ fontSize: "13px", fontStyle: "italic", marginTop: "8px" }}>
              Indicadores da influencia humana na atmosfera desde a era industrial
            </figcaption>
          </figure>
          <BlockText>
            As mudanças climáticas têm sido um dos temas de relevância mundial na última década. O
            Painel Intergovernamental sobre Mudança do Clima (IPCC), criado em 1988 pelo Programa
            das Nações Unidas para o Meio Ambiente e pela Organização Meteorológica Mundial, é
            formado por cientistas de diversas nacionalidades, e vem realizando estudos sobre a
            alteração do clima planetário, suas conseqüências e a influência das atividades
            antrópicas em tais alterações. Os documentos que compõem o Terceiro Relatório de
            Avaliação do IPCC (“Climate Change 2001”), confirmam que o aquecimento global nos
            últimos 50 anos é conseqüência do aumento das concentrações de gases de efeito estufa
            (GEE), originado principalmente da queima de combustíveis fósseis. Como resultado, é
            prevista a ocorrência de eventos climáticos extremos e são esperados impactos na
            circulação e no volume (elevação do nível) dos oceanos, nos regimes pluviométricos, na
            agricultura e na estrutura e produtividade dos ecossistemas, com perda da biodiversidade
            e alterações nos ciclos do carbono e nutrientes.
          </BlockText>
          <BlockText>
            <p>
              Existe ainda muita controvérsia quanto à quantidade de GEE que é trocada entre o
              sistema Atmosfera-Terra, devida, em suma, às incertezas de natureza metodológica e do
              conhecimento incompleto sobre o acoplamento entre diferentes componentes dos sistemas.
              Estudos realizados na última década têm demonstrado que a cadeia alimentar de muitos
              ambientes aquáticos não é sustentada pelos organismos produtores (fitoplâncton), mas
              pelos organismos decompositores (bactérias) e pela entrada de matéria orgânica
              proveniente da bacia de drenagem (material alóctone). Considerando tal premissa,
              conclui-se que a fotossíntese não é a fonte principal de carbono desses ambientes, mas
              sim o ambiente circundante. E se a produção primária, baseada na fotossíntese, é menor
              que a atividade respiratória das bactérias, então tais sistemas não contribuem para a
              fixação do carbono atmosférico. Pelo contrário, tornam-se fontes emissoras de gás
              carbônico. Essa abordagem do funcionamento dos sistemas aquáticos é relativamente nova
              e muitos estudos e equipamentos ainda estão sendo desenvolvidos para a avaliação das
              taxas de respiração bacteriana em comparação com a produção fotossintética. No rastro
              desse novo enfoque limnológico, passou-se a questionar a geração de energia
              hidrelétrica como fonte "limpa", já que os reservatórios incorporam grandes
              quantidades da biomassa vegetal que cobria a bacia de acumulação. Cogitou-se que a
              decomposição dessa imensa fonte de carbono seria responsável por emissões de gases de
              efeito estufa em níveis equivalentes aos de termelétricas de mesma potência.
            </p>
          </BlockText>
          <BlockText>
            <p>
              De fato, pesquisas recentes sobre a produção e emissão de GEE em reservatórios têm
              demonstrado que estes sistemas apresentam emissões consideráveis, particularmente de
              metano (CH4), gás carbônico (CO2) e óxido nitroso (N2O). Neste sentido, o Brasil vem
              realizando inventários nacionais sobre as emissões de GEE (www.mct.gov.br). Com
              relação à geração hidrelétrica, inicialmente, foram consideradas apenas as emissões de
              CH4 dos reservatórios, as quais estão vinculadas ao desflorestamento e mudanças no uso
              da terra. FURNAS, por meio de contrato com a COPPE, contribuiu de maneira
              significativa para este inventário e a compreensão das emissões em reservatórios,
              realizando medições no reservatório de Serra da Mesa ainda na fase de enchimento.
              Neste estudo, foram medidas não só as emissões de CH4, como também as emissões de gás
              carbônico dissolvido, incluindo a medição da concentração de gases dissolvidos em
              diferentes profundidades. Os resultados confirmaram que as emissões de gás carbônico
              eram cerca de dez vezes superior ao das emissões de metano, e que grandes
              concentrações de ambos os gases estavam retidas no hipolímnio, como produto da
              decomposição anaeróbia da vegetação alagada. Outra contribuição importante deste
              trabalho foi a utilização da curva cota-área do reservatório para o cálculo da emissão
              de metano, já que foi observado que não se registravam emissões em profundidades
              superiores a 40 metros. Desta forma os cálculos ficaram mais precisos que a
              extrapolação pura e simples para toda a área do espelho d’água.
            </p>
          </BlockText>
          <BlockText>
            <p>
              Além da COPPE, outras instituições brasileiras de pesquisa têm se direcionado ao
              estudo das emissões de GEE por reservatórios, a destacar o INPE-CENA (Lima & Novo,
              1999; Lima, 2002) e o INPA (Fearnside, 2002). Devido à discrepância entre os valores
              médios de fluxos que têm sido obtidos pelas diferentes instituições, resultante, em
              suma, da diversidade metodológica de coleta dos dados e da natureza muitas vezes não
              linear dos processos de emissão, percebe-se a necessidade da realização de estudos que
              propiciem o aperfeiçoamento e padronização de métodos. O estado-da-arte indica que, em
              casos onde a geração hidrelétrica é inferior à 0,1 W por metro quadrado de área de
              reservatório, existe a possibilidade das emissões de GEE serem superiores àquelas que
              seriam originadas de uma termelétrica gerando uma quantidade de energia equivalente
              (Rosa & dos Santos, 2000).
            </p>
          </BlockText>
          <BlockText>
            <p>
              A Comissão Mundial sobre Barragens (www.dams.org) tem ressaltado que apesar da
              constatação da emissão de GEE, é preciso considerar o modo com que o sistema anterior
              à construção da barragem se comportava quanto às trocas de GHG com a atmosfera. Sendo
              assim, torna-se necessário o cálculo de um balanço de quanto o reservatório irá emitir
              no seu curso de vida, e quanto o sistema anterior emitiria naturalmente neste mesmo
              período. Neste sentido, o presente projeto tem por principais questões a serem
              investigadas:
            </p>
          </BlockText>
          <BlockText>
            <p>
              Este projeto está dimensionado para ser desenvolvido por seis anos, período em que
              serão realizadas medições em todos os reservatórios da empresa. Os estudos serão
              desenvolvidos em dois reservatórios por ano de forma a que todos sejam incluídos no
              projeto, na ordem:
            </p>
          </BlockText>
          <BlockText>
            <ol style={{ paddingLeft: "20px" }}>
              <li>1º ano: UHE Serra da Mesa e APM Manso;</li>
              <li>2º ano: UHE Itumbiara e UHE Corumbá;</li>
              <li>3º ano: UHE Marimbondo e UHE Porto Colômbia;</li>
              <li>4º ano: UHE L.C.B. de Carvalho e UHE Mascarenhas de Morais; UHE Furnas;</li>
              <li>5º ano: UHE Funil e APM Manso;</li>
              <li>6º ano: Desenvolvimento de modelos e elaboração de relatório final.</li>
            </ol>
          </BlockText>
          <BlockText>
            <p>
              As emissões de carbono pelo APM Manso deverão ser remensuradas no quinto ano para que
              seja avaliado o efeito do tempo sobre as taxas obtidas naquele reservatório ainda em
              fase de estabilização.
            </p>
          </BlockText>
          <BlockText>
            <p>Serão elaborados os seguintes documentos:</p>
          </BlockText>
          <BlockText>
            <li>
              relatórios de andamento, apresentando os resultados obtidos nas duas primeiras viagens
              de campo de cada grupo de reservatórios, a serem apresentados nos meses de julho e
              outubro;
            </li>
            <li>
              {" "}
              relatórios anuais concluindo sobre as emissões e os fatores predominantes do ciclo de
              carbono de cada reservatório; a serem apresentados no mês de março de cada ano;
            </li>
            <li>
              relatório síntese apresentando as conclusões gerais do projeto: o balanço do carbono
              nos reservatórios de FURNAS Centrais Elétricas S.A,
            </li>
          </BlockText>
          <BlockText>
            <p>
              O diagrama abaixo sintetiza o conjunto de atividades a serem desenvolvidas em cada
              reservatório.
            </p>
          </BlockText>
          <BlockText>
            <figure style={{ textAlign: "center", margin: "20px 0" }}>
              <img
                src={PanoramaImg3}
                alt="Efeito estufa"
                style={{ maxWidth: "100%", borderRadius: "6px" }}
              />
              <figcaption
                style={{ fontSize: "13px", fontStyle: "italic", marginTop: "8px" }}
              ></figcaption>
            </figure>
          </BlockText>
          <BlockText>
            <div>
              <strong>O efeito estufa</strong>
            </div>
          </BlockText>
          <BlockText>
            <figure style={{ textAlign: "center", margin: "20px 0" }}>
              <img
                src={PanoramaImg4}
                alt="Ciclo do carbono"
                style={{ maxWidth: "100%", borderRadius: "6px" }}
              />
              <figcaption
                style={{ fontSize: "13px", fontStyle: "italic", marginTop: "8px" }}
              ></figcaption>
            </figure>
          </BlockText>
        </Block>
      )}

      {active === "metodologia" && (
        <Block>
          <BlockTitle>Metodologia</BlockTitle>
          <BlockText>
            O projeto será composto por quatro subprojetos a serem desenvolvidos em paralelo:
          </BlockText>

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

            <BlockText>
              <strong>Variáveis monitoradas:</strong>
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

          {/* Subprojeto 2 */}
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

          {/* Subprojeto 3 */}
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

          {/* Subprojeto 4 */}
          <Block>
            <BlockTitle>
              4. Estimativa de Fluxos de CO₂, CH₄ e N₂ na interface água-sedimento
            </BlockTitle>
            <BlockText>
              Os sedimentos são responsáveis pela produção significativa de gases de efeito estufa
              em ambientes aquáticos. Serão coletadas amostras para análise de CO₂, CH₄, N₂,
              oxigênio e argônio, utilizando técnicas de cromatografia gasosa e medidas isotópicas.
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
        </Block>
      )}

      {active === "banco-dados" && (
        <Block>
          <BlockTitle>Banco de Dados</BlockTitle>
          <BlockText>Conteúdo da seção Banco de Dados...</BlockText>
        </Block>
      )}

      {active === "resultados" && (
        <Block>
          <BlockTitle>Resultados Esperados</BlockTitle>
          <BlockText>Conteúdo da seção Resultados Esperados...</BlockText>
        </Block>
      )}

      {active === "participantes" && (
        <Block>
          <BlockTitle>Participantes</BlockTitle>
          <BlockText>Conteúdo da seção Participantes...</BlockText>
        </Block>
      )}

      {active === "usinas" && (
        <Block>
          <BlockTitle>Usinas Hidrelétricas</BlockTitle>
          <BlockText>Conteúdo da seção Usinas Hidrelétricas...</BlockText>
        </Block>
      )}

      {active === "pesquisas" && (
        <Block>
          <BlockTitle>Pesquisas Correlatas</BlockTitle>
          <BlockText>Conteúdo da seção Pesquisas Correlatas...</BlockText>
        </Block>
      )}

      {active === "publicacoes" && (
        <Block>
          <BlockTitle>Publicações</BlockTitle>
          <BlockText>Conteúdo da seção Publicações...</BlockText>
        </Block>
      )}
    </PageContainer>
  );
};

export default FurnasPage;
