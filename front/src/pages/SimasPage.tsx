import React, { useState, useEffect } from "react";
import styled from "styled-components";
import sima1 from "../assets/sima1.png";
import sima2 from "../assets/sima2.png";
import sima3 from "../assets/sima3.png";
import sonda from "../assets/sonda.png";

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

const ImageRow = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;

  img {
    height: 199px;
    object-fit: cover;
  }
`;

// ================= Conteúdo das páginas =================
const HomeContent = () => (
  <TwoColumnContainer>
    <Column>
      <Block>
        <BlockTitle>Sobre o SIMA</BlockTitle>
        <BlockText>
          O SIMA (Sistema Integrado de Monitoramento Ambiental) é um conjunto de hardware e software
          desenhado para a coleta de dados e o monitoramento em tempo real de processos da
          hidrosfera. Para a coleta dos dados, o SIMA faz uso de um sistema autônomo fundeado, onde
          são instalados sensores, eletrônica de armazenamento, bateria e antena de transmissão. Os
          dados coletados em intervalo de tempo pré-programado são transmitidos via satélite e
          também armazenados na estação de coleta, sendo que os dados armazenados são aqueles
          obtidos com maior frequência. Este portal permite o acesso aos dados transmitidos por
          satélite poucas horas após a coleta. A associação destas componentes fornece uma poderosa
          ferramenta que pode ser empregada no gerenciamento e controle ambiental de recursos
          hídricos.
        </BlockText>
      </Block>

      <Block>
        <BlockTitle>Motivação do SIMA</BlockTitle>
        <BlockText>
          <ul>
            <li>
              Sistemas aquáticos são muito dinâmicos, ou seja, podem sofrer mudanças significativas
              em questão de horas;
            </li>
            <li>
              Complexa e cara a logística necessária para amostrar adequadamente os sistemas
              aquáticos em estudo;
            </li>
            <li>Necessidade de dados em tempo real para a tomada de decisões.</li>
          </ul>
        </BlockText>
      </Block>

      <Block>
        <BlockTitle>Dados Coletados</BlockTitle>
        <BlockText>
          O SIMA coleta algumas variáveis ambientais a partir de sensores colocados acima da linha
          d´água (temperatura do ar, pressão atmosférica, direção e intensidade de ventos, radiação
          solar incidente e refletida) e abaixo da linha d´água (amônia, nitrato, clorofila,
          condutividade, direção e intensidade da corrente, oxigênio dissolvido, pH e temperatura em
          diferentes profundidades).
        </BlockText>
      </Block>
    </Column>

    <Column>
      <Block>
        <BlockTitle>Estrutura do SIMA</BlockTitle>
        <BlockText>
          O SIMA é formado por uma plataforma que em alguns modelos pode ser uma bóia toroidal (foto
          abaixo e a esquerda) ou uma estrutura maior (foto abaixo e a direita). No centro da
          plataforma existe uma torre onde são afixados os painéis solares, sensores meteorológicos
          e antena. No vão central um compartimento abriga a eletrônica do sistema, baterias e
          transmissor de satélite. Os sensores submersos são conectados a eletrônica por cabos.
          <ImageRow>
            <img src={sima1} alt="Plataforma esquerda" />
            <img src={sima2} alt="Plataforma direita" />
          </ImageRow>
        </BlockText>
      </Block>

      <Block>
        <BlockTitle>Modo de Funcionamento</BlockTitle>
        <BlockText>
          <ul>
            <li>
              Coleta e transmissão dos dados: circuitos analógicas e digitais são responsávies por
              comandar o conjunto de sensores, variáveis de engenharia e ativar o transmissor de
              satélite;
            </li>
            <li>
              Amostragem: a cada hora cheia um novo conjunto completo de dados é armazenado em um
              buffer de memória. Após enchimento dos oito buffers, o conjunto mais antigo é
              descartado;
            </li>
            <li>
              Esquema de transmissão: a cada 90 segundos, um dos oito buffers é transmitido em
              esquema de carrossel. A transmissão é executada independente de existir satélite para
              receber os dados;
            </li>
            <li>
              Recepção dos dados: as unidades do INPE de Cuiabá - MT e Alcântara - MA recebem os
              dados dos satélites e em seguida transmitem para a unidade de Natal - RN, onde os
              dados são processados para filtrar falhas na transmissão e para posterior envio para a
              DSR (Divisão de Sensoriamento Remoto) do INPE de São José dos Campos - SP, onde os
              dados são decodificados, processados e armazenados;
            </li>
            <li>
              Distribuição dos dados: este portal é usado para a consulta e visualização dos dados
              armazenados;
            </li>
            <li>
              Armazenamento interno: alguns SIMAs possuem a capacidade de armazenar as coletas para
              posterior download por um técnico <span style={{ fontStyle: "italic" }}>in situ</span>
              , ou seja, estes dados não são transmitidos por satélite. Neste caso as coletas são
              realizadas a cada 10 minutos.
            </li>
          </ul>
          <img src={sima3} alt="Modo de funcionamento" />
        </BlockText>
      </Block>

      <Block>
        <BlockTitle>História</BlockTitle>
        <BlockText>
          O SIMA foi desenvolvido em uma parceria entre a Universidade do Vale do Paraíba e o INPE.
          A partir de 1995, o projeto foi transferido para a Neuron Engenharia Ltda. Através de uma
          parceria com a Diretoria de Hidrografia e Navegação (DHN) a Neuron construiu um protótipo
          do SIMA, que ficou fundeado em águas do litoral do Rio de Janeiro durante um ano e os
          dados coletados foram disponibilizados pelo Programa Nacional de Bóia. Os dados coletados
          neste período foram comparados com dados{" "}
          <span style={{ fontStyle: "italic" }}>in situ</span>, o que confirmou o bom desempenho do
          sistema.
        </BlockText>
      </Block>

      <Block>
        <BlockTitle>Problemas</BlockTitle>
        <BlockText>
          <ul>
            <li>
              Sensores: por características específicas de alguns ambientes aquáticos, os sensores
              podem se degradar rapidamente, tornando os dados inválidos. Veja como exemplo a foto
              abaixo tirada da sonda do SIMA fundeado no reservatório de Funil, no momento de uma
              atividade de calibração;
            </li>
            <li>
              Satélite: o SIMA faz uma leitura de parâmetros a cada hora, ou seja, 24 leituras por
              dia. Acontece que nem sempre são recebidas todas as leituras, pois o sistema necessita
              de satélites para completar a transmissão e por questão de posicionamento da
              constelação de satélites, algumas localidades terrestres não são atendidas com a
              frequência necessária para completar todas as transmissões.
            </li>
          </ul>
          <img src={sonda} alt="Sonda do SIMA" />
        </BlockText>
      </Block>

      <Block>
        <BlockTitle>Apoio</BlockTitle>
        <BlockText>
          <div style={{ marginBottom: "5px" }}>
            Ao longo da existência deste sistema, os recursos para a aquisição e manutenção dos
            sistemas de coletas e recursos computacionais foram fornecidos pelas seguintes
            instituições:
          </div>
          <ul>
            <li>
              <a href="http://www.cepel.br" target="_blank">
                CEPEL - Centro de Pesquisas de Energia Elétrica
              </a>
            </li>
            <li>
              <a href="http://www.chesf.gov.br" target="_blank">
                Chesf - Companhia Hidro Elétrica do São Francisco
              </a>
            </li>
            <li>
              <a href="http://www.cnpq.br" target="_blank">
                CNPq - Conselho Nacional de Desenvolvimento Científico e Tecnológico
              </a>
            </li>
            <li>
              <a href="http://www.eln.gov.br" target="_blank">
                Eletronorte - Centrais Elétricas do Norte do Brasil
              </a>
            </li>
            <li>
              <a href="http://www.fapesp.br" target="_blank">
                FAPESP - Fundação de Amparo à Pesquisa do Estado de São Paulo
              </a>
            </li>
            <li>
              <a href="http://www.furnas.com.br" target="_blank">
                Furnas Centrais Elétricas
              </a>
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
        <BlockTitle>Coordenação</BlockTitle>
        <div>
          <a href="http://lattes.cnpq.br/2691497637313274" target="_blank">
            José Luiz Stech (stech@dsr.inpe.br)
          </a>
        </div>
        <div>
          <a href="http://lattes.cnpq.br/7939379291404418" target="_blank">
            Enner Herenio de Alcântara
          </a>
        </div>
      </Block>
    </Column>

    <Column>
      <Block>
        <BlockTitle>Colaboradores</BlockTitle>
        <div>
          <a href="http://lattes.cnpq.br/5535667070825818" target="_blank">
            André Carlos Prates Cimbleris
          </a>
        </div>
        <div>
          <a href="http://lattes.cnpq.br/8150880476098677" target="_blank">
            Arcilan Trevenzoli Assireu
          </a>
        </div>
        <div>
          <a href="http://lattes.cnpq.br/7642043789034070" target="_blank">
            Artur Luiz da Costa da Silva
          </a>
        </div>
        <div>
          <a href="http://lattes.cnpq.br/7466500214796269" target="_blank">
            Augusto Cesar Fonseca Saraiva
          </a>
        </div>
        <div>
          <a href="http://lattes.cnpq.br/1596449770636962" target="_blank">
            Cláudio Clemente Faria Barbosa
          </a>
        </div>
        <div>
          <a href="http://lattes.cnpq.br/4775535537651746" target="_blank">
            Donato Seiji Abe
          </a>
        </div>
        <div>
          <a href="http://lattes.cnpq.br/9857505876280820" target="_blank">
            Evlyn Márcia Leão de Moraes Novo
          </a>
        </div>
        <div>
          <a href="http://lattes.cnpq.br/0567809153346429" target="_blank">
            Fábio Roland
          </a>
        </div>
        <div>
          <a href="http://lattes.cnpq.br/3852581196429739" target="_blank">
            João Antônio Lorenzzetti
          </a>
        </div>
        <div>
          <a href="http://lattes.cnpq.br/0030922264947314" target="_blank">
            Jorge Machado Damazio
          </a>
        </div>
        <div>
          <a href="http://lattes.cnpq.br/4155308755013168" target="_blank">
            Marco Aurélio dos Santos
          </a>
        </div>
        <div>
          <a href="http://lattes.cnpq.br/8471974730664804" target="_blank">
            Maria Elvira Piñeiro Maceira
          </a>
        </div>
        <div>
          <a href="http://lattes.cnpq.br/5149356080083086" target="_blank">
            Nelson Luís da Costa Dias
          </a>
        </div>
      </Block>

      <Block>
        <BlockTitle>Desenvolvimento do Sistema de Coleta de Dados</BlockTitle>
        <div>
          <a href="http://www.neuron.com.br" target="_blank">
            Neuron Eletrônica
          </a>
        </div>
      </Block>

      <Block>
        <BlockTitle>Manutenção do Sistema de Coleta de Dados</BlockTitle>
        <div>Alexandre Donizetti da Silva (Neuron Eletrônica)</div>
        <div>
          <a href="http://lattes.cnpq.br/4915211809920432" target="_blank">
            Carlos Alberto Sampaio de Araújo
          </a>
        </div>
        <div>Geraldo Orlando Mendes</div>
        <div>
          <a href="http://lattes.cnpq.br/7596795539833144" target="_blank">
            Joaquim Antônio Dionísio Leão
          </a>
        </div>
        <div>
          <a href="http://lattes.cnpq.br/6286335301335965" target="_blank">
            Vitor Bruno
          </a>
        </div>
      </Block>

      <Block>
        <BlockTitle>Gerente de Rede do Portal</BlockTitle>
        <div>João Benedito Diehl</div>
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
            <span className="autor">AFFONSO, A. G.; QUEIROZ, H. L.; and NOVO, E. M. L. M.</span>{" "}
            <span className="titulo">
              Limnological characterization of floodplain lakes in Mamirauá Sustainable Development
              Reserve, Central Amazon (Amazonas State, Brazil).
            </span>{" "}
            <span className="fonte">
              Acta Limnologica Brasiliensia, 23(1): 95-108. <span className="ano">2011</span>. ISSN:
              2179-975X.
            </span>
          </PublicationText>

          <PublicationLink
            href="http://www.ambi-agua.net/seer/index.php/ambi-agua/article/view/1088/pdf_770"
            target="_blank"
          >
            <span className="autor">
              ALCÂNTARA, E.; CURTARELLI, M.; OGASHAWARA, I; STECH, J.; SOUZA, A.
            </span>{" "}
            <span className="titulo">
              A system for environmental monitoring of hydroelectric reservoirs in Brazil.
            </span>{" "}
            <span className="fonte">
              Revista Ambiente & Água - An Interdisciplinary Journal of Applied Science: v. 8, n.1,
              p. 6-17, <span className="ano">2013</span>.
            </span>
          </PublicationLink>

          <PublicationLink
            href="http://www.biogeosciences-discuss.net/8/3739/2011/bgd-8-3739-2011.html"
            target="_blank"
          >
            <span className="autor">
              ALCÂNTARA, E.; NOVO, E. M.; BARBOSA, C. F.; BONNET, M-P.; STECH, J. L.; and OMETTO, J.
              P.
            </span>{" "}
            <span className="titulo">
              Environmental factors associated with long-term changes in chlorophyll-a concentration
              in the Amazon floodplain.
            </span>{" "}
            <span className="fonte">
              Biogeosciences Discussions, 8(2): 3739-3770. <span className="ano">2011</span>. DOI:
              &lt;10.5194/bgd-8-3739-2011&gt;.
            </span>
          </PublicationLink>

          <PublicationLink
            href="http://www.ambi-agua.net/seer/index.php/ambi-agua/article/view/572/pdf_469"
            target="_blank"
          >
            <span className="autor">ALCÂNTARA, E. H.; and STECH, J. L.</span>{" "}
            <span className="titulo">
              Desenvolvimento de modelo conceitual termodinâmico para o reservatório hidrelétrico de
              Itumbiara baseado em dados de satélite e telemétricos.
            </span>{" "}
            <span className="fonte">
              Revista Ambiente & Água, 6: 157-179. <span className="ano">2011</span>.
            </span>
          </PublicationLink>

          <PublicationLink
            href="http://www.hydrol-earth-syst-sci.net/14/351/2010/hess-14-351-2010.html"
            target="_blank"
          >
            <span className="autor">
              ALCÂNTARA, E.; NOVO, E.; STECH, J.; LORENZZETTI, J.; BARBOSA, C.; ASSIREU, A.; and
              SOUZA, A.
            </span>{" "}
            <span className="titulo">
              A contribution to understanding the turbidity behaviour in an Amazon floodplain.
            </span>{" "}
            <span className="fonte">
              Hydrolology and Earth System Sciences, 14(2): 351-364.{" "}
              <span className="ano">2010</span>. DOI: &lt;10.5194/hess-14-351-2010&gt;.
            </span>
          </PublicationLink>

          <PublicationLink
            href="http://www.hydrol-earth-syst-sci-discuss.net/7/9437/2010/hessd-7-9437-2010.html"
            target="_blank"
          >
            <span className="autor">
              ALCÂNTARA, E. H.; BONNET, M. P.; ASSIREU, A. T.; STECH, J. L.; NOVO, E. M. L. M.; and
              LORENZZETTI, J. A.
            </span>{" "}
            <span className="titulo">
              On the water thermal response to the passage of cold fronts: initial results for
              Itumbiara reservoir (Brazil).
            </span>{" "}
            <span className="fonte">
              Hydrology and Earth System Sciences Discussions, 7: 9437-9465.{" "}
              <span className="ano">2010</span>. DOI: &lt;10.5194/hessd-7-9437-2010&gt;.
            </span>
          </PublicationLink>

          <PublicationLink
            href="http://www.sciencedirect.com/science/article/pii/S0034425710001926"
            target="_blank"
          >
            <span className="autor">
              ALCÂNTARA, E. H.; STECH, J. L.; LORENZZETTI, J. A.; BONNET, M. P.; CASAMITJANA, X.;
              ASSIREU, A. T.; and NOVO, E. M. L. M.
            </span>{" "}
            <span className="titulo">
              Remote sensing of water surface temperature and heat flux over a tropical
              hydroelectric reservoir.
            </span>{" "}
            <span className="fonte">
              Remote Sensing of Environment, 114(11): 2651-2665, <span className="ano">2010</span>.
              DOI: &lt;10.1016/j.rse.2010.06.002&gt;.
            </span>
          </PublicationLink>

          <PublicationLink href="http://epacis.org/files/JCIS11-art.06.PDF" target="_blank">
            <span className="autor">ALCÂNTARA, E. H.</span>{" "}
            <span className="titulo">
              Use of ordinary kriging algorithm and wavelet analysis to understanding the turbidity
              behavior in an amazon floodplain.
            </span>{" "}
            <span className="fonte">
              Journal of Computational Interdisciplinary Sciences, 1(1): 57-70.{" "}
              <span className="ano">2008</span>.
            </span>
          </PublicationLink>

          <PublicationText>
            <span className="autor">
              ASSIREU, A. T.; ALCÂNTARA, E.; NOVO, E. M. L. M.; ROLAND, F.; PACHECO, F. S.; STECH,
              J. L.; and LORENZZETTI, J. A.
            </span>{" "}
            <span className="titulo">
              Hydro-physical processes at the plunge point: an analysis using satellite and in situ
              data.
            </span>{" "}
            <span className="fonte">
              Hydrology and Earth System Sciences, 15, 3689-3700, doi:10.5194/hess-15-3689-2011,{" "}
              <span className="ano">2011</span>.
            </span>
          </PublicationText>

          <PublicationText>
            <span className="autor">
              BERGIER, I.; NOVO, E. M. L. M.; RAMOS; F. M.; MAZZI, E. A.; and RASERA, M. F. F. L.
            </span>{" "}
            <span className="titulo">
              Carbon dioxide and methane fluxes in the littoral zone of a tropical savanna reservoir
              (Corumbá, Brazil).
            </span>{" "}
            <span className="fonte">
              Oecologia Australis, 15(3): 666-681. <span className="ano">2011</span>. DOI:
              &lt;10.4257/oeco.2011.1503.17&gt;.
            </span>
          </PublicationText>

          <PublicationLink
            href="http://www.ambi-agua.net/seer/index.php/ambi-agua/article/view/1083/pdf_824"
            target="_blank"
          >
            <span className="autor">
              CURTARELLI, M. P.; ALCÂNTARA, E. H.; ARAÚJO, C. A. S.; STECH, J. L.; LORENZZETTI, J.
              A.
            </span>{" "}
            <span className="titulo">
              Avaliação da dinâmica temporal da evaporação no reservatório de Itumbiara, GO,
              utilizando dados obtidos por sensoriamento remoto.
            </span>{" "}
            <span className="fonte">
              Ambi-Água, Taubaté, v. 8, n.1 1, p. 272-289, <span className="ano">2013</span>,
              ISSN:1980-993X, doi:10.4136/1980-993X.
            </span>
          </PublicationLink>

          <PublicationLink
            href="http://www.sciencedirect.com/science/article/pii/S0273117713004663"
            target="_blank"
          >
            <span className="autor">CURTARELLI, M.; ALCÂNTARA, E.; RENNÓ, C; STECH, J.</span>{" "}
            <span className="titulo">
              Effects of cold fronts on MODIS-derived sensible and latent heat fluxes in Itumbiara
              reservoir (Central Brazil).
            </span>{" "}
            <span className="fonte">
              Advances in Space Research, Available online 1 August{" "}
              <span className="ano">2013</span>, ISSN 0273-1177,
              http://dx.doi.org/10.1016/j.asr.2013.07.037.
            </span>
          </PublicationLink>

          <PublicationLink
            href="http://www.hydrol-earth-syst-sci-discuss.net/10/8467/2013/hessd-10-8467-2013.pdf"
            target="_blank"
          >
            <span className="autor">
              CURTARELLI, M. P.; ALCÂNTARA, E. H.; RENNÓ, C. D.; STECH, J. L.
            </span>{" "}
            <span className="titulo">
              Modeling the effects of cold front passages on the heat ﬂuxes and thermal structure of
              a tropical hydroelectric reservoir.
            </span>{" "}
            <span className="fonte">
              Hydrol. Earth Syst. Sci. Discuss., 10, 8467–8502, <span className="ano">2013</span>.
              DOI: &lt;10.5194/hessd-10-8467-2013&gt;.
            </span>
          </PublicationLink>

          <PublicationLink
            href="http://www.scielo.br/pdf/%0D/aa/v36n3/v36n3a07.pdf"
            target="_blank"
          >
            <span className="autor">
              LIMA, I. B. T.; BARBOSA, C. C.; NOVO, E. M. L. M.; CARVALHO, J. C.; and STECH, J. L.
            </span>{" "}
            <span className="titulo">
              Localização de áreas de monitoramento telemétrico em ambientes aquáticos da Amazônia.
            </span>{" "}
            <span className="fonte">
              Acta Amazonica, 36(3): 331-334. <span className="ano">2006</span>.
            </span>
          </PublicationLink>

          <PublicationLink
            href="http://www.ambi-agua.net/seer/index.php/ambi-agua/article/view/570/pdf_466"
            target="_blank"
          >
            <span className="autor">
              NASCIMENTO, R. F. F.; ALCÂNTARA, E. H.; KAMPEL, M.; and STECH, J. L.
            </span>{" "}
            <span className="titulo">
              Caracterização limnológica do reservatório hidrelétrico de Itumbiara, Goiás, Brasil.
            </span>{" "}
            <span className="fonte">
              Revista Ambiente & Água, 6: 143-156. <span className="ano">2011</span>.
            </span>
          </PublicationLink>

          <PublicationText>
            <span className="autor">
              NOVO, E. M. L. M.; STECH, J. L.; ALCÂNTARA, E. H.; LONDE, L. R.; ASSIREU, A.; BARBOSA,
              C. C.; and SOUZA, A. F.
            </span>{" "}
            <span className="titulo">
              Integração de Dados do Sistema de Monitoramento Automático de Variáveis Ambientais
              (SIMA) e de Imagens Orbitais na Avaliação do Estado Trófico do Reservatório da UHE
              Funil.
            </span>{" "}
            <span className="fonte">
              Geografia (Rio Claro. Impresso), 35: 641-660. <span className="ano">2010</span>.
            </span>
          </PublicationText>

          <PublicationLink
            href="http://www.springerlink.com/content/jh05152758w0082m/"
            target="_blank"
          >
            <span className="autor">
              ROLAND, F.; VIDAL, L. O.; PACHECO, F. S.; BARROS, N. O.; ASSIREU, A.; OMETTO, J. P. H.
              B.; CIMBLERIS, A. C. P.; and COLE, J. J.
            </span>{" "}
            <span className="titulo">
              Variability of carbon dioxide flux from tropical (Cerrado) hydroelectric reservoirs.
            </span>{" "}
            <span className="fonte">
              Aquatic Sciences, 72(3): 283-293. <span className="ano">2010</span>. DOI:
              &lt;10.1007/s00027-010-0140-0&gt;.
            </span>
          </PublicationLink>

          <PublicationLink
            href="http://www.agu.org/pubs/crossref/2011/2011JG001699.shtml"
            target="_blank"
          >
            <span className="autor">
              RUDORFF, C. M.; MELACK, J. M.; MACINTYRE, S.; BARBOSA, C. C. F.; and NOVO, E. M. L. M.
            </span>{" "}
            <span className="titulo">
              Seasonal and spatial variability of CO2 emission from a large floodplain lake in the
              lower Amazon.
            </span>{" "}
            <span className="fonte">
              Journal of Geophysical Research, 116: G04007, <span className="ano">2011</span>. DOI:
              &lt;10.1029/2011JG001699&gt;.
            </span>
          </PublicationLink>

          <PublicationText>
            <span className="autor">
              STECH, J. L.; LIMA, I. B. T.; NOVO, E. M. L. M.; ASSIREU, A. T.; LORENZZETTI, J. A.;
              CARVALHO, J. C.; and ROSA, R. R.
            </span>{" "}
            <span className="titulo">
              Telemetric monitoring system for meteorological and limnological data acquisition.
            </span>{" "}
            <span className="fonte">
              Proceedings of the International Association of Theoretical and Applied Limnology, 29:
              1747-1750. <span className="ano">2006</span>.
            </span>
          </PublicationText>

          <PublicationLink
            href="http://lojavirtual.parentese.com.br/reservatorios.html"
            target="_blank"
          >
            <span className="autor">
              ALCÂNTARA, E. H.; NOVO, E. M. L. M.; and STECH, J. L. (Orgs.).
            </span>{" "}
            <span className="titulo">
              Novas tecnologias para o monitoramento e estudo de reservatórios hidrelétricos e
              grandes lagos.
            </span>{" "}
            <span className="fonte">
              São José dos Campos: Parêntese, <span className="ano">2011</span>.
            </span>
          </PublicationLink>

          {/* Continue adicionando os demais artigos seguindo o mesmo padrão */}
        </Section>

        <Section>
          <SectionTitle>Livro</SectionTitle>
          <PublicationLink
            href="http://lojavirtual.parentese.com.br/reservatorios.html"
            target="_blank"
          >
            <span className="autor">
              ALCÂNTARA, E. H.; NOVO, E. M. L. M.; and STECH, J. L. (Orgs.).
            </span>{" "}
            <span className="titulo">
              Novas tecnologias para o monitoramento e estudo de reservatórios hidrelétricos e
              grandes lagos.
            </span>{" "}
            <span className="fonte">
              São José dos Campos: Parêntese, <span className="ano">2011</span>.
            </span>
          </PublicationLink>

          <PublicationLink
            href="http://lojavirtual.parentese.com.br/reservatorios.html"
            target="_blank"
          >
            <span className="autor">
              ALCÂNTARA, E. H.; STECH, J. L.; LORENZZETTI, J. A.; and NOVO, E. M. L. M.
            </span>{" "}
            <span className="titulo">
              Tecnologia Espacial para o monitoramento da Temperatura e Fluxos de Calor na
              Superfície da Água do Reservatório Hidrelétrico de Itumbiara (GO).
            </span>{" "}
            <span className="fonte">
              In: ALCÂNTARA, E. H.; NOVO, E. M. L. M.; and STECH, J. L. (Orgs.). Novas tecnologias
              para o monitoramento e estudo de reservatórios hidrelétricos e grandes lagos. São José
              dos Campos: Parêntese, p.: 15-80. <span className="ano">2011</span>.
            </span>
          </PublicationLink>

          <PublicationLink href="#" target="_blank">
            <span className="autor">
              ALCÂNTARA, E. H.; NOVO, E. M. L. M.; STECH, J. L.; BARBOSA, C.; LORENZZETTI, J. A.;
              ASSIREU, A.T.; BONNET, M-P; and SOUZA, A. F.
            </span>{" "}
            <span className="titulo">
              A Successful Combined Use of Telemetric Monitoring System and Spatial Data Modeling to
              Study the Turbidity Behavior in the Amazon Floodplain.
            </span>{" "}
            <span className="fonte">
              In: ÁLVAREZ, M. A. (Org.). Floodplains: Physical Geography, Ecology and Societal
              Interactions. New York: Nova Science, p.: 201-226. <span className="ano">2011</span>.
            </span>
          </PublicationLink>

          <PublicationLink href="#" target="_blank">
            <span className="autor">
              LIMA, I. B. T.; RAMOS, F. M.; NOVO, E. M. L. M; LORENZZETTI, J. A.; ROSA, R. R.;
              BARBOSA, C. C.; OMETTO, J. P. H. B.; and ASSIREU, A. T.
            </span>{" "}
            <span className="titulo">
              Linking telemetric climatic-limnologic data and online CH4 and CO2 flux dynamics.
            </span>{" "}
            <span className="fonte">
              In: SANTOS, M. A.; and ROSA, L. P. (Orgs.). Global warming and hydroeletric
              reservoirs. Rio de Janeiro: COPPE, p.: 67-69. <span className="ano">2005</span>.
            </span>
          </PublicationLink>

          <PublicationLink href="#" target="_blank">
            <span className="autor">
              LORENZETTI, J. A.; STECH, J. L.; NOVO, E. M. L. M.; and LIMA, I. B. T.
            </span>{" "}
            <span className="titulo">
              SIMA: A near real time buoy data acquisition and telemetry system as support for
              limnological studies.
            </span>{" "}
            <span className="fonte">
              In: SANTOS, M. A.; and ROSA, L. P. (Orgs.). Global warming and hydroeletric
              reservoirs. Rio de Janeiro: COPPE, p.: 71-80. <span className="ano">2005</span>.
            </span>
          </PublicationLink>

          <PublicationLink href="#" target="_blank">
            <span className="autor">NOVO, E. M. L. M.; STECH, J. L.; and BARBOSA, C. C. F.</span>{" "}
            <span className="titulo">
              Space technology contribution for sustainable development in the Amazon Floodplain.
            </span>{" "}
            <span className="fonte">
              In: TIEZZI, E.; BREBBIA, C. A.; JØRGENSEN, S. E.; and GOMAR, D. A. (Eds.). Ecosystems
              and sustainable development V. Southampton: WIT Press,{" "}
              <span className="ano">2005</span>. p. 563-570. Fifth International Conference on
              Ecosystems and Sustainable Development ECOSUD V. ISBN: 1-84564-013-6.
              (INPE-13383-PRE/8598).
            </span>
          </PublicationLink>

          <PublicationLink
            href="http://lojavirtual.parentese.com.br/reservatorios.html"
            target="_blank"
          >
            <span className="autor">PACHECO, F. S.; ASSIREU, A. T.; and ROLAND, F.</span>{" "}
            <span className="titulo">
              Uso de Derivadores Rastreados por Satélite em Ambientes Aquáticos Continentais.
            </span>{" "}
            <span className="fonte">
              In: ALCÂNTARA, E. H.; NOVO, E. M. L. M.; and STECH, J. L. (Orgs.). Novas tecnologias
              para o monitoramento e estudo de reservatórios hidrelétricos e grandes lagos. São José
              dos Campos: Parêntese, p.: 193-218. <span className="ano">2011</span>.
            </span>
          </PublicationLink>

          <PublicationLink
            href="http://lojavirtual.parentese.com.br/reservatorios.html"
            target="_blank"
          >
            <span className="autor">
              STECH, J.; ALCÂNTARA, E. H.; LORENZZETTI, J. A.; NOVO, E. M. L. M.; and LIMA, I. B. T.
            </span>{" "}
            <span className="titulo">
              Uso de tecnologia espacial para coleta automática de dados limnológicos e
              meteorológicos: aplicações nos reservatórios hidrelétricos de Manso e Corumbá.
            </span>{" "}
            <span className="fonte">
              In: ALCÂNTARA, E. H.; NOVO, E. M. L. M.; and STECH, J. L. (Orgs.). Novas tecnologias
              para o monitoramento e estudo de reservatórios hidrelétricos e grandes lagos. São José
              dos Campos: Parêntese, p.: 163-191. <span className="ano">2011</span>.
            </span>
          </PublicationLink>
        </Section>

        <Section>
          <SectionTitle>Eventos</SectionTitle>

          <PublicationLink href="http://www.dsr.inpe.br/sbsr2011/files/p0144.pdf" target="_blank">
            <span className="autor">
              ALCÂNTARA, E. H; STECH, J. L.; LORENZZETTI, J. A.; NOVO, E. M. L. M.; and SOUZA, A. F.
            </span>{" "}
            <span className="titulo">
              Estimativa dos fluxos de calor sensível e latente na superfície da água do
              reservatório de Itumbiara (GO) por meio de dados MODIS/Terra.
            </span>{" "}
            <span className="fonte">
              In: Simpósio Brasileiro de Sensoriamento Remoto, <span className="ano">2011</span>,
              Curitiba. Anais XV Simpósio Brasileiro de Sensoriamento Remoto - SBSR. São José dos
              Campos: INPE, p.: 5185-5192.
            </span>
          </PublicationLink>

          <PublicationLink
            href="http://www.conferences.earsel.org/abstract/show/2507"
            target="_blank"
          >
            <span className="autor">ALCÂNTARA, E.; and STECH, J.</span>{" "}
            <span className="titulo">Spatially Water Heat Flux using MODIS/terra data.</span>{" "}
            <span className="fonte">
              In: 31st EARSeL Symposium and 34th General Assembly 2011. Prague: European Association
              of Remote Sensing Laboratories, <span className="ano">2011</span>.
            </span>
          </PublicationLink>

          <PublicationLink
            href="http://vefsetur.hi.is/ppnw/sites/files/ppnw/PPNWProceedings-Final.pdf"
            target="_blank"
          >
            <span className="autor">
              ALCÂNTARA, E. H.; STECH, J. L.; CASAMITJANA, X.; BONNET, M-P; LORENZZETTI, J. A.; and
              NOVO, E. M. L. M.
            </span>{" "}
            <span className="titulo">
              On the spatially water temperature and heat flux variability over a tropical
              hydroelectric reservoir.
            </span>{" "}
            <span className="fonte">
              In: 14th International Workshop on Physical Processes in Natural Waters, 2010,
              Reykjavík: University of Iceland, p.: 8-15. <span className="ano">2010</span>.
            </span>
          </PublicationLink>

          <PublicationLink
            href="http://vefsetur.hi.is/ppnw/sites/files/ppnw/PPNWProceedings-Final.pdf"
            target="_blank"
          >
            <span className="autor">
              ALCÂNTARA, E. H.; STECH, J. L.; LORENZZETTI, J. A.; and NOVO, E. M. L. M.
            </span>{" "}
            <span className="titulo">
              Cross wavelet, coherence and phase between water surface temperature and heat flux in
              a tropical hydroelectric reservoir.
            </span>{" "}
            <span className="fonte">
              In: 14th International Workshop on Physical Processes in Natural Waters, 2010,
              Reykjavík: University of Iceland, p.: 86-93. <span className="ano">2011</span>.
            </span>
          </PublicationLink>

          <PublicationLink
            href="http://marte.dpi.inpe.br/col/dpi.inpe.br/sbsr@80/2006/10.11.04.08/doc/6549-6556.pdf"
            target="_blank"
          >
            <span className="autor">
              ALCÂNTARA, E. H.; STECH, J. L. ; BARBOSA, C.; NOVO, E. ; and SHIMABUKURO, Y.
            </span>{" "}
            <span className="titulo">
              Integração de dados de alta frequência temporal e imagens MODIS/Terra para o estudo da
              turbidez na planície de Curuai (PA, Brasil).
            </span>{" "}
            <span className="fonte">
              In: XIII Simpósio Brasileiro de Sensoriamento Remoto,{" "}
              <span className="ano">2007</span>, Florianópolis. XIII Simpósio Brasileiro de
              Sensoriamento Remoto - SBSR. São José dos Campos: INPE, p.: 6549-6556.
            </span>
          </PublicationLink>

          <PublicationLink
            href="http://marte.dpi.inpe.br/col/dpi.inpe.br/sbsr@80/2008/11.12.16.41/doc/4647-4653.pdf"
            target="_blank"
          >
            <span className="autor">
              ASSIREU, A. T.; NOVO, E M. L. M.; ROLAND, F.; PACHECO, F. S.; ALCÂNTARA, E. H.; and
              STECH, J. L.
            </span>{" "}
            <span className="titulo">
              O comportamento do rio ao longo do reservatório observado a partir de Sensoriamento
              Remoto, dados in situ e ensaios de laboratório.
            </span>{" "}
            <span className="fonte">
              In: XVI Simpósio Brasileiro de Sensoriamento Remoto, <span className="ano">2009</span>
              , Natal. XIV Simpósio Brasileiro de Sensoriamento Remoto - SBSR. São José dos Campos:
              INPE, p.: 4647-4653.
            </span>
          </PublicationLink>

          <PublicationLink
            href="http://marte.dpi.inpe.br/col/ltid.inpe.br/sbsr/2004/11.26.18.43/doc/2455.pdf"
            target="_blank"
          >
            <span className="autor">
              ASSIREU, A. T.; STECH, J. L.; NOVO, E. M. L. M.; LORENZETTI, J. A.; LIMA, I. B. T.;
              and CARVALHO, J. C.
            </span>{" "}
            <span className="titulo">
              Aplicação do Operador de Fragmentação Assimétrica (FA) na comparação de dados
              coletados in situ por diferentes sensores e transmitidos pelos satélites brasileiros
              SCD e CBERS: um exemplo de aplicação ao Sistema de Monitoramento Ambiental (SIMA).
            </span>{" "}
            <span className="fonte">
              In: XII Simpósio Brasileiro de Sensoriamento Remoto, <span className="ano">2005</span>
              , Goiânia. XII Simpósio Brasileiro de Sensoriamento Remoto - SBSR. São José dos
              Campos: INPE, p.: 2455-2462.
            </span>
          </PublicationLink>

          <PublicationLink
            href="http://marte.dpi.inpe.br/col/dpi.inpe.br/sbsr@80/2008/11.14.00.00/doc/4797-4804.pdf"
            target="_blank"
          >
            <span className="autor">
              NOVO, E. M. L. M.; STECH, J. L.; LONDE, L. R.; ASSIREU, A.; BARBOSA, C. C.; ALCÂNTARA,
              E. H.; and SOUZA, A. F.
            </span>{" "}
            <span className="titulo">
              Integração de dados do sistema automático de monitoramento de variáveis ambientais
              (SIMA) e de imagens orbitais na avaliação do estado trófico do Reservatório da UHE
              Funil.
            </span>{" "}
            <span className="fonte">
              In: XVI Simpósio Brasileiro de Sensoriamento Remoto, <span className="ano">2009</span>
              , Natal. XIV Simpósio Brasileiro de Sensoriamento Remoto - SBSR. São José dos Campos:
              INPE, p.: 4797-4804.
            </span>
          </PublicationLink>

          <PublicationLink href="#" target="_blank">
            <span className="autor">
              NOVO, E.; BARBOSA, C.; STECH, J.; ALCÂNTARA, E. H.; RUDORFF, C. M.; and ASSIREU, A. T.
            </span>{" "}
            <span className="titulo">
              Temporal variability Chlorophyll-a concentration in floodplain lakes in response to
              seasonality of Amazon River discharge.
            </span>{" "}
            <span className="fonte">
              In: Amazônia em Perspectiva, <span className="ano">2008</span>, Manaus. Anais Amazônia
              em Perspectiva.
            </span>
          </PublicationLink>

          <PublicationLink
            href="http://marte.dpi.inpe.br/col/dpi.inpe.br/sbsr@80/2008/11.17.22.59.52/doc/2349-2355.pdf"
            target="_blank"
          >
            <span className="autor">
              SOUZA, A. F.; BARBOSA, C. C.; NOVO, E. M. L. M.; and STECH, J. L.
            </span>{" "}
            <span className="titulo">
              Arquitetura de um banco de dados para suporte à integração de dados de campo e de
              sensoriamento remoto em estudos limnológicos e meteorológicos.
            </span>{" "}
            <span className="fonte">
              In: XVI Simpósio Brasileiro de Sensoriamento Remoto, <span className="ano">2009</span>
              , Natal. XIV Simpósio Brasileiro de Sensoriamento Remoto - SBSR. São José dos Campos:
              INPE, p.: 2349-2355.
            </span>
          </PublicationLink>

          <PublicationLink
            href="http://vefsetur.hi.is/ppnw/sites/files/ppnw/PPNWProceedings-Final.pdf"
            target="_blank"
          >
            <span className="autor">
              STECH, J. L.; ALCÂNTARA, E. H.; LORENZZETTI, J. A.; NOVO, E. M. L. M.; and ASSIREU, A.
              T.
            </span>{" "}
            <span className="titulo">
              The impacts of the cold fronts on thermal stratification and water quality in a
              tropical reservoir (Brazil).
            </span>{" "}
            <span className="fonte">
              In: 14th International Workshop on Physical Processes in Natural Waters,{" "}
              <span className="ano">2010</span>, Reykjavík: University of Iceland, p.: 94-101. 2010.
            </span>
          </PublicationLink>

          <PublicationLink href="http://www.dsr.inpe.br/sbsr2011/files/p0862.pdf" target="_blank">
            <span className="autor">
              VALÉRIO, A. M.; KAMPEL, M.; STECH, J. L.; and ASSIREU, A. T.
            </span>{" "}
            <span className="titulo">
              Variabilidade dos dados bóia SIMA analisados pelo Operador de Fragmentação
              Assimétrica.
            </span>{" "}
            <span className="fonte">
              In: Simpósio Brasileiro de Sensoriamento Remoto, <span className="ano">2011</span>,
              Curitiba. Anais XV Simpósio Brasileiro de Sensoriamento Remoto - SBSR. São José dos
              Campos: INPE, p.: 5108-5115.
            </span>
          </PublicationLink>
        </Section>

        <Section>
          <SectionTitle>Teses e dissertações</SectionTitle>

          <PublicationLink
            href="http://mtc-m19.sid.inpe.br/rep/sid.inpe.br/mtc-m19@80/2010/07.26.20.24?languagebutton=pt-BR&searchsite=bibdigital.sid.inpe.br:80"
            target="_blank"
          >
            <span className="autor">ALCÂNTARA, E. H.</span>{" "}
            <span className="titulo">
              Sensoriamento remoto da temperatura e dos fluxos de calor na superfície da água no
              reservatório de Itumbiara (GO).
            </span>{" "}
            <span className="fonte">
              Tese (Doutorado em Sensoriamento Remoto) - Instituto Nacional de Pesquisas Espaciais.
              136 p. <span className="ano">2010</span>.
            </span>
          </PublicationLink>

          <PublicationLink
            href="http://mtc-m17.sid.inpe.br/rep/sid.inpe.br/mtc-m17@80/2007/02.15.17.09?languagebutton=pt-BR&searchsite=bibdigital.sid.inpe.br:80"
            target="_blank"
          >
            <span className="autor">ALCÂNTARA, E. H.</span>{" "}
            <span className="titulo">
              Análise da turbidez na planície de inundação de Curuaí (PA, Brasil) integrando dados
              telemétricos e Imagens MODIS/Terra.
            </span>{" "}
            <span className="fonte">
              Dissertação (Mestrado em Sensoriamento Remoto) - Instituto Nacional de Pesquisas
              Espaciais. 217 p. <span className="ano">2006</span>.
            </span>
          </PublicationLink>

          <PublicationLink href="http://urlib.net/8JMKD3MGP7W/3E57SM2" target="_blank">
            <span className="autor">AUGUSTO-SILVA, P. B.</span>{" "}
            <span className="titulo">
              Caracterização e avaliação da dinâmica sazonal das propriedades bio-ópticas do
              reservatório de Funil com apoio de sensoriamento remoto, dados in situ e modelos
              ópticos.
            </span>{" "}
            <span className="fonte">
              Dissertação (Mestrado em Sensoriamento Remoto) - Instituto Nacional de Pesquisas
              Espaciais. 155 p. <span className="ano">2013</span>.
            </span>
          </PublicationLink>

          <PublicationLink href="http://urlib.net/8JMKD3MGP7W/3B97FFL" target="_blank">
            <span className="autor">CURTARELLI, M. P.</span>{" "}
            <span className="titulo">
              Estudo da influência de frentes frias sobre a circulação e os processos de
              estratificação e mistura no reservatório de Itumbiara (GO): um enfoque por modelagem
              hidrodinâmica e Sensoriamento Remoto.
            </span>{" "}
            <span className="fonte">
              Dissertação (Mestrado em Sensoriamento Remoto) - Instituto Nacional de Pesquisas
              Espaciais. 108 p. <span className="ano">2012</span>.
            </span>
          </PublicationLink>

          <PublicationLink
            href="http://mtc-m19.sid.inpe.br/rep/sid.inpe.br/mtc-m19/2011/09.13.07.48?languagebutton=pt-BR&searchsite=bibdigital.sid.inpe.br:80"
            target="_blank"
          >
            <span className="autor">CESAR, G. M.</span>{" "}
            <span className="titulo">
              Caracterização da influência de sistemas frontais sobre a qualidade da água do
              reservatório de Itumbiara, GO, utilizando dados de sensoriamento remoto e dados in
              situ.
            </span>{" "}
            <span className="fonte">
              Dissertação (Mestrado em Sensoriamento Remoto) - Instituto Nacional de Pesquisas
              Espaciais. 81 p. <span className="ano">2011</span>.
            </span>
          </PublicationLink>

          <PublicationLink
            href="http://mtc-m19.sid.inpe.br/rep/sid.inpe.br/mtc-m19@80/2010/03.15.18.39?languagebutton=pt-BR&searchsite=bibdigital.sid.inpe.br:80"
            target="_blank"
          >
            <span className="autor">NASCIMENTO, R. F. F.</span>{" "}
            <span className="titulo">
              Utilização de imagens MERIS e dados in situ para a caracterização bio-óptica do
              reservatório de Itumbiara, GO.
            </span>{" "}
            <span className="fonte">
              Dissertação (Mestrado em Sensoriamento Remoto) - Instituto Nacional de Pesquisas
              Espaciais. 91 p. <span className="ano">2010</span>.
            </span>
          </PublicationLink>

          <PublicationLink
            href="http://mtc-m18.sid.inpe.br/rep/sid.inpe.br/mtc-m18@80/2009/05.06.19.17?languagebutton=pt-BR&searchsite=bibdigital.sid.inpe.br:80"
            target="_blank"
          >
            <span className="autor">VALÉRIO, A. M.</span>{" "}
            <span className="titulo">
              O uso do sensoriamento remoto orbital e de superfície para o estudo do comportamento
              do corpo de água do reservatório de Manso, MT, Brasil.
            </span>{" "}
            <span className="fonte">
              Dissertação (Mestrado em Sensoriamento Remoto) - Instituto Nacional de Pesquisas
              Espaciais. 117 p. <span className="ano">2009</span>.
            </span>
          </PublicationLink>
        </Section>
      </Column>
    </TwoColumnContainer>
  );
};

// ================= Componente principal =================
const App: React.FC = () => {
  const [page, setPage] = useState<"home" | "equipe" | "publicacoes">("home");

  useEffect(() => {
    const ano = document.getElementById("ano");
    if (ano) ano.innerText = new Date().getFullYear().toString();
  }, []);

  const openTutorial = () => {
    window.open("http://www.dsr.inpe.br/hidrosfera/sima/tutorialSIMA.pdf", "_blank");
  };

  const openMapa = () => {
    window.open("http://www.dsr.inpe.br/hidrosfera/sima/mapa.php", "_blank");
  };

  return (
    <PageContainer>
      {/* Header */}
      <HeaderContainer>
        <LogoSIMA />
        <HeaderText>Sistema Integrado de Monitoramento Ambiental</HeaderText>
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
        <MenuItem onClick={openTutorial}>Tutorial SIMA</MenuItem>
        <MenuItem onClick={openMapa}>Mapa SIMA</MenuItem> {/* NOVO LINK */}
      </Menu>

      {/* Conteúdo */}
      {page === "home" && <HomeContent />}
      {page === "equipe" && <EquipeContent />}
      {page === "publicacoes" && <PublicacoesContent />}

      {/* Footer */}
      <Footer>
        © <span id="ano"></span>&nbsp;Hidrosfera INPE
      </Footer>
    </PageContainer>
  );
};

export default App;
