import { JSX } from "react";
import {
  Block,
  BlockText,
  BlockTitle,
  Column,
  LogosHeader,
  TwoColumnContainer,
} from "../ui/furnasContent";
import logoCepel from "@/assets/logoCepel.png";
import logoCoppe from "@/assets/logoCoppe.png";
import logolie from "@/assets/logoIie.png";
import logoInpe from "@/assets/logoInpe.png";
import logoUfjf from "@/assets/logoUfjf.png";

export function HomeSection(): JSX.Element {
  return (
    <>
      <TwoColumnContainer>
        <Column>
          <Block>
            <BlockTitle>Objetivos Gerais</BlockTitle>
            <BlockText>
              <ul>
                <li>
                  Determinar as emissões de gases de efeito estufa dos reservatórios de FURNAS;
                </li>
                <li>Identificar as rotas do ciclo do carbono nesses reservatórios;</li>
                <li>Avaliar fatores ambientais e operacionais na emissão de gases;</li>
                <li>Determinar o padrão de emissão antes da construção de reservatórios;</li>
                <li>
                  Elaborar modelo espacial e temporal de emissão de gases em ambientes de Cerrado.
                </li>
              </ul>
            </BlockText>
          </Block>
        </Column>

        <Column>
          <LogosHeader>
            <img src={logoCepel} style={{ width: "115px", height: "51px" }} />
            <img src={logoCoppe} style={{ width: "98px", height: "50px" }} />
            <img src={logoUfjf} style={{ width: "75px", height: "55px" }} />
            <img src={logolie} style={{ width: "108px", height: "40px" }} />
            <img src={logoInpe} style={{ width: "62px", height: "52px" }} />
          </LogosHeader>
          <Block>
            <BlockTitle>Introdução</BlockTitle>
            <BlockText>
              A crescente emissão de gases de efeito estufa, devido às atividades humanas, pode
              causar severas conseqüências ambientais em escalas regionais e global, tendendo a
              afetar mais os países em desenvolvimento, localizados em baixas latitudes, do que os
              países do hemisfério Norte.
            </BlockText>
            <BlockText>
              O Brasil, ao ratificar a Convenção Quadro das Nações Unidas sobre Mudanças do Clima,
              comprometeu-se a elaborar e atualizar inventários de suas fontes de emissão, bem como
              das remoções por sumidouros dos principais gases de efeito estufa (GHG): gás
              carbônico, metano e óxido nitroso. O conhecimento dessas fontes e sumidouros é o
              primeiro passo na busca de medidas mitigadoras.
            </BlockText>
            <BlockText>
              A partir da última década, a comunidade científica tem questionado se os reservatórios
              destinados à geração hidrelétrica contribuem substancialmente para o aumento do efeito
              estufa. Assim, tornam-se necessárias investigações nessa área. Além disso, é
              importante que o setor elétrico nacional verifique as opções disponíveis para redução
              das emissões de gases de efeito estufa por unidade de energia gerada, de modo que
              possa se qualificar para o mercado mundial das Reduções Certificadas de Emissão.
            </BlockText>
            <BlockText>
              O presente projeto constitui a etapa inicial na realização do balanço de carbono de
              FURNAS CENTRAIS ELÉTRICAS S.A., onde as emissões originadas dos reservatórios das
              usinas hidrelétricas poderão ser comparadas às emissões produzidas pela geração
              termelétrica e, então, contrastadas com o carbono fixado por meio dos projetos de
              reflorestamento da Empresa.
            </BlockText>
            <BlockText>
              Este projeto foi desenvolvido de acordo com a lei 9.991/2000, que estabelece um
              investimento mínimo anual de 1% de seu lucro líquido, das companhias geradoras de
              eletricidade, em pesquisa e desenvolvimento no setor elétrico. Os procedimentos para
              os projetos são determinados pela Agência Nacional de Energia Elétrica (ANEEL).
            </BlockText>
            <BlockText>
              <strong>Gerente do Projeto:</strong> André Carlos Prates Cimbleris – Tel:
              (21)2528-5436
            </BlockText>
          </Block>
        </Column>
      </TwoColumnContainer>
    </>
  );
}
