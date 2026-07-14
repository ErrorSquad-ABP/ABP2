import styled from "styled-components";

/**
 * Styled-components de conteúdo específicos da página Furnas. O cabeçalho/menu
 * (chrome) vem de `shared/ui/campanha`; aqui ficam apenas os blocos de conteúdo,
 * cujo estilo difere do da página Balcar.
 */

export const TwoColumnContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

export const Column = styled.div`
  flex: 1;
  min-width: 500px;
`;

export const Block = styled.div`
  background: #ffffff;
  padding: 18px;
  margin-bottom: 18px;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(6, 58, 128, 0.06);
`;

export const LogosHeader = styled.div`
  display: flex;
  gap: 35px;
  justify-content: center;
  margin-top: 15px;
`;

export const BlockTitle = styled.div`
  font-size: 1.3rem;
  font-weight: 600;
  color: #fff;
  margin: 0;
  padding: 1rem;
  background: linear-gradient(90deg, #2563eb 0%, #1e40af 100%);
  text-align: center;
`;

export const BlockText = styled.div`
  color: #222;
  text-align: justify;
  font-size: 15px;
  line-height: 1.5;
  padding: 15px;
`;

export const Image = styled.img`
  width: 100%;
  max-width: 600px; /* Reduzi o tamanho máximo */
  margin: 15px auto;
  display: block;
  border-radius: 6px;
`;
