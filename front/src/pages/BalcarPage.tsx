import { Section } from "lucide-react";
import React, { useState, useEffect } from "react";
import styled from "styled-components";

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

const HeaderContainer = styled.div`
  width: 100%;
`;

const LogoSIMA = styled.div`
  float: left;
  width: 182px;
  height: 34px;
  margin-top: 18px;
  background-image: url("site/imagens/logo2.png");
  background-repeat: no-repeat;
`;

const HeaderText = styled.div`
  float: right;
  font-size: 20px;
  margin: 28px -15px 0 0;
  color: #4682b4;
`;

const HeaderBanner = styled.div`
  clear: both;
  width: 100%;
  height: 46px;
  background-image: url("site/imagens/banner2.png");
  background-repeat: repeat-x;
  margin-top: 10px;
`;

const Menu = styled.div`
  width: 100%;
  height: 25px;
  line-height: 25px;
  font-size: 16px;
  margin-bottom: 15px;
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
`;

const BlockText = styled.div`
  color: #222;
  text-align: justify;
  font-size: 16px;
`;

const Footer = styled.div`
  width: 100%;
  clear: both;
  height: 30px;
  line-height: 30px;
  border-top: 1px solid #777;
  margin-top: 25px;
  text-align: right;
  font-weight: bold;
  color: #222;
`;

// ================= Conteúdo das páginas =================
const HomeContent = () => (
  <TwoColumnContainer>
    <Column>
      <Block>
        <BlockTitle> Portal</BlockTitle>
        <BlockText>
          Este portal constitui a interface de acesso aos dados do Projeto Balanço de Carbono nos
          Reservatórios de FURNAS Centrais Elétricas S.A. A base de dados é formada por coletas in
          situ de equipes que tinham como objetivo obter dados para: determinar as emissões de gases
          de efeito estufa: gás carbônico, metano e óxido nitroso, dos reservatórios das
          hidrelétricas; identificar as rotas do ciclo do carbono nesses reservatórios e os fatores
          ambientais envolvidos; avaliar a influência dos fatores morfológicos, morfométricos,
          biogeoquímicos e operacionais dos reservatórios na emissão de gases de efeito estufa;
          determinar o padrão de emissão existente, anteriormente à construção de reservatórios;
          elaborar um modelo espacial e temporal de emissão de gases para reservatórios implantados
          em ambientes de cerrado. A interface de acesso permite personalizar consultas aos dados
          para o download, visualização em tabelas dinâmicas e visualizar a distribuição espacial
          dos dados em mapa interativo do Google Maps.
        </BlockText>
      </Block>

      <Block>
        <BlockTitle>Fomento </BlockTitle>
        <BlockText>
          Os recursos utilizados para a coleta da base de dados foram fornecidos por FURNAS Centrais
          Elétricas S.A. no âmbito da lei 9.991/2000, que estabelece um investimento mínimo anual de
          1% de seu lucro líquido, das companhias geradoras de eletricidade, em pesquisa e
          desenvolvimento no setor elétrico. Os procedimentos para os projetos são determinados pela
          Agência Nacional de Energia Elétrica (ANEEL).
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
        <BlockText>
          Os dados são formados por coletas realizadas em 79 campanhas com datas e localidades
          (reservatórios) distintos com o objetivo de coletar parâmetros na interface
          água-sedimento, coluna d’água e interface água-atmosfera. Mais detalhes sobre a base de
          dados podem ser encontrados em "descrição". Cada instituição participante tinha como
          objetivo estudar uma componente, e por consequência fazer leituras de parâmetros
          relacionados:
          <ul>
            <li>
              IIE: estimativas de fluxos de gases de efeito estufa e das concentrações de carbono e
              nutrientes na interface água-sedimento;
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
              UFRJ/COPPE: estimativa de fluxos de gases de efeito estufa na interface água-atmosfera
              e determinação do aporte e das taxas de sedimentação de carbono.
            </li>
          </ul>
        </BlockText>
      </Block>
    </Column>
  </TwoColumnContainer>
);

