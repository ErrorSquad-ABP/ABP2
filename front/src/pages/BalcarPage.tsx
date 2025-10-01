import React, { useEffect, useState } from "react";

const BalcarPage = () => {
  const [ano, setAno] = useState<number>(new Date().getFullYear());

  useEffect(() => {
    setAno(new Date().getFullYear());
  }, []);

  return (
    <div style={{ fontFamily: "Calibri, Times New Roman, Arial, sans-serif", fontSize: 14, backgroundColor: "#fff", width: 1150, margin: "5px auto" }}>
      {/* Header */}
      <div style={{ float: "left", height: 124, width: "100%", marginBottom: 10 }}>
        <div style={{ float: "left", width: "100%", height: 99 }}>
          <div style={{ float: "left", margin: "0px 0px 0px -5px", width: 678, height: 27, fontSize: 18, color: "#4682B4" }}>
            Dados de Campanha
          </div>
          <div style={{ float: "left", margin: "0px 0px 0px -5px", width: 678, height: 27, fontSize: 16, color: "#555" }}>
            Projeto Balanço de Carbono nos Reservatórios de FURNAS Centrais Elétricas S.A.
          </div>
        </div>

        <div style={{ float: "right", width: "90%", height: 25, lineHeight: "25px", marginTop: -35, fontSize: 18, borderTop: "1px solid #ccc" }}>
          <a href="login.php" style={menuStyle}>logar</a>
          <a href="publicacoes.php" style={menuStyle}>publicações</a>
          <a href="equipe.php" style={menuStyle}>equipe</a>
          <a href="descricao.php" style={menuStyle}>descrição</a>
          <div style={{ ...menuActiveStyle }}>home</div>
        </div>
      </div>

      {/* Content */}
      <div style={{ float: "left", width: "100%", marginTop: -10 }}></div>

      <div style={{ float: "left", clear: "both", width: "100%", marginTop: 30 }}>
        {/* Portal */}
        <Section title="Portal">
          Este portal constitui a interface de acesso aos dados do{" "}
          <a href="http://www.dsr.inpe.br/projetofurnas" target="_blank" rel="noreferrer">
            Projeto Balanço de Carbono nos Reservatórios de FURNAS Centrais Elétricas S.A.
          </a>
          . A base de dados é formada por coletas <i>in situ</i> de equipes que tinham como objetivo obter dados para:
          <ul>
            <li>determinar as emissões de gases de efeito estufa: gás carbônico, metano e óxido nitroso, dos reservatórios das hidrelétricas;</li>
            <li>identificar as rotas do ciclo do carbono nesses reservatórios e os fatores ambientais envolvidos;</li>
            <li>avaliar a influência dos fatores morfológicos, morfométricos, biogeoquímicos e operacionais dos reservatórios na emissão de gases de efeito estufa;</li>
            <li>determinar o padrão de emissão existente, anteriormente à construção de reservatórios;</li>
            <li>elaborar um modelo espacial e temporal de emissão de gases para reservatórios implantados em ambientes de cerrado.</li>
          </ul>
          A interface de acesso permite personalizar consultas aos dados para o download, 
          visualização em tabelas dinâmicas e visualizar a distribuição espacial dos dados em mapa interativo do Google Maps.
        </Section>

        {/* Participantes */}
        <Section title="Participantes">
          <a href="http://www.furnas.com.br" target="_blank" rel="noreferrer" style={linkStyle}>FURNAS Centrais Elétricas S.A.</a>
          <a href="http://www.iie.com.br" target="_blank" rel="noreferrer" style={linkStyle}>IIE - Instituto Internacional de Ecologia</a>
          <a href="http://www.inpe.br" target="_blank" rel="noreferrer" style={linkStyle}>INPE - Instituto Nacional de Pesquisas Espaciais</a>
          <a href="http://www.ufjf.br" target="_blank" rel="noreferrer" style={linkStyle}>UFJF - Universidade Federal de Juiz de Fora</a>
          <a href="http://www.coppe.ufrj.br" target="_blank" rel="noreferrer" style={linkStyle}>UFRJ/COPPE - Universidade Federal do Rio de Janeiro</a>
        </Section>

        {/* Dados Armazenados */}
        <Section title="Dados Armazenados">
          Os dados são formados por coletas realizadas em 79 campanhas com datas e localidades (reservatórios) distintos com o objetivo de coletar parâmetros na interface água-sedimento, coluna d’água e interface água-atmosfera.
          Mais detalhes sobre a base de dados podem ser encontrados em <a href="descricao.php">descrição</a>.<br />
          Cada instituição participante tinha como objetivo estudar uma componente, e por consequência fazer leituras de parâmetros relacionados:
          <ul>
            <li>IIE: estimativas de fluxos de gases de efeito estufa e das concentrações de carbono e nutrientes na interface água-sedimento;</li>
            <li>INPE: fluxos de gases metano (CH<sub>4</sub>) e dióxido de carbono (CO<sub>2</sub>) na interface água-atmosfera;</li>
            <li>UFJF: determinação da produção primária, metabolismo bacteriano e concentrações de nutrientes na coluna d’água;</li>
            <li>UFRJ/COPPE: estimativa de fluxos de gases de efeito estufa na interface água-atmosfera e determinação do aporte e das taxas de sedimentação de carbono.</li>
          </ul>
        </Section>

        {/* Fomento */}
        <Section title="Fomento">
          Os recursos utilizados para a coleta da base de dados foram fornecidos por FURNAS Centrais Elétricas S.A. no âmbito da lei 9.991/2000, 
          que estabelece um investimento mínimo anual de 1% de seu lucro líquido, das companhias geradoras de eletricidade, em pesquisa e desenvolvimento no setor elétrico.
          Os procedimentos para os projetos são determinados pela{" "}
          <a href="http://www.aneel.gov.br" target="_blank" rel="noreferrer">Agência Nacional de Energia Elétrica (ANEEL)</a>.
        </Section>
      </div>

      {/* Footer */}
      <div style={{ float: "left", clear: "both", width: "100%", height: 30, lineHeight: "30px", borderTop: "1px solid #777", marginTop: 25 }}>
        <div style={{ float: "right", marginRight: 10, fontWeight: "bold", color: "#222", fontSize: 14 }}>
          © <span>{ano}</span>&nbsp;BALCAR
        </div>
      </div>
    </div>
  );
};

