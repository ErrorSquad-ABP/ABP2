import icon1 from "@/assets/icons/icon1.png";
import icon2 from "@/assets/icons/icon2.png";
import icon3 from "@/assets/icons/icon3.png";
import icon4 from "@/assets/icons/icon4.png";
import icon5 from "@/assets/icons/icon5.png";
import icon6 from "@/assets/icons/icon6.png";
import icon7 from "@/assets/icons/icon7.png";
import icon8 from "@/assets/icons/icon8.png";
import icon9 from "@/assets/icons/icon9.png";
import icon10 from "@/assets/icons/icon10.png";

export type HomeCategory = {
  id: string;
  title: string;
  description: string;
  icon: string;
  href: string;
};

export const HOME_CATEGORIES: HomeCategory[] = [
  {
    id: "sima",
    title: "SIMA — Monitoramento",
    description: "Dados automaticamente coletados pelo SIMA (séries temporais).",
    icon: icon1,
    href: "/tables/sima",
  },
  {
    id: "abioticos",
    title: "Abióticos",
    description: "Parâmetros físico-químicos da coluna d'água e superfície.",
    icon: icon2,
    href: "/tables/abioticos",
  },
  {
    id: "bioticos",
    title: "Bióticos",
    description: "Parâmetros biológicos amostrados em campanhas.",
    icon: icon3,
    href: "/tables/bioticos",
  },
  {
    id: "aguasedimento",
    title: "Água & Sedimento",
    description: "Medições e análises de água e sedimento.",
    icon: icon4,
    href: "/tables/agua-sedimento",
  },
  {
    id: "fluxos",
    title: "Fluxos & Gases",
    description: "Medições de fluxos, bolhas e concentrações gasosas.",
    icon: icon5,
    href: "/tables/fluxos-gases",
  },
  {
    id: "campomedidas",
    title: "Campo Medidas",
    description: "Medições realizadas em campo (equipamentos, anotações).",
    icon: icon6,
    href: "/tables/campo-medidas",
  },
  {
    id: "fisicochimicos",
    title: "Parâmetros Físico-Químicos",
    description: "Variáveis físico-químicas da água (pH, condutividade, etc.).",
    icon: icon7,
    href: "/tables/fisico-quimicos",
  },
  {
    id: "biologicos",
    title: "Parâmetros Biológicos",
    description: "Parâmetros biológicos e de comunidades aquáticas.",
    icon: icon8,
    href: "/tables/parametros-biologicos",
  },
  {
    id: "loccamp",
    title: "Localizações & Campanhas",
    description: "Sítios, campanhas e reservatórios (metadados).",
    icon: icon9,
    href: "/tables/localizacoes-campanhas",
  },
  {
    id: "equip",
    title: "Equipamentos",
    description: "Cadastro e histórico de equipamentos e sensores (SIMA).",
    icon: icon10,
    href: "/tables/equipamentos",
  },
];
