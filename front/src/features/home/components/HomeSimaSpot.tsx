import type { HomeCategory } from "../homeCategories";
import {
  SimaCard,
  SimaCardCTA,
  SimaCardDesc,
  SimaCardLink,
  SimaCardTitle,
  SimaIconWrapper,
  TopSpot,
} from "../HomePage.styles";

type HomeSimaSpotProps = {
  sima: HomeCategory;
};

export function HomeSimaSpot({ sima }: HomeSimaSpotProps) {
  return (
    <TopSpot>
      <SimaCardLink to={sima.href} aria-label="Abrir dados SIMA">
        <SimaCard tabIndex={0} aria-label="Abrir dados SIMA">
          <SimaIconWrapper>
            <img src={sima.icon} alt="Ícone do SIMA" />
          </SimaIconWrapper>
          <SimaCardTitle>{sima.title}</SimaCardTitle>
          <SimaCardDesc>{sima.description}</SimaCardDesc>
          <SimaCardCTA>Abrir →</SimaCardCTA>
        </SimaCard>
      </SimaCardLink>
    </TopSpot>
  );
}
