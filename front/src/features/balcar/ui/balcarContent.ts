import styled from "styled-components";

/**
 * Styled-components de conteúdo específicos da página Balcar. O chrome
 * (cabeçalho/menu) vem de `shared/ui/campanha`; estes blocos têm estilo
 * próprio (com áreas roláveis) que difere do da página Furnas.
 */

export const TwoColumnContainer = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap; /* permite que as colunas se ajustem em telas menores */
  justify-content: center;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 0 0.5rem;
  }
`;

export const Column = styled.div`
  flex: 1 1 400px; /* largura mínima de 400px, flexível se houver mais espaço */
  display: flex;
  flex-direction: column;
  gap: 20px; /* espaço entre blocos dentro da coluna */

  @media (max-width: 900px) {
    flex: 1 1 100%;
  }
`;

export const Block = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  border-radius: 8px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  margin: 20px;
  min-height: 400px;
  max-height: 90vh; /* limita bem em telas menores */
  overflow: hidden; /* mantém aparência limpa */
  position: relative;

  /* garante que o conteúdo role corretamente dentro */
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

export const BlockTitle = styled.div`
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

export const BlockText = styled.div`
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

export const Footer = styled.footer`
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
