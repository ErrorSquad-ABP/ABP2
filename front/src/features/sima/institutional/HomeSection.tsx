import sima1 from "../../../assets/sima1.png";
import sima2 from "../../../assets/sima2.png";
import sima3 from "../../../assets/sima3.png";
import sonda from "../../../assets/sonda.png";
import {
  Block,
  BlockText,
  BlockTitle,
  Column,
  ImageRow,
  TwoColumnContainer,
} from "./InstitutionalPage.styles";

export function HomeSection() {
  return (
  <TwoColumnContainer>
    {/* Coluna 1 */}
    <Column>
      <Block>
        <BlockTitle>Sobre o SIMA</BlockTitle>
        <BlockText>
          O SIMA (Sistema Integrado de Monitoramento Ambiental) é um conjunto de hardware e software
          desenhado para a coleta de dados e o monitoramento em tempo real de processos da
          hidrosfera. Para a coleta dos dados, o SIMA faz uso de um sistema autônomo fundeado, onde
          são instalados sensores, eletrônica de armazenamento, bateria e antena de transmissão. Os
          dados coletados em intervalo de tempo pré-programado são transmitidos via satélite e
          também armazenados na estação de coleta, sendo que os dados armazenados são aqueles
          obtidos com maior frequência. Este portal permite o acesso aos dados transmitidos por
          satélite poucas horas após a coleta. A associação destas componentes fornece uma poderosa
          ferramenta que pode ser empregada no gerenciamento e controle ambiental de recursos
          hídricos.
        </BlockText>
      </Block>

      <Block>
        <BlockTitle>Motivação do SIMA</BlockTitle>
        <BlockText>
          <ul>
            <li>
              Sistemas aquáticos são muito dinâmicos, ou seja, podem sofrer mudanças significativas
              em questão de horas;
            </li>
            <li>
              Complexa e cara a logística necessária para amostrar adequadamente os sistemas
              aquáticos em estudo;
            </li>
            <li>Necessidade de dados em tempo real para a tomada de decisões.</li>
          </ul>
        </BlockText>
      </Block>

      <Block>
        <BlockTitle>Dados Coletados</BlockTitle>
        <BlockText>
          O SIMA coleta algumas variáveis ambientais a partir de sensores colocados acima da linha
          d´água (temperatura do ar, pressão atmosférica, direção e intensidade de ventos, radiação
          solar incidente e refletida) e abaixo da linha d´água (amônia, nitrato, clorofila,
          condutividade, direção e intensidade da corrente, oxigênio dissolvido, pH e temperatura em
          diferentes profundidades).
        </BlockText>
      </Block>

      <Block>
        <BlockTitle>Modo de Funcionamento</BlockTitle>
        <BlockText>
          <ul>
            <li>
              Coleta e transmissão dos dados: circuitos analógicas e digitais são responsávies por
              comandar o conjunto de sensores, variáveis de engenharia e ativar o transmissor de
              satélite;
            </li>
            <li>
              Amostragem: a cada hora cheia um novo conjunto completo de dados é armazenado em um
              buffer de memória. Após enchimento dos oito buffers, o conjunto mais antigo é
              descartado;
            </li>
            <li>
              Esquema de transmissão: a cada 90 segundos, um dos oito buffers é transmitido em
              esquema de carrossel. A transmissão é executada independente de existir satélite para
              receber os dados;
            </li>
            <li>
              Recepção dos dados: as unidades do INPE de Cuiabá - MT e Alcântara - MA recebem os
              dados dos satélites e em seguida transmitem para a unidade de Natal - RN, onde os
              dados são processados para filtrar falhas na transmissão e para posterior envio para a
              DSR (Divisão de Sensoriamento Remoto) do INPE de São José dos Campos - SP, onde os
              dados são decodificados, processados e armazenados;
            </li>
            <li>
              Distribuição dos dados: este portal é usado para a consulta e visualização dos dados
              armazenados;
            </li>
            <li>
              Armazenamento interno: alguns SIMAs possuem a capacidade de armazenar as coletas para
              posterior download por um técnico <span style={{ fontStyle: "italic" }}>in situ</span>
              , ou seja, estes dados não são transmitidos por satélite. Neste caso as coletas são
              realizadas a cada 10 minutos.
            </li>
          </ul>
          <ImageRow>
            <img src={sima3} alt="Modo de funcionamento" />
          </ImageRow>
        </BlockText>
      </Block>
      <Block>
        <BlockTitle>Apoio</BlockTitle>
        <BlockText>
          <div style={{ marginBottom: "5px" }}>
            Ao longo da existência deste sistema, os recursos para a aquisição e manutenção dos
            sistemas de coletas e recursos computacionais foram fornecidos pelas seguintes
            instituições:
          </div>
          <ul>
            <li>
              <a href="http://www.cepel.br" target="_blank">
                CEPEL - Centro de Pesquisas de Energia Elétrica
              </a>
            </li>
            <li>
              <a href="http://www.chesf.gov.br" target="_blank">
                Chesf - Companhia Hidro Elétrica do São Francisco
              </a>
            </li>
            <li>
              <a href="http://www.cnpq.br" target="_blank">
                CNPq - Conselho Nacional de Desenvolvimento Científico e Tecnológico
              </a>
            </li>
            <li>
              <a href="http://www.eln.gov.br" target="_blank">
                Eletronorte - Centrais Elétricas do Norte do Brasil
              </a>
            </li>
            <li>
              <a href="http://www.fapesp.br" target="_blank">
                FAPESP - Fundação de Amparo à Pesquisa do Estado de São Paulo
              </a>
            </li>
            <li>
              <a href="http://www.furnas.com.br" target="_blank">
                Furnas Centrais Elétricas
              </a>
            </li>
          </ul>
        </BlockText>
      </Block>
    </Column>

    {/* Coluna 2 */}
    <Column>
      <Block>
        <BlockTitle>Estrutura do SIMA</BlockTitle>
        <BlockText>
          O SIMA é formado por uma plataforma que em alguns modelos pode ser uma bóia toroidal (foto
          abaixo e a esquerda) ou uma estrutura maior (foto abaixo e a direita). No centro da
          plataforma existe uma torre onde são afixados os painéis solares, sensores meteorológicos
          e antena. No vão central um compartimento abriga a eletrônica do sistema, baterias e
          transmissor de satélite. Os sensores submersos são conectados a eletrônica por cabos.
          <ImageRow>
            <img src={sima1} alt="Plataforma esquerda" />
            <img src={sima2} alt="Plataforma direita" />
          </ImageRow>
        </BlockText>
      </Block>

      <Block>
        <BlockTitle>História</BlockTitle>
        <BlockText>
          O SIMA foi desenvolvido em uma parceria entre a Universidade do Vale do Paraíba e o INPE.
          A partir de 1995, o projeto foi transferido para a Neuron Engenharia Ltda. Através de uma
          parceria com a Diretoria de Hidrografia e Navegação (DHN) a Neuron construiu um protótipo
          do SIMA, que ficou fundeado em águas do litoral do Rio de Janeiro durante um ano e os
          dados coletados foram disponibilizados pelo Programa Nacional de Bóia. Os dados coletados
          neste período foram comparados com dados{" "}
          <span style={{ fontStyle: "italic" }}>in situ</span>, o que confirmou o bom desempenho do
          sistema.
        </BlockText>
      </Block>

      <Block>
        <BlockTitle>Problemas</BlockTitle>
        <BlockText>
          <ul>
            <li>
              Sensores: por características específicas de alguns ambientes aquáticos, os sensores
              podem se degradar rapidamente, tornando os dados inválidos. Veja como exemplo a foto
              abaixo tirada da sonda do SIMA fundeado no reservatório de Funil, no momento de uma
              atividade de calibração;
            </li>
            <li>
              Satélite: o SIMA faz uma leitura de parâmetros a cada hora, ou seja, 24 leituras por
              dia. Acontece que nem sempre são recebidas todas as leituras, pois o sistema necessita
              de satélites para completar a transmissão e por questão de posicionamento da
              constelação de satélites, algumas localidades terrestres não são atendidas com a
              frequência necessária para completar todas as transmissões.
            </li>
          </ul>
          <ImageRow>
            <img src={sonda} alt="Sonda do SIMA" />
          </ImageRow>
        </BlockText>
      </Block>
    </Column>
  </TwoColumnContainer>
  );
}
