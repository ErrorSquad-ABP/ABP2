import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Download } from "lucide-react";

// ================= Styled Components =================
const PageContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  font-family: "Calibri", "Arial", "Helvetica", "Verdana", "sans-serif";
  font-size: 15px;
  background-color: #ffffff;
  box-sizing: border-box;
  padding: 0;

  @media (max-width: 768px) {
    font-size: 14px;
    padding-bottom: 60px;
    overflow-x: hidden;
  }
`;

const HeaderWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(90deg, #2563eb 0%, #1e40af 100%);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding-bottom: 0;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    text-align: center;
  }
`;

const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1.5rem 0 0.5rem 0;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 1rem 0.5rem;
  }
`;

const HeaderText = styled.h1`
  color: #fff;
  font-size: 1.8rem;
  font-weight: bold;
  text-align: center;
  margin: 0;

  @media (max-width: 600px) {
    font-size: 1.4rem;
  }
`;

const HeaderSeparator = styled.div`
  width: 100%;
  height: 3px;
  background-color: rgba(255, 255, 255, 0.7);
  margin: 0.5rem 0;
  border-radius: 2px;
`;

const Separator = styled.div`
  width: 60%;
  height: 2px;
  background-color: rgba(255, 255, 255, 0.5);
  margin: 0.5rem 0 2rem 0;
`;

const Menu = styled.div`
  display: flex;
  justify-content: center;
  gap: 25px;
  padding: 0.75rem 0;

  @media (max-width: 768px) {
    gap: 15px;
    padding: 0.5rem;
    flex-wrap: wrap;
  }
`;

const MenuItem = styled.span<{ active?: boolean }>`
  color: ${(props) => (props.active ? "#fff" : "#cce0ff")};
  font-weight: 600;
  cursor: pointer;
  position: relative;
  transition: all 0.2s;

  &:hover {
    color: #fff;
  }

  &::after {
    content: "";
    display: block;
    margin: 0 auto;
    height: 3px;
    width: ${(props) => (props.active ? "100%" : "0")};
    background: #cce0ff;
    transition: width 0.3s;
  }

  &:hover::after {
    width: 100%;
  }

  @media (max-width: 768px) {
    gap: 15px;
    padding: 0.5rem;
  }
`;

const TwoColumnContainer = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: center;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 0 0.5rem;
  }
`;

const Column = styled.div`
  flex: 1 1 400px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media (max-width: 900px) {
    flex: 1 1 100%;
  }
`;

const Block = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  border-radius: 8px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  margin: 20px;
  min-height: 400px;
  max-height: 90vh;
  overflow: hidden;
  position: relative;

  > div:last-child {
    flex: 1;
    overflow-y: auto;
    scrollbar-width: thin;
    scrollbar-color: #2563eb #f1f1f1;
  }

  > div:last-child::-webkit-scrollbar {
    width: 6px;
  }

  > div:last-child::-webkit-scrollbar-thumb {
    background-color: #2563eb;
    border-radius: 10px;
  }

  > div:last-child::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  @media (max-width: 768px) {
    margin: 12px 8px;
  }
`;

const BlockTitle = styled.div`
  font-size: 1.3rem;
  font-weight: 600;
  color: #fff;
  margin: 0;
  padding: 1rem;
  background: linear-gradient(90deg, #2563eb 0%, #1e40af 100%);
  text-align: center;

  @media (max-width: 600px) {
    font-size: 1.1rem;
    padding: 0.8rem;
  }
`;

const BlockText = styled.div`
  color: #222;
  text-align: justify;
  font-size: 15px;
  line-height: 1.5;
  padding: 15px;
  overflow-y: auto;
  flex: 1;
  height: calc(100vh - 220px);
  box-sizing: border-box;
  scrollbar-width: thin;
  scrollbar-color: #2563eb #f1f1f1;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #2563eb;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  @media (max-width: 600px) {
    font-size: 14px;
    line-height: 1.5;
    padding: 12px;
  }
