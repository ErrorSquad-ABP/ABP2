import styled from "styled-components";

/**
 * Chrome (moldura) compartilhado pelas páginas institucionais de campanha
 * (Furnas, Balcar). São os styled-components de cabeçalho e menu que eram
 * duplicados em cada página. As versões aqui são as responsivas (superset),
 * então ambas as páginas passam a ter o mesmo comportamento em telas menores.
 */

export const PageContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  font-family: "Calibri", "Arial", "Helvetica", "Verdana", "sans-serif";
  font-size: 15px;
  background-color: #ffffff;
  box-sizing: border-box;
  padding: 0;

  @media (max-width: 768px) {
    font-size: 14px;
    padding-bottom: 60px; /* espaço extra para navegação ou rolagem */
    overflow-x: hidden; /* evita scroll lateral */
  }
`;

export const HeaderWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(90deg, #2563eb 0%, #1e40af 100%);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding-bottom: 0; /* sem padding inferior, a separação será feita pela linha */

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    text-align: center;
  }
`;

export const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1.5rem 0 0.5rem 0; /* topo maior, bottom menor para aproximar da linha */
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 1rem 0.5rem;
  }
`;

export const HeaderText = styled.h1`
  color: #fff;
  font-size: 1.8rem;
  font-weight: bold;
  text-align: center;
  margin: 0;

  @media (max-width: 600px) {
    font-size: 1.4rem;
  }
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

export const Menu = styled.div`
  display: flex;
  justify-content: center;
  gap: 25px;
  padding: 0.75rem 0;

  @media (max-width: 768px) {
    gap: 15px;
    padding: 0.5rem;
  }
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

  @media (max-width: 768px) {
    gap: 15px;
    padding: 0.5rem;
  }
`;
