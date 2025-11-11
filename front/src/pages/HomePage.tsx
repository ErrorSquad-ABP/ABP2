// front/src/pages/HomePage.tsx
import { JSX, useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { ChevronUp } from "lucide-react";
import icon1 from "../assets/icons/icon1.png";
import icon2 from "../assets/icons/icon2.png";
import icon3 from "../assets/icons/icon3.png";
import icon4 from "../assets/icons/icon4.png";
import icon5 from "../assets/icons/icon5.png";
import icon6 from "../assets/icons/icon6.png";
import icon7 from "../assets/icons/icon7.png";
import icon8 from "../assets/icons/icon8.png";
import icon9 from "../assets/icons/icon9.png";
import icon10 from "../assets/icons/icon10.png";

type Category = {
  id: string;
  title: string;
  description: string;
  icon: string;
  href: string;
};

const CATEGORIES: Category[] = [
  {
    id: "sima",
    title: "SIMA — Monitoramento",
    description: "Dados automaticamente coletados pelo SIMA (séries temporais).",
    icon: icon1,
    href: "/tables/sima",
  },
  {
    id: "abioticos",
    title: "Abióticos",
    description: "Parâmetros físico-químicos da coluna d'água e superfície.",
    icon: icon2,
    href: "/tables/abioticos",
  },
  {
    id: "bioticos",
    title: "Bióticos",
    description: "Parâmetros biológicos amostrados em campanhas.",
    icon: icon3,
    href: "/tables/bioticos",
  },
  {
    id: "aguasedimento",
    title: "Água & Sedimento",
    description: "Medições e análises de água e sedimento.",
    icon: icon4,
    href: "/tables/agua-sedimento",
  },
  {
    id: "fluxos",
    title: "Fluxos & Gases",
    description: "Medições de fluxos, bolhas e concentrações gasosas.",
    icon: icon5,
    href: "/tables/fluxos-gases",
  },
  {
    id: "campomedidas",
    title: "Campo Medidas",
    description: "Medições realizadas em campo (equipamentos, anotações).",
    icon: icon6,
    href: "/tables/campo-medidas",
  },
  {
    id: "fisicochimicos",
    title: "Parâmetros Físico-Químicos",
    description: "Variáveis físico-químicas da água (pH, condutividade, etc.).",
    icon: icon7,
    href: "/tables/fisico-quimicos",
  },
  {
    id: "biologicos",
    title: "Parâmetros Biológicos",
    description: "Parâmetros biológicos e de comunidades aquáticas.",
    icon: icon8,
    href: "/tables/parametros-biologicos",
  },
  {
    id: "loccamp",
    title: "Localizações & Campanhas",
    description: "Sítios, campanhas e reservatórios (metadados).",
    icon: icon9,
    href: "/tables/localizacoes-campanhas",
  },
  {
    id: "equip",
    title: "Equipamentos",
    description: "Cadastro e histórico de equipamentos e sensores (SIMA).",
    icon: icon10,
    href: "/tables/equipamentos",
  },
];

export default function HomePage(): JSX.Element {
  const otherCategories = CATEGORIES.filter((c) => c.id !== "sima");
  const sima = CATEGORIES.find((c) => c.id === "sima")!;

  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
        {/* TopSpot: SIMA card centered */}
        <TopSpot>
          <SimaCardLink to={sima.href} aria-label="Abrir dados SIMA">
            <SimaCard tabIndex={0} aria-label="Abrir dados SIMA">
              <SimaIconWrapper>
                <img src={icon1} alt="Ícone do SIMA" />
              </SimaIconWrapper>
              <SimaCardTitle>{sima.title}</SimaCardTitle>
              <SimaCardDesc>{sima.description}</SimaCardDesc>
              <SimaCardCTA>Abrir →</SimaCardCTA>
            </SimaCard>
          </SimaCardLink>
        </TopSpot>

        <Cards role="list">
          {otherCategories.map((c) => (
            <CardLink key={c.id} to={c.href} aria-label={`Abrir categoria ${c.title}`}>
              <Card tabIndex={0}>
                <Icon aria-hidden>
                  <img
                    src={c.icon}
                    alt={c.title}
                    style={{ width: "48px", height: "48px", objectFit: "contain" }}
                  />
                </Icon>
                <CardTitle>{c.title}</CardTitle>
                <CardDesc>{c.description}</CardDesc>
                <CardCTA>Abrir →</CardCTA>
              </Card>
            </CardLink>
          ))}
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

      {showScrollTop && (
        <ScrollTopButton onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <ChevronUp size={22} />
        </ScrollTopButton>
      )}
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
  font-family: "Inter", "Helvetica Neue", Arial, sans-serif;
  scroll-behavior: smooth;
`;

const Hero = styled.header`
  background: linear-gradient(90deg, rgba(6, 58, 128, 0.95), rgba(37, 99, 235, 0.95));
  color: #fff;
  padding: 48px 0;
  box-shadow: 0 6px 24px rgba(9, 30, 66, 0.12);

  @media (max-width: 700px) {
    padding: 32px 0;
  }
`;

const HeroInner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 18px;
  text-align: center;

  h1 {
    margin: 0 0 8px;
    font-size: clamp(24px, 4vw, 36px);
    letter-spacing: -0.02em;
    font-weight: 800;
  }

  p {
    margin: 0 auto;
    max-width: 700px;
    color: rgba(255, 255, 255, 0.9);
    font-size: clamp(14px, 2.2vw, 16px);
  }
`;

const Content = styled.main`
  max-width: 1200px;
  margin: 28px auto;
  padding: 0 18px 48px;
  width: 100%;
`;

/* TopSpot: keep SIMA card centered and constrained */
const TopSpot = styled.div`
  display: flex;
  justify-content: center; /* center the sima card */
  gap: 24px;
  margin-bottom: 28px;
`;

/* Cards grid: 3 cards per row on wide screens, responsive down to 1 */
const Cards = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(240px, 320px));
  justify-content: center; /* center the grid within container */
  gap: 24px;
  align-items: start;

  @media (max-width: 1100px) {
    grid-template-columns: repeat(2, minmax(220px, 1fr));
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const CardLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: flex;
  justify-content: center;
`;

const Card = styled.article`
  background: linear-gradient(180deg, #ffffff 0%, #f8fbff 100%);
  border-radius: 16px;
  padding: 22px;
  height: 220px;
  width: 100%;
  max-width: 340px;
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
  text-align: center;

  &:hover {
    transform: translateY(-6px) scale(1.02);
    box-shadow: 0 24px 60px rgba(9, 30, 66, 0.12);
  }

  &:active {
    transform: scale(0.98);
  }
`;

const Icon = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 12px;
  background: linear-gradient(180deg, rgba(37, 99, 235, 0.12), rgba(6, 58, 128, 0.08));
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: inset 0 -6px 18px rgba(37, 99, 235, 0.06);

  img {
    width: 38px;
    height: 38px;
    object-fit: contain;
  }
`;

const CardTitle = styled.h3`
  margin: 0;
  font-size: 16px;
  color: #062244;
  font-weight: 700;
`;

const CardDesc = styled.p`
  margin: 0;
  font-size: 13px;
  color: #475569;
  line-height: 1.25;
  max-width: 100%;
`;

const CardCTA = styled.div`
  margin-top: auto;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 700;
  font-size: 13px;
  padding-top: 8px;
`;

/* Sima card specifically: centered content and constrained width */

const SimaIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border-radius: 20%;
  width: 90px;
  height: 90px;
  transition:
    transform 0.25s ease,
    filter 0.25s ease;

  img {
    width: 100%;
    height: 100%;
    border-radius: 20%;
    box-shadow:
      0 8px 18px rgba(0, 0, 0, 0.25),
      inset 0 2px 4px rgba(255, 255, 255, 0.2);
    transition:
      transform 0.25s ease,
      box-shadow 0.25s ease;
  }

  &:hover img {
    transform: scale(1.08);
    box-shadow:
      0 12px 26px rgba(0, 0, 0, 0.4),
      inset 0 3px 6px rgba(255, 255, 255, 0.25);
  }

  &:active img {
    transform: scale(0.95);
  }
`;
const SimaCardLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const SimaCard = styled.article`
  background: linear-gradient(180deg, #0b5394 0%, #2563eb 100%);
  color: #fff;
  border-radius: 16px;
  padding: 28px 22px;
  min-height: 220px;
  width: 100%;
  max-width: 720px; /* limit stretch */
  display: flex;
  flex-direction: column;
  align-items: center; /* center contents */
  justify-content: center; /* vertically center content */
  gap: 12px;
  box-shadow: 0 20px 50px rgba(37, 99, 235, 0.18);
  border: 1px solid rgba(255, 255, 255, 0.08);
  transition:
    transform 0.18s ease,
    box-shadow 0.18s ease;
  text-align: center;

  &:hover {
    transform: translateY(-6px) scale(1.02);
    box-shadow: 0 34px 80px rgba(37, 99, 235, 0.22);
  }

  &:active {
    transform: scale(0.98);
  }
`;

const SimaIcon = styled.div`
  width: 84px;
  height: 84px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.18);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow:
    0 8px 16px rgba(255, 255, 255, 0.15),
    inset 0 -8px 16px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
  animation: float 3s ease-in-out infinite;
  overflow: hidden;

  img {
    width: 56px;
    height: 56px;
    object-fit: contain;
    filter: drop-shadow(0 0 6px rgba(255, 255, 255, 0.4));
  }
  @keyframes float {
    0%,
    100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-6px);
    }
  }
`;

const SimaCardTitle = styled.h3`
  margin: 0;
  font-size: 20px;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: #ffffff;
`;

const SimaCardDesc = styled.p`
  margin: 0;
  font-size: 15px;
  color: rgba(255, 255, 255, 0.92);
  line-height: 1.4;
  max-width: 88%;
`;

const SimaCardCTA = styled.div`
  margin-top: auto;
  color: #ffffff;
  font-weight: 700;
  font-size: 13px;
  padding-top: 8px;
`;

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
  flex-wrap: wrap;
  gap: 8px;
  text-align: center;

  a {
    color: rgba(230, 240, 255, 0.95);
    text-decoration: none;
  }
`;

const ScrollTopButton = styled.button`
  position: fixed;
  bottom: 22px;
  right: 22px;
  background: ${({ theme }) => theme.colors.primary};
  border: none;
  color: white;
  border-radius: 50%;
  padding: 12px;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.4);
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.08);
  }

  &:active {
    transform: scale(0.96);
  }
`;
