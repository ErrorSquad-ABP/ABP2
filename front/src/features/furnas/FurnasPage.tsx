import { JSX, useState } from "react";
import { CampanhaTab, TabbedShell } from "../../shared/ui/campanha";
import { HomeSection } from "./sections/HomeSection";
import { MetodologiaSection } from "./sections/MetodologiaSection";
import { PanoramaSection } from "./sections/PanoramaSection";
import { ParticipantesSection } from "./sections/ParticipantesSection";
import { PesquisasSection } from "./sections/PesquisasSection";
import { PublicacoesSection } from "./sections/PublicacoesSection";
import { ResultadosSection } from "./sections/ResultadosSection";
import { UsinasSection } from "./sections/UsinasSection";

const TABS: CampanhaTab[] = [
  { id: "home", label: "Home" },
  { id: "panorama", label: "Panorama" },
  { id: "metodologia", label: "Metodologia" },
  { id: "banco", label: "Banco de Dados", externalUrl: "http://www.dpi.inpe.br/sima/" },
  { id: "resultados", label: "Resultados Esperados" },
  { id: "participantes", label: "Participantes" },
  { id: "usinas", label: "Usinas Hidrelétricas" },
  { id: "pesquisas", label: "Pesquisas Correlatas" },
  { id: "publicacoes", label: "Publicações" },
];

const SECTIONS: Record<string, () => JSX.Element> = {
  home: HomeSection,
  panorama: PanoramaSection,
  metodologia: MetodologiaSection,
  resultados: ResultadosSection,
  participantes: ParticipantesSection,
  usinas: UsinasSection,
  pesquisas: PesquisasSection,
  publicacoes: PublicacoesSection,
};

export default function FurnasPage(): JSX.Element {
  const [active, setActive] = useState("home");
  const ActiveSection = SECTIONS[active] ?? HomeSection;

  return (
    <TabbedShell
      title="Sistema Integrado de Monitoramento Ambiental"
      tabs={TABS}
      activeTab={active}
      onTabChange={setActive}
    >
      <ActiveSection />
    </TabbedShell>
  );
}