const EquipeContent = () => (
  <TwoColumnContainer>
    <Column>
      <Block>
        <BlockTitle>Coordenação Geral</BlockTitle>
        <div>
          <a href="http://lattes.cnpq.br/5535667070825818" target="_blank">
            André Carlos Prates Cimbleris
          </a>
        </div>
      </Block>
    </Column>

    <Column>
      <Block>
        <BlockTitle>Coordenação por Instituição</BlockTitle>
        <ul style={{ listStyle: "none" }}>
          <a href="http://lattes.cnpq.br/4775535537651746">
            <li>IIE: Donato Seiji Abe</li>
          </a>
          <a href="http://lattes.cnpq.br/2691497637313274">
            <li>INPE: José Luiz Stech</li>
          </a>
          <a href="http://lattes.cnpq.br/0567809153346429">
            <li>UFJF: Fábio Roland</li>
          </a>
          <a href="http://lattes.cnpq.br/4155308755013168">
            <li>
              Coordenação por InstituiçãoIIE: Donato Seiji AbeINPE: José Luiz StUFRJ/COPPE: Marco
              Aurélio dos Santos
            </li>
          </a>
        </ul>
      </Block>

      <Block>
        <BlockTitle>Responsáveis pelas Coletas e Análises</BlockTitle>
        <ul style={{ listStyle: "none" }}>
          <a href="http://lattes.cnpq.br/8150880476098677">
            <li>Arcilan Trevenzoli Assireu (INPE)</li>
          </a>
          <a href="http://lattes.cnpq.br/5987354282647527">
            <li>Bohdan Matvienko Sikar (UFRJ/COPPE)</li>
          </a>
          <a href="http://lattes.cnpq.br/7663009286545108">
            <li>Corina Verónica Sidagis Galli (IIE)</li>
          </a>
          <a href="http://lattes.cnpq.br/1002426943626438">
            <li>Ednaldo Oliveira dos Santos (UFRJ/COPPE)</li>
          </a>
          <a href="http://lattes.cnpq.br/2838003403761263">
            <li>Elizabeth Matvienko Sikar (UFRJ/COPPE)</li>
          </a>
          <a href="http://lattes.cnpq.br/7510713692919710">
            <li>Felipe Siqueira Pacheco (UFJF)</li>
          </a>
          <a href="http://lattes.cnpq.br/1341263338653176">
            <li>Ivan Bergier Tavares de Lima (INPE)</li>
          </a>
          <a href="http://lattes.cnpq.br/7301878639558446">
            <li>Luciano Marani (INPE)</li>
          </a>
          <a href="http://lattes.cnpq.br/7511312374795216">
            <li>Nathan Oliveira Barros (UFJF)</li>
          </a>
          <a href="http://lattes.cnpq.br/0578519055132957">
            <li>Plínio Carlos Alvalá (INPE)</li>
          </a>
        </ul>
      </Block>

      <Block>
        <BlockTitle>Gerente de Rede do Portal</BlockTitle>
        João Benedito Diehl
      </Block>

      <Block>
        <BlockTitle>Web e Banco de Dados</BlockTitle>
        <div>
          <a href="http://lattes.cnpq.br/3013376353724630" target="_blank">
            Arley Ferreira de Souza (arley@dpi.inpe.br)
          </a>
        </div>
      </Block>
    </Column>
  </TwoColumnContainer>
);