`;

const Footer = styled.footer`
  width: 100%;
  max-width: 1100px;
  clear: both;
  padding: 16px 20px;
  margin-top: 28px;
  border-top: 1px solid rgba(11, 39, 64, 0.06);
  text-align: right;
  font-weight: 600;
  color: #334155;

  @media (max-width: 768px) {
    text-align: center;
    font-size: 14px;
    padding: 20px 10px;
  }
`;

// ================= Novos componentes para Download =================
const DownloadSection = styled.div`
  padding: 20px;
`;

const DownloadGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
`;

const DownloadCard = styled.div`
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;
`;

const DownloadCardTitle = styled.h3`
  color: #1f2937;
  margin-bottom: 10px;
  font-size: 1.1rem;
`;

const DownloadCardDescription = styled.p`
  color: #6b7280;
  margin-bottom: 15px;
  font-size: 0.9rem;
`;

const DownloadButton = styled.button<{ disabled?: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: ${(props) => (props.disabled ? "#9ca3af" : "#2563eb")};
  color: white;
  border: none;
  border-radius: 6px;
  padding: 10px 16px;
  font-size: 0.9rem;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${(props) => (props.disabled ? "#9ca3af" : "#1e40af")};
  }
`;

const DownloadInfo = styled.div`
  background: #e8f4fd;
  padding: 15px;
  border-radius: 6px;
  border: 1px solid #b3d9ff;
  margin-bottom: 20px;

  p {
    margin: 0;
    color: #1e40af;
    font-size: 0.9rem;
  }
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
        <BlockText style={{ overflowY: "auto", maxHeight: "80vh", paddingRight: "10px" }}>
          <div style={{ gap: "7px" }}></div>
          Os dados são formados por coletas realizadas em 79 campanhas com datas e localidades
          (reservatórios) distintos com o objetivo de coletar parâmetros na interface
          água-sedimento, coluna d'água e interface água-atmosfera. Mais detalhes sobre a base de
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
              nutrientes na coluna d'água;
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
        <BlockText>João Benedito Diehl</BlockText>
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
  return (
    <TwoColumnContainer>
      <Column>
        <Block>
          <BlockTitle>Artigos</BlockTitle>

          <BlockText style={{ overflowY: "auto", maxHeight: "80vh", paddingRight: "10px" }}>
            <div style={{ gap: "7px" }}></div>
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
          </BlockText>
        </Block>

        <Block>
          <BlockTitle>Capítulos de livros</BlockTitle>
          <BlockText style={{ overflowY: "auto", maxHeight: "80vh", paddingRight: "10px" }}>
            <div style={{ gap: "7px" }}></div>
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
          </BlockText>
        </Block>

        <Block>
          <BlockTitle>Eventos</BlockTitle>

          <BlockText style={{ overflowY: "auto", maxHeight: "80vh", paddingRight: "10px" }}>
            <div style={{ gap: "7px" }}></div>
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
          </BlockText>
        </Block>

        <Block>
          <BlockTitle>Teses e dissertações</BlockTitle>
          <BlockText>
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
          </BlockText>
        </Block>
        <Block>
          <BlockTitle>Relatórios técnicos</BlockTitle>
          <BlockText>
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
          </BlockText>
        </Block>
      </Column>
    </TwoColumnContainer>
  );
};

