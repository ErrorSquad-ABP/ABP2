import { JSX } from "react";
import { Block, BlockText, BlockTitle, Column, TwoColumnContainer } from "../ui/balcarContent";

export function EquipeSection(): JSX.Element {
  return (
    <TwoColumnContainer>
      <Column>
        <Block>
          <BlockTitle>Coordenação Geral</BlockTitle>
          <div>
            <a href="http://lattes.cnpq.br/5535667070825818" target="_blank">
              André Carlos Prates Cimbleris
            </a>
          </div>
        </Block>
      </Column>

      <Column>
        <Block>
          <BlockTitle>Coordenação por Instituição</BlockTitle>
          <ul style={{ listStyle: "none" }}>
            <a href="http://lattes.cnpq.br/4775535537651746">
              <li>IIE: Donato Seiji Abe</li>
            </a>
            <a href="http://lattes.cnpq.br/2691497637313274">
              <li>INPE: José Luiz Stech</li>
            </a>
            <a href="http://lattes.cnpq.br/0567809153346429">
              <li>UFJF: Fábio Roland</li>
            </a>
            <a href="http://lattes.cnpq.br/4155308755013168">
              <li>
                Coordenação por InstituiçãoIIE: Donato Seiji AbeINPE: José Luiz StUFRJ/COPPE: Marco
                Aurélio dos Santos
              </li>
            </a>
          </ul>
        </Block>

        <Block>
          <BlockTitle>Responsáveis pelas Coletas e Análises</BlockTitle>
          <ul style={{ listStyle: "none" }}>
            <a href="http://lattes.cnpq.br/8150880476098677">
              <li>Arcilan Trevenzoli Assireu (INPE)</li>
            </a>
            <a href="http://lattes.cnpq.br/5987354282647527">
              <li>Bohdan Matvienko Sikar (UFRJ/COPPE)</li>
            </a>
            <a href="http://lattes.cnpq.br/7663009286545108">
              <li>Corina Verónica Sidagis Galli (IIE)</li>
            </a>
            <a href="http://lattes.cnpq.br/1002426943626438">
              <li>Ednaldo Oliveira dos Santos (UFRJ/COPPE)</li>
            </a>
            <a href="http://lattes.cnpq.br/2838003403761263">
              <li>Elizabeth Matvienko Sikar (UFRJ/COPPE)</li>
            </a>
            <a href="http://lattes.cnpq.br/7510713692919710">
              <li>Felipe Siqueira Pacheco (UFJF)</li>
            </a>
            <a href="http://lattes.cnpq.br/1341263338653176">
              <li>Ivan Bergier Tavares de Lima (INPE)</li>
            </a>
            <a href="http://lattes.cnpq.br/7301878639558446">
              <li>Luciano Marani (INPE)</li>
            </a>
            <a href="http://lattes.cnpq.br/7511312374795216">
              <li>Nathan Oliveira Barros (UFJF)</li>
            </a>
            <a href="http://lattes.cnpq.br/0578519055132957">
              <li>Plínio Carlos Alvalá (INPE)</li>
            </a>
          </ul>
        </Block>

        <Block>
          <BlockTitle>Gerente de Rede do Portal</BlockTitle>
          <BlockText>João Benedito Diehl</BlockText>
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
}
