import React from "react";
import styled from "styled-components";
import PanoramaImg from "../assets/panorama1.png"
import PanoramaImg2 from "../assets/panorama2.png"
const sections = [
  { id: "objetivos", label: "Objetivos Gerais" },
  { id: "introducao", label: "Introdução" },  
  { id: "panorama", label: "Panorama" },
  { id: "metodologia", label: "Metodologia" },
  { id: "banco-dados", label: "Banco de Dados" },
  { id: "resultados", label: "Resultados Esperados" },
  { id: "participantes", label: "Participantes" },
  { id: "usinas", label: "Usinas Hidrelétricas" },
  { id: "pesquisas", label: "Pesquisas Correlatas" },
  { id: "publicacoes", label: "Publicações" },
];

// 🔹 Estilos com styled-components
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: white;
  color: #1f2937; /* text-gray-800 */
`;

const NavBar = styled.nav`
  position: sticky;
  top: 0;
  background: #1e3a8a; /* bg-blue-900 */
  color: white;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  z-index: 50;
`;

const NavWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  padding: 0.75rem 1rem;
`;

const NavButton = styled.button`
  padding: 0.25rem 0.75rem;
  border-radius: 0.5rem;
  transition: background 0.3s;
  background: transparent;
  color: inherit;
  border: none;
  cursor: pointer;

  &:hover {
    background: #1d4ed8; /* hover:bg-blue-700 */
  }
`;

const MainContent = styled.main`
  flex: 1;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 4rem; /* space-y-16 */
`;

const Section = styled.section`
  scroll-margin-top: 5rem; /* scroll-mt-20 */
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  color: #1e3a8a; /* text-blue-900 */
  margin-bottom: 1rem;
`;

const Paragraph = styled.p`
  text-align: justify;
`;