const DescricaoContent = () => {
  return (
    <TwoColumnContainer>
      <Column>
        <Block>
          <BlockTitle>Sobre a Base de dados</BlockTitle>
          <BlockText>
            A base de dados é formada pelos resultados de 79 campanhas realizadas pelas instituições
            participantes nos reservatórios listados abaixo. As datas compreendem o período de
            início e fim de cada campanha no reservatório. As datas de cada campanha podem variar de
            uma instituição para outra. Ao lado são listados os conjuntos de dados coletados por
            cada instituição. Os dados fornecidos por Furnas não são provenientes de campanhas.
          </BlockText>
        </Block>

        <Block>
          <BlockTitle>Campanhas em Corumbá</BlockTitle>
          <BlockText>
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
          </BlockText>
        </Block>

        <Block>
          <BlockTitle>Campanhas em Estreito</BlockTitle>

          <BlockText>
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
          </BlockText>
        </Block>

        <Block>
          <BlockTitle>Campanhas em Funil</BlockTitle>
          <BlockText>
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
          </BlockText>
        </Block>

        <Block>
          <BlockTitle>Campanhas em Furnas</BlockTitle>
          <BlockText>
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
          </BlockText>
        </Block>

        <Block>
          <BlockTitle>Campanhas em Itumbiara</BlockTitle>
          <BlockText>
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
          </BlockText>
        </Block>

        <Block>
          <BlockTitle>Campanhas em Manso</BlockTitle>
          <BlockText style={{ overflowY: "auto", maxHeight: "80vh", paddingRight: "10px" }}>
            <div style={{ gap: "7px" }}></div>
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
          </BlockText>
        </Block>

        <Block>
          <BlockTitle>Campanhas em Mascarenhas de Moraes</BlockTitle>
          <BlockText>
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
          </BlockText>
        </Block>

        <Block>
          <BlockTitle>Campanhas em Mascarenhas de Moraes</BlockTitle>
          <BlockText>
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
          </BlockText>
        </Block>

        <Block>
          <BlockTitle>Campanhas em Serra da Mesa</BlockTitle>
          <BlockText style={{ overflowY: "auto", maxHeight: "80vh", paddingRight: "10px" }}>
            <div style={{ gap: "7px" }}></div>
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
          </BlockText>
        </Block>
      </Column>
      <Column>
        <Block>
          <BlockTitle>Furnas</BlockTitle>
          <BlockText>
            <div>
              <div style={{ fontWeight: "1000" }}>Dados de precipitação</div>
              <div>Quantidade de coletas: 20683</div>
              <div>Parâmetros coletados: Precipitação (Medida diária)</div>
              <div style={{ fontWeight: "1000" }}>Nível do reservatório</div>
              <div>Quantidade de coletas: 8470</div>
              <div>
                Parâmetros coletados: Nível (Nível da água do reservatório à 0h00), Volume útil
                (Volume útil do reservatório à 0h00), Per. volume útil (Percentual do volume útil à
                0h00), Geração (Geração diária da usina), Vazão afluente (Média diária), Vazão
                defluente (Média diária), Produtividade (Média diária), Vazão turbinada (Média
                diária), Vazão vertida (Média diária), Vazão turb. em vazio (Média diária)
              </div>
            </div>
          </BlockText>
        </Block>

        <Block>
          <BlockTitle>IEE</BlockTitle>
          <BlockText>
            <div>
              <div style={{ fontWeight: "1000" }}>Água e matéria orgânica no sedimento</div>
              <div>Quantidade de coletas: 1283</div>
              <div>Quantidade de campanhas: 27</div>
              <div>Locais distintos de coleta: 243</div>
              <div>
                Parâmetros coletados: Profundidade (Intervalo de profundidade da fatia de
                sedimento), Cota (Nível da água), Água (Conteúdo de água no sedimento), Matéria
                orgânica (Conteúdo de matéria orgânica no sedimento)
              </div>
              <div style={{ fontWeight: "1000" }}>Concentração de gás na água</div>
              <div>Quantidade de coletas: 1008</div>
              <div>Quantidade de campanhas: 27</div>
              <div>Locais distintos de coleta: 244</div>
              <div>
                Parâmetros coletados: Cota (Nível da água), Altura (Altura sobre a interface
                (distância da interface sedimento-água)), Réplica, CH4 (Concentração de metano na
                amostra da água sobre a interface (em milimolar)), CO2 (Concentração de dióxido de
                carbono na amostra da água sobre a interface (em milimolar))
              </div>
              <div style={{ fontWeight: "1000" }}>Concentração de gás no sedimento</div>
              <div>Quantidade de coletas: 3548</div>
              <div>Quantidade de campanhas: 27</div>
              <div>Locais distintos de coleta: 243</div>
              <div>
                Parâmetros coletados: Cota (Nível da água), Profundidade (Profundidade do sedimento
                sob a interface), Réplica, CH4 (Concentração de metano na amostra de sedimento (em
                milimolar)), CO2 (Concentração de dióxido de carbono na amostra de sedimento (em
                milimolar))
              </div>
              <div style={{ fontWeight: "1000" }}>Dados do Horiba</div>
              <div>Quantidade de coletas: 21799</div>
              <div>Quantidade de campanhas: 27</div>
              <div>Locais distintos de coleta: 198</div>
              <div>
                Parâmetros coletados: Prof. (Profundidade de coleta), Temp. da água, Condutividade,
                pH, DO (Oxigênio dissolvido), TDS (Sólidos totais dissolvidos), Potencial REDOX
                (Potencial de óxido redução), Turbidez
              </div>
              <div style={{ fontWeight: "1000" }}>Fluxo difusivo</div>
              <div>Quantidade de coletas: 324</div>
              <div>Quantidade de campanhas: 27</div>
              <div>Locais distintos de coleta: 243</div>
              <div>
                Parâmetros coletados: Cota (Nível da água), Intervalo (Direção do fluxo: positivo
                (através da interface) e negativo (para a interface)), CH4 (Metano), CO2 (Dióxido de
                carbono)
              </div>
              <div style={{ fontWeight: "1000" }}>Íons na água intersticial do sedimento</div>
              <div>Quantidade de coletas: 1069</div>
              <div>Quantidade de campanhas: 27</div>
              <div>Locais distintos de coleta: 207</div>
              <div>
                Parâmetros coletados: Profundidade (Intervalo de profundidade da fatia de
                sedimento), Cota (Nível da água), F- (Fluoreto), Cl- (Cloreto), NO2- (Nitrito), Br-
                (Brometo), NO3- (Nitrato), PO4--- (Fosfato), SO4-- (Sulfato), Na+ (Sódio), NH4+
                (Amônio), K+ (Potássio), Mg (Magnésio), Ca++ (Cálcio), Acetato
              </div>
              <div style={{ fontWeight: "1000" }}>Nutrientes no sedimento</div>
              <div>Quantidade de coletas: 1233</div>
              <div>Quantidade de campanhas: 27</div>
              <div>Locais distintos de coleta: 238</div>
              <div>
                Parâmetros coletados: Profundidade (Intervalo de profundidade da fatia de
                sedimento), Cota (Nível da água), N2 (Concentração de Nitrogênio Total Kjeldahl no
                sedimento), PT (Concentração de Fósforo Total no sedimento), TC (Concentração de
                Carbono Total no sedimento)
              </div>
              <div style={{ fontWeight: "1000" }}>Variáveis físicas e químicas da água</div>
              <div>Quantidade de coletas: 446</div>
              <div>Quantidade de campanhas: 27</div>
              <div>Locais distintos de coleta: 197</div>
              <div>
                Parâmetros coletados: Profundidade (Profundidade de coleta), Secchi (Profundidade do
                disco de Secchi), Cota (Nível da água), F- (Fluoreto), Cl- (Cloreto), N-NO3-
                (Nitrato), P-PO43- (Fosfato), S-SO42- (Sulfato), Li (Lítio), Na (Sódio), N-NH4
                (Amônio), K (Potássio), Mg (Magnésio), Ca (Cálcio), Clorofila (Clorofila a),
                Feofitina, Turbidez, NT (Concentração de Nitrogênio Orgânico Total (NTK)), PT
                (Concentração de Fósforo Total), TDC (Concentração de carbono total dissolvido)
              </div>
            </div>
          </BlockText>
        </Block>

        <Block>
          <BlockTitle>INPE</BlockTitle>
          <BlockText style={{ overflowY: "auto", maxHeight: "80vh", paddingRight: "10px" }}>
            <div style={{ gap: "7px" }}></div>

            <div>
              <div style={{ fontWeight: "1000" }}>Fluxo de bolhas</div>
              <div>Quantidade de coletas: 297</div>
              <div>Quantidade de campanhas: 2</div>
              <div>Locais distintos de coleta: 1</div>
              <div>
                Parâmetros coletados: Profundidade (Profundidade média), CH4 (Fluxo de Bolhas),
                Desvio padrão (missing values repostos com valores medianos para cada tempo), Nro.
                de amostras
              </div>
              <div style={{ fontWeight: "1000" }}>Fluxo difusivo (INPE)</div>
              <div>Quantidade de coletas: 380</div>
              <div>Quantidade de campanhas: 4</div>
              <div>Locais distintos de coleta: 3</div>
              <div>
                Parâmetros coletados: Profundidade, CO2 (Fluxo de CO2 na interface água-ar), Desvio
                padrão CO2, Nro. de amostras CO2, CH4 (Fluxo de CH4 difusivo+bolhas na interface
                água-ar), Desvio Padrão CH4, Nro. de amostras CH4
              </div>
            </div>
          </BlockText>
        </Block>

        <Block>
          <BlockTitle>UFJF</BlockTitle>
          <BlockText style={{ overflowY: "auto", maxHeight: "80vh", paddingRight: "10px" }}>
            <div style={{ gap: "7px" }}></div>
            <div>
              <div style={{ fontWeight: "1000" }}>Abióticos na coluna d água</div>
              <div>Quantidade de coletas: 120</div>
              <div>Quantidade de campanhas: 20</div>
              <div>Locais distintos de coleta: 9</div>
              <div>
                Parâmetros coletados: Profundidade (Profundidade de coleta), DIC (Carbono inorgânico
                dissolvido), NT (Nitrogênio), PT (Fósforo Total), Delta 13C, Delta 15N
              </div>
              <div style={{ fontWeight: "1000" }}>Abióticos na superfície</div>
              <div>Quantidade de coletas: 238</div>
              <div>Quantidade de campanhas: 21</div>
              <div>Locais distintos de coleta: 85</div>
              <div>
                Parâmetros coletados: DIC (Carbono inorgânico dissolvido), NT (Nitrogênio), PT
                (Fósforo Total), Delta 13C, Delta 15N
              </div>
              <div style={{ fontWeight: "1000" }}>Bióticos na coluna d água</div>
              <div>Quantidade de coletas: 120</div>
              <div>Quantidade de campanhas: 20</div>
              <div>Locais distintos de coleta: 9</div>
              <div>
                Parâmetros coletados: Profundidade (Profundidade de coleta), DOC (Carbono orgânico
                dissolvido), POC (Carbono orgânico particulado), TOC (Carbono orgânico total),
                Densidade bactéria, Biomassa bactéria, Clorofila, Biomassa carbono total fito,
                Densidade total fito, Biomassa zoo, Densidade total zoo
              </div>
              <div style={{ fontWeight: "1000" }}>Bióticos na superfície</div>
              <div>Quantidade de coletas: 239</div>
              <div>Quantidade de campanhas: 21</div>
              <div>Locais distintos de coleta: 85</div>
              <div>
                Parâmetros coletados: DOC (Carbono orgânico dissolvido), POC (Carbono orgânico
                particulado), TOC (Carbono orgânico total), Densidade bactéria, Biomassa bactéria,
                Clorofila, Biomassa carbono total fito, Densidade total fito, Biomassa zoo,
                Densidade total zoo
              </div>
              <div style={{ fontWeight: "1000" }}>Fluxos de carbono</div>
              <div>Quantidade de coletas: 19</div>
              <div>Quantidade de campanhas: 19</div>
              <div>Locais distintos de coleta: 8</div>
              <div>
                Parâmetros coletados: Produção fitoplanctônica, Carbono orgânico excretado,
                Respiração fito, Produção bacteriana, Respiração bacteriana, Taxa de sedimentação
              </div>
              <div style={{ fontWeight: "1000" }}>Medidas de campo na coluna d água</div>
              <div>Quantidade de coletas: 131</div>
              <div>Quantidade de campanhas: 21</div>
              <div>Locais distintos de coleta: 9</div>
              <div>
                Parâmetros coletados: Profundidade (Profundidade de coleta), Secchi (Profundidade do
                disco de Secchi), Temp. da água, Condutividade, DO (Oxigênio dissolvido), pH,
                Turbidez, Material em suspensão, Intensidade luminosa
              </div>
              <div style={{ fontWeight: "1000" }}>Medidas de campo na superfície</div>
              <div>Quantidade de coletas: 238</div>
              <div>Quantidade de campanhas: 21</div>
              <div>Locais distintos de coleta: 85</div>
              <div>
                Parâmetros coletados: Secchi (Profundidade do disco de Secchi), Temp. da água,
                Condutividade, DO (Oxigênio dissolvido), pH, Turbidez, Material em suspensão
              </div>
              <div style={{ fontWeight: "1000" }}>Parâmetros biológicos e físicos da água</div>
              <div>Quantidade de coletas: 201</div>
              <div>Quantidade de campanhas: 12</div>
              <div>Locais distintos de coleta: 46</div>
              <div>
                Parâmetros coletados: Profundidade (Profundidade de coleta), Secchi, Temp. da água,
                Condutividade, DO (Oxigênio dissolvido), pH, Turbidez, Material em suspensão, DOC
                (Carbono orgânico dissolvido), POC (Carbono orgânico particulado), TOC (Carbono
                orgânico total), DIC (Carbono inorgânico dissolvido), NT (Nitrogênio), PT (Fósforo
                Total), Densidade bactéria, Biomassa bactéria, Clorofila, Biomassa carbono total
                fito, Densidade total fito, Biomassa zoo, Densidade total zoo, Produção
                fitoplanctônica, Carbono orgânico excretado, Respiração fito, Produção bacteriana,
                Respiração bacteriana, Taxa de sedimentação, Delta 13C, Delta 15N, Intensidade
                luminosa
              </div>
            </div>
          </BlockText>
        </Block>

        <Block>
          <BlockTitle>UFRJ</BlockTitle>
          <BlockText style={{ overflowY: "auto", maxHeight: "80vh", paddingRight: "10px" }}>
            <div style={{ gap: "7px" }}></div>
            <div>
              <div style={{ fontWeight: "1000" }}>Bolhas</div>
              <div>Quantidade de coletas: 396</div>
              <div>Quantidade de campanhas: 27</div>
              <div>Locais distintos de coleta: 119</div>
              <div>
                Parâmetros coletados: Profundidade (Profundidade de coleta), Nro. de funis, Volume
                coletado, CO2 (Dióxido de carbono), O2 (Oxigênio), N2 (Nitrogênio), CH4 (Metano),
                N2O (Óxido nitroso)
              </div>
              <div style={{ fontWeight: "1000" }}>Câmara solo</div>
              <div>Quantidade de coletas: 82</div>
              <div>Quantidade de campanhas: 22</div>
              <div>Locais distintos de coleta: 31</div>
              <div>
                Parâmetros coletados: CH4 (Metano), CO2 (Dióxido de carbono), N2O (Óxido nitroso),
                Temp. do ar, Temp. do solo, Vel. do vento, Altitude (Altitude do local da medida)
              </div>
              <div style={{ fontWeight: "1000" }}>Carbono Total no sedimento</div>
              <div>Quantidade de coletas: 301</div>
              <div>Quantidade de campanhas: 26</div>
              <div>Locais distintos de coleta: 29</div>
              <div>
                Parâmetros coletados: Camada (Profundidade no sedimento), TC (Carbono total em
                sedimento)
              </div>
              <div style={{ fontWeight: "1000" }}>DC, DOC, POC, TOC, DIC e TC</div>
              <div>Quantidade de coletas: 315</div>
              <div>Quantidade de campanhas: 27</div>
              <div>Locais distintos de coleta: 272</div>
              <div>
                Parâmetros coletados: DC (Carbono dissolvido), DOC (Carbono orgânico dissolvido),
                POC (Carbono orgânico particulado), TOC (Carbono orgânico total), DIC (Carbono
                inorgânico dissolvido), TC (Carbono total)
              </div>
              <div style={{ fontWeight: "1000" }}>Difusão</div>
              <div>Quantidade de coletas: 654</div>
              <div>Quantidade de campanhas: 27</div>
              <div>Locais distintos de coleta: 368</div>
              <div>
                Parâmetros coletados: CH4 (Metano), CO2 (Dióxido de carbono), N2O (Óxido nitroso),
                pH, Temp. da água, Temp. do ar, Profundidade (Profundidade de coleta), Altitude
                (Altitude do local da medida), Vel. do vento
              </div>
              <div style={{ fontWeight: "1000" }}>Dupla dessorção da água</div>
              <div>Quantidade de coletas: 535</div>
              <div>Quantidade de campanhas: 19</div>
              <div>Locais distintos de coleta: 45</div>
              <div>
                Parâmetros coletados: Profundidade (Profundidade de coleta), CO2 (O volume de água
                utilizado para a dupla dessorção foi de 250 ml), O2 (O volume de água utilizado para
                a dupla dessorção foi de 250 ml), N2 (O volume de água utilizado para a dupla
                dessorção foi de 250 ml), CH4 (O volume de água utilizado para a dupla dessorção foi
                de 250 ml), N2O (O volume de água utilizado para a dupla dessorção foi de 250 ml)
              </div>
              <div style={{ fontWeight: "1000" }}>Gases em bolhas</div>
              <div>Quantidade de coletas: 20</div>
              <div>Quantidade de campanhas: 7</div>
              <div>Locais distintos de coleta: 11</div>
              <div>
                Parâmetros coletados: Profundidade (Profundidade de coleta), CO2 (Máximo volume de
                gás extraível de um volume de 250 ml de água), O2 (Máximo volume de gás extraível de
                um volume de 250 ml de água), N2 (Máximo volume de gás extraível de um volume de 250
                ml de água), CH4 (Máximo volume de gás extraível de um volume de 250 ml de água),
                N2O (Máximo volume de gás extraível de um volume de 250 ml de água)
              </div>
              <div style={{ fontWeight: "1000" }}>Parâmetros físicos e químicos</div>
              <div>Quantidade de coletas: 1547</div>
              <div>Quantidade de campanhas: 27</div>
              <div>Locais distintos de coleta: 103</div>
              <div>
                Parâmetros coletados: Profundidade (Profundidade de coleta), Cota (Nível da água),
                Temp. do ar, Temp. da água, DO (Oxigênio dissolvido), pH, Potencial REDOX (Potencial
                de óxido redução), Vel. do vento
              </div>
            </div>
          </BlockText>
        </Block>
      </Column>
    </TwoColumnContainer>
  );
};

