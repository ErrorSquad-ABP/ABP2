import styled from "styled-components";

export const PageContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  font-family: "Calibri", "Arial", "Helvetica", "Verdana", "sans-serif";
  font-size: 15px;
  background-color: #ffffff;
  box-sizing: border-box;
  padding: 0; /* aplicar padding apenas nos blocks */
`;

export const HeaderWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(90deg, #2563eb 0%, #1e40af 100%);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding-bottom: 0; /* sem padding inferior, a separação será feita pela linha */
`;

export const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1.5rem 0 0.5rem 0; /* topo maior, bottom menor para aproximar da linha */
  box-sizing: border-box;
`;

export const HeaderText = styled.h1`
  color: #fff;
  font-size: 1.8rem;
  font-weight: bold;
  text-align: center;
  margin: 0;
`;

export const HeaderSeparator = styled.div`
  width: 100%; /* centralizada */
  height: 3px; /* largura mais fina, visual moderno */
  background-color: rgba(255, 255, 255, 0.7); /* branco translúcido, destaca sobre o gradiente */
  margin: 0.5rem 0; /* separação entre headerText e menu */
  border-radius: 2px; /* cantos levemente arredondados para ficar mais moderno */
`;

export const Separator = styled.div`
  width: 60%;
  height: 2px;
  background-color: rgba(255, 255, 255, 0.5);
  margin: 0.5rem 0 2rem 0; /* espaço inferior maior antes do corpo */
`;

export const MenuContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 25px;
  padding: 0.75rem 0;
`;

export const MenuItem = styled.span<{ active?: boolean }>`
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
`;

export const TwoColumnContainer = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap; /* permite que as colunas se ajustem em telas menores */
  justify-content: center;
`;

export const Column = styled.div`
  flex: 1 1 400px; /* largura mínima de 400px, flexível se houver mais espaço */
  display: flex;
  flex-direction: column;
  gap: 20px; /* espaço entre blocos dentro da coluna */

  @media (max-width: 900px) {
    flex: 1 1 100%; /* colunas ocupam toda a largura em telas menores */
  }
`;

export const Block = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  border-radius: 8px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  background-color: #fff;
  margin: 20px; /* adiciona espaçamento em volta dos blocks, em vez de padding global */
`;

export const BlockTitle = styled.h2`
  font-size: 1.3rem;
  font-weight: 600;
  color: #fff;
  margin: 0;
  padding: 1rem;
  background: linear-gradient(90deg, #2563eb 0%, #1e40af 100%);
  text-align: center;
`;

export const LinkItem = styled.a`
  display: block;
  margin-bottom: 8px;
  color: #007bff;
  text-decoration: none;
  font-weight: 500;
  transition:
    color 0.2s,
    transform 0.2s;

  &:hover {
    color: #0056b3;
    transform: translateX(5px);
  }
`;

export const BlockText = styled.p`
  font-size: 1rem;
  color: #333;
  line-height: 1.6;
  text-align: justify;
  padding: 1rem;

  a {
    color: #2563eb;
    text-decoration: none;
    border-bottom: 1px dashed transparent;
    transition: border-color 0.2s;

    &:hover {
      border-color: #2563eb;
    }
  }

  @media (max-width: 768px) {
    font-size: 0.95rem;
  }
`;

export const Footer = styled.footer`
  margin-top: auto;
  background: ${({ theme }) => theme.colors.primaryDark};
  color: #e6f0ff;
  padding: 18px 0;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  box-shadow: 0 -6px 18px rgba(7, 42, 89, 0.06);
`;

export const FooterInner = styled.div`
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

export const ImageRow = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
  flex-wrap: wrap; /* permite quebrar linha se for necessário */

  img {
    flex: 1 1 48%; /* cada imagem ocupa quase metade do espaço */
    max-width: 100%;
    height: auto; /* mantém proporção */
    object-fit: cover;
    border-radius: 8px; /* opcional, para visual mais moderno */
  }
`;

/** Bloco na página Publicações */
export const PubSection = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1; /* faz todos os blocos da coluna terem altura igual */
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
  box-sizing: border-box;
`;

export const PubSectionTitle = styled.div`
  font-size: 1.3rem;
  font-weight: 600;
  color: #0a3d62;
  margin-bottom: 0.75rem;
  border-bottom: 2px solid #0a3d62;
  padding-bottom: 0.3rem;
`;

export const PublicationPara = styled.div`
  color: #222;
  font-size: 15px;
  line-height: 1.5;
  margin-bottom: 10px;
`;

export const PubLink = styled.a`
  display: block;
  color: #222;
  text-decoration: none;
  margin-bottom: 8px;

  &:hover {
    text-decoration: underline;
  }
`;