const PublicacoesContent = () => {
  const Section = styled.div`
    background-color: #e3e8f0;
    padding: 15px;
    margin-bottom: 20px;
    border-radius: 6px;
  `;

  const SectionTitle = styled.div`
    font-weight: bold;
    color: #333;
    margin-bottom: 10px;
    font-size: 18px;
  `;

  const PublicationText = styled.div`
    color: #222;
    font-size: 15px;
    line-height: 1.5;
    margin-bottom: 10px;
  `;

  const PublicationLink = styled.a`
    display: block;
    color: #222;
    text-decoration: none;
    margin-bottom: 8px;

    &:hover {
      text-decoration: underline;
    }
  `;

  return (
    <TwoColumnContainer>
      <Column>
        <Section>
          <SectionTitle>Artigos</SectionTitle>

          <PublicationText>
            <div style={{ gap: "7px" }}>
              <div>
                <span>
                  ABE, D. S.; ADAMS, D. D.; SIDAGIS-GALLI, C.; CIMBLERIS, A. C. P.; TUNDISI, J. G.
                </span>
                <span>
                  Carbon gas cycling in the sediments of Serra da Mesa and Manso reservoirs, central
                  Brazil.
                </span>
                <span>
                  Verhandlungen - Internationale Vereinigung für Theoretische und Angewandte
                  Limnologie, Stuttgart, v. 29, p. 567-572, <span>2005</span>.
                </span>
              </div>

              <a
                href="arquivos/dynamic-chamber-photoacoustic-sensor-2005.pdf"
                target="_blank"
                style={{ textDecoration: "none", color: "black" }}
              >
                <span>
                  LIMA, I. B. T.; MAZZI, E. A.; CARVALHO, J. C.; OMETTO, J. P. H. B.; RAMOS, F. M.;
                  STECH, J. L.; NOVO, E. M. L. M.
                </span>
                <span>
                  Photoacoustic/dynamic chamber method for measuring greenhouse gas fluxes in
                  hydroreservoirs.
                </span>
                <span>
                  Verhandlungen - Internationale Vereinigung für Theoretische und Angewandte
                  Limnologie, Stuttgart, v. 29, p. 603-606, <span>2005</span>.
                </span>
              </a>

              <div>
                <span>LIMA, I. B. T.; NOVO, E. M. L. M.; STECH, J. L.; LORENZZETTI, J. A.</span>
                <span>
                  The use of remote sensing and automated water quality systems for estimating
                  greenhouse gas emissions from hydroelectric reservoirs.
                </span>
                <span>
                  In: Luiz Pinguelli Rosa; Marco Aurélio dos Santos; José Galizia Tundisi. (Org.).
                  Greenhouse gas emissions from hydropower reservoirs and water quality. Rio de
                  Janeiro: COPPE-UFRJ, <span>2004</span>, p. 47-65.
                </span>
              </div>

              <a
                href="arquivos/Extreme_event_dynamics_methane_tropical.pdf"
                target="_blank"
                style={{ textDecoration: "none", color: "black" }}
              >
                <span>
                  RAMOS, F. M.; LIMA, I. B. T.; ROSA, R. R.; MAZZI, E. A.; CARVALHO, J. C.; RASERA,
                  M. F. F. L.; OMETTO, J. P. H. B.; ASSIREU, A. T.; STECH, J. L.
                </span>
                <span>
                  Extreme event dynamics in methane ebullition fluxes from tropical reservoirs.
                </span>
                <span>
                  Geophysical Research Letters, v. 33, L21404, doi:10.1029/2006GL027943,{" "}
                  <span>2006</span>.
                </span>
              </a>

              <a
                href="arquivos/energypolicyhydroversusthermo.pdf"
                target="_blank"
                style={{ textDecoration: "none", color: "black" }}
              >
                <span>SANTOS, M. A.; ROSA, L. P.; MATVIENKO, B.; SIKAR, E.; SANTOS, E. O.</span>
                <span>
                  Gross greenhouse gas fluxes from hydro-power reservoir compared to thermo-power
                  plants.
                </span>
                <span>
                  Energy Policy, The Netherlands, v. 34, n. 1, p. 481-488, <span>2005</span>.
                </span>
              </a>

              <a
                href="arquivos/greenhouse_gases_initial_findings.pdf"
                target="_blank"
                style={{ textDecoration: "none", color: "black" }}
              >
                <span>
                  SIKAR, E.; SANTOS, M. A.; MATVIENKO, B.; SILVA, M. B.; ALMEIDA, C. H. E.; SANTOS,
                  E. O.; BENTES JUNIOR, A. P.; ROSA, L. P.
                </span>
                <span>
                  Greenhouse gases and initial findings on the carbon circulation in two reservoirs
                  and theis watersheds.
                </span>
                <span>
                  Verhandlungen - Internationale Vereinigung für Theoretische und Angewandte
                  Limnologie, Stuttgart, v. 29, n. 2, p. 573-576, <span>2005</span>.
                </span>
              </a>

              <a
                href="arquivos/VariabilityCarbonDioxideFluxTropical.pdf"
                target="_blank"
                style={{ textDecoration: "none", color: "black" }}
              >
                <span>
                  ROLAND F.; VIDAL L. O.; PACHECO, F. S.; BARROS, N. O.; ASSIREU, A. T.; OMETTO, J.
                  P. H. B.; CIMBLERIS, A. C. P.; COLE, J. J.
                </span>
                <span>
                  Variability of carbon dioxide flux from tropical (Cerrado) hydroelectric
                  reservoirs.
                </span>
                <span>
                  Aquatic Sciences, v. 72, n. 3, p. 283-293, <span>2010</span>.
                </span>
              </a>
            </div>
          </PublicationText>
        </Section>

        <Section>
          <SectionTitle>Capítulos de livros</SectionTitle>
          <PublicationText>
            <div style={{ gap: "7px" }}>
              <div>
                <span>
                  ABE, D. S.; SIDAGIS-GALLI, C.; ADAMS, D. D.; CIMBLERIS, A. C. P.; BRUM, P. R.;
                  TUNDISI, J. G.; TUNDISI, T. M.; MATSUMURA-TUNDISI, J. E.
                </span>
                <span>
                  Carbon gas emission from the sediments of reservoirs of different ages in central
                  Brazil.
                </span>
                <span>
                  In: Marco Aurélio dos Santos; Luiz Pinguelli Rosa. (Org.). Global Warming and
                  Hydroelectric Reservoirs. 1 ed. Rio de Janeiro: COPPE/UFRJ e Eletrobrás,{" "}
                  <span>2005</span>, v. 1, p. 101-107.
                </span>
              </div>

              <div>
                <span>
                  ASSIREU, A. T.; STECH, J. L.; MARINHO, M. M.; CESAR, D. E.; LORENZZETTI, J. A.;
                  FERREIRA, R. M.; PACHECO, F. S.; ROLAND, F.
                </span>
                <span>Princípios físicos e químicos a serviço da limnologia - um exercício.</span>
                <span>
                  In: Fábio Roland; Dionéia E. Cesar; Marcelo Marinho. (Org.). Lições de Limnologia.
                  1 ed. São Carlos - SP, <span>2005</span>, p. 229-242.
                </span>
              </div>

              <div>
                <span>FERREIRA, R. M.; ROLAND, F.</span>
                <span>Caminhos do fósforo em ecossistemas aquáticos continentais.</span>
                <span>
                  In: Fábio Roland; Dionéia E. Cesar; Marcelo Marinho. (Org.). Lições de Limnologia.
                  1 ed. São Carlos - SP, <span>2005</span>, p. 229-242.
                </span>
              </div>

              <div>
                <span>
                  ROSA, L. P.; SANTOS, M. A.; MATVIENKO, B.; SANTOS, E. O.; SILVA, M. B.; SIKAR, E.
                </span>
                <span>
                  Long term monitoring of greenhouse gas emissions at two brazilian hydro
                  reservoirs.
                </span>
                <span>
                  In: Luiz Pinguelli Rosa; Marco Aurélio dos Santos; José Galízia Tundisi. (Org.).
                  Greenhouse Gas Emissions from Hydropower Reservoirs and Water Quality. 1 ed. Rio
                  de Janeiro: COPPE/UFRJ, <span>2004</span>, v. 1, p. 121-136.
                </span>
              </div>

              <div>
                <span>SANTOS, M. A.; MATVIENKO, B.; ROSA, L. P.; SIKAR, E.</span>
                <span>
                  Carbon dioxide and methane emissions from hydroelectric reservoirs in Brazil.
                </span>
                <span>
                  In: Marco Aurélio dos Santos; Luiz Pinguelli Rosa. (Org.). Global Warming and
                  Hydroelectric Reservoirs. 1 ed. Rio de Janeiro: COPPE/UFRJ, <span>2005</span>, v.
                  1, p. 81-94.
                </span>
              </div>

              <div>
                <span>VIDAL, L. O.; MENDONÇA, R. F.; MARINHO, M. M.; ROLAND, F.</span>
                <span>Caminhos do carbono em ecossistemas aquáticos continentais.</span>
                <span>
                  In: Fábio Roland; Dionéia E. Cesar; Marcelo Marinho. (Org.). Lições de Limnologia.
                  1 ed. São Carlos: Rima, <span>2005</span>, p. 193-208.
                </span>
              </div>
            </div>
          </PublicationText>
        </Section>

        <Section>
          <SectionTitle>Eventos</SectionTitle>

          <PublicationText>
            <div style={{ gap: "7px" }}>
              <a
                href="http://www.dsr.inpe.br/sbsr2011/files/p0144.pdf"
                target="_blank"
                style={{ textDecoration: "none", color: "black" }}
              >
                <span>
                  ALCÂNTARA, E. H; STECH, J. L.; LORENZZETTI, J. A.; NOVO, E. M. L. M.; and SOUZA,
                  A. F.
                </span>
                <span>
                  Estimativa dos fluxos de calor sensível e latente na superfície da água do
                  reservatório de Itumbiara (GO) por meio de dados MODIS/Terra.
                </span>
                <span>
                  In: Simpósio Brasileiro de Sensoriamento Remoto, <span>2011</span>, Curitiba.
                  Anais XV Simpósio Brasileiro de Sensoriamento Remoto - SBSR. São José dos Campos:
                  INPE, p.: 5185-5192.
                </span>
              </a>

              <a
                href="http://www.conferences.earsel.org/abstract/show/2507"
                target="_blank"
                style={{ textDecoration: "none", color: "black" }}
              >
                <span>ALCÂNTARA, E.; and STECH, J.</span>
                <span>Spatially Water Heat Flux using MODIS/terra data.</span>
                <span>
                  In: 31st EARSeL Symposium and 34th General Assembly 2011. Prague: European
                  Association of Remote Sensing Laboratories, <span>2011</span>.
                </span>
              </a>

              <a
                href="http://vefsetur.hi.is/ppnw/sites/files/ppnw/PPNWProceedings-Final.pdf"
                target="_blank"
                style={{ textDecoration: "none", color: "black" }}
              >
                <span>
                  ALCÂNTARA, E. H.; STECH, J. L.; CASAMITJANA, X.; BONNET, M-P; LORENZZETTI, J. A.;
                  and NOVO, E. M. L. M.
                </span>
                <span>
                  On the spatially water temperature and heat flux variability over a tropical
                  hydroelectric reservoir.
                </span>
                <span>
                  In: 14th International Workshop on Physical Processes in Natural Waters, 2010,
                  Reykjavík: University of Iceland, p.: 8-15. <span>2010</span>.
                </span>
              </a>

              <a
                href="http://vefsetur.hi.is/ppnw/sites/files/ppnw/PPNWProceedings-Final.pdf"
                target="_blank"
                style={{ textDecoration: "none", color: "black" }}
              >
                <span>
                  ALCÂNTARA, E. H.; STECH, J. L.; LORENZZETTI, J. A.; and NOVO, E. M. L. M.
                </span>
                <span>
                  Cross wavelet, coherence and phase between water surface temperature and heat flux
                  in a tropical hydroelectric reservoir.
                </span>
                <span>
                  In: 14th International Workshop on Physical Processes in Natural Waters, 2010,
                  Reykjavík: University of Iceland, p.: 86-93. <span>2011</span>.
                </span>
              </a>

              <a
                href="http://marte.dpi.inpe.br/col/dpi.inpe.br/sbsr@80/2006/10.11.04.08/doc/6549-6556.pdf"
                target="_blank"
                style={{ textDecoration: "none", color: "black" }}
              >
                <span>
                  ALCÂNTARA, E. H.; STECH, J. L. ; BARBOSA, C.; NOVO, E. ; and SHIMABUKURO, Y.
                </span>
                <span>
                  Integração de dados de alta frequência temporal e imagens MODIS/Terra para o
                  estudo da turbidez na planície de Curuai (PA, Brasil).
                </span>
                <span>
                  In: XIII Simpósio Brasileiro de Sensoriamento Remoto, <span>2007</span>,
                  Florianópolis. XIII Simpósio Brasileiro de Sensoriamento Remoto - SBSR. São José
                  dos Campos: INPE, p.: 6549-6556.
                </span>
              </a>

              <a
                href="http://marte.dpi.inpe.br/col/dpi.inpe.br/sbsr@80/2008/11.12.16.41/doc/4647-4653.pdf"
                target="_blank"
                style={{ textDecoration: "none", color: "black" }}
              >
                <span>
                  ASSIREU, A. T.; NOVO, E M. L. M.; ROLAND, F.; PACHECO, F. S.; ALCÂNTARA, E. H.;
                  and STECH, J. L.
                </span>
                <span>
                  O comportamento do rio ao longo do reservatório observado a partir de
                  Sensoriamento Remoto, dados in situ e ensaios de laboratório.
                </span>
                <span>
                  In: XVI Simpósio Brasileiro de Sensoriamento Remoto, <span>2009</span>, Natal. XIV
                  Simpósio Brasileiro de Sensoriamento Remoto - SBSR. São José dos Campos: INPE, p.:
                  4647-4653.
                </span>
              </a>

              <a
                href="http://marte.dpi.inpe.br/col/ltid.inpe.br/sbsr/2004/11.26.18.43/doc/2455.pdf"
                target="_blank"
                style={{ textDecoration: "none", color: "black" }}
              >
                <span>
                  ASSIREU, A. T.; STECH, J. L.; NOVO, E. M. L. M.; LORENZETTI, J. A.; LIMA, I. B.
                  T.; and CARVALHO, J. C.
                </span>
                <span>
                  Aplicação do Operador de Fragmentação Assimétrica (FA) na comparação de dados
                  coletados in situ por diferentes sensores e transmitidos pelos satélites
                  brasileiros SCD e CBERS: um exemplo de aplicação ao Sistema de Monitoramento
                  Ambiental (SIMA).
                </span>
                <span>
                  In: XII Simpósio Brasileiro de Sensoriamento Remoto, <span>2005</span>, Goiânia.
                  XII Simpósio Brasileiro de Sensoriamento Remoto - SBSR. São José dos Campos: INPE,
                  p.: 2455-2462.
                </span>
              </a>

              <a
                href="http://marte.dpi.inpe.br/col/dpi.inpe.br/sbsr@80/2008/11.14.00.00/doc/4797-4804.pdf"
                target="_blank"
                style={{ textDecoration: "none", color: "black" }}
              >
                <span>
                  NOVO, E. M. L. M.; STECH, J. L.; LONDE, L. R.; ASSIREU, A.; BARBOSA, C. C.;
                  ALCÂNTARA, E. H.; and SOUZA, A. F.
                </span>
                <span>
                  Integração de dados do sistema automático de monitoramento de variáveis ambientais
                  (SIMA) e de imagens orbitais na avaliação do estado trófico do Reservatório da UHE
                  Funil.
                </span>
                <span>
                  In: XVI Simpósio Brasileiro de Sensoriamento Remoto, <span>2009</span>, Natal. XIV
                  Simpósio Brasileiro de Sensoriamento Remoto - SBSR. São José dos Campos: INPE, p.:
                  4797-4804.
                </span>
              </a>

              <a href="#" target="_blank" style={{ textDecoration: "none", color: "black" }}>
                <span>
                  NOVO, E.; BARBOSA, C.; STECH, J.; ALCÂNTARA, E. H.; RUDORFF, C. M.; and ASSIREU,
                  A. T.
                </span>
                <span>
                  Temporal variability Chlorophyll-a concentration in floodplain lakes in response
                  to seasonality of Amazon River discharge.
                </span>
                <span>
                  In: Amazônia em Perspectiva, <span>2008</span>, Manaus. Anais Amazônia em
                  Perspectiva.
                </span>
              </a>

              <a
                href="http://marte.dpi.inpe.br/col/dpi.inpe.br/sbsr@80/2008/11.17.22.59.52/doc/2349-2355.pdf"
                target="_blank"
                style={{ textDecoration: "none", color: "black" }}
              >
                <span>SOUZA, A. F.; BARBOSA, C. C.; NOVO, E. M. L. M.; and STECH, J. L.</span>
                <span>
                  Arquitetura de um banco de dados para suporte à integração de dados de campo e de
                  sensoriamento remoto em estudos limnológicos e meteorológicos.
                </span>
                <span>
                  In: XVI Simpósio Brasileiro de Sensoriamento Remoto, <span>2009</span>, Natal. XIV
                  Simpósio Brasileiro de Sensoriamento Remoto - SBSR. São José dos Campos: INPE, p.:
                  2349-2355.
                </span>
              </a>

              <a
                href="http://vefsetur.hi.is/ppnw/sites/files/ppnw/PPNWProceedings-Final.pdf"
                target="_blank"
                style={{ textDecoration: "none", color: "black" }}
              >
                <span>
                  STECH, J. L.; ALCÂNTARA, E. H.; LORENZZETTI, J. A.; NOVO, E. M. L. M.; and
                  ASSIREU, A. T.
                </span>
                <span>
                  The impacts of the cold fronts on thermal stratification and water quality in a
                  tropical reservoir (Brazil).
                </span>
                <span>
                  In: 14th International Workshop on Physical Processes in Natural Waters,{" "}
                  <span>2010</span>, Reykjavík: University of Iceland, p.: 94-101. 2010.
                </span>
              </a>

              <a
                href="http://www.dsr.inpe.br/sbsr2011/files/p0862.pdf"
                target="_blank"
                style={{ textDecoration: "none", color: "black" }}
              >
                <span>VALÉRIO, A. M.; KAMPEL, M.; STECH, J. L.; and ASSIREU, A. T.</span>
                <span>
                  Variabilidade dos dados bóia SIMA analisados pelo Operador de Fragmentação
                  Assimétrica.
                </span>
                <span>
                  In: Simpósio Brasileiro de Sensoriamento Remoto, <span>2011</span>, Curitiba.
                  Anais XV Simpósio Brasileiro de Sensoriamento Remoto - SBSR. São José dos Campos:
                  INPE, p.: 5108-5115.
                </span>
              </a>
            </div>
          </PublicationText>
        </Section>

        <Section>
          <SectionTitle>Teses e dissertações</SectionTitle>
          <PublicationText>
            <div style={{ gap: "7px" }}>
              <a
                href="http://mtc-m19.sid.inpe.br/rep/sid.inpe.br/mtc-m19@80/2010/07.26.20.24?languagebutton=pt-BR&searchsite=bibdigital.sid.inpe.br:80"
                target="_blank"
                style={{ textDecoration: "none", color: "black" }}
              >
                <span>ALCÂNTARA, E. H.</span>
                <span>2010</span>.
                <span>
                  Sensoriamento remoto da temperatura e dos fluxos de calor na superfície da água no
                  reservatório de Itumbiara (GO). Tese (Doutorado em Sensoriamento Remoto) -
                  Instituto Nacional de Pesquisas Espaciais. 136 p.
                </span>
              </a>

              <a
                href="http://mtc-m17.sid.inpe.br/rep/sid.inpe.br/mtc-m17@80/2007/02.15.17.09?languagebutton=pt-BR&searchsite=bibdigital.sid.inpe.br:80"
                target="_blank"
                style={{ textDecoration: "none", color: "black" }}
              >
                <span>ALCÂNTARA, E. H.</span>
                <span>2006</span>.
                <span>
                  Análise da turbidez na planície de inundação de Curuaí (PA, Brasil) integrando
                  dados telemétricos e Imagens MODIS/Terra. Dissertação (Mestrado em Sensoriamento
                  Remoto) - Instituto Nacional de Pesquisas Espaciais. 217 p.
                </span>
              </a>

              <a
                href="http://mtc-m19.sid.inpe.br/rep/sid.inpe.br/mtc-m19/2011/09.13.07.48?languagebutton=pt-BR&searchsite=bibdigital.sid.inpe.br:80"
                target="_blank"
                style={{ textDecoration: "none", color: "black" }}
              >
                <span>CESAR, G. M.</span>
                <span>2011</span>.
                <span>
                  Caracterização da influência de sistemas frontais sobre a qualidade da água do
                  reservatório de Itumbiara, GO, utilizando dados de sensoriamento remoto e dados in
                  situ. Dissertação (Mestrado em Sensoriamento Remoto) - Instituto Nacional de
                  Pesquisas Espaciais. 81 p.
                </span>
              </a>

              <a
                href="http://mtc-m19.sid.inpe.br/rep/sid.inpe.br/mtc-m19@80/2010/03.15.18.39?languagebutton=pt-BR&searchsite=bibdigital.sid.inpe.br:80"
                target="_blank"
                style={{ textDecoration: "none", color: "black" }}
              >
                <span>NASCIMENTO, R. F. F.</span>
                <span>2010</span>.
                <span>
                  Utilização de imagens MERIS e dados in situ para a caracterização bio-óptica do
                  reservatório de Itumbiara, GO. Dissertação (Mestrado em Sensoriamento Remoto) -
                  Instituto Nacional de Pesquisas Espaciais. 91 p.
                </span>
              </a>

              <a
                href="http://mtc-m18.sid.inpe.br/rep/sid.inpe.br/mtc-m18@80/2009/05.06.19.17?languagebutton=pt-BR&searchsite=bibdigital.sid.inpe.br:80"
                target="_blank"
                style={{ textDecoration: "none", color: "black" }}
              >
                <span>VALÉRIO, A. M.</span>
                <span>2009</span>.
                <span>
                  O uso do sensoriamento remoto orbital e de superfície para o estudo do
                  comportamento do corpo de água do reservatório de Manso, MT, Brasil. Dissertação
                  (Mestrado em Sensoriamento Remoto) - Instituto Nacional de Pesquisas Espaciais.
                  117 p.
                </span>
              </a>
            </div>
          </PublicationText>
        </Section>
        <Section>
          <SectionTitle>Relatórios técnicos</SectionTitle>
          <PublicationText>
            <div>
              <a
                href="arquivos/SatelliteEcohydrology.pdf"
                target="_blank"
                style={{ textDecoration: "none", color: "black" }}
              >
                <span>LIMA, I. B. T. ; STECH, J. L. ; RAMOS, F. M.</span>
                <span>
                  Satellite ecohydrology and multifractals: perspectives for understanding and
                  dealing with greenhouse gas emissions from hydroreservoirs.
                </span>
                <span>
                  Relatório técnico - INPE, <span>2005</span>.
                </span>
              </a>
            </div>
          </PublicationText>
        </Section>
      </Column>
    </TwoColumnContainer>
  );
};

