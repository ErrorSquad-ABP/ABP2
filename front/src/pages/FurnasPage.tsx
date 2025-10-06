import React, { useState } from "react";
import styled from "styled-components";
import PanoramaImg from "../assets/panorama1.png";
import PanoramaImg2 from "../assets/panorama2.png";
import PanoramaImg3 from "../assets/panorama3.png";
import PanoramaImg4 from "../assets/panorama4.png";
import UsinasImg1 from "../assets/usinashidreletricas1.png";
import UsinasImg2 from "../assets/usinashidreletricas2.png";
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

const Image = styled.img`
  width: 100%;
  max-width: 600px; /* Reduzi o tamanho máximo */
  margin: 15px auto;
  display: block;
  border-radius: 6px;
`;



// ================= Seções =================
const sections = [
  { id: "home", label: "Home" },
  { id: "panorama", label: "Panorama" },
  { id: "metodologia", label: "Metodologia" },
  { id: "banco", label: "Banco de Dados", external: true, url: "http://www.dpi.inpe.br/sima/" }, // vírgula corrigida aqui
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
        {sections.map((sec) =>
          sec.external ? (
            <MenuItem key={sec.id}>
              <a
                href={sec.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                {sec.label}
              </a>
            </MenuItem>
          ) : (
            <MenuItem
              key={sec.id}
              active={active === sec.id}
              onClick={() => setActive(sec.id)}
            >
              {sec.label}
            </MenuItem>
          )
        )}
      </Menu>

      {/* CONTEÚDO DA SEÇÃO ATIVA */}
      {active === "home" && (
        <TwoColumnContainer>
          <Column>
            <Block>
              <BlockTitle>Objetivos Gerais</BlockTitle>
              <BlockText>
                <ul>
                  <li>Determinar as emissões de gases de efeito estufa dos reservatórios de FURNAS;</li>
                  <li>Identificar as rotas do ciclo do carbono nesses reservatórios;</li>
                  <li>Avaliar fatores ambientais e operacionais na emissão de gases;</li>
                  <li>Determinar o padrão de emissão antes da construção de reservatórios;</li>
                  <li>Elaborar modelo espacial e temporal de emissão de gases em ambientes de Cerrado.</li>
                </ul>
              </BlockText>
            </Block>
          </Column>

          <Column>
            <Block>
              <BlockTitle>Introdução</BlockTitle>
              <BlockText>
                A crescente emissão de gases de efeito estufa, devido às atividades humanas, pode causar severas conseqüências ambientais em escalas regionais e global, tendendo a afetar mais os países em desenvolvimento, localizados em baixas latitudes, do que os países do hemisfério Norte.
              </BlockText>
              <BlockText>
                O Brasil, ao ratificar a Convenção Quadro das Nações Unidas sobre Mudanças do Clima, comprometeu-se a elaborar e atualizar inventários de suas fontes de emissão, bem como das remoções por sumidouros dos principais gases de efeito estufa (GHG): gás carbônico, metano e óxido nitroso. O conhecimento dessas fontes e sumidouros é o primeiro passo na busca de medidas mitigadoras.
              </BlockText>
              <BlockText>
                A partir da última década, a comunidade científica tem questionado se os reservatórios destinados à geração hidrelétrica contribuem substancialmente para o aumento do efeito estufa. Assim, tornam-se necessárias investigações nessa área. Além disso, é importante que o setor elétrico nacional verifique as opções disponíveis para redução das emissões de gases de efeito estufa por unidade de energia gerada, de modo que possa se qualificar para o mercado mundial das Reduções Certificadas de Emissão.
              </BlockText>
              <BlockText>
                O presente projeto constitui a etapa inicial na realização do balanço de carbono de FURNAS CENTRAIS ELÉTRICAS S.A., onde as emissões originadas dos reservatórios das usinas hidrelétricas poderão ser comparadas às emissões produzidas pela geração termelétrica e, então, contrastadas com o carbono fixado por meio dos projetos de reflorestamento da Empresa.
              </BlockText>
              <BlockText>
                Este projeto foi desenvolvido de acordo com a lei 9.991/2000, que estabelece um investimento mínimo anual de 1% de seu lucro líquido, das companhias geradoras de eletricidade, em pesquisa e desenvolvimento no setor elétrico.
Os procedimentos para os projetos são determinados pela Agência Nacional de Energia Elétrica (ANEEL).
              </BlockText>
              <BlockText>
                <strong>Gerente do Projeto:</strong> André Carlos Prates Cimbleris – Tel: (21)2528-5436
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
              <li>Comissão Mundial de Barragens (WCD): quando geração hidrelétrica é inferior a 0,1 W por m2 de área de reservatório, as emissões podem exceder àquelas originadas de termelétricas;</li>
              <li>Emissões parecem variar em função da profundidade e densidade da biomassa alagada;</li>
              <li>O ciclo do carbono: deve ser avaliado antes e após a instalação da formação do reservatório. Estudos devem abordar as interações com as bacias de drenagem;</li>
              <li>Convenção Quadro das Nações Unidas sobre Mudança do Clima (UNFCCC): Compromisso de elaborar e atualizar periodicamente inventários nacionais de emissões antrópicas por fontes e das remoções por sumidouro;</li>
            </ul>
          </BlockText>
          <figure style={{ textAlign: "center", margin: "20px 0" }}>
            <img src={PanoramaImg} alt="Ciclo do carbono" style={{ maxWidth: "100%", borderRadius: "6px" }} />
            <figcaption style={{ fontSize: "13px", fontStyle: "italic", marginTop: "8px" }}>
              Vista esquemática mostrando os processos lentos e rápidos do ciclo de carbono. Aqui é mostrado como ocorre a velocidade de trocas de carbono entre reservatórios, afetando todo o ciclo.
            </figcaption>
          </figure>
          <BlockText>
            Os reservatórios de carbono têm tamanhos muito diferentes e sua importância também é relacionada aos tempos de permanência. Sendo assim, um reservatório menor pode ter uma importância maior que um reservatório maior. Por exemplo, o biota possui 0,1% do carbono aproximadamente na Terra, mas é naturalmente responsável pela grande maioria de fluxos.
          </BlockText>
          <BlockText>
            Porém, como as atividades humanas queimam combustíveis fósseis, liberando grandes quantias de carbono, que levou milhões de anos para ser despejada na atmosfera em questão de minutos.
          </BlockText>
          <figure style={{ textAlign: "center", margin: "20px 0" }}>
            <img src={PanoramaImg2} alt="Influência humana" style={{ maxWidth: "100%", borderRadius: "6px" }} />
            <figcaption style={{ fontSize: "13px", fontStyle: "italic", marginTop: "8px" }}>
              Indicadores da influencia humana na atmosfera desde a era industrial
            </figcaption>
          </figure>
          <BlockText>
            As mudanças climáticas têm sido um dos temas de relevância mundial na última década. O Painel Intergovernamental sobre Mudança do Clima (IPCC), criado em 1988 pelo Programa das Nações Unidas para o Meio Ambiente e pela Organização Meteorológica Mundial, é formado por cientistas de diversas nacionalidades, e vem realizando estudos sobre a alteração do clima planetário, suas conseqüências e a influência das atividades antrópicas em tais alterações. Os documentos que compõem o Terceiro Relatório de Avaliação do IPCC (“Climate Change 2001”), confirmam que o aquecimento global nos últimos 50 anos é conseqüência do aumento das concentrações de gases de efeito estufa (GEE), originado principalmente da queima de combustíveis fósseis. Como resultado, é prevista a ocorrência de eventos climáticos extremos e são esperados impactos na circulação e no volume (elevação do nível) dos oceanos, nos regimes pluviométricos, na agricultura e na estrutura e produtividade dos ecossistemas, com perda da biodiversidade e alterações nos ciclos do carbono e nutrientes.
          </BlockText>
          <BlockText>
            <p>Existe ainda muita controvérsia quanto à quantidade de GEE que é trocada entre o sistema Atmosfera-Terra, devida, em suma, às incertezas de natureza metodológica e do conhecimento incompleto sobre o acoplamento entre diferentes componentes dos sistemas. Estudos realizados na última década têm demonstrado que a cadeia alimentar de muitos ambientes aquáticos não é sustentada pelos organismos produtores (fitoplâncton), mas pelos organismos decompositores (bactérias) e pela entrada de matéria orgânica proveniente da bacia de drenagem (material alóctone). Considerando tal premissa, conclui-se que a fotossíntese não é a fonte principal de carbono desses ambientes, mas sim o ambiente circundante. E se a produção primária, baseada na fotossíntese, é menor que a atividade respiratória das bactérias, então tais sistemas não contribuem para a fixação do carbono atmosférico. Pelo contrário, tornam-se fontes emissoras de gás carbônico. Essa abordagem do funcionamento dos sistemas aquáticos é relativamente nova e muitos estudos e equipamentos ainda estão sendo desenvolvidos para a avaliação das taxas de respiração bacteriana em comparação com a produção fotossintética. No rastro desse novo enfoque limnológico, passou-se a questionar a geração de energia hidrelétrica como fonte "limpa", já que os reservatórios incorporam grandes quantidades da biomassa vegetal que cobria a bacia de acumulação. Cogitou-se que a decomposição dessa imensa fonte de carbono seria responsável por emissões de gases de efeito estufa em níveis equivalentes aos de termelétricas de mesma potência.</p>
          </BlockText>
          <BlockText>
            <p>De fato, pesquisas recentes sobre a produção e emissão de GEE em reservatórios têm demonstrado que estes sistemas apresentam emissões consideráveis, particularmente de metano (CH4), gás carbônico (CO2) e óxido nitroso (N2O). Neste sentido, o Brasil vem realizando inventários nacionais sobre as emissões de GEE (www.mct.gov.br). Com relação à geração hidrelétrica, inicialmente, foram consideradas apenas as emissões de CH4 dos reservatórios, as quais estão vinculadas ao desflorestamento e mudanças no uso da terra. FURNAS, por meio de contrato com a COPPE, contribuiu de maneira significativa para este inventário e a compreensão das emissões em reservatórios, realizando medições no reservatório de Serra da Mesa ainda na fase de enchimento. Neste estudo, foram medidas não só as emissões de CH4, como também as emissões de gás carbônico dissolvido, incluindo a medição da concentração de gases dissolvidos em diferentes profundidades. Os resultados confirmaram que as emissões de gás carbônico eram cerca de dez vezes superior ao das emissões de metano, e que grandes concentrações de ambos os gases estavam retidas no hipolímnio, como produto da decomposição anaeróbia da vegetação alagada. Outra contribuição importante deste trabalho foi a utilização da curva cota-área do reservatório para o cálculo da emissão de metano, já que foi observado que não se registravam emissões em profundidades superiores a 40 metros. Desta forma os cálculos ficaram mais precisos que a extrapolação pura e simples para toda a área do espelho d’água.</p>
          </BlockText>
          <BlockText>
            <p>Além da COPPE, outras instituições brasileiras de pesquisa têm se direcionado ao estudo das emissões de GEE por reservatórios, a destacar o INPE-CENA (Lima & Novo, 1999; Lima, 2002) e o INPA (Fearnside, 2002). Devido à discrepância entre os valores médios de fluxos que têm sido obtidos pelas diferentes instituições, resultante, em suma, da diversidade metodológica de coleta dos dados e da natureza muitas vezes não linear dos processos de emissão, percebe-se a necessidade da realização de estudos que propiciem o aperfeiçoamento e padronização de métodos. O estado-da-arte indica que, em casos onde a geração hidrelétrica é inferior à 0,1 W por metro quadrado de área de reservatório, existe a possibilidade das emissões de GEE serem superiores àquelas que seriam originadas de uma termelétrica gerando uma quantidade de energia equivalente (Rosa & dos Santos, 2000).</p>
          </BlockText>
          <BlockText>
            <p>A Comissão Mundial sobre Barragens (www.dams.org) tem ressaltado que apesar da constatação da emissão de GEE, é preciso considerar o modo com que o sistema anterior à construção da barragem se comportava quanto às trocas de GHG com a atmosfera. Sendo assim, torna-se necessário o cálculo de um balanço de quanto o reservatório irá emitir no seu curso de vida, e quanto o sistema anterior emitiria naturalmente neste mesmo período. Neste sentido, o presente projeto tem por principais questões a serem investigadas:</p>
          </BlockText>
          <BlockText>
            <p>Este projeto está dimensionado para ser desenvolvido por seis anos, período em que serão realizadas medições em todos os reservatórios da empresa. Os estudos serão desenvolvidos em dois reservatórios por ano de forma a que todos sejam incluídos no projeto, na ordem:</p>
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
          <p>As emissões de carbono pelo APM Manso deverão ser remensuradas no quinto ano para que seja avaliado o efeito do tempo sobre as taxas obtidas naquele reservatório ainda em fase de estabilização.</p>
        </BlockText>
        <BlockText>
          <p>Serão elaborados os seguintes documentos:</p>
        </BlockText>
        <BlockText>
          <li>relatórios de andamento, apresentando os resultados obtidos nas duas primeiras viagens de campo de cada grupo de reservatórios, a serem apresentados nos meses de julho e outubro;</li>
          <li> relatórios anuais concluindo sobre as emissões e os fatores predominantes do ciclo de carbono de cada reservatório; a serem apresentados no mês de março de cada ano;</li>
          <li>relatório síntese apresentando as conclusões gerais do projeto: o balanço do carbono nos reservatórios de FURNAS Centrais Elétricas S.A,</li>
        </BlockText>
        <BlockText>
          <p>O diagrama abaixo sintetiza o conjunto de atividades a serem desenvolvidas em cada reservatório.</p>
        </BlockText>
        <BlockText>
          <figure style={{ textAlign: "center", margin: "20px 0" }}>
            <img src={PanoramaImg3} alt="Efeito estufa" style={{ maxWidth: "100%", borderRadius: "6px" }} />
            <figcaption style={{ fontSize: "13px", fontStyle: "italic", marginTop: "8px" }}>
            </figcaption>
          </figure>
        </BlockText>
        <BlockText>
          <div><strong>O efeito estufa</strong></div>
        </BlockText>
        <BlockText>
          <figure style={{ textAlign: "center", margin: "20px 0" }}>
            <img src={PanoramaImg4} alt="Ciclo do carbono" style={{ maxWidth: "100%", borderRadius: "6px" }} />
            <figcaption style={{ fontSize: "13px", fontStyle: "italic", marginTop: "8px" }}>
            </figcaption>
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
    <BlockTitle>1. Aquisição de dados micrometeorológicos e limnológicos em tempo real</BlockTitle>
    <BlockText>
      O Sistema Integrado de Monitoração Ambiental - SIMA - é um conjunto de hardware e software desenhado para a coleta de dados e a monitoração em tempo real de sistemas hidrológicos. Para a coleta dos dados, o SIMA faz uso de um sistema autônomo fundeado, constituído de um toróide, onde são instalados sensores, eletrônica de armazenamento, bateria, painel solar e antena de transmissão. Os dados coletados em intervalo de tempo pré-programado são transmitidos via satélite, em tempo quase real, para um usuário que pode estar situado até 2500 km distante do ponto de coleta. A associação destas componentes fornece uma poderosa ferramenta que pode ser empregada no gerenciamento e controle ambiental de recursos hídricos.  Esse sistema foi desenvolvido a partir de uma parceria entre a Universidade do Vale do Paraíba e o INPE. A partir de 1995, o projeto foi transferido para a Neuron Engenharia Ltda. Através de uma parceria com a Diretoria de Hidrografia e Navegação (DHN) a Neuron construiu um protótipo do SIMA, que ficou fundeado em águas do litoral do Rio de Janeiro durante um ano e os dados coletados foram disponibilizados pelo Programa Nacional de Bóia. Os dados coletados neste período foram comparados com dados in situ, o que confirmou o bom desempenho do sistema. 
    </BlockText>

    <BlockText>
      <strong>Variáveis monitoradas:</strong>
      <ul style={{ paddingLeft: "20px" }}>
        <li><strong>Água:</strong> temperatura, pH, turbidez, oxigênio e CO₂ dissolvidos, condutividade, nitrato, amônia, profundidade relativa.</li>
        <li><strong>Atmosfera:</strong> temperatura do ar, pressão atmosférica, radiação solar, direção e intensidade do vento, corrente e profundidade relativa.</li>
      </ul>
    </BlockText>
  </Block>

  {/* Subprojeto 2 */}
  <Block>
    <BlockTitle>2. Estimativa de Fluxos de CO₂, CH₄ e N₂O na interface água-atmosfera e coluna d’água</BlockTitle>
    <BlockText>
      O monitoramento envolve coletas de amostras de gases emitidos na interface água-atmosfera, 
      tanto sob a forma de bolhas como por difusão, utilizando funis de captação e câmaras de difusão.
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
      O estudo visa compreender os processos de respiração, fotossíntese e produção bacteriana
      que regulam os fluxos de carbono em ecossistemas aquáticos, diferenciando sistemas autotróficos
      (produção &gt; respiração) de heterotróficos (respiração &gt; produção).
    </BlockText>
    <BlockText>
      <strong>Dados obtidos:</strong>
      <ul style={{ paddingLeft: "20px" }}>
        <li>Estoques biológicos de carbono (fitoplâncton e bactérias).</li>
        <li>Produção primária, produção bacteriana e respiração planctônica.</li>
        <li>Parâmetros ambientais (DOC, DIC, POC, nutrientes, clorofila-a, pH, oxigênio, turbidez, temperatura).</li>
        <li>Entrada de material alóctone a partir dos tributários.</li>
      </ul>
    </BlockText>
  </Block>

  {/* Subprojeto 4 */}
  <Block>
    <BlockTitle>4. Estimativa de Fluxos de CO₂, CH₄ e N₂ na interface água-sedimento</BlockTitle>
    <BlockText>
      Os sedimentos são responsáveis pela produção significativa de gases de efeito estufa em ambientes aquáticos.
      Serão coletadas amostras para análise de CO₂, CH₄, N₂, oxigênio e argônio, utilizando técnicas de
      cromatografia gasosa e medidas isotópicas.
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
  <TwoColumnContainer>
    <Column>
      <Block>
        <BlockTitle>Resultados Esperados</BlockTitle>
        <BlockText>
          <ul>
            <li>Padronização de metodologia para o cálculo das emissões de gases de efeito estufa em reservatórios;</li>
            <li>Modelo de emissão de longo prazo de gases de efeito estufa por reservatórios;</li>
            <li>Artigos em revistas especializadas e publicação de livro, incluindo versão voltada à comunidade científica internacional;</li>
            <li>Modelos ecohidrodinâmicos aplicados;</li>
            <li>Disponibilização de modelos e dados na internet;</li>
            <li>Desenvolvimento de técnicas computacionais de análise de sinais ambientais;</li>
            <li>Incentivo à inovação tecnológica no país;</li>
            <li>Capacitação de recursos humanos com atividades acadêmicas de pesquisa.</li>
          </ul>
        </BlockText>
      </Block>
    </Column>

    <Column>
      <Block>
        <BlockTitle>Benefícios Gerados</BlockTitle>
        <BlockText>
          <ul>
            <li>Fortalecimento dos parceiros como Centros de Excelência;</li>
            <li>Produção de conhecimento relevante ao estado-da-arte, com subsídios para 5 dissertações de mestrado e 6 teses de doutorado, além de cursos de especialização;</li>
            <li>Participação em conferências, seminários e congressos, e publicações em anais e revistas especializadas;</li>
            <li>Composição do balanço de carbono de FURNAS, permitindo aprimoramento do planejamento ambiental, baseado no desenvolvimento sustentável.</li>
          </ul>
        </BlockText>
      </Block>
    </Column>
  </TwoColumnContainer>
)}


      {active === "participantes" && (
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
              – Estimativa de fluxos de GHG (CO2, CH4 e N2) na interface água-atmosfera e determinação do aporte e das taxas de sedimentação de carbono.
            </li>
            <li>
              <a href="https://www2.ufjf.br/ufjf/" target="_blank" rel="noopener noreferrer">
                Universidade Federal de Juiz de Fora
              </a>{" "}
              – Determinações da produção primária, metabolismo bacteriano e concentrações de nutrientes na coluna d’água.
            </li>
            <li>
              <a href="https://www.iie.com.br/" target="_blank" rel="noopener noreferrer">
                Instituto Internacional de Ecologia e Gerenciamento Ambiental
              </a>{" "}
              – Estimativas de fluxos de GHG e das concentrações de carbono e nutrientes na interface água-sedimento.
            </li>
            <li>
              <a href="https://www.gov.br/inpe/pt-br" target="_blank" rel="noopener noreferrer">
                Instituto Nacional de Pesquisas Espaciais
              </a>{" "}
              – Organização do banco de dados do projeto, instalação de plataformas telemétricas de dados ambientais, estimativa de fluxos de GHG na interface água-atmosfera, análise isotópica (CENA-USP) e modelagem dos fluxos de emissão de GHG.
            </li>
          </ul>
        </BlockText>
      </Block>
    </Column>
  </TwoColumnContainer>
)}


      {active === "usinas" && (
  <Block>
    <BlockTitle>Usinas em Operação</BlockTitle>

    {/* styled Image (defina no topo do arquivo, se quiser modular) */}
    <Image
      src={UsinasImg1}
      alt="Mapa Usinas Hidrelétricas 1"
    />

    <Image
      src={UsinasImg2}
      alt="Mapa Usinas Hidrelétricas 2"
      style={{ marginTop: "1rem" }}
    />
  </Block>
)}
      
{active === "pesquisas" && (
  <>
    <Block>
      <BlockTitle>Pesquisas Correlatas — Parte 1</BlockTitle>
      <BlockText>
        <ul>
          <li>
            <a href="https://www.ipcc.ch/" target="_blank" rel="noopener noreferrer">
              The Third Assessment Report of the Intergovernmental Panel on Climate Change
            </a>
            <br />
            IPCC 2001 - http://www.ipcc.ch
          </li>

          <li>
            Sediment greenhouse gases (methane and carbon dioxide) in the Lobo-Broa Reservoir, São Paulo State, Brazil:
            Concentrations and diffuse emission fluxes for carbon budget considerations
            <br />
            ABE, D. S.; ADAMS, D. D.; GALLI, C. V. S.; SIKAR, E.; TUNDISI, J. G. — Lakes & Reservoirs: Research and Management, 10: 201-209, 2005
          </li>

          <li>
            A comparison of the carbon balances of a natural lake (L. O. rtra.sket) and a hydroelectric reservoir (L.Skinnmuddselet) in northern Sweden
            <br />
            ABERG, JAN; BERGSTROM, ANN-K.; ALGESTEN, G.; DERBACK, G.; JANSSON, M. — Water Research, 38, 531-538, 2004
          </li>

          <li>
            CH4 e CO2 emissions and carbon imbalance in a 10-years old tropical reservoir (Petit-Saut, French Guiana)
            <br />
            ABRIL, G.; GUÉRIN, F.; RICHARD, S.; DELMAS, R.; GALY-LACAUX, C.; TREMBLAY, A.; VARFALVY, L.; GOSSE, P.; SANTOS, M. A.; MATVIENKO, B.
            <br />
            Global Biogechemical Cycles, 19, 2005
          </li>

          <li>
            In situ measurements of dissolved gases (CO2 and CH4) in a wide range of concentrations in a tropical reservoir using an Equilibrator
            <br />
            ABRIL, G.; RICHARD, S.; GUÉRIN, F. — Science of the Total Environment 354, 246-251, 2006 - www.elsevier.com/locate/scitotenv
          </li>

          <li>
            Aquatic cycling and hydrosphere to troposphere transport of reduced gases - A review
            <br />
            ADAMS, D. D. — In: D. D. Adams, S. P. Seitzinger and P. M. Crill, Mitteilungen (Communications) No. 25, International Association of Theoretical and Applied Limnology (SIL). E. Schweizerbart'sche Verlagsbuchhandlungen, Stuttgart, Germany, pp. 1-13, 1996
          </li>

          <li>
            Methane, carbon dioxide and nitrogen gases in the surficial sediments of two Chilean reservoirs - diffusive fluxes at the sediment water interface
            <br />
            ADAMS, D. D. — Dams and Climate Change, Luiz P. Rosa and Marco A. dos Santos, eds.; Proceedings of International Workshop on Hydrodams, Lakes and Greenhouse Gas Emissions, COPPE-UFRJ, Rio de Janeiro, Brazil, pp. 50-77, 1999
          </li>

          <li>
            Reservoirs and Greenhouse Gases
            <br />
            ADAMS, D. D.; DELMAS, R.; LE, M.; VARFALVY L.; NOVO, E. M. L. M.; GOSSE P.; BOON, P. — Reservoirs and Greenhouse Gases, special session 42 at Societas Internationalis Limnologiae, Monash University, Melbourne, Australia, 2001
          </li>

          <li>
            Gases in the sediments of two eutrophic Chilean reservoirs: potential sediment oxygen demand and sediment-water flux of CH4 and CO2 before and after an El Niño event
            <br />
            ADAMS, D. D.; VILA, I.; PIZARRO, J.; SALAZAR, C. — Verh. Internat. Verein. Limnol., 27:1376-1381, 2000
          </li>

          <li>
            Investigating Ebullition in a Sand Column Using Dissolved Gas Analysis and Reactive Transport Modeling
            <br />
            AMOS, R.; YER, K. — Environmental Science Technology, 40, 5361-5367, 2006
          </li>

          <li>
            Mitigation and recovery of methane emissions from tropical hydroelectric dams
            <br />
            BAMBACE, L. A. W.; RAMOS, F. M.; LIMA, I. B. T.; ROSA R. R. — Energy, 32, 1038-1046, 2007 - www.elsevier.com/locate/energy
          </li>

          <li>
            Measurement of Methane Oxidation in Lakes: A Comparison of Methods
            <br />
            BASTVIKEN, D.; NEJLERTSSON, J.; TRANVIK, L. — Environmental Science & Technology, 36, 3354-3361, 2004
          </li>

          <li>
            Estimating production of heterotrophic bacterioplankton via incorporation of tritiated thymidine
            <br />
            BELL, R. T. — In: P.F. Kemp, B. F. Sherr, E.B. Sherr and J.J. Cole (eds) Handbook of Methods in Aquatic Microbial Ecology. Lewis. 1993
          </li>

          <li>
            Emission of CO2 from hydroelectric reservoirs in northern Sweden
            <br />
            BERGSTRÖM, ANN-K.; ALGESTEN, G.; SOBEK, S.; TRANVIK, L.; JANSSON, M. — Arch. Hydrobiol., 159 1 25-42, 2004
          </li>

          <li>
            Experimenting with hydroelectric reservoirs: researchers created reservoirs in Canada to explore the impacts of hydroelectric developments on greenhouse gas and methylmercury production
            <br />
            BODALY, R. A.; BEATY, K. G.; HENDZEL, L.; MAJEWSKI, A. R.; PATERSON, M. J.; ROLFHUS, K. R.; PENN, A. F.; ST. LOUIS, V. L.; HALL, B.; MATTHEWS, C. J. D.; CHEREWYK, K.; MAILMAN, M.; PHURLEY, J.; CHIFF, S. S.; VENKITESWARAN, J. J. — Environmental Science & Technology, 347-352, 2004
          </li>
        </ul>
      </BlockText>
    </Block>

    <Block>
      <BlockTitle>Pesquisas Correlatas — Parte 2</BlockTitle>
      <BlockText>
        <ul>
          <li>
            Carbon cycling in Australian wetlands: the importance of methane
            <br />
            BOON P. I. — Verh. Internat. Verein. Limnol., 27:37-50, 2000
          </li>

          <li>
            Fluxes of methane and carbon dioxide from a small productive lake to the atmosphere
            <br />
            CASPER, P.; MABERLY, S. C.; HALL, G. H.; FINLAY, B. J. — Biogeochemistry, 49:1-19, 2000
          </li>

          <li>
            Planktonic bacterial respiration as a function of C:N:P ratios across temperate lakes
            <br />
            CIMBLERIS, A. C. P.; KALFF, J. — Hydrobiologia, 384:89-100, 1998
          </li>

          <li>
            Carbon in catchments: connecting terrestrial carbon losses with aquatic metabolism
            <br />
            COLE, J. J.; CARACO, N. F. — Marine and Freshwater Research. 52:101-110, 2001
          </li>

          <li>
            Carbon dioxide supersaturation in the surface waters of lakes
            <br />
            COLE, J. J.; CARACO, N. F.; KLING, G. W.; KRATZ, T. K. — Science, 265:1568-1570, 1994
          </li>

          <li>
            Persistence of net heterotrophy in lakes during nutrient addition and food web manipulations
            <br />
            COLE, J. J.; PACE, M. L.; CARPENTER, S. R.; KITCHELL, J. F. — Limnol. Oceanogr. 45(8):1718-1730, 2000
          </li>

          <li>
            The Dam Debate And Its Discontents
            <br />
            CULLENWARD, D.; VICTOR, D. G. — Editorial Comment, Climatic Change, 75: 81-86, 2006
          </li>

          <li>
            Sources and transfers of particulate organic matter in a tropical reservoir (Petit Saut, French Guiana): a multitracers analysis using d13C, C/N ratio and pigments
            <br />
            DEJUNET, A.; ABRIL, G.; GUÉRIN, F.; WIT, R. — Submitted December 2006
          </li>

          <li>
            Respiration rates in bacteria exceed phytoplankton production in unproductive aquatic systems
            <br />
            DEL GIORGIO, P. A.; COLE, J. J.; CIMBLERIS, A. — Nature 385:148-151
          </li>

          <li>
            Emission of greenhouse gases from the tropical hydroelectric reservoir of Petit Saut (French Guiana) compared with emissions from thermal alternatives
            <br />
            DELMAS, R.; GALY-LACAUX, C.; RICHARD, S. — Global Biogeochemical Cycles, 15, 993-1003, 2001
          </li>

          <li>
            Greenhouse gas emissions from hydroelectric dams in the tropics: a case study in French Guiana
            <br />
            DELMAS, R.; RICHARD, S.; GALY-LACAUX, C.; GUÉRIN, F.; DELON, C. — ILEAPS - International Open Science Conference, Helsinki, Finland, 73-78, 2003
          </li>

          <li>
            Long term greenhouse gas emissions from the hydroelectric reservoir of Petit Saut (French Guiana) and potencial impacts
            <br />
            DELMAS, R.; RICHARD, S.; GUÉRIN, F.; ABRIL, G.; GALY-LACAUX, C.; DELON, C; GRÉGOIRE, A. — In: Greenhouse gases emissions from natural environments and hydroelectric reservoirs: fluxes and processes, A. Tremblay, L. Varfalvy, C. Roehm and M. Garneau (Eds) Springer-Verlag, 293-312
          </li>

          <li>
            Greenhouse Gas Emissions from Energy Systems: Comparision and Overview
            <br />
            DONES, R.; HECK, T.; HIRSCHBERG, S. — In PSI Annual Report, Annex IV, Paul Scherrer Institut, Villigen, Switzerland, 27-40, 2003
          </li>

          <li>
            CH4 emissions from flooded land: Basis for future methodological development
            <br />
            DUCHEMIN, E.; HUTTUNEN, J. T.; TREMBLAY, A.; DELMAS, R.; MENEZES, C. F. S. — IGES, Kanagawa, Japan, pp. Ap3.1 - Ap3.8
          </li>

          <li>
            Possible approach for estimating CO2 emissions from lands converted to permanently flooded land: Basis for future methodological development
            <br />
            DUCHEMIN, E.; HUTTUNEN, J. T.; TREMBLAY, A.; DELMAS, R.; MENEZES, C. F. S. — IGES, Kanagawa, Japan, pp. Ap2.1 - Ap2.9
          </li>

          <li>
            Comparison of static chamber and Boundary Layer Equation methods for measuring greenhouse gas emissions from large water bodies
            <br />
            DUCHEMIN, E.; LUCOTTE, M.; CANUEL, R. — Environmental Science & Technology, 33:350-357, 1999
          </li>

          <li>
            Production of greenhouse gases CH4 and CO2 by hydroelectric reservoirs of the boreal region
            <br />
            DUCHEMIN, E.; LUCOTTE, M.; CANUEL, R. — Global Biogeochemical Cycles, vol 9, no 4, p. 529-540, 1995
          </li>

          <li>
            Comparison of greenhouse gas emissions from an old tropical reservoir with those from other reservoirs worldwide
            <br />
            DUCHEMIN, E.; LUCOTTE, M.; CANUEL, R.; QUEIROZ, A. G.; ALMEIDA, D. C.; PEREIRA, H. C.; DEZINCOURT, J. — Verh. Internat. Verein. Limnol., 27:1391-1395, 2000
          </li>

          <li>
            First assessment of methane and carbon dioxide emissions from shallow and deep zones of boreal reservoirs upon ice break-up
            <br />
            DUCHEMIN, E.; LUCOTTE, M.; CANUEL, R.; SOUMIS, N. — Lakes & Reservoirs: Research and Management, 11: 9-19, 2006
          </li>

          <li>
            Influence of light intensity on methanotrophic bacterial activity in the Petit Saut reservoir, French Guiana
            <br />
            DUMESTRE, J. F.; GUEZENNEC, J.; GALY-LACAUX, C.; DELMAS, R.; RICHARD, S.; LABROUE, L. — Applied and Environmental Microbiology, 65, 534 - 539, 1999
          </li>
        </ul>
      </BlockText>
    </Block>

    <Block>
      <BlockTitle>Pesquisas Correlatas — Parte 3</BlockTitle>
      <BlockText>
        <ul>
          <li>
            Greenhouse gas emissions from hydroelectric reservoir (Brazil's Tucuruí dam) and the energy policy implications
            <br />
            FEARNSIDE, P. — Water, Air and Soil Pollution, 133:69-96, 2002
          </li>

          <li>
            Do hydroelectric dams mitigate global warming? The case of Brazil's Curuí-Una dam
            <br />
            FEARNSIDE, P. M. — Mitigation and Adaptation Strategies for Global Change, 10: 675-691, 2005
          </li>

          <li>
            Environmental impacts of Brazil's Tucuruí dam: unlearned lessons for hydroelectric development in Amazonia
            <br />
            FEARNSIDE, P. M. — Environmental Management, 27 (3): 377-396, 2001
          </li>

          <li>
            Greenhouse gas emissions from hydroelectric dams: controversies provide a springboard for rethinking a supposedly 'clean' energy source
            <br />
            FEARNSIDE, P. M. — Climatic Change 66: 1-8, 2004
          </li>

          <li>
            Greenhouse-gas emissions from Amazonian hydroelectric reservoirs: the example of Brazil's Tucuruí dam as compared to fossil fuel alternatives
            <br />
            FEARNSIDE, P. M. — Environmental Conservation, 24 (1): 64-75, 1997
          </li>

          <li>
            A headspace equilibration technique for measurement of dissolved gases in sediment pore water
            <br />
            FENDINGER, N. J.; ADAMS, D. D. — Intern. J. Environ. Anal. Chem., 23:253-265, 1986
          </li>

          <li>
            Methane and oxygen dynamics in a shallow floodplain lake: the significance of periodic stratification
            <br />
            FORD, P. W.; BOON, P. I.; LEE, K. — Hydrobiologia, 485: 97-110, 2002
          </li>

          <li>
            Greenhouse gas emissions from hydropower: The state of research in 1996
            <br />
            GAGNON, L.; VATE, VAN DE J. F. — Energy Policy, 25,(I),7-13, 1997
          </li>

          <li>
            Gaseous emission and oxygen consumption in hydroelectric dams. A case study in French Guiana
            <br />
            GALY-LACAUX, C.; DELMAS, R.; DUMESTRE, J. F.; LABROUE, L.; GOSSE, P. — Global Biogeochemical Cycles, 11, 471-483, 1997
          </li>

          <li>
            Long term greenhouse gas emissions from hydroelectric reservoirs in tropical forest regions
            <br />
            GALY-LACAUX, C.; DELMAS, R.; KOUADIO, G.; RICHARD, S.; GOSSE, P. — Global Biogeochemical Cycles, 13, 503-517, 1999
          </li>

          <li>
            Emission de Méthane et consommation d'oxygène dans le retenue de Petit Saut en Guyane
            <br />
            GALY-LACAUX, C.; JAMBERT, C.; DELMAS, R.; DUMESTRE, J. F.; LABROUE, L.; CERDAN, P.; RICHARD, S. — Comptes Rendus de I
          </li>

          <li>
            Evolution and relationship between 3 dissolved gases (oxygen, methane, and carbon dioxide) over a 10-year period (1994-2003) in a river downstream of a new intertropical dam
            <br />
            GOSSE, P.; ABRIL, G.; GUÉRIN, F.; RICHARD, S.; DELMAS, R. — Verhandlungen der Internationalen Vereinigung für Theoretische und Angewandte Limnologie, 29, 594-600, 2005
          </li>

          <li>
            Evolution and relationships of greenhouse gases and dissolved oxygen during 1994-2003 in a river downstream of a tropical reservoir
            <br />
            GOSSE, P.; ABRIL, G.; GUERIN, F.; RICHARD, S.; DELMAS, R. — Verhandlungen der Internationalen Vereinigung für Theoretische und Angewandte Limnologie, 29, 594-600, 2005
          </li>

          <li>
            Emission of CO2, CH4 and N2O from lakeshore soils in an Antarctic dry valley
            <br />
            GREGORICH, E. G.; HOPKINS, D. W.; ELBERLING, B.; SPARROW, A. D.; NOVIS, P.; GREENFIELD, L. G.; ROCHETTE, P. — Soil Biology & Biochemistry, 38, 3120-3129, 2006
          </li>

          <li>
            Production of carbon dioxide and methane by flooded tropical soils during anoxic incubations: Implication for atmospheric emissions from a hydroelectric reservoir (Petit Saut, French Guiana)
            <br />
            GUÉRIN, F.; ABRIL, G.; DEJUNET, A.; DELMAS, R. — Under preparation
          </li>

          <li>
            Methane and carbon emissions from tropical reservoirs: significance of downstream rivers
            <br />
            GUÉRIN, F.; ABRIL, G.; RICHARD, S.; BURBAN, B.; REYNOUARD, C.; SEYLER, P.; DELMAS, R. — Geophysical Research Letters, 33, L21407, 2006
          </li>

          <li>
            Gas transfer velocities measured by eddy correlations and floating chambers techniques in tropical reservoir
            <br />
            GUÉRIN, F.; ABRIL, G.; SERÇA, D.; DELON, C.; RICHARD, S.; DELMAS, R.; TREMBLAY, A.; VARFALVY, L. — SOLAS Newsletter, 2, 7, 2005
          </li>

          <li>
            Gas transfer velocities of CO2 and CH4 in a tropical reservoir and its river downstream
            <br />
            GUÉRIN, F.; ABRIL, G.; SERÇA, D.; DELON, C.; RICHARD, S.; DELMAS, R.; TREMBLAY, A.; VARFALVY, L. — Journal of Marine Systems, 66, 161-172, 2006
          </li>
        </ul>
      </BlockText>
    </Block>

    <Block>
      <BlockTitle>Pesquisas Correlatas — Parte 4</BlockTitle>
      <BlockText>
        <ul>
          <li>
            Contribution of winter to the annual CH4 emission from a eutrophied boreal lake
            <br />
            HUTTUNEN, J. T.; ALM, J.; SAARIJARVI, E.; LAPPALAINEN, K. M.; SILVOLA, J.; MARTIKAINEN, P. J. — Chemosphere, 50: 247-250, 2003
          </li>

          <li>
            Fluxes of methane, carbon dioxide and nitrous oxide in boreal lakes and potential anthropogenic effects on the aquatic greenhouse gas emissions
            <br />
            HUTTUNEN, J. T.; ALM, J.; LIIKANEN, A.; JUUTINEN, S.; LARMOLA, T.; HAMMAR, T.; SILVOLA, J.; MARTIKAINEN, P. J. — Chemosphere, 52, 609-621, 2003
          </li>

          <li>
            Long-term effects of boreal reservoirs on the landscape-atmosphere N2O exchange
            <br />
            HUTTUNEN, J. T.; MARTIKAINEN, P. J. — Verhandlungen der Internationalen Vereinigung für Theoretische und Angewandte Limnologie, 29, 607-611, 2005
          </li>

          <li>
            Long-term effects of northern reservoirs on the landscape-scale CH4 and N2O exchanges
            <br />
            HUTTUNEN, J. T.; MARTIKAINEN, P. J. — Report Series in Aerosol Science No. 81A. Yliopistopaino, Helsinki, 197-201, 2005
          </li>

          <li>
            Long-term net methane release from finish hydro reservoirs
            <br />
            HUTTUNEN, J. T.; MARTIKAINEN, P. J. — Global Warming and Hydroelectric Reservoirs, op. cit., pp. 125-135, 2005
          </li>

          <li>
            Methane emissions from natural peatlands on the northern boreal zone on Finland, Fennoscandia
            <br />
            HUTTUNEN, J. T.; NYKÄNEN, H.; TURUNEN, J.; MARTIKAINEN, P. J. — Atmospheric Environment 37, 147-151, 2003
          </li>

          <li>
            Fluxes of nitrous oxide on natural peatlands in Vuotos, an area projected for a hydroelectric reservoir in northern Finland
            <br />
            HUTTUNEN, J. T.; NYKÄNEN, H.; TURUNEN, J.; NENONEN, O.; MARTIKAINEN, P. J. — SUO, 53, 87-96, 2002
          </li>

          <li>
            Exchange of CO2, CH4 and N2O between the atmosphere and two northern boreal ponds with catchments dominated by peatlands or forests
            <br />
            HUTTUNEN, J. T.; VÄISÄNEN, T. S.; HEIKKINEN, S.; NYKÄNEN, H.; NENONEN, O.; MARTIKAINEN, P. J. — Plant and Soil, 242, 137-146
          </li>

          <li>
            Fluxes of CH4, CO2 and N2O in hydroelectric reservoirs Lokka and Porttipahta in the northern boreal zone in Finland
            <br />
            HUTTUNEN, J. T.; VÄISÄNEN, T. S.; HELLSTEN, S. K.; HEIKKINEN, S.; NYKÄNEN, H.; JUNGNER, H.; NISKANEN, A.; VIRTANEN, M. O.; LINDQVIST, O. V.; NENONEN, O.; MARTIKAINEN, P. J. — Global Biogeochemical Cycles, 16, 1003, 2002
          </li>

          <li>
            Methane fluxes at the sediment-water interface in some boreal lakes and reservoirs
            <br />
            HUTTUNEN, J. T.; VÄISÄNEN, T. S.; HELLSTEN, S. K.; MARTIKAINEN, P. J. — Boreal Environment Research, 11, 27-34, 2006
          </li>

          <li>
            Hydrologic sources of carbon cycling uncertainty throughout the terrestrial-aquatic continuum
            <br />
            JENERETTE, G. D.; LAL, R. — Global Change Biology, 11, 1873-1882, 2005
          </li>

          <li>
            Increases in fluxes of greenhouse gases and methyl mercury following flooding of an experimental reservoir
            <br />
            KELLY, C. A.; RUDD, W. M.; BODALY, R. A.; ROULET, N. P.; ST. LOUIS, V. L.; HEYES, A.; MOORE, T. R.; SCHIFF, S.; ARAVENA, R.; SCOTT, K. J.; DYCK; B.; HARRIS, R.; WARNER, B.; EDWARDS, G. — Environmental Science & Technology, 31, 1334-1344, 1997
          </li>

          <li>
            Sediment respiration and lake trophic state are important predictors of large CO2 evasion from small boreal lakes
            <br />
            KORTELAINEN, P.; RANTAKARI, M.; HUTTUNEN, J. T.; MATTSSON, T.; ALM, J.; JUUTINEN, S.; LARMOLA, T.; SILVOLA, J.; MARTIKAINEN, P. J. — Global Change Biology, 12, 1554-1567, 2006
          </li>

          <li>
            Spatial and seasonal variation in greenhouse gas and nutrient dynamics and their interactions in the sediments of a boreal eutrophic lake
            <br />
            LIIKANEN, A.; HUTTUNEN, J. T.; MURTONIEMI, T.; TANSKANEN, H.; VÄISÄNEN, T.; SILVOLA, J.; ALM, J.; MARTIKAINEN, P. J. — Biogeochemistry, 65: 83-103, 2003, Kluwer Academic Publishers
          </li>

          <li>
            Biogeochemical distinction of methane releases from two Amazon hydroreservoirs
            <br />
            LIMA, I. B. T. — Chemosphere, 59, 1697-1702, 2005
          </li>

          <li>
            Emissão de metano em reservatórios hidreléricos amazônicos através de leis de potência
            <br />
            LIMA, I. B. T. — Tese de Doutorado, Centro de Energia Nuclear na Agricultura - USP, Piracicaba, 2002, 108p. (no prelo)
          </li>

          <li>
            Carbon flows in the Tucuruí reservoir
            <br />
            LIMA, I. B. T.; NOVO, E. M. L. M. — In: Proceedings of International Workshop on Hydro Dams, Lakes and Greenhouse Gas Emissions, Rio de Janeiro, Brazil, COPPE-UFRJ, pp.78-84, 1999
          </li>
        </ul>
      </BlockText>
    </Block>

    <Block>
      <BlockTitle>Pesquisas Correlatas — Parte 5</BlockTitle>
      <BlockText>
        <ul>
          <li>
            Methane production, transport and emission in Amazon hydroelectric plants
            <br />
            LIMA, I. B. T.; NOVO, E. M. L. M.; BALLESTER, M. V. F.; OMETTO, J. P. — IEEE, 2529-2531, 1998
          </li>

          <li>
            Role of the macrophyte community in the CH4 production and emission in the tropical reservoir of Tucuruí, Pará State, Brazil
            <br />
            LIMA, I. B. T.; NOVO, E. M. L. M.; BALLESTER, M. V. R.; OMETTO, J. P. — Verh. Internat. Verein. Limnol., 27:1437-1440, 2000
          </li>

          <li>
            Methane, carbon dioxide, and nitrous oxide emissions from two Amazonian reservoirs during high water table
            <br />
            LIMA, I. B. T.; VICTORIA, R. L.; NOVO, E. M. L. M.; FEIGL, B. J.; BALLESTER, M. V. R.; OMETTO, J. P. — XXVIII Societas Internationalis Limnologiae Congress, Melbourne, Australia, 2001. In press.
          </li>

          <li>
            The effect of termite biomass and anthropogenic on the CH4 budgets of tropical forests in Cameroon and Borneo
            <br />
            MACDONALD, J. A.; JEEVA, D.; EGGLETON, P.; DAVIES, R.; BIGNELL, D. E.; FOWLER, D.; LAWTON, J.; MARYATI, M. — Global Change Biology, 5, 869-879, 1999
          </li>

          <li>
            Methane Emission from Lakes
            <br />
            MAKHOV, G. A.; BAZHIN, M. — Chemosphere, 38 (6), 1453-1459, 1999
          </li>

          <li>
            Methane emissions from lakes and floodplains in Pantanal, Brazil
            <br />
            MARANI, L.; ALVALÁ, P. C. — Atmospheric Environment, 41, 1627-1633, 2007
          </li>

          <li>
            Carbon Dioxide and Methane production in small reservoirs flooding upland boreal forest
            <br />
            MATTHEWS, C. J. D.; JOYCE, E. M.; ST. LOUIS, V. L.; SCHIFF, S. L.; VENKITESWARAN, J. J.; HALL, B. D.; BODALY, R. A.; BEATY, K. G. — Ecosystems, 8: 267-285, 2005
          </li>

          <li>
            Comparison of three techniques used to measure diffusive gas exchange from sheltered aquatic surfaces
            <br />
            MATTHEWS, C. J. D.; ST. LOUIS, V. L.; HESSLEIN, R. H. — Environment Science & Technology, 37, 772-780, 2003
          </li>

          <li>
            Flooding the land, warming the Earth: greenhouse gas emissions from dams
            <br />
            MCCULLY, P. — International Rivers Network, 2002
          </li>

          <li>
            Tropical hydropower is a significant source of greenhouse gas emissions: a response to the International Hydropower Association
            <br />
            MCCULLY, P. — International Rivers Network, 2004
          </li>

          <li>
            Tropical hydropower is a significant source of greenhouse gas emissions: response to the International Hydropower Association
            <br />
            MCCULLY, P. — International Rivers Network, 2004 - www.irn.org
          </li>

          <li>
            Effect of temperature on production of CH4 and CO2 from peat in a natural and flooded boreal forest wetland
            <br />
            MCKENZIE, C.; SCHIFF, S.; ARAVENA, R.; KELLY, C.; ST. LOUIS, V. — Climatic Change, 40: 247-266, 1998
          </li>

          <li>
            Nitrous oxide emissions to the atmosphere from an artificially oxygenated lake
            <br />
            MEYER, M.; GÄCHTER, R.; WEHRLI, B. — Limnol. Oceanogr., 41:548-553, 1996
          </li>

          <li>
            Greenhouse gas emissions from building and operating electric power plants in the upper Colorado river basin
            <br />
            PACCA, S.; HORVATH, A. — Environmental Science & Technology, 36, 3194-3200, 2002
          </li>

          <li>
            Extreme event dynamics in methane ebullition fluxes from tropical reservoirs
            <br />
            RAMOS, F. M.; LIMA, I. B. T.; ROSA, R. R.; MAZZI, E. A.; CARVALHO, J. C.; RASERA, M. F. F. L.; OMETTO, J. P. H. B.; ASSIREU, A. T.; STECH, J. L. — Geophysical Research Letters, 33 (21), CiteID L21404, 2006
          </li>

          <li>
            Interannual variation and climatic regulation of the CO2 emission from large boreal lakes
            <br />
            RANTAKARI, M.; KORTELAINEN, P. — Global Change Biology, 11, 1368-1380, 2005
          </li>

          <li>
            Evolution of physico-chemical water quality and methane emissions in the tropical hydroelectric reservoir of Petit Saut (French Guiana)
            <br />
            RICHARD, S.; GALY-LACAUX, C.; ARNOUX, A.; CERDAN, P.; DELMAS, R.; DUMESTRE, J. F.; GOSSE, P.; HOREAU, V.; LABROUE, L.; SISSAKIAN, C. — Verhandlungen der Internationalen Vereinigung für Theoretische und Angewandte Limnologie, 27, 1454-1458, 2000
          </li>
        </ul>
      </BlockText>
    </Block>

    <Block>
      <BlockTitle>Pesquisas Correlatas — Parte 6</BlockTitle>
      <BlockText>
        <ul>
          <li>
            Impact of methane oxidation in tropical reservoirs on greenhouse gas fluxes and water quality
            <br />
            RICHARD, S.; GOSSE, P.; GRÉGOIRE, A.; DELMAS, R.; GALY LACAUX, C. — In: A. Tremblay et. al. op. cit., 329-560
          </li>

          <li>
            Certainty and uncertainty in the science of greenhouse gas emissions from hydroelectric reservoirs
            <br />
            ROSA, L. P.; SANTOS, M. A. — Thematic Review II.2 prepared as an input to the World Commission on Dams, Cape Town, 2000
          </li>

          <li>
            Dams and climate change
            <br />
            ROSA, L. P.; SANTOS, M. A. (eds.) — Proceedings of International Workshop on Hydro Dams, Lakes and Greenhouse Gas Emissions, Rio de Janeiro, Brazil, 1999
          </li>

          <li>
            Hydropower plants and greenhouse gas emissions
            <br />
            ROSA, L. P.; SANTOS, M. A. (eds.) — Proceedings of International Workshop on Greenhouse Gas Emissions from Hydroelectric Reservoirs, Rio de Janeiro, Brazil, 1997
          </li>

          <li>
            Biogenic gas production from major Amazon reservoirs, Brazil
            <br />
            ROSA, L. P.; SANTOS, M. A.; MATVIENKO, B.; SIKAR, E.; LOURENÇO, R. S. M.; MENEZES, C. F. S. — Hydrological Processes, 17, 1433-1450, 2003
          </li>

          <li>
            Scientific errors in the Fearnside comments on Greenhouse Gas Emissions (GHG) from hydroelectric dams and response to his political claiming
            <br />
            ROSA, L. P.; SANTOS, M. A.; MATVIENKO, B.; SIKAR, E.; SANTOS, E. O. — Climatic Change, 75: 91-102, 2006
          </li>

          <li>
            Greenhouse gas emissions from hydroelectric reservoirs in tropical regions
            <br />
            ROSA, L. P.; SANTOS, M. A.; SIKAR, B. M.; SANTOS, E. O.; SIKAR, E. — Climatic Change, 66:9-21, 2004, Netherlands
          </li>

          <li>
            Greenhouse gas emissions from hydropower reservoirs and water quality
            <br />
            ROSA, L. P.; SANTOS, M. A.; TUNDISI, J. G. — COOPE/ UFRJ, 1st ed., 136 pp.
          </li>

          <li>
            Measurements of greenhouse gas emission in Samuel, Tucuruí and Balbina dams - Brazil
            <br />
            ROSA, L. P.; SANTOS, M. A.; TUNDISI, J. G.; SIKAR, B. M. — In: Hydropower Plants and Greenhouse Gas Emissions, Rosa, L. P. & Santos, M. A. (eds.), COPPE publication, Rio de Janeiro, 1997
          </li>

          <li>
            Global warming potentials: the case of emissions from dams
            <br />
            ROSA, L. P.; SHAEFFER, R. — Energy Policy, 23 (2), pp. 149-158, 1995
          </li>

          <li>
            Greenhouse gas emissions from hydroelectric reservoirs
            <br />
            ROSA, L. P.; SHAEFFER, R. — Ambio, 23 (2), pp. 164-165, 1994
          </li>

          <li>
            Are hydroelectric dams in the Brazilian Amazon significant sources of greenhouse gases
            <br />
            ROSA, L. P.; SHAEFFER, R.; SANTOS, M. A. — Environmental Conservation, 66, n.1, 2-6, Cambridge University Press, UK, 1996
          </li>

          <li>
            Methane and Carbon Dioxide emissions of hydroelectric power plants in the Amazon compared to thermoelectric equivalents
            <br />
            ROSA, L. P.; SHAEFFER, R.; SANTOS, M. A. — Unpublished report, Energy Planning Program, COPPE/UFRJ, August, 1994 (manuscript, 48 pp.)
          </li>

          <li>
            Emissões de gases de efeito estufa de reservatórios hidrelétricos
            <br />
            ROSA, L. P.; SIKAR, B. M.; SANTOS, M. A.; MONTEIRO, J. L.; SIKAR, E.; SILVA, M. B.; SANTOS, E. O.; JUNIOR, A. P. B. — Publicação ANEEL, Brasília, 2002
          </li>

          <li>
            Carbon budget in tropical reservoirs
            <br />
            SANTOS, M. A.; MATVIENKO, B.; SANTOS, E. O.; ROSA, L. P.; ALMEIDA, C. H. E.; SILVA, M. B.; BENTES JR, A. P.; SIKAR, E.; PATCHINEELAM, S. R. — Global Warming and Hydroelectric Reservoirs, op. cit., 95-100, 2005
          </li>

          <li>
            Gas release in the filling stage
            <br />
            SANTOS, M. A.; MATVIENKO, B.; SIKAR, E.; ROSA, L. P.; FILLIPO, R.; CIMBLERIS, A. — Verhandlungen der Internationalen Vereinigung für Theoretische und Angewandte Limnologie, 27, 1415-1419, 2000
          </li>

          <li>
            Dams and climate change
            <br />
            SANTOS, M. A.; ROSA, L. P. — COOPE/ UFRJ 1st ed., 80 pp., 1999
          </li>

          <li>
            Hydropower plants and greenhouse gas emissions
            <br />
            SANTOS, M. A.; ROSA, L. P. — COOPE/ UFRJ 1st ed., 120 pp., 1997
          </li>

          <li>
            Gross greenhouse gas fluxes from hydro-power reservoir compared to thermo-power plants
            <br />
            SANTOS, M. A.; ROSA, L. P.; SIKAR, B.; SIKAR, E.; SANTOS, E. O. — Energy Policy, 34, 481-488, 2006
          </li>

          <li>
            Emissões de gases de efeito estufa do reservatório hidrelétrico de Belo Monte - fase de pré-enchimento do reservatório
            <br />
            SANTOS, M. A.; SIKAR, B. M.; MADDOCK, J. E. L.; SANTOS, E. O.; SILVA, M. B.; ROCHA, C. H. E. A.; JUNIOR, A. P. B.; SIKAR, E. — Relatório Técnico Final COPPE/UFRJ-Eletrobrás, Rio de Janeiro, Agosto de 2004
          </li>

          <li>
            Gross greenhouse gas emissions from Brazilian hydro reservoirs
            <br />
            SANTOS, M. A.; SIKAR, B. M.; ROSA, L. P.; SIKAR, E.; SANTOS, E. O. — In: Greenhouse Gas Emission - Fluxes and Processes, Springer, Berlin, 2005
          </li>

          <li>
            The importance of floating peat to methane fluxes from flooded peatlands
            <br />
            SCOTT, K. J.; KELLY, C. A.; RUDD, J. W. M. — Biogeochemistry, 47: 187-202, 1999
          </li>

          <li>
            Contribution of tropical ecosystems to the global budgets of trace gases, especially CH4, H2, CO, and N2O
            <br />
            SEILER, W.; CONRAD, R. — In: R.E. Dickenson (ed.), The Geophysiology of Amazonia, Vegetation and Climate Interactions. John-Wiley, NY, 1987
          </li>

          <li>
            Gas release from a reservoir in the filling stage
            <br />
            SIKAR, B. M.; SIKAR, E.; ROSA, L. P.; SANTOS, M. A.; FILIPPO, R.; CIMBLERIS, A. C. P. — Verh. Internat. Verein. Limnol., 27:1-5, 2000
          </li>

          <li>
            Greenhouse gases and initial findings on the carbon circulation in two reservoirs and their watersheds
            <br />
            SIKAR, E.; SANTOS, M. A.; MATVIENKO, B.; SILVA, M. B.; ROCHA, C. H. E. D.; SANTOS, E. O.; BENTES JR, A. P.; ROSA, L. P. — Verhandlungen der Internationalen Vereinigung für Theoretische und Angewandte Limnologie, 29, 573-576, 2005
          </li>

          <li>
            Protein content and protein synthesis rates of planktonic marine bacteria
            <br />
            SIMON, M.; AZAM, F. — Mar. Ecol. Prog. Ser., 51:201-213, 1989
          </li>

          <li>
            A simple, economical method for measuring bacterial protein synthesis rates in seawater using 3H-leucine
            <br />
            SMITH, D. C.; AZAM, F. — Marine Microbial Food Webs, 6, 2:107-114, 1992
          </li>

          <li>
            A carbon budget of a small humic lake: an example of the importance of lakes for organic matter cycling in boreal catchments
            <br />
            SOBEK, S.; SODERBACK, B.; KARLSSON, S.; ANDERSSON, E.; BRUNBERG, A. K. — Ambio, 35 (8), 469-475, 2006
          </li>

          <li>
            Reservoir surface as source of greenhouse gases to the atmosphere: a global estimate
            <br />
            ST-LOUIS, V.; KELLY, C. A.; DUCHEMIN, E.; RUDD, J. W.; ROSENBERG, D. M. — Bioscience, 50, 9:766-775, 2000
          </li>

          <li>
            Atmospheric methane - tropical sources
            <br />
            STREET-PERROTT, F. A. — Nature, 355:23-24, 1992
          </li>

          <li>
            Do hydroelectric reservoirs emit greenhouse gases?
            <br />
            TREMBLAY, A.; LAMBERT, M.; GAGNON, L. — Environmental Management, 33, Supplement 1, S509-S517, 2004
          </li>

          <li>
            Greenhouse emissions: fluxes and processes
            <br />
            TREMBLAY, A.; VARFALVY, L.; ROEHM, C.; GARNEAU, M. — Environmental Sciences Series, 732 pp. Berlin: Springer-Verlag
          </li>

          <li>
            The issue of greenhouse gases from hydroelectric reservoirs: from boreal to tropical regions
            <br />
            TREMBLAY, A.; VARFALVY, L.; ROEHM, C.; GARNEAU, M.
          </li>

          <li>
            Integration of research and management in optimizing multiple uses of reservoirs: the experience in South America and Brazilian case studies
            <br />
            TUNDISI, J. G.; MATSUMURA, T. — Hydrobiologia, 500: 231-242, 2003
          </li>

          <li>
            Theoretical reservoir ecology and its applications
            <br />
            TUNDISI, J. G.; STRASKRABA, M. (eds.) — International Institute of Ecology, Backhuys, The Netherlands, 1999
          </li>

          <li>
            Methane oxidation: isotopic enrichment factors in freshwater boreal reservoirs
            <br />
            VENKITESWARAN, J. J.; SCHIFF, S. L. — Applied Geochemistry, 20, 683-690, 2005
          </li>

          <li>
            Gas exchange in ecosystems: framework and case studies
            <br />
            WADA, E.; LEE, J. A.; KIMURA, M.; KOIKE, I.; REEBURGH, W. S.; TUNDISI, J. G.; YOSHINARI, T.; YOSHIOKA, T.; VAN VUUREN, M. M. I. — Jpn. J. Limnol., 52, 4:263-281, 1991
          </li>

          <li>
            Methane bubbling from Siberian thaw lakes as a positive feedback to climate warming
            <br />
            WALTER, K. M.; ZIMOV, S. A.; CHANTON, J. P.; VERBYLA, D.; CHAPIN, F. S. — Nature Publishing Group, 443, 7, 2006
          </li>

          <li>
            Limnological analyses
            <br />
            WETZEL, R. G.; LIKENS, G. — Springer-Verlag, 1992
          </li>
        </ul>
      </BlockText>
    </Block>
  </>
)}

      {active === "publicacoes" && (
  <PageContainer>
    <Block>
      <BlockTitle>Matérias</BlockTitle>
      <BlockText>
        <ul>
          <li>As Muitas Faces de uma Lagoa - Ciência Hoje, setembro de 1999</li>
          <li>Capacitação do Setor Elétrico Brasileiro em Relação à Mudança Global do Clima</li>
          <li>Energia Renovável e Limpa: Pesquisa revela que hidrelétricas de FURNAS emitem cem vezes menos gases de efeito estufa que termelétricas. Revista Furnas, junho de 2007</li>
          <li>FURNAS inicia pesquisa de balanço de carbono em reservatórios - Linha Direta Nº 297, 14 de junho de 2003</li>
        </ul>
      </BlockText>
    </Block>

    <Block>
      <BlockTitle>Publicações em Revistas e Livros</BlockTitle>
      <BlockText>
        <ul>
          <li>
            Carbon gas emission from the sediments of reservoirs of different ages in central Brazil.  
            <br />
            <i>In: Global Warming and Hydroelectric Reservoirs. COPPE/UFRJ e Eletrobrás, 2005</i>
          </li>
          <li>
            Carbon gas cycling in the sediments of Serra da Mesa and Manso reservoirs, central Brazil.  
            <br />
            <i>Verhandlungen - Internationale Vereinigung für Theoretische und Angewandte Limnologie, 2005</i>
          </li>
          <li>
            Princípios físicos e químicos a serviço da limnologia - um exercício.  
            <br />
            <i>Lições de Limnologia, São Carlos, 2005</i>
          </li>
          <li>
            Caminhos do fósforo em ecossistemas aquáticos continentais.  
            <br />
            <i>Lições de Limnologia, São Carlos, 2005</i>
          </li>
          <li>
            Carbon dioxide and methane fluxes in the littoral zone of a tropical savanna reservoir (Corumbá, Brazil).  
            <i>Submitted to Journal of Geophysical Research - Biogeosciences</i>
          </li>
          <li>Photoacoustic/dynamic chamber method for measuring greenhouse gas fluxes in hydroreservoirs. <i>Verhandlungen, 2005</i></li>
          <li>Satellite ecohydrology and multifractals: INPE Relatório Técnico</li>
          <li>The use of remote sensing and automated water quality systems... <i>Greenhouse gas emissions from hydropower reservoirs, COPPE/UFRJ, 2004</i></li>
          <li>Extreme event dynamics in methane ebullition fluxes... <i>Geophysical Research Letters, 2006</i></li>
          <li>Long term monitoring of greenhouse gas emissions... <i>COPPE/UFRJ, 2004</i></li>
          <li>Carbon dioxide and methane emissions from hydroelectric reservoirs in Brazil. <i>Global Warming and Hydroelectric Reservoirs, 2005</i></li>
          <li>Global warming and hydroelectric reservoirs. <i>COPPE/UFRJ, 2005</i></li>
          <li>Gross greenhouse gas fluxes from hydro-power reservoir compared to thermo-power plants. <i>Energy Policy, 2005</i></li>
          <li>Greenhouse gases and initial findings on the carbon circulation... <i>Verhandlungen, 2005</i></li>
          <li>Caminhos do carbono em ecossistemas aquáticos continentais. <i>Lições de Limnologia, 2005</i></li>
          <li>Variability of carbon dioxide flux from tropical (Cerrado) hydroelectric reservoirs. <i>Aquatic Sciences, 2010</i></li>
          <li>Silicon as a permanent-carbon sedimentation tracer. <i>Inland Waters, 2012</i></li>
        </ul>
      </BlockText>
    </Block>

    <Block>
      <BlockTitle>Participações em Congressos</BlockTitle>
      <BlockText>
        <ul>
          <li>ASLO - 2006. Victoria, Canada</li>
          <li>Greenhouse gas concentrations and diffusive flux at the sediment-water interface... (Brasil)</li>
          <li>Carbon budget in two neotropical reservoirs</li>
          <li>Management strategies to minimize bacterial methane emission...</li>
          <li>Extreme event dynamics in methane bubbling...</li>
          <li>Heterotrophic pathways on carbon balance in tropical reservoirs</li>
          <li>Land use-stream carbon fluxes relationship in tropical hydro reservoir</li>
          <li>The effect of cold fronts over the emission patterns of CO₂ and CH₄...</li>
          <li>The fitting of Weibull PDF for surface winds...</li>
          <li>SIL - 2004. Lahti, Finland (XXIX Congress of IAL)</li>
          <li>Carbon gas cycling in the sediments of Serra da Mesa and Manso reservoirs...</li>
          <li>Theoretical diffusive flux of greenhouse gases...</li>
          <li>Carbon budget in hydroelectric reservoirs of Furnas Centrais Elétricas S.A., Brazil</li>
          <li>Carbon content in the zooplankton populations of Serra da Mesa Reservoir...</li>
          <li>Methane emission downstream of reservoirs</li>
          <li>Preliminary results of photoacoustic/dynamic chamber technique...</li>
          <li>Greenhouse gases and the carbon circulation in a reservoir...</li>
          <li>SIL - 2007. Montreal, Canada (XXX Congress of IAL)</li>
          <li>Greenhouse gas emissions from natural ecosystems and reservoirs</li>
          <li>Carbon budget in seven Brazilian hydropower reservoirs</li>
          <li>Greenhouse gas emissions downstream tropical hydroelectric reservoirs</li>
          <li>Greenhouse gas concentrations and diffusive flux at the sediment-water interface...</li>
          <li>Sunlight effects on diel CO₂ and CH₄ emissions...</li>
          <li>Evaluation of dissolved carbon dioxide and methane at three tropical hydroelectric reservoirs</li>
          <li>Contribution of planktonic respiration to greenhouse emissions...</li>
          <li>The importance of land use changes analysis...</li>
          <li>Tropical reservoirs are on average 2.7 times bigger carbon sinks...</li>
          <li>Does methane from hydro-reservoirs fizz out from the water upon turbine discharge?</li>
          <li>Outros Congressos (SBRS, Simpósios e Seminários com lista completa)</li>
        </ul>
      </BlockText>
    </Block>

    <Block>
      <BlockTitle>Resumos Publicados</BlockTitle>
      <BlockText>
        <ul>
          <li>Trophic classifications between temperate and tropical aquatic ecosystems... <i>11th World Lakes Conference, 2005</i></li>
          <li>Carbon budget in hydroelectric reservoirs of FURNAS... <i>Proceedings IAL, 2005</i></li>
          <li>Concentração de oxigênio e suas implicações no metabolismo bacteriano... <i>XXIII Congresso Brasileiro de Microbiologia, 2005</i></li>
          <li>Ferramentas para abrir uma caixa, ainda, nebulosa... <i>X Congresso Brasileiro de Limnologia, 2005</i></li>
          <li>Carbon budget in two neotropical reservoirs... <i>ASLO Aquatic Sciences Meeting, 2006</i></li>
          <li>Heterotrophic pathways on carbon balance in tropical reservoirs... <i>ASLO Aquatic Sciences Meeting, 2006</i></li>
        </ul>
      </BlockText>
    </Block>

    <Block>
      <BlockTitle>Monografias</BlockTitle>
      <BlockText>
        <ul>
          <li>Comunidade zooplanctônica de quatro reservatórios do centro-oeste do Brasil: abundância e biomassa em carbono. <i>UNIRIO, 2005</i></li>
          <li>Dinâmica horizontal do fitoplâncton no reservatório de Serra da Mesa (GO)... <i>UNIRIO, 2007</i></li>
        </ul>
      </BlockText>
    </Block>
  </PageContainer>
)}

    </PageContainer>
  );
};

export default FurnasPage;
