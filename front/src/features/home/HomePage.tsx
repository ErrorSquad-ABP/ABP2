import { JSX } from "react";
import { HOME_CATEGORIES } from "./homeCategories";
import { Content, Page } from "./HomePage.styles";
import { HomeCategoryGrid } from "./components/HomeCategoryGrid";
import { HomeFooter } from "./components/HomeFooter";
import { HomeHero } from "./components/HomeHero";
import { HomeScrollToTop } from "./components/HomeScrollToTop";
import { HomeSimaSpot } from "./components/HomeSimaSpot";

export default function HomePage(): JSX.Element {
  const otherCategories = HOME_CATEGORIES.filter((c) => c.id !== "sima");
  const sima = HOME_CATEGORIES.find((c) => c.id === "sima")!;

  return (
    <Page>
      <HomeHero />
      <Content>
        <HomeSimaSpot sima={sima} />
        <HomeCategoryGrid categories={otherCategories} />
      </Content>
      <HomeFooter />
      <HomeScrollToTop />
    </Page>
  );
}
