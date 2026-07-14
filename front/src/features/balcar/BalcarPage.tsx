import { JSX, useState } from "react";
import { CampanhaTab, HeaderText, TabbedShell } from "@/shared/ui/campanha";
import { Footer } from "./ui/balcarContent";
import { DescricaoSection } from "./sections/DescricaoSection";
import { EquipeSection } from "./sections/EquipeSection";
import { HomeSection } from "./sections/HomeSection";
import { PublicacoesSection } from "./sections/PublicacoesSection";

const TABS: CampanhaTab[] = [
  { id: "home", label: "Home" },
  { id: "equipe", label: "Equipe" },
  { id: "publicacoes", label: "Publicações" },
  { id: "descricao", label: "Descricao" },
];

const SECTIONS: Record<string, () => JSX.Element> = {
  home: HomeSection,
  equipe: EquipeSection,
  publicacoes: PublicacoesSection,
  descricao: DescricaoSection,
};

export default function BalcarPage(): JSX.Element {
  const [active, setActive] = useState("home");
  const ActiveSection = SECTIONS[active] ?? HomeSection;

  return (
    <TabbedShell
      titleContent={
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            textAlign: "right",
            gap: "10px",
            color: "white",
          }}
        >
          <HeaderText>Dados da Campanha</HeaderText>
          Projeto Balanço de Carbono nos Reservatórios de FURNAS Centrais Elétricas S.A.
        </div>
      }
      tabs={TABS}
      activeTab={active}
      onTabChange={setActive}
    >
      <ActiveSection />
      <Footer>© {new Date().getFullYear()}&nbsp;BALCAR</Footer>
    </TabbedShell>
  );
}
