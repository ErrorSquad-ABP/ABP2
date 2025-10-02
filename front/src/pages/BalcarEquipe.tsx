import React, { useEffect } from "react";
import balcar from "../assets/BALCAR.png";
import cepel from "../assets/logoCepel.png";
import coppe from "../assets/logoCoppe.png";
import lie from "../assets/logoIie.png";
import ufjf from "../assets/logoUfjf.png";
import inpe from "../assets/logoInpe.png";

const BalcarEquipe = () => {
  useEffect(() => {
    const anoEl = document.getElementById("ano");
    if (anoEl) {
      anoEl.innerHTML = new Date().getFullYear().toString();
    }
  }, []);

  return (
    <div lang="pt-br" style={{ fontFamily: "Calibri, 'Times New Roman', Arial, sans-serif", fontSize: "14px", backgroundColor: "#F9FAFB", width: "100%", margin: "5px auto" }}>
        <div style={{width: "1150px", margin: "0 auto"}}>
        {/* Cabeçalho */}
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
                  <span style={menuActiveStyle}>equipe</span>
                  <a href="descricao.php" style={menuStyle}>descrição</a>
                  <a href="" style={menuStyle}>home</a>
                </div>
              </div>

        {/* Logos */}
        <div style={{ float: "left", width: "100%", marginTop: "-10px" }}>
          <a href="http://www.inpe.br" target="_blank" rel="noreferrer" title="Instituto Nacional de Pesquisas Espaciais">
            <img src={inpe} alt="Instituto Nacional de Pesquisas Espaciais" style={{ float: "right", marginLeft: "30px", width: "62px", height: "52px" }} />
          </a>
          <a href="http://www.iie.com.br/" target="_blank" rel="noreferrer" title="Instituto Internacional de Ecologia">
            <img src={lie} alt="Instituto Internacional de Ecologia" style={{ float: "right", marginLeft: "30px", width: "108px", height: "40px", marginTop: "9px" }} />
          </a>
          <a href="http://www.ufjf.br/" target="_blank" rel="noreferrer" title="Universidade Federal de Juiz de Fora">
            <img src={ufjf} alt="Universidade Federal de Juiz de Fora" style={{ float: "right", marginLeft: "30px", width: "75px", height: "55px" }} />
          </a>
          <a href="http://www.coppe.ufrj.br/" target="_blank" rel="noreferrer" title="Instituto Alberto Luiz Coimbra de Pós-Graduação e Pesquisa de Engenharia">
            <img src={coppe} alt="COPPE/UFRJ" style={{ float: "right", marginLeft: "30px", width: "98px", height: "50px", marginTop: "2px" }} />
          </a>
          <a href="http://www.furnas.com.br" target="_blank" rel="noreferrer" title="Furnas Centrais Elétricas">
            <img src={cepel} alt="Furnas Centrais Elétricas" style={{ float: "right", width: "115px", height: "51px", marginTop: "2px" }} />
          </a>
        </div>

        {/* Equipe */}
        <div style={{ float: "left", clear: "both", width: "100%", marginTop: "30px" }}>
          {/* Coluna 1 */}
          <div style={{ float: "left", width: "350px" }}>
            <div style={{ float: "left", clear: "both", width: "100%", padding: "10px", backgroundColor: "#F8F8FF", marginLeft: "0px" }}>
              <div style={{ fontWeight: "bold", color: "#333", marginBottom: "7px" }}>Coordenação Geral</div>
              <div><a href="http://lattes.cnpq.br/5535667070825818" target="_blank" rel="noreferrer" style={{ float: "left", height: "20px", lineHeight: "20px", color: "#333", textDecoration: "none" }}>André Carlos Prates Cimbleris</a></div>
            </div>
            <div style={{ float: "left", clear: "both", width: "100%", padding: "10px", backgroundColor: "#F8F8FF", marginTop: "20px" }}>
              <div style={{ fontWeight: "bold", color: "#333", marginBottom: "7px" }}>Coordenação por Instituição</div>
              <div><a href="http://lattes.cnpq.br/4775535537651746" target="_blank" rel="noreferrer" style={{ float: "left", height: "20px", lineHeight: "20px", color: "#333", textDecoration: "none" }}>IIE: Donato Seiji Abe</a></div>
              <div><a href="http://lattes.cnpq.br/2691497637313274" target="_blank" rel="noreferrer" style={{ float: "left", height: "20px", lineHeight: "20px", color: "#333", textDecoration: "none" }}>INPE: José Luiz Stech</a></div>
              <div><a href="http://lattes.cnpq.br/0567809153346429" target="_blank" rel="noreferrer" style={{ float: "left", height: "20px", lineHeight: "20px", color: "#333", textDecoration: "none" }}>UFJF: Fábio Roland</a></div>
              <div><a href="http://lattes.cnpq.br/4155308755013168" target="_blank" rel="noreferrer" style={{ float: "left", height: "20px", lineHeight: "20px", color: "#333", textDecoration: "none" }}>UFRJ/COPPE: Marco Aurélio dos Santos</a></div>
            </div>
          </div>

          {/* Coluna 2 */}
          <div style={{ float: "left", width: "350px", marginLeft: "40px" }}>
            <div style={{ float: "left", clear: "both", width: "100%", padding: "10px", backgroundColor: "#F8F8FF" }}>
              <div style={{ fontWeight: "bold", color: "#333", marginBottom: "7px" }}>Responsáveis pelas Coletas e Análises</div>
              {[
                ["http://lattes.cnpq.br/8150880476098677", "Arcilan Trevenzoli Assireu (INPE)"],
                ["http://lattes.cnpq.br/5987354282647527", "Bohdan Matvienko Sikar (UFRJ/COPPE)"],
                ["http://lattes.cnpq.br/7663009286545108", "Corina Verónica Sidagis Galli (IIE)"],
                ["http://lattes.cnpq.br/1002426943626438", "Ednaldo Oliveira dos Santos (UFRJ/COPPE)"],
                ["http://lattes.cnpq.br/2838003403761263", "Elizabeth Matvienko Sikar (UFRJ/COPPE)"],
                ["http://lattes.cnpq.br/7510713692919710", "Felipe Siqueira Pacheco (UFJF)"],
                ["http://lattes.cnpq.br/1341263338653176", "Ivan Bergier Tavares de Lima (INPE)"],
                ["http://lattes.cnpq.br/7301878639558446", "Luciano Marani (INPE)"],
                ["http://lattes.cnpq.br/7511312374795216", "Nathan Oliveira Barros (UFJF)"],
                ["http://lattes.cnpq.br/0578519055132957", "Plínio Carlos Alvalá (INPE)"],
              ].map(([href, nome]) => (
                <div key={href}><a href={href} target="_blank" rel="noreferrer" style={{ float: "left", height: "20px", lineHeight: "20px", color: "#333", textDecoration: "none" }}>{nome}</a></div>
              ))}
            </div>
          </div>

          {/* Coluna 3 */}
          <div style={{ float: "left", width: "350px", marginLeft: "40px" }}>
            <div style={{ float: "left", clear: "both", width: "100%", padding: "10px", backgroundColor: "#F8F8FF" }}>
              <div style={{ fontWeight: "bold", color: "#333", marginBottom: "7px" }}>Gerente de Rede do Portal</div>
              <div style={{ float: "left", height: "20px", lineHeight: "20px", color: "#333" }}>João Benedito Diehl</div>
            </div>
            <div style={{ float: "left", clear: "both", width: "100%", padding: "10px", backgroundColor: "#F8F8FF", marginTop: "20px" }}>
              <div style={{ fontWeight: "bold", color: "#333", marginBottom: "7px" }}>Web e Banco de Dados</div>
              <div><a href="http://lattes.cnpq.br/3013376353724630" target="_blank" rel="noreferrer" style={{ float: "left", height: "20px", lineHeight: "20px", color: "#333", textDecoration: "none" }}>Arley Ferreira de Souza (arley@dpi.inpe.br)</a></div>
            </div>
          </div>
        </div>

        {/* Rodapé */}
        <div style={{ float: "left", clear: "both", width: "100%", height: "30px", lineHeight: "30px", borderTop: "1px solid #777", marginTop: "25px" }}>
          <div style={{ float: "right", marginRight: "10px", fontWeight: "bold", color: "#222", fontSize: "14px" }}>© <span id="ano">2025</span>&nbsp;BALCAR</div>
        </div>
        </div>
      </div>
  );
};

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

export default BalcarEquipe;
