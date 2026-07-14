import { JSX } from "react";
import { Block, BlockText, BlockTitle, Column, TwoColumnContainer } from "../ui/balcarContent";

export function DescricaoSection(): JSX.Element {
  return (
    <TwoColumnContainer>
      <Column>
        <Block>
          <BlockTitle>Sobre a Base de dados</BlockTitle>
          <BlockText>
            A base de dados é formada pelos resultados de 79 campanhas realizadas pelas instituições
            participantes nos reservatórios listados abaixo. As datas compreendem o período de
            início e fim de cada campanha no reservatório. As datas de cada campanha podem variar de
            uma instituição para outra. Ao lado são listados os conjuntos de dados coletados por
            cada instituição. Os dados fornecidos por Furnas não são provenientes de campanhas.
          </BlockText>
        </Block>

        <Block>
          <BlockTitle>Campanhas em Corumbá</BlockTitle>
          <BlockText>
            <div>
              <div>IIE</div>
              <div>Primeira: 16/11/2004 a 19/11/2004</div>
              <div>Segunda: 5/3/2005 a 17/3/2005</div>
              <div>Terceira: 21/8/2005 a 24/8/2005</div>
              <div>INPE</div>
              <div>Segunda: 12/3/2005 a 19/3/2005</div>
              <div>Terceira: 23/8/2005 a 28/8/2005</div>
              <div>UFJF</div>
              <div>Primeira: 16/11/2004 a 18/11/2004</div>
              <div>Segunda: 14/3/2005 a 17/3/2005</div>
              <div>Terceira: 20/8/2005 a 24/8/2005</div>
              <div>UFRJ</div>
              <div>Primeira: 16/11/2004 a 21/11/2004</div>
              <div>Segunda: 14/3/2005 a 17/3/2005</div>
              <div>Terceira: 21/8/2005 a 24/8/2005</div>
            </div>
          </BlockText>
        </Block>

        <Block>
          <BlockTitle>Campanhas em Estreito</BlockTitle>

          <BlockText>
            <div>
              <div>IIE</div>
              <div>Primeira: 14/11/2005 a 15/11/2005</div>
              <div>Segunda: 28/3/2006 a 29/3/2006</div>
              <div>Terceira: 9/8/2006 a 11/8/2006</div>
              <div>UFJF</div>
              <div>Primeira: 18/11/2005 a 18/11/2005</div>
              <div>Segunda: 8/4/2006 a 10/4/2006</div>
              <div>Terceira: 9/8/2006 a 10/8/2006</div>
              <div>UFRJ</div>
              <div>Primeira: 14/11/2005 a 16/11/2005</div>
              <div>Segunda: 26/3/2006 a 28/3/2006</div>
              <div>Terceira: 10/8/2006 a 13/8/2006</div>
            </div>
          </BlockText>
        </Block>

        <Block>
          <BlockTitle>Campanhas em Funil</BlockTitle>
          <BlockText>
            <div>
              <div>IIE</div>
              <div>Primeira: 20/11/2006 a 28/11/2006</div>
              <div>Segunda: 26/3/2007 a 29/3/2007</div>
              <div>Terceira: 23/7/2007 a 26/7/2007</div>
              <div>UFRJ</div>
              <div>Primeira: 20/11/2006 a 23/11/2006</div>
              <div>Segunda: 26/3/2007 a 29/3/2007</div>
              <div>Terceira: 23/7/2007 a 26/7/2007</div>
            </div>
          </BlockText>
        </Block>

        <Block>
          <BlockTitle>Campanhas em Furnas</BlockTitle>
          <BlockText>
            <div>
              <div>IIE</div>
              <div>Primeira: 19/11/2005 a 22/11/2005</div>
              <div>Segunda: 3/4/2006 a 7/4/2006</div>
              <div>Terceira: 31/7/2006 a 5/8/2006</div>
              <div>UFJF</div>
              <div>Primeira: 15/11/2005 a 23/11/2005</div>
              <div>Segunda: 2/4/2006 a 4/4/2006</div>
              <div>Terceira: 31/7/2006 a 2/8/2006</div>
              <div>UFRJ</div>
              <div>Primeira: 20/11/2005 a 27/11/2005</div>
              <div>Segunda: 2/4/2006 a 8/4/2006</div>
              <div>Terceira: 31/7/2006 a 7/8/2006</div>
            </div>
          </BlockText>
        </Block>

        <Block>
          <BlockTitle>Campanhas em Itumbiara</BlockTitle>
          <BlockText>
            <div>
              <div>IIE</div>
              <div>Primeira: 20/11/2004 a 23/11/2004</div>
              <div>Segunda: 19/3/2005 a 22/3/2005</div>
              <div>Terceira: 25/8/2005 a 28/8/2005</div>
              <div>UFJF</div>
              <div>Primeira: 20/11/2004 a 21/11/2004</div>
              <div>Segunda: 18/3/2005 a 20/3/2005</div>
              <div>Terceira: 25/8/2005 a 28/8/2005</div>
              <div>UFRJ</div>
              <div>Primeira: 22/11/2004 a 26/11/2004</div>
              <div>Segunda: 17/3/2005 a 23/3/2005</div>
              <div>Terceira: 25/8/2005 a 30/8/2005</div>
            </div>
          </BlockText>
        </Block>

        <Block>
          <BlockTitle>Campanhas em Manso</BlockTitle>
          <BlockText style={{ overflowY: "auto", maxHeight: "80vh", paddingRight: "10px" }}>
            <div style={{ gap: "7px" }}></div>
            <div>
              <div>IIE</div>
              <div>Primeira: 25/11/2003 a 26/11/2003</div>
              <div>Segunda: 22/3/2004 a 24/3/2004</div>
              <div>Terceira: 19/7/2004 a 21/7/2004</div>
              <div>Quarta: 27/11/2006 a 29/11/2006</div>
              <div>Quinta: 19/3/2007 a 22/3/2007</div>
              <div>Sexta: 16/7/2007 a 18/7/2007</div>
              <div>INPE</div>
              <div>Primeira: 22/3/2004 a 25/3/2004</div>
              <div>UFJF</div>
              <div>Primeira: 25/11/2003 a 25/11/2003</div>
              <div>Segunda: 24/3/2004 a 25/3/2004</div>
              <div>Terceira: 19/7/2004 a 22/7/2004</div>
              <div>UFRJ</div>
              <div>Primeira: 24/11/2003 a 27/11/2003</div>
              <div>Segunda: 22/3/2004 a 25/3/2004</div>
              <div>Terceira: 18/7/2004 a 25/7/2004</div>
              <div>Quarta: 27/11/2006 a 1/12/2006</div>
              <div>Quinta: 19/3/2007 a 22/3/2007</div>
              <div>Sexta: 16/7/2007 a 19/7/2007</div>
            </div>
          </BlockText>
        </Block>

        <Block>
          <BlockTitle>Campanhas em Mascarenhas de Moraes</BlockTitle>
          <BlockText>
            <div>
              <div>IIE</div>
              <div>Primeira: 14/11/2005 a 17/11/2005</div>
              <div>Segunda: 29/3/2006 a 1/4/2006</div>
              <div>Terceira: 6/8/2006 a 10/8/2006</div>
              <div>UFJF</div>
              <div>Primeira: 17/11/2005 a 21/11/2005</div>
              <div>Segunda: 7/4/2006 a 12/4/2006</div>
              <div>Terceira: 4/8/2006 a 8/8/2006</div>
              <div>UFRJ</div>
              <div>Primeira: 17/11/2005 a 21/11/2005</div>
              <div>Segunda: 28/3/2006 a 1/4/2006</div>
              <div>Terceira: 7/8/2006 a 10/8/2006</div>
            </div>
          </BlockText>
        </Block>

        <Block>
          <BlockTitle>Campanhas em Mascarenhas de Moraes</BlockTitle>
          <BlockText>
            <div>
              <div>IIE</div>
              <div>Primeira: 14/11/2005 a 17/11/2005</div>
              <div>Segunda: 29/3/2006 a 1/4/2006</div>
              <div>Terceira: 6/8/2006 a 10/8/2006</div>
              <div>UFJF</div>
              <div>Primeira: 17/11/2005 a 21/11/2005</div>
              <div>Segunda: 7/4/2006 a 12/4/2006</div>
              <div>Terceira: 4/8/2006 a 8/8/2006</div>
              <div>UFRJ</div>
              <div>Primeira: 17/11/2005 a 21/11/2005</div>
              <div>Segunda: 28/3/2006 a 1/4/2006</div>
              <div>Terceira: 7/8/2006 a 10/8/2006</div>
            </div>
          </BlockText>
        </Block>

        <Block>
          <BlockTitle>Campanhas em Serra da Mesa</BlockTitle>
          <BlockText style={{ overflowY: "auto", maxHeight: "80vh", paddingRight: "10px" }}>
            <div style={{ gap: "7px" }}></div>
            <div>
              <div>Campanhas em Serra da Mesa</div>
              <div>IIE</div>
              <div>Primeira: 18/11/2003 a 21/11/2003</div>
              <div>Segunda: 15/3/2004 a 19/3/2004</div>
              <div>Terceira: 12/7/2004 a 16/7/2004</div>
              <div>INPE</div>
              <div>Primeira: 16/3/2004 a 18/3/2004</div>
              <div>UFJF</div>
              <div>Primeira: 18/11/2003 a 18/11/2003</div>
              <div>Segunda: 18/3/2004 a 18/3/2004</div>
              <div>Terceira: 12/7/2004 a 14/7/2004</div>
              <div>UFRJ</div>
              <div>Primeira: 17/11/2003 a 21/11/2003</div>
              <div>Segunda: 15/3/2004 a 19/3/2004</div>
              <div>Terceira: 12/7/2004 a 17/7/2004</div>
            </div>
          </BlockText>
        </Block>
      </Column>
      <Column>
        <Block>
          <BlockTitle>Furnas</BlockTitle>
          <BlockText>
            <div>
              <div style={{ fontWeight: "1000" }}>Dados de precipitação</div>
              <div>Quantidade de coletas: 20683</div>
              <div>Parâmetros coletados: Precipitação (Medida diária)</div>
              <div style={{ fontWeight: "1000" }}>Nível do reservatório</div>
              <div>Quantidade de coletas: 8470</div>
              <div>
                Parâmetros coletados: Nível (Nível da água do reservatório à 0h00), Volume útil
                (Volume útil do reservatório à 0h00), Per. volume útil (Percentual do volume útil à
                0h00), Geração (Geração diária da usina), Vazão afluente (Média diária), Vazão
                defluente (Média diária), Produtividade (Média diária), Vazão turbinada (Média
                diária), Vazão vertida (Média diária), Vazão turb. em vazio (Média diária)
              </div>
            </div>
          </BlockText>
        </Block>

        <Block>
          <BlockTitle>IEE</BlockTitle>
          <BlockText>
            <div>
              <div style={{ fontWeight: "1000" }}>Água e matéria orgânica no sedimento</div>
              <div>Quantidade de coletas: 1283</div>
              <div>Quantidade de campanhas: 27</div>
              <div>Locais distintos de coleta: 243</div>
              <div>
                Parâmetros coletados: Profundidade (Intervalo de profundidade da fatia de
                sedimento), Cota (Nível da água), Água (Conteúdo de água no sedimento), Matéria
                orgânica (Conteúdo de matéria orgânica no sedimento)
              </div>
              <div style={{ fontWeight: "1000" }}>Concentração de gás na água</div>
              <div>Quantidade de coletas: 1008</div>
              <div>Quantidade de campanhas: 27</div>
              <div>Locais distintos de coleta: 244</div>
              <div>
                Parâmetros coletados: Cota (Nível da água), Altura (Altura sobre a interface
                (distância da interface sedimento-água)), Réplica, CH4 (Concentração de metano na
                amostra da água sobre a interface (em milimolar)), CO2 (Concentração de dióxido de
                carbono na amostra da água sobre a interface (em milimolar))
              </div>
              <div style={{ fontWeight: "1000" }}>Concentração de gás no sedimento</div>
              <div>Quantidade de coletas: 3548</div>
              <div>Quantidade de campanhas: 27</div>
              <div>Locais distintos de coleta: 243</div>
              <div>
                Parâmetros coletados: Cota (Nível da água), Profundidade (Profundidade do sedimento
                sob a interface), Réplica, CH4 (Concentração de metano na amostra de sedimento (em
                milimolar)), CO2 (Concentração de dióxido de carbono na amostra de sedimento (em
                milimolar))
              </div>
              <div style={{ fontWeight: "1000" }}>Dados do Horiba</div>
              <div>Quantidade de coletas: 21799</div>
              <div>Quantidade de campanhas: 27</div>
              <div>Locais distintos de coleta: 198</div>
              <div>
                Parâmetros coletados: Prof. (Profundidade de coleta), Temp. da água, Condutividade,
                pH, DO (Oxigênio dissolvido), TDS (Sólidos totais dissolvidos), Potencial REDOX
                (Potencial de óxido redução), Turbidez
              </div>
              <div style={{ fontWeight: "1000" }}>Fluxo difusivo</div>
              <div>Quantidade de coletas: 324</div>
              <div>Quantidade de campanhas: 27</div>
              <div>Locais distintos de coleta: 243</div>
              <div>
                Parâmetros coletados: Cota (Nível da água), Intervalo (Direção do fluxo: positivo
                (através da interface) e negativo (para a interface)), CH4 (Metano), CO2 (Dióxido de
                carbono)
              </div>
              <div style={{ fontWeight: "1000" }}>Íons na água intersticial do sedimento</div>
              <div>Quantidade de coletas: 1069</div>
              <div>Quantidade de campanhas: 27</div>
              <div>Locais distintos de coleta: 207</div>
              <div>
                Parâmetros coletados: Profundidade (Intervalo de profundidade da fatia de
                sedimento), Cota (Nível da água), F- (Fluoreto), Cl- (Cloreto), NO2- (Nitrito), Br-
                (Brometo), NO3- (Nitrato), PO4--- (Fosfato), SO4-- (Sulfato), Na+ (Sódio), NH4+
                (Amônio), K+ (Potássio), Mg (Magnésio), Ca++ (Cálcio), Acetato
              </div>
              <div style={{ fontWeight: "1000" }}>Nutrientes no sedimento</div>
              <div>Quantidade de coletas: 1233</div>
              <div>Quantidade de campanhas: 27</div>
              <div>Locais distintos de coleta: 238</div>
              <div>
                Parâmetros coletados: Profundidade (Intervalo de profundidade da fatia de
                sedimento), Cota (Nível da água), N2 (Concentração de Nitrogênio Total Kjeldahl no
                sedimento), PT (Concentração de Fósforo Total no sedimento), TC (Concentração de
                Carbono Total no sedimento)
              </div>
              <div style={{ fontWeight: "1000" }}>Variáveis físicas e químicas da água</div>
              <div>Quantidade de coletas: 446</div>
              <div>Quantidade de campanhas: 27</div>
              <div>Locais distintos de coleta: 197</div>
              <div>
                Parâmetros coletados: Profundidade (Profundidade de coleta), Secchi (Profundidade do
                disco de Secchi), Cota (Nível da água), F- (Fluoreto), Cl- (Cloreto), N-NO3-
                (Nitrato), P-PO43- (Fosfato), S-SO42- (Sulfato), Li (Lítio), Na (Sódio), N-NH4
                (Amônio), K (Potássio), Mg (Magnésio), Ca (Cálcio), Clorofila (Clorofila a),
                Feofitina, Turbidez, NT (Concentração de Nitrogênio Orgânico Total (NTK)), PT
                (Concentração de Fósforo Total), TDC (Concentração de carbono total dissolvido)
              </div>
            </div>
          </BlockText>
        </Block>

        <Block>
          <BlockTitle>INPE</BlockTitle>
          <BlockText style={{ overflowY: "auto", maxHeight: "80vh", paddingRight: "10px" }}>
            <div style={{ gap: "7px" }}></div>

            <div>
              <div style={{ fontWeight: "1000" }}>Fluxo de bolhas</div>
              <div>Quantidade de coletas: 297</div>
              <div>Quantidade de campanhas: 2</div>
              <div>Locais distintos de coleta: 1</div>
              <div>
                Parâmetros coletados: Profundidade (Profundidade média), CH4 (Fluxo de Bolhas),
                Desvio padrão (missing values repostos com valores medianos para cada tempo), Nro.
                de amostras
              </div>
              <div style={{ fontWeight: "1000" }}>Fluxo difusivo (INPE)</div>
              <div>Quantidade de coletas: 380</div>
              <div>Quantidade de campanhas: 4</div>
              <div>Locais distintos de coleta: 3</div>
              <div>
                Parâmetros coletados: Profundidade, CO2 (Fluxo de CO2 na interface água-ar), Desvio
                padrão CO2, Nro. de amostras CO2, CH4 (Fluxo de CH4 difusivo+bolhas na interface
                água-ar), Desvio Padrão CH4, Nro. de amostras CH4
              </div>
            </div>
          </BlockText>
        </Block>

        <Block>
          <BlockTitle>UFJF</BlockTitle>
          <BlockText style={{ overflowY: "auto", maxHeight: "80vh", paddingRight: "10px" }}>
            <div style={{ gap: "7px" }}></div>
            <div>
              <div style={{ fontWeight: "1000" }}>Abióticos na coluna d água</div>
              <div>Quantidade de coletas: 120</div>
              <div>Quantidade de campanhas: 20</div>
              <div>Locais distintos de coleta: 9</div>
              <div>
                Parâmetros coletados: Profundidade (Profundidade de coleta), DIC (Carbono inorgânico
                dissolvido), NT (Nitrogênio), PT (Fósforo Total), Delta 13C, Delta 15N
              </div>
              <div style={{ fontWeight: "1000" }}>Abióticos na superfície</div>
              <div>Quantidade de coletas: 238</div>
              <div>Quantidade de campanhas: 21</div>
              <div>Locais distintos de coleta: 85</div>
              <div>
                Parâmetros coletados: DIC (Carbono inorgânico dissolvido), NT (Nitrogênio), PT
                (Fósforo Total), Delta 13C, Delta 15N
              </div>
              <div style={{ fontWeight: "1000" }}>Bióticos na coluna d água</div>
              <div>Quantidade de coletas: 120</div>
              <div>Quantidade de campanhas: 20</div>
              <div>Locais distintos de coleta: 9</div>
              <div>
                Parâmetros coletados: Profundidade (Profundidade de coleta), DOC (Carbono orgânico
                dissolvido), POC (Carbono orgânico particulado), TOC (Carbono orgânico total),
                Densidade bactéria, Biomassa bactéria, Clorofila, Biomassa carbono total fito,
                Densidade total fito, Biomassa zoo, Densidade total zoo
              </div>
              <div style={{ fontWeight: "1000" }}>Bióticos na superfície</div>
              <div>Quantidade de coletas: 239</div>
              <div>Quantidade de campanhas: 21</div>
              <div>Locais distintos de coleta: 85</div>
              <div>
                Parâmetros coletados: DOC (Carbono orgânico dissolvido), POC (Carbono orgânico
                particulado), TOC (Carbono orgânico total), Densidade bactéria, Biomassa bactéria,
                Clorofila, Biomassa carbono total fito, Densidade total fito, Biomassa zoo,
                Densidade total zoo
              </div>
              <div style={{ fontWeight: "1000" }}>Fluxos de carbono</div>
              <div>Quantidade de coletas: 19</div>
              <div>Quantidade de campanhas: 19</div>
              <div>Locais distintos de coleta: 8</div>
              <div>
                Parâmetros coletados: Produção fitoplanctônica, Carbono orgânico excretado,
                Respiração fito, Produção bacteriana, Respiração bacteriana, Taxa de sedimentação
              </div>
              <div style={{ fontWeight: "1000" }}>Medidas de campo na coluna d água</div>
              <div>Quantidade de coletas: 131</div>
              <div>Quantidade de campanhas: 21</div>
              <div>Locais distintos de coleta: 9</div>
              <div>
                Parâmetros coletados: Profundidade (Profundidade de coleta), Secchi (Profundidade do
                disco de Secchi), Temp. da água, Condutividade, DO (Oxigênio dissolvido), pH,
                Turbidez, Material em suspensão, Intensidade luminosa
              </div>
              <div style={{ fontWeight: "1000" }}>Medidas de campo na superfície</div>
              <div>Quantidade de coletas: 238</div>
              <div>Quantidade de campanhas: 21</div>
              <div>Locais distintos de coleta: 85</div>
              <div>
                Parâmetros coletados: Secchi (Profundidade do disco de Secchi), Temp. da água,
                Condutividade, DO (Oxigênio dissolvido), pH, Turbidez, Material em suspensão
              </div>
              <div style={{ fontWeight: "1000" }}>Parâmetros biológicos e físicos da água</div>
              <div>Quantidade de coletas: 201</div>
              <div>Quantidade de campanhas: 12</div>
              <div>Locais distintos de coleta: 46</div>
              <div>
                Parâmetros coletados: Profundidade (Profundidade de coleta), Secchi, Temp. da água,
                Condutividade, DO (Oxigênio dissolvido), pH, Turbidez, Material em suspensão, DOC
                (Carbono orgânico dissolvido), POC (Carbono orgânico particulado), TOC (Carbono
                orgânico total), DIC (Carbono inorgânico dissolvido), NT (Nitrogênio), PT (Fósforo
                Total), Densidade bactéria, Biomassa bactéria, Clorofila, Biomassa carbono total
                fito, Densidade total fito, Biomassa zoo, Densidade total zoo, Produção
                fitoplanctônica, Carbono orgânico excretado, Respiração fito, Produção bacteriana,
                Respiração bacteriana, Taxa de sedimentação, Delta 13C, Delta 15N, Intensidade
                luminosa
              </div>
            </div>
          </BlockText>
        </Block>

        <Block>
          <BlockTitle>UFRJ</BlockTitle>
          <BlockText style={{ overflowY: "auto", maxHeight: "80vh", paddingRight: "10px" }}>
            <div style={{ gap: "7px" }}></div>
            <div>
              <div style={{ fontWeight: "1000" }}>Bolhas</div>
              <div>Quantidade de coletas: 396</div>
              <div>Quantidade de campanhas: 27</div>
              <div>Locais distintos de coleta: 119</div>
              <div>
                Parâmetros coletados: Profundidade (Profundidade de coleta), Nro. de funis, Volume
                coletado, CO2 (Dióxido de carbono), O2 (Oxigênio), N2 (Nitrogênio), CH4 (Metano),
                N2O (Óxido nitroso)
              </div>
              <div style={{ fontWeight: "1000" }}>Câmara solo</div>
              <div>Quantidade de coletas: 82</div>
              <div>Quantidade de campanhas: 22</div>
              <div>Locais distintos de coleta: 31</div>
              <div>
                Parâmetros coletados: CH4 (Metano), CO2 (Dióxido de carbono), N2O (Óxido nitroso),
                Temp. do ar, Temp. do solo, Vel. do vento, Altitude (Altitude do local da medida)
              </div>
              <div style={{ fontWeight: "1000" }}>Carbono Total no sedimento</div>
              <div>Quantidade de coletas: 301</div>
              <div>Quantidade de campanhas: 26</div>
              <div>Locais distintos de coleta: 29</div>
              <div>
                Parâmetros coletados: Camada (Profundidade no sedimento), TC (Carbono total em
                sedimento)
              </div>
              <div style={{ fontWeight: "1000" }}>DC, DOC, POC, TOC, DIC e TC</div>
              <div>Quantidade de coletas: 315</div>
              <div>Quantidade de campanhas: 27</div>
              <div>Locais distintos de coleta: 272</div>
              <div>
                Parâmetros coletados: DC (Carbono dissolvido), DOC (Carbono orgânico dissolvido),
                POC (Carbono orgânico particulado), TOC (Carbono orgânico total), DIC (Carbono
                inorgânico dissolvido), TC (Carbono total)
              </div>
              <div style={{ fontWeight: "1000" }}>Difusão</div>
              <div>Quantidade de coletas: 654</div>
              <div>Quantidade de campanhas: 27</div>
              <div>Locais distintos de coleta: 368</div>
              <div>
                Parâmetros coletados: CH4 (Metano), CO2 (Dióxido de carbono), N2O (Óxido nitroso),
                pH, Temp. da água, Temp. do ar, Profundidade (Profundidade de coleta), Altitude
                (Altitude do local da medida), Vel. do vento
              </div>
              <div style={{ fontWeight: "1000" }}>Dupla dessorção da água</div>
              <div>Quantidade de coletas: 535</div>
              <div>Quantidade de campanhas: 19</div>
              <div>Locais distintos de coleta: 45</div>
              <div>
                Parâmetros coletados: Profundidade (Profundidade de coleta), CO2 (O volume de água
                utilizado para a dupla dessorção foi de 250 ml), O2 (O volume de água utilizado para
                a dupla dessorção foi de 250 ml), N2 (O volume de água utilizado para a dupla
                dessorção foi de 250 ml), CH4 (O volume de água utilizado para a dupla dessorção foi
                de 250 ml), N2O (O volume de água utilizado para a dupla dessorção foi de 250 ml)
              </div>
              <div style={{ fontWeight: "1000" }}>Gases em bolhas</div>
              <div>Quantidade de coletas: 20</div>
              <div>Quantidade de campanhas: 7</div>
              <div>Locais distintos de coleta: 11</div>
              <div>
                Parâmetros coletados: Profundidade (Profundidade de coleta), CO2 (Máximo volume de
                gás extraível de um volume de 250 ml de água), O2 (Máximo volume de gás extraível de
                um volume de 250 ml de água), N2 (Máximo volume de gás extraível de um volume de 250
                ml de água), CH4 (Máximo volume de gás extraível de um volume de 250 ml de água),
                N2O (Máximo volume de gás extraível de um volume de 250 ml de água)
              </div>
              <div style={{ fontWeight: "1000" }}>Parâmetros físicos e químicos</div>
              <div>Quantidade de coletas: 1547</div>
              <div>Quantidade de campanhas: 27</div>
              <div>Locais distintos de coleta: 103</div>
              <div>
                Parâmetros coletados: Profundidade (Profundidade de coleta), Cota (Nível da água),
                Temp. do ar, Temp. da água, DO (Oxigênio dissolvido), pH, Potencial REDOX (Potencial
                de óxido redução), Vel. do vento
              </div>
            </div>
          </BlockText>
        </Block>
      </Column>
    </TwoColumnContainer>
  );
}
