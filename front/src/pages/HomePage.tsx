// front/src/pages/HomePage.tsx
import React from "react";
import styled from "styled-components";

type Category = {
  id: string;
  title: string;
  description: string;
  icon: string;
  href: string;
};

const CATEGORIES: Category[] = [
  {
    id: "abioticos",
    title: "Abióticos",
    description: "Parâmetros físico-químicos da coluna d'água e superfície.",
    icon: "🌊",
    href: "/tables/abioticos",
  },
  {
    id: "bioticos",
    title: "Bióticos",
    description: "Parâmetros biológicos amostrados em campanhas.",
    icon: "🪸",
    href: "/tables/bioticos",
  },
  {
    id: "aguasedimento",
    title: "Água & Sedimento",
    description: "Medições e análises de água e sedimento.",
    icon: "🧪",
    href: "/tables/agua-sedimento",
  },
  {
    id: "fluxos",
    title: "Fluxos & Gases",
    description: "Medições de fluxos, bolhas e concentrações gasosas.",
    icon: "💨",
    href: "/tables/fluxos-gases",
  },
  {
    id: "campomedidas",
    title: "Campo Medidas",
    description: "Medidas realizadas em campo (equipamentos, anotações).",
    icon: "📋",
    href: "/tables/campo-medidas",
  },
  {
    id: "fisicochimicos",
    title: "Parâmetros Físico-Químicos",
    description: "Variáveis físico-químicas da água (pH, condutividade, etc.).",
    icon: "⚗️",
    href: "/tables/fisico-quimicos",
  },
  {
    id: "biologicos",
    title: "Parâmetros Biológicos",
    description: "Parâmetros biológicos e de comunidades aquáticas.",
    icon: "🧬",
    href: "/tables/parametros-biologicos",
  },
  {
    id: "loccamp",
    title: "Localizações & Campanhas",
    description: "Sítios, campanhas e reservatórios (metadados).",
    icon: "📍",
    href: "/tables/localizacoes-campanhas",
  },
  {
    id: "equip",
    title: "Equipamentos",
    description: "Cadastro e histórico de equipamentos e sensores (SIMA).",
    icon: "🔧",
    href: "/tables/equipamentos",
  },
];

export default function HomePage(): JSX.Element {
  return (
    <Page>
      <Hero>
        <HeroInner>
          <h1>Repositório de Dados Limnológicos</h1>
          <p>
            Explore os tópicos e acesse as tabelas para visualização, filtragem e exportação dos
            dados.
          </p>
        </HeroInner>
      </Hero>

      <Content>
        <Cards role="list">
          {CATEGORIES.map((c) => {
            

            return (
              <CardLink key={c.id} href={c.href} target="_blank" rel="noopener noreferrer">
                <Card>
                  <Icon aria-hidden>{c.icon}</Icon>
                  <CardTitle>{c.title}</CardTitle>
                  <CardDesc>{c.description}</CardDesc>



                  <CardCTA>Abrir →</CardCTA>
                </Card>
              </CardLink>
            );
          })}
        </Cards>
      </Content>

      <Footer>
        <FooterInner>
          <div>© 2025 INPE – Instituto Nacional de Pesquisas Espaciais.</div>
          <div>
            <a href="#">Contato</a> | <a href="#">Política de Privacidade</a>
          </div>
        </FooterInner>
      </Footer>
    </Page>
  );
}

/* ================= Styled ================= */

const Page = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(180deg, #f3f7fb 0%, #eef6ff 100%);
  color: ${({ theme }) => theme.colors.text.default};
  font-family: "Helvetica Neue", Arial, sans-serif;
`;

const Hero = styled.header`
  background: linear-gradient(90deg, rgba(6, 58, 128, 0.95), rgba(37, 99, 235, 0.95));
  color: #fff;
  padding: 36px 0;
  box-shadow: 0 6px 24px rgba(9, 30, 66, 0.12);
`;

const HeroInner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 18px;
  h1 {
    margin: 0 0 6px;
    font-size: 32px;
    letter-spacing: -0.02em;
  }
  p {
    margin: 0;
    color: rgba(255, 255, 255, 0.9);
    font-size: 15px;
  }
`;

const Content = styled.main`
  max-width: 1200px;
  margin: 28px auto;
  padding: 0 18px 28px;
  width: 100%;
`;

const Cards = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 360px);
  justify-content: center;
  gap: 24px;
  align-items: start;

  @media (max-width: 1100px) {
    grid-template-columns: repeat(2, minmax(260px, 1fr));
    justify-items: center;
  }

  @media (max-width: 700px) {
    grid-template-columns: 1fr;
    padding: 0 12px;
  }
`;

const CardLink = styled.a`
  text-decoration: none;
  color: inherit;
  width: 100%;
`;

const Card = styled.article`
  background: linear-gradient(180deg, #ffffff 0%, #f8fbff 100%);
  border-radius: 16px;
  padding: 28px 22px;
  min-height: 220px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  box-shadow:
    0 18px 40px rgba(9, 30, 66, 0.08),
    0 4px 10px rgba(2, 6, 23, 0.03);
  border: 1px solid rgba(2, 6, 23, 0.04);
  transition:
    transform 0.18s ease,
    box-shadow 0.18s ease;

  &:hover {
    transform: translateY(-10px) scale(1.01);
    box-shadow: 0 28px 60px rgba(9, 30, 66, 0.12);
  }
`;

const Icon = styled.div`
  font-size: 48px;
  width: 72px;
  height: 72px;
  border-radius: 14px;
  background: linear-gradient(180deg, rgba(37, 99, 235, 0.12), rgba(6, 58, 128, 0.08));
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: inset 0 -6px 18px rgba(37, 99, 235, 0.06);
`;

const CardTitle = styled.h3`
  margin: 0;
  font-size: 18px;
  text-align: center;
  color: #062244;
  font-weight: 700;
`;

const CardDesc = styled.p`
  margin: 0;
  font-size: 14px;
  text-align: center;
  color: #475569;
  line-height: 1.3;
  max-width: 88%;
`;

const MetaArea = styled.div`
  margin-top: 6px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: center;
`;

const MetaText = styled.span`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.text.muted};
`;

const MetaTextError = styled(MetaText)`
  color: #c84b4b;
`;

const CardCTA = styled.div`
  margin-top: auto;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 700;
  font-size: 13px;
  padding-top: 8px;
`;

/* Footer */
const Footer = styled.footer`
  margin-top: auto;
  background: ${({ theme }) => theme.colors.primaryDark};
  color: #e6f0ff;
  padding: 18px 0;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  box-shadow: 0 -6px 18px rgba(7, 42, 89, 0.06);
`;

const FooterInner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 18px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;

  a {
    color: rgba(230, 240, 255, 0.95);
    text-decoration: none;
  }

  @media (max-width: 700px) {
    flex-direction: column;
    gap: 8px;
  }
`;