// Section Component
interface SectionProps {
  title: string;
  children: React.ReactNode;
}
const Section: React.FC<SectionProps> = ({ title, children }) => (
  <div style={{ float: "left", width: 525, padding: 15, margin: "20px 0px 0px 40px", backgroundColor: "#F8F8FF" }}>
    <div style={{ fontWeight: "bold", color: "#333", marginBottom: 10 }}>{title}</div>
    <div style={{ color: "#222", textAlign: "justify", fontSize: 16 }}>{children}</div>
  </div>
);

// Styles
const menuStyle: React.CSSProperties = {
  float: "right",
  height: 25,
  lineHeight: "25px",
  padding: "5px 7px 0px 7px",
  marginRight: 20,
  cursor: "pointer",
  color: "#0081d8",
  borderBottom: "2px solid #fff",
  textDecoration: "none",
};

const menuActiveStyle: React.CSSProperties = {
  float: "right",
  height: 25,
  lineHeight: "25px",
  padding: "5px 7px 0px 7px",
  marginRight: 20,
  cursor: "default",
  color: "#333",
  borderBottom: "2px solid #333",
};

const linkStyle: React.CSSProperties = {
  display: "block",
  marginTop: 4,
  color: "#222",
  whiteSpace: "nowrap",
  textDecoration: "none",
};

export default BalcarPage;