const DescricaoContent = () => {
  const Section = styled.div`
    background-color: #e3e8f0;
    padding: 15px;
    margin-bottom: 20px;
    border-radius: 6px;
  `;

  const SectionTitle = styled.div`
    font-weight: bold;
    color: #333;
    margin-bottom: 10px;
    font-size: 18px;
  `;

  return (
    <TwoColumnContainer>
      <Column>
        <Section>
          <SectionTitle>Sobre a Base de dados</SectionTitle>A base de dados é formada pelos
          resultados de 79 campanhas realizadas pelas instituições participantes nos reservatórios
          listados abaixo. As datas compreendem o período de início e fim de cada campanha no
          reservatório. As datas de cada campanha podem variar de uma instituição para outra. Ao
          lado são listados os conjuntos de dados coletados por cada instituição. Os dados
          fornecidos por Furnas não são provenientes de campanhas.
        </Section>

        <Section>
          <SectionTitle>Campanhas em Corumbá</SectionTitle>

          <div>
            <div>IIE</div>
            <div>Primeira: 16/11/2004 a 19/11/2004</div>
            <div>Segunda: 5/3/2005 a 17/3/2005</div>
            <div>Terceira: 21/8/2005 a 24/8/2005</div>
            <div>INPE</div>
            <div>Segunda: 12/3/2005 a 19/3/2005</div>
            <div>Terceira: 23/8/2005 a 28/8/2005</div>
            <div>UFJF</div>
            <div>Primeira: 16/11/2004 a 18/11/2004</div>
            <div>Segunda: 14/3/2005 a 17/3/2005</div>
            <div>Terceira: 20/8/2005 a 24/8/2005</div>
            <div>UFRJ</div>
            <div>Primeira: 16/11/2004 a 21/11/2004</div>
            <div>Segunda: 14/3/2005 a 17/3/2005</div>
            <div>Terceira: 21/8/2005 a 24/8/2005</div>
          </div>
        </Section>

        <Section>
          <SectionTitle>Campanhas em Estreito</SectionTitle>

          <div>
            <div>IIE</div>
            <div>Primeira: 14/11/2005 a 15/11/2005</div>
            <div>Segunda: 28/3/2006 a 29/3/2006</div>
            <div>Terceira: 9/8/2006 a 11/8/2006</div>
            <div>UFJF</div>
            <div>Primeira: 18/11/2005 a 18/11/2005</div>
            <div>Segunda: 8/4/2006 a 10/4/2006</div>
            <div>Terceira: 9/8/2006 a 10/8/2006</div>
            <div>UFRJ</div>
            <div>Primeira: 14/11/2005 a 16/11/2005</div>
            <div>Segunda: 26/3/2006 a 28/3/2006</div>
            <div>Terceira: 10/8/2006 a 13/8/2006</div>
          </div>
        </Section>

        <Section>
          <SectionTitle>Campanhas em Funil</SectionTitle>

          <div>
            <div>IIE</div>
            <div>Primeira: 20/11/2006 a 28/11/2006</div>
            <div>Segunda: 26/3/2007 a 29/3/2007</div>
            <div>Terceira: 23/7/2007 a 26/7/2007</div>
            <div>UFRJ</div>
            <div>Primeira: 20/11/2006 a 23/11/2006</div>
            <div>Segunda: 26/3/2007 a 29/3/2007</div>
            <div>Terceira: 23/7/2007 a 26/7/2007</div>
          </div>
        </Section>

        <Section>
          <SectionTitle>Campanhas em Furnas</SectionTitle>

          <div>
            <div>IIE</div>
            <div>Primeira: 19/11/2005 a 22/11/2005</div>
            <div>Segunda: 3/4/2006 a 7/4/2006</div>
            <div>Terceira: 31/7/2006 a 5/8/2006</div>
            <div>UFJF</div>
            <div>Primeira: 15/11/2005 a 23/11/2005</div>
            <div>Segunda: 2/4/2006 a 4/4/2006</div>
            <div>Terceira: 31/7/2006 a 2/8/2006</div>
            <div>UFRJ</div>
            <div>Primeira: 20/11/2005 a 27/11/2005</div>
            <div>Segunda: 2/4/2006 a 8/4/2006</div>
            <div>Terceira: 31/7/2006 a 7/8/2006</div>
          </div>
        </Section>

        <Section>
          <SectionTitle>Campanhas em Itumbiara</SectionTitle>

          <div>
            <div>IIE</div>
            <div>Primeira: 20/11/2004 a 23/11/2004</div>
            <div>Segunda: 19/3/2005 a 22/3/2005</div>
            <div>Terceira: 25/8/2005 a 28/8/2005</div>
            <div>UFJF</div>
            <div>Primeira: 20/11/2004 a 21/11/2004</div>
            <div>Segunda: 18/3/2005 a 20/3/2005</div>
            <div>Terceira: 25/8/2005 a 28/8/2005</div>
            <div>UFRJ</div>
            <div>Primeira: 22/11/2004 a 26/11/2004</div>
            <div>Segunda: 17/3/2005 a 23/3/2005</div>
            <div>Terceira: 25/8/2005 a 30/8/2005</div>
          </div>
        </Section>

        <Section>
          <SectionTitle>Campanhas em Manso</SectionTitle>

          <div>
            <div>IIE</div>
            <div>Primeira: 25/11/2003 a 26/11/2003</div>
            <div>Segunda: 22/3/2004 a 24/3/2004</div>
            <div>Terceira: 19/7/2004 a 21/7/2004</div>
            <div>Quarta: 27/11/2006 a 29/11/2006</div>
            <div>Quinta: 19/3/2007 a 22/3/2007</div>
            <div>Sexta: 16/7/2007 a 18/7/2007</div>
            <div>INPE</div>
            <div>Primeira: 22/3/2004 a 25/3/2004</div>
            <div>UFJF</div>
            <div>Primeira: 25/11/2003 a 25/11/2003</div>
            <div>Segunda: 24/3/2004 a 25/3/2004</div>
            <div>Terceira: 19/7/2004 a 22/7/2004</div>
            <div>UFRJ</div>
            <div>Primeira: 24/11/2003 a 27/11/2003</div>
            <div>Segunda: 22/3/2004 a 25/3/2004</div>
            <div>Terceira: 18/7/2004 a 25/7/2004</div>
            <div>Quarta: 27/11/2006 a 1/12/2006</div>
            <div>Quinta: 19/3/2007 a 22/3/2007</div>
            <div>Sexta: 16/7/2007 a 19/7/2007</div>
          </div>
        </Section>

        <Section>
          <SectionTitle>Campanhas em Mascarenhas de Moraes</SectionTitle>

          <div>
            <div>IIE</div>
            <div>Primeira: 14/11/2005 a 17/11/2005</div>
            <div>Segunda: 29/3/2006 a 1/4/2006</div>
            <div>Terceira: 6/8/2006 a 10/8/2006</div>
            <div>UFJF</div>
            <div>Primeira: 17/11/2005 a 21/11/2005</div>
            <div>Segunda: 7/4/2006 a 12/4/2006</div>
            <div>Terceira: 4/8/2006 a 8/8/2006</div>
            <div>UFRJ</div>
            <div>Primeira: 17/11/2005 a 21/11/2005</div>
            <div>Segunda: 28/3/2006 a 1/4/2006</div>
            <div>Terceira: 7/8/2006 a 10/8/2006</div>
          </div>
        </Section>

        <Section>
          <SectionTitle>Campanhas em Mascarenhas de Moraes</SectionTitle>

          <div>
            <div>IIE</div>
            <div>Primeira: 14/11/2005 a 17/11/2005</div>
            <div>Segunda: 29/3/2006 a 1/4/2006</div>
            <div>Terceira: 6/8/2006 a 10/8/2006</div>
            <div>UFJF</div>
            <div>Primeira: 17/11/2005 a 21/11/2005</div>
            <div>Segunda: 7/4/2006 a 12/4/2006</div>
            <div>Terceira: 4/8/2006 a 8/8/2006</div>
            <div>UFRJ</div>
            <div>Primeira: 17/11/2005 a 21/11/2005</div>
            <div>Segunda: 28/3/2006 a 1/4/2006</div>
            <div>Terceira: 7/8/2006 a 10/8/2006</div>
          </div>
        </Section>

        <Section>
          <SectionTitle>Campanhas em Serra da Mesa</SectionTitle>

          <div>
            <div>Campanhas em Serra da Mesa</div>
            <div>IIE</div>
            <div>Primeira: 18/11/2003 a 21/11/2003</div>
            <div>Segunda: 15/3/2004 a 19/3/2004</div>
            <div>Terceira: 12/7/2004 a 16/7/2004</div>
            <div>INPE</div>
            <div>Primeira: 16/3/2004 a 18/3/2004</div>
            <div>UFJF</div>
            <div>Primeira: 18/11/2003 a 18/11/2003</div>
            <div>Segunda: 18/3/2004 a 18/3/2004</div>
            <div>Terceira: 12/7/2004 a 14/7/2004</div>
            <div>UFRJ</div>
            <div>Primeira: 17/11/2003 a 21/11/2003</div>
            <div>Segunda: 15/3/2004 a 19/3/2004</div>
            <div>Terceira: 12/7/2004 a 17/7/2004</div>
          </div>
        </Section>
      </Column>
    </TwoColumnContainer>
  );
};

