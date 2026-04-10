import { useEffect, useState } from "react";
import { EquipeSection } from "./EquipeSection";
import { HomeSection } from "./HomeSection";
import {
  Footer,
  FooterInner,
  HeaderContainer,
  HeaderSeparator,
  HeaderText,
  HeaderWrapper,
  MenuContainer,
  MenuItem,
  PageContainer,
  Separator,
} from "./InstitutionalPage.styles";
import { PublicacoesSection } from "./PublicacoesSection";

function SimaInstitutionalPage() {
  const [page, setPage] = useState<"home" | "equipe" | "publicacoes">("home");

  useEffect(() => {
    const ano = document.getElementById("ano");
    if (ano) ano.textContent = new Date().getFullYear().toString();
  }, []);

  const openTutorial = () => {
    window.open("http://www.dsr.inpe.br/hidrosfera/sima/tutorialSIMA.pdf", "_blank");
  };

  const openMapa = () => {
    window.open("http://www.dsr.inpe.br/hidrosfera/sima/mapa.php", "_blank");
  };

  return (
    <PageContainer>
      <HeaderWrapper>
        <HeaderSeparator />
        <HeaderContainer>
          <HeaderText>Sistema Integrado de Monitoramento Ambiental</HeaderText>
        </HeaderContainer>
        <Separator />
        <MenuContainer>
          <MenuItem active={page === "home"} onClick={() => setPage("home")}>
            Home
          </MenuItem>
          <MenuItem active={page === "equipe"} onClick={() => setPage("equipe")}>
            Equipe
          </MenuItem>
          <MenuItem active={page === "publicacoes"} onClick={() => setPage("publicacoes")}>
            Publicações
          </MenuItem>
          <MenuItem onClick={openTutorial}>Tutorial SIMA</MenuItem>
          <MenuItem onClick={openMapa}>Mapa SIMA</MenuItem>
        </MenuContainer>
      </HeaderWrapper>

      {page === "home" && <HomeSection />}
      {page === "equipe" && <EquipeSection />}
      {page === "publicacoes" && <PublicacoesSection />}

      <Footer>
        <FooterInner>
          <div>
            © <span id="ano">2025</span> INPE – Instituto Nacional de Pesquisas Espaciais.
          </div>
          <div>
            <a href="#">Contato</a> | <a href="#">Política de Privacidade</a>
          </div>
        </FooterInner>
      </Footer>
    </PageContainer>
  );
}

export default SimaInstitutionalPage;
