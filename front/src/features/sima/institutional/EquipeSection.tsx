import {
  Block,
  BlockText,
  BlockTitle,
  Column,
  LinkItem,
  TwoColumnContainer,
} from "./InstitutionalPage.styles";

export function EquipeSection() {
  return (
    <TwoColumnContainer>
      {/* Coluna 1 */}
      <Column>
        <Block>
          <BlockTitle>Coordenação</BlockTitle>
          <BlockText>
            <LinkItem href="http://lattes.cnpq.br/2691497637313274" target="_blank">
              José Luiz Stech (stech@dsr.inpe.br)
            </LinkItem>
            <LinkItem href="http://lattes.cnpq.br/7939379291404418" target="_blank">
              Enner Herenio de Alcântara
            </LinkItem>
          </BlockText>
        </Block>

        <Block>
          <BlockTitle>Colaboradores</BlockTitle>
          <BlockText>
            <LinkItem href="http://lattes.cnpq.br/5535667070825818" target="_blank">
              André Carlos Prates Cimbleris
            </LinkItem>
            <LinkItem href="http://lattes.cnpq.br/8150880476098677" target="_blank">
              Arcilan Trevenzoli Assireu
            </LinkItem>
            <LinkItem href="http://lattes.cnpq.br/7642043789034070" target="_blank">
              Artur Luiz da Costa da Silva
            </LinkItem>
            <LinkItem href="http://lattes.cnpq.br/7466500214796269" target="_blank">
              Augusto Cesar Fonseca Saraiva
            </LinkItem>
            <LinkItem href="http://lattes.cnpq.br/1596449770636962" target="_blank">
              Cláudio Clemente Faria Barbosa
            </LinkItem>
            <LinkItem href="http://lattes.cnpq.br/4775535537651746" target="_blank">
              Donato Seiji Abe
            </LinkItem>
          </BlockText>
        </Block>

        <Block>
          <BlockTitle>Desenvolvimento do Sistema de Coleta de Dados</BlockTitle>
          <BlockText>
            <LinkItem href="http://www.neuron.com.br" target="_blank">
              Neuron Eletrônica
            </LinkItem>
          </BlockText>
        </Block>
      </Column>

      {/* Coluna 2 */}
      <Column>
        <Block>
          <BlockTitle>Colaboradores (continuação)</BlockTitle>
          <BlockText>
            <LinkItem href="http://lattes.cnpq.br/9857505876280820" target="_blank">
              Evlyn Márcia Leão de Moraes Novo
            </LinkItem>
            <LinkItem href="http://lattes.cnpq.br/0567809153346429" target="_blank">
              Fábio Roland
            </LinkItem>
            <LinkItem href="http://lattes.cnpq.br/3852581196429739" target="_blank">
              João Antônio Lorenzzetti
            </LinkItem>
            <LinkItem href="http://lattes.cnpq.br/0030922264947314" target="_blank">
              Jorge Machado Damazio
            </LinkItem>
            <LinkItem href="http://lattes.cnpq.br/4155308755013168" target="_blank">
              Marco Aurélio dos Santos
            </LinkItem>
            <LinkItem href="http://lattes.cnpq.br/8471974730664804" target="_blank">
              Maria Elvira Piñeiro Maceira
            </LinkItem>
            <LinkItem href="http://lattes.cnpq.br/5149356080083086" target="_blank">
              Nelson Luís da Costa Dias
            </LinkItem>
          </BlockText>
        </Block>

        <Block>
          <BlockTitle>Manutenção do Sistema de Coleta de Dados</BlockTitle>
          <BlockText>
            Alexandre Donizetti da Silva (Neuron Eletrônica)
            <LinkItem href="http://lattes.cnpq.br/4915211809920432" target="_blank">
              Carlos Alberto Sampaio de Araújo
            </LinkItem>
            Geraldo Orlando Mendes
            <LinkItem href="http://lattes.cnpq.br/7596795539833144" target="_blank">
              Joaquim Antônio Dionísio Leão
            </LinkItem>
            <LinkItem href="http://lattes.cnpq.br/6286335301335965" target="_blank">
              Vitor Bruno
            </LinkItem>
          </BlockText>
        </Block>

        <Block>
          <BlockTitle>Gerente de Rede do Portal</BlockTitle>
          <BlockText>João Benedito Diehl</BlockText>
        </Block>

        <Block>
          <BlockTitle>Web e Banco de Dados</BlockTitle>
          <BlockText>
            <LinkItem href="http://lattes.cnpq.br/3013376353724630" target="_blank">
              Arley Ferreira de Souza (arley@dpi.inpe.br)
            </LinkItem>
          </BlockText>
        </Block>
      </Column>
    </TwoColumnContainer>
  );
}
