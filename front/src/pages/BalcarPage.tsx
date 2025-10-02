import React, { useEffect } from "react";
import balcar from "../assets/BALCAR.png";
import cepel from "../assets/logoCepel.png";
import coppe from "../assets/logoCoppe.png";
import lie from "../assets/logoIie.png";
import ufjf from "../assets/logoUfjf.png";
import inpe from "../assets/logoInpe.png";

const BalcarPage = () => {
  useEffect(() => {
    const anoEl = document.getElementById("ano");
    if (anoEl) {
      anoEl.innerHTML = new Date().getFullYear().toString();
    }
  }, []);

  return (
    <div lang="pt-br" style={{ fontFamily: "Calibri, Arial, sans-serif", fontSize: 14, backgroundColor: "#fff", width: 1150, margin: "5px auto" }}>
      {/* topo */}
      <div id="b0" style={{ float: "left", height: 124, width: "100%", marginBottom: 10 }}>
        <div id="b0a" style={{ float: "left", width: "100%", height: 99 }}>
          <div id="b0alogo">
            <img src={balcar} alt="Balcar logo" style={{ height: 112 }} />
          </div>
          <div style={{ fontSize: 18, color: "#4682B4" }}>Dados de Campanha</div>
          <div style={{ fontSize: 16, color: "#555" }}>
            Projeto Balanço de Carbono nos Reservatórios de FURNAS Centrais Elétricas S.A.
          </div>
        </div>

        <div id="b0b" style={{ float: "right", width: "90%", height: 25, lineHeight: "25px", marginTop: -35, fontSize: 18, borderTop: "1px solid #ccc" }}>
          <a href="publicacoes.php" style={menuStyle}>publicações</a>
          <a href="balcar/equipe" style={menuStyle}>equipe</a>
          <a href="descricao.php" style={menuStyle}>descrição</a>
          <span style={menuActiveStyle}>home</span>
        </div>
      </div>

      {/* logos */}
      <div id="b1" style={{ float: "left", width: "100%", marginTop: -10 }}>
        <img src={inpe} alt="INPE" style={{ float: "right", marginLeft: 30, width: 62, height: 52 }} />
        <img src={lie} alt="IIE" style={{ float: "right", marginLeft: 30, width: 108, height: 40, marginTop: 9 }} />
        <img src={ufjf} alt="UFJF" style={{ float: "right", marginLeft: 30, width: 75, height: 55 }} />
        <img src={coppe} alt="COPPE" style={{ float: "right", marginLeft: 30, width: 98, height: 50, marginTop: 2 }} />
        <img src={cepel} alt="CEPEL" style={{ float: "right", width: 115, height: 51, marginTop: 2 }} />
      </div>

      {/* seções */}
      <div id="b2" style={{ float: "left", clear: "both", width: "100%", marginTop: 30, display: "flex" }}>
      <div style={{ display: "flex", flexDirection: "column"}}>
        <Section title="Portal">
          Este portal constitui a interface de acesso aos dados do Projeto Balanço de Carbono nos Reservatórios de FURNAS Centrais Elétricas S.A. A base de dados é formada por coletas in situ de equipes que tinham como objetivo obter dados para:
determinar as emissões de gases de efeito estufa: gás carbônico, metano e óxido nitroso, dos reservatórios das hidrelétricas;
identificar as rotas do ciclo do carbono nesses reservatórios e os fatores ambientais envolvidos;
avaliar a influência dos fatores morfológicos, morfométricos, biogeoquímicos e operacionais dos reservatórios na emissão de gases de efeito estufa;
determinar o padrão de emissão existente, anteriormente à construção de reservatórios;
elaborar um modelo espacial e temporal de emissão de gases para reservatórios implantados em ambientes de cerrado.
A interface de acesso permite personalizar consultas aos dados para o download, visualização em tabelas dinâmicas e visualizar a distribuição espacial dos dados em mapa interativo do Google Maps.
        </Section>
    
        <Section title="Fomento">
          Os recursos utilizados para a coleta da base de dados foram fornecidos por FURNAS Centrais Elétricas S.A. no âmbito da lei 9.991/2000, que estabelece um investimento mínimo anual de 1% de seu lucro líquido, das companhias geradoras de eletricidade, em pesquisa e desenvolvimento no setor elétrico. Os procedimentos para os projetos são determinados pela Agência Nacional de Energia Elétrica (ANEEL).
        </Section>
      </div>
      <div style={{ display: "flex", flexDirection: "column"}}>
        <Section title="Participantes">
          <a className="link" href="http://www.furnas.com.br" target="_blank" rel="noreferrer">FURNAS Centrais Elétricas S.A.</a><br/>
          <a className="link" href="http://www.iie.com.br" target="_blank" rel="noreferrer">IIE - Instituto Internacional de Ecologia</a><br/>
          <a className="link" href="http://www.inpe.br" target="_blank" rel="noreferrer">INPE - Instituto Nacional de Pesquisas Espaciais</a><br/>
          <a className="link" href="http://www.ufjf.br" target="_blank" rel="noreferrer">UFJF - Universidade Federal de Juiz de Fora</a><br/>
          <a className="link" href="http://www.coppe.ufrj.br" target="_blank" rel="noreferrer">UFRJ/COPPE - Universidade Federal do Rio de Janeiro</a>
        </Section>

         <Section title="Dados Armazenados">
            Dados Armazenados
Os dados são formados por coletas realizadas em 79 campanhas com datas e localidades (reservatórios) distintos com o objetivo de coletar parâmetros na interface água-sedimento, coluna d’água e interface água-atmosfera. Mais detalhes sobre a base de dados podem ser encontrados em "descrição".
Cada instituição participante tinha como objetivo estudar uma componente, e por consequência fazer leituras de parâmetros relacionados:
IIE: estimativas de fluxos de gases de efeito estufa e das concentrações de carbono e nutrientes na interface água-sedimento;
INPE: fluxos de gases metano (CH4) e dióxido de carbono (CO2) na interface água-atmosfera;
UFJF: determinação da produção primária, metabolismo bacteriano e concentrações de nutrientes na coluna d’água;
UFRJ/COPPE: estimativa de fluxos de gases de efeito estufa na interface água-atmosfera e determinação do aporte e das taxas de sedimentação de carbono.
        </Section>
      </div>
      </div>

      {/* rodapé */}
      <div id="rodape" style={{ float: "left", clear: "both", width: "100%", height: 30, lineHeight: "30px", borderTop: "1px solid #777", marginTop: 25 }}>
        <div id="marca" style={{ float: "right", marginRight: 10, fontWeight: "bold", color: "#222", fontSize: 14 }}>
          © <span id="ano">{new Date().getFullYear()}</span>&nbsp;BALCAR
        </div>
      </div>
    </div>
  );
};

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div style={{ float: "left", width: 525, padding: 15, margin: "20px 0px 0px 40px", backgroundColor: "#F8F8FF" }}>
    <div style={{ fontWeight: "bold", color: "#333", marginBottom: 10 }}>{title}</div>
    <div style={{ color: "#222", textAlign: "justify", fontSize: 16 }}>{children}</div>
  </div>
);

const menuStyle: React.CSSProperties = {
  float: "right",
  height: 25,
  lineHeight: "25px",
  padding: "5px 7px 0px 7px",
  marginRight: 20,
  cursor: "pointer",
  color: "#0081d8",
  borderBottom: "2px solid #fff",
};

const menuActiveStyle: React.CSSProperties = {
  ...menuStyle,
  color: "#333",
  cursor: "default",
  borderBottom: "2px solid #333",
};

export default BalcarPage;