// ================= Nova página de Download =================
const DownloadContent = () => {
  const [isDownloading, setIsDownloading] = useState<string | null>(null);

  const handleDownload = async (table: string, format: "csv" | "json" | "pdf") => {
    setIsDownloading(`${table}_${format}`);
    try {
      const response = await fetch(
        `http://localhost:${import.meta.env.VITE_SERVER_PORT || 3001}/api/balcar/download/${table}?format=${format}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            filters: {},
            columns: ["*"],
          }),
        },
      );

      if (!response.ok) {
        throw new Error("Erro no download");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;

      const contentDisposition = response.headers.get("Content-Disposition");
      let filename = `balcar_${table}_${Date.now()}.${format}`;

      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename="(.+)"/);
        if (filenameMatch) {
          filename = filenameMatch[1];
        }
      }

      a.download = filename;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Erro no download:", error);
      alert("Erro ao fazer download. Tente novamente.");
    } finally {
      setIsDownloading(null);
    }
  };

  const tables = [
    {
      name: "tbfluxoinpe",
      title: "Fluxo INPE",
      description: "Dados de fluxo coletados pelo INPE",
    },
    {
      name: "tbcampanha",
      title: "Campanhas",
      description: "Informações sobre as campanhas realizadas",
    },
    {
      name: "tbinstituicao",
      title: "Instituições",
      description: "Dados das instituições participantes",
    },
    {
      name: "tbreservatorio",
      title: "Reservatórios",
      description: "Informações dos reservatórios estudados",
    },
    {
      name: "tbsitio",
      title: "Sítios",
      description: "Dados dos sítios de coleta",
    },
    {
      name: "tbtabelacampo",
      title: "Tabela Campo",
      description: "Metadados dos campos das tabelas",
    },
  ];

  return (
    <DownloadSection>
      <DownloadInfo>
        <p>
          <strong>Download de Dados BALCAR</strong>
          <br />
          Aqui você pode baixar os dados completos das tabelas do projeto BALCAR nos formatos CSV,
          JSON e PDF. Selecione a tabela desejada e o formato de exportação.
        </p>
      </DownloadInfo>

      <DownloadGrid>
        {tables.map((table) => (
          <DownloadCard key={table.name}>
            <DownloadCardTitle>{table.title}</DownloadCardTitle>
            <DownloadCardDescription>{table.description}</DownloadCardDescription>

            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              <DownloadButton
                onClick={() => handleDownload(table.name, "csv")}
                disabled={isDownloading === `${table.name}_csv`}
              >
                <Download size={16} />
                {isDownloading === `${table.name}_csv` ? "Baixando..." : "CSV"}
              </DownloadButton>

              <DownloadButton
                onClick={() => handleDownload(table.name, "json")}
                disabled={isDownloading === `${table.name}_json`}
              >
                <Download size={16} />
                {isDownloading === `${table.name}_json` ? "Baixando..." : "JSON"}
              </DownloadButton>

              <DownloadButton
                onClick={() => handleDownload(table.name, "pdf")}
                disabled={isDownloading === `${table.name}_pdf`}
              >
                <Download size={16} />
                {isDownloading === `${table.name}_pdf` ? "Baixando..." : "PDF"}
              </DownloadButton>
            </div>
          </DownloadCard>
        ))}
      </DownloadGrid>

      <Block style={{ marginTop: "30px" }}>
        <BlockTitle>Informações sobre os Dados</BlockTitle>
        <BlockText>
          <p>
            <strong>Formato CSV:</strong> Ideal para análise em planilhas (Excel, Google Sheets) e
            programas estatísticos.
          </p>
          <p>
            <strong>Formato JSON:</strong> Ideal para desenvolvedores e integração com outras
            aplicações.
          </p>
          <p>
            <strong>Formato PDF:</strong> Ideal para relatórios e documentação.
          </p>
          <p>
            <strong>Nota:</strong> Todos os downloads incluem todos os registros disponíveis na
            tabela selecionada.
          </p>
        </BlockText>
      </Block>
    </DownloadSection>
  );
};

// ================= Componente principal =================
const BalcarPage: React.FC = () => {
  const [page, setPage] = useState<"home" | "equipe" | "publicacoes" | "descricao" | "download">(
    "home",
  );

  useEffect(() => {
    const ano = document.getElementById("ano");
    if (ano) ano.innerText = new Date().getFullYear().toString();
  }, []);

  return (
    <PageContainer>
      {/* Header */}
      <HeaderWrapper>
        <HeaderSeparator />
        <HeaderContainer>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              textAlign: "right",
              gap: "10px",
              color: "white",
            }}
          >
            <HeaderText>Dados da Campanha</HeaderText>
            Projeto Balanço de Carbono nos Reservatórios de FURNAS Centrais Elétricas S.A.
          </div>
        </HeaderContainer>
        <Separator />

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
            Descrição
          </MenuItem>
          <MenuItem active={page === "download"} onClick={() => setPage("download")}>
            Download de Dados
          </MenuItem>
        </Menu>
      </HeaderWrapper>

      {/* Conteúdo */}
      {page === "home" && <HomeContent />}
      {page === "equipe" && <EquipeContent />}
      {page === "publicacoes" && <PublicacoesContent />}
      {page === "descricao" && <DescricaoContent />}
      {page === "download" && <DownloadContent />}

      {/* Footer */}
      <Footer>
        © <span id="ano"></span>&nbsp;BALCAR
      </Footer>
    </PageContainer>
  );
};

export default BalcarPage;
