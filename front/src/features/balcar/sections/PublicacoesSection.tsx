import { JSX } from "react";
import { Block, BlockText, BlockTitle, Column, TwoColumnContainer } from "../ui/balcarContent";

export function PublicacoesSection(): JSX.Element {
  /*
  const PublicationLink = styled.a`
    display: block;
    color: #222;
    text-decoration: none;
    margin-bottom: 8px;

    &:hover {
      text-decoration: underline;
    }
  `;
*/
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
}