const FurnasPage: React.FC = () => {
  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <PageContainer>
      {/* MENU FIXO */}
      <NavBar>
        <NavWrapper>
          {sections.map((sec) => (
            <NavButton key={sec.id} onClick={() => scrollToSection(sec.id)}>
              {sec.label}
            </NavButton>
          ))}
        </NavWrapper>
      </NavBar>

      {/* CONTEÚDO */}
      <MainContent>
        <Section id="objetivos">
          <SectionTitle>Objetivos Gerais</SectionTitle>
          <p><li>Determinar as emissões de gases de efeito estufa: gás carbônico, metano e óxido nitroso, dos reservatórios de FURNAS Centrais Elétricas S.A.;</li></p>
          <p><li>Identificar as rotas do ciclo do carbono nesses reservatórios e os fatores ambientais envolvidos;</li></p>
          <p><li>Avaliar a influência dos fatores morfológicos, morfométricos, biogeoquímicos e operacionais dos reservatórios na emissão de gases de efeito estufa;</li></p>
          <p><li>Determinar o padrão de emissão existente, anteriormente à construção de reservatórios;</li></p>
          <p><li>Elaborar um modelo espacial e temporal de emissão de gases para reservatórios implantados em ambientes de Cerrado.</li></p>
        </Section>
        <Section id="introducao">
          <SectionTitle>Introdução</SectionTitle>
          <Paragraph>A crescente emissão de gases de efeito estufa, devido às atividades humanas, pode causar severas conseqüências ambientais em escalas regionais e global, tendendo a afetar mais os países em desenvolvimento, localizados em baixas latitudes, do que os países do hemisfério Norte.</Paragraph>
          <Paragraph>O Brasil, ao ratificar a Convenção Quadro das Nações Unidas sobre Mudanças do Clima, comprometeu-se a elaborar e atualizar inventários de suas fontes de emissão, bem como das remoções por sumidouros dos principais gases de efeito estufa (GHG): gás carbônico, metano e óxido nitroso. O conhecimento dessas fontes e sumidouros é o primeiro passo na busca de medidas mitigadoras.</Paragraph>
          <Paragraph>A partir da última década, a comunidade científica tem questionado se os reservatórios destinados à geração hidrelétrica contribuem substancialmente para o aumento do efeito estufa. Assim, tornam-se necessárias investigações nessa área. Além disso, é importante que o setor elétrico nacional verifique as opções disponíveis para redução das emissões de gases de efeito estufa por unidade de energia gerada, de modo que possa se qualificar para o mercado mundial das Reduções Certificadas de Emissão.</Paragraph>
          <Paragraph>O presente projeto constitui a etapa inicial na realização do balanço de carbono de FURNAS CENTRAIS ELÉTRICAS S.A., onde as emissões originadas dos reservatórios das usinas hidrelétricas poderão ser comparadas às emissões produzidas pela geração termelétrica e, então, contrastadas com o carbono fixado por meio dos projetos de reflorestamento da Empresa.</Paragraph>
          <Paragraph>Este projeto foi desenvolvido de acordo com a lei 9.991/2000, que estabelece um investimento mínimo anual de 1% de seu lucro líquido, das companhias geradoras de eletricidade, em pesquisa e desenvolvimento no setor elétrico.
                    Os procedimentos para os projetos são determinados pela Agência Nacional de Energia Elétrica (ANEEL).</Paragraph>
                    <div>Gerente do Projeto: André Carlos Prates Cimbleris
Telefone: (21)2528-5436</div>
        </Section>
        <Section id="panorama">
          <SectionTitle>Panorama</SectionTitle>
          <Paragraph>
        <strong>MUDANÇAS CLIMÁTICAS GLOBAIS E OS RESERVATÓRIOS DE HIDRELÉTRICAS</strong>
      </Paragraph>
          <p><li>Comissão Mundial de Barragens (WCD): quando geração hidrelétrica é inferior a 0,1 W por m2 de área de reservatório, as emissões podem exceder àquelas originadas de termelétricas;</li></p>
          <p><li>Emissões parecem variar em função da profundidade e densidade da biomassa alagada;</li></p>
          <p><li>O ciclo do carbono: deve ser avaliado antes e após a instalação da formação do reservatório. Estudos devem abordar as interações com as bacias de drenagem;</li></p>
          <p><li>Convenção Quadro das Nações Unidas sobre Mudança do Clima (UNFCCC): Compromisso de elaborar e atualizar periodicamente inventários nacionais de emissões antrópicas por fontes e das remoções por sumidouro;</li></p>
        </Section>
            <figure className="my-6 text-center">
  <img 
    src= {PanoramaImg} 
    alt="Processos rápidos e lentos do ciclo do carbono" 
    className="mx-auto rounded-lg shadow-md"
  />
  <figcaption className="mt-2 text-sm text-gray-600 italic">
    Vista esquemática mostrando os processos lentos e rápidos do ciclo de carbono. 
    Aqui é mostrado como ocorre a velocidade de trocas de carbono entre reservatórios, 
    afetando todo o ciclo.
  </figcaption>
</figure>
          <div className="mt-4 text-justify space-y-3">
          <p>Os reservatórios de carbono têm tamanhos muito diferentes e sua importância também é relacionada aos tempos de permanência. Sendo assim, um reservatório menor pode ter uma importância maior que um reservatório maior. Por exemplo, o biota possui 0,1% do carbono aproximadamente na Terra, mas é naturalmente responsável pela grande maioria de fluxos.</p>
          <p>Porém, como as atividades humanas queimam combustíveis fósseis, liberando grandes quantias de carbono, que levou milhões de anos para ser despejada na atmosfera em questão de minutos.</p>
          </div>
          <figure className="my-6 text-center">
  <img 
    src= {PanoramaImg2}  
    alt="Indicadores da influência humana na atmosfera durante a era industrial" 
    className="mx-auto rounded-lg shadow-md"
  />
  <figcaption className="mt-2 text-sm text-gray-600 italic">
    Indicadores da influência humana na atmosfera durante a era industrial.
  </figcaption>
</figure>
        <Section id="metodologia">
          <SectionTitle>Metodologia</SectionTitle>
          <Paragraph>
            Aqui entra o conteúdo da seção Metodologia...
          </Paragraph>
        </Section>

        <Section id="banco-dados">
          <SectionTitle>Banco de Dados</SectionTitle>
          <Paragraph>
            Aqui entra o conteúdo da seção Banco de Dados...
          </Paragraph>
        </Section>

        <Section id="resultados">
          <SectionTitle>Resultados Esperados</SectionTitle>
          <Paragraph>
            Aqui entra o conteúdo da seção Resultados Esperados...
          </Paragraph>
        </Section>

        <Section id="participantes">
          <SectionTitle>Participantes</SectionTitle>
          <Paragraph>
            Aqui entra o conteúdo da seção Participantes...
          </Paragraph>
        </Section>

        <Section id="usinas">
          <SectionTitle>Usinas Hidrelétricas</SectionTitle>
          <Paragraph>
            Aqui entra o conteúdo da seção Usinas Hidrelétricas...
          </Paragraph>
        </Section>

        <Section id="pesquisas">
          <SectionTitle>Pesquisas Correlatas</SectionTitle>
          <Paragraph>
            Aqui entra o conteúdo da seção Pesquisas Correlatas...
          </Paragraph>
        </Section>

        <Section id="publicacoes">
          <SectionTitle>Publicações</SectionTitle>
          <Paragraph>
            Aqui entra o conteúdo da seção Publicações...
          </Paragraph>
        </Section>
      </MainContent>
    </PageContainer>
  );
};

export default FurnasPage;