// ================= Componente principal =================
const App: React.FC = () => {
  const [page, setPage] = useState<"home" | "equipe" | "publicacoes" | "descricao">("home");

  useEffect(() => {
    const ano = document.getElementById("ano");
    if (ano) ano.innerText = new Date().getFullYear().toString();
  }, []);

  const openMapa = () => {
    window.open("http://www.dsr.inpe.br/hidrosfera/sima/mapa.php", "_blank");
  };

  return (
    <PageContainer>
      {/* Header */}
      <HeaderContainer>
        <LogoSIMA />
        <div style={{ display: "flex", flexDirection: "column", textAlign: "right", gap: "10px" }}>
          <HeaderText>Dados da Campanha</HeaderText>
          Projeto Balanço de Carbono nos Reservatórios de FURNAS Centrais Elétricas S.A.
        </div>
        <HeaderBanner />
      </HeaderContainer>

      {/* Menu */}
      <Menu>
        <MenuItem active={page === "home"} onClick={() => setPage("home")}>
          Home
        </MenuItem>
        <MenuItem active={page === "equipe"} onClick={() => setPage("equipe")}>
          Equipe
        </MenuItem>
        <MenuItem active={page === "publicacoes"} onClick={() => setPage("publicacoes")}>
          Publicações
        </MenuItem>
        <MenuItem active={page === "descricao"} onClick={() => setPage("descricao")}>
          Descricao
        </MenuItem>
        <MenuItem onClick={openMapa}>Mapa SIMA</MenuItem> {/* NOVO LINK */}
      </Menu>

      {/* Conteúdo */}
      {page === "home" && <HomeContent />}
      {page === "equipe" && <EquipeContent />}
      {page === "publicacoes" && <PublicacoesContent />}
      {page === "descricao" && <DescricaoContent />}

      {/* Footer */}
      <Footer>
        © <span id="ano"></span>&nbsp;Hidrosfera INPE
      </Footer>
    </PageContainer>
  );
};

export default App;
