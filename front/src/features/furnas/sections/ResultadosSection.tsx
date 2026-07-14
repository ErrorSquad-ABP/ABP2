import { JSX } from "react";
import { Block, BlockText, BlockTitle, Column, TwoColumnContainer } from "../ui/furnasContent";

export function ResultadosSection(): JSX.Element {
  return (
    <>
      <TwoColumnContainer>
        <Column>
          <Block>
            <BlockTitle>Resultados Esperados</BlockTitle>
            <BlockText>
              <ul>
                <li>
                  Padronização de metodologia para o cálculo das emissões de gases de efeito estufa
                  em reservatórios;
                </li>
                <li>
                  Modelo de emissão de longo prazo de gases de efeito estufa por reservatórios;
                </li>
                <li>
                  Artigos em revistas especializadas e publicação de livro, incluindo versão voltada
                  à comunidade científica internacional;
                </li>
                <li>Modelos ecohidrodinâmicos aplicados;</li>
                <li>Disponibilização de modelos e dados na internet;</li>
                <li>Desenvolvimento de técnicas computacionais de análise de sinais ambientais;</li>
                <li>Incentivo à inovação tecnológica no país;</li>
                <li>Capacitação de recursos humanos com atividades acadêmicas de pesquisa.</li>
              </ul>
            </BlockText>
          </Block>
        </Column>

        <Column>
          <Block>
            <BlockTitle>Benefícios Gerados</BlockTitle>
            <BlockText>
              <ul>
                <li>Fortalecimento dos parceiros como Centros de Excelência;</li>
                <li>
                  Produção de conhecimento relevante ao estado-da-arte, com subsídios para 5
                  dissertações de mestrado e 6 teses de doutorado, além de cursos de especialização;
                </li>
                <li>
                  Participação em conferências, seminários e congressos, e publicações em anais e
                  revistas especializadas;
                </li>
                <li>
                  Composição do balanço de carbono de FURNAS, permitindo aprimoramento do
                  planejamento ambiental, baseado no desenvolvimento sustentável.
                </li>
              </ul>
            </BlockText>
          </Block>
        </Column>
      </TwoColumnContainer>
    </>
  );
}
