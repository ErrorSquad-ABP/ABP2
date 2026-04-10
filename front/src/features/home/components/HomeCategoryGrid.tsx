import type { HomeCategory } from "../homeCategories";
import { Card, CardCTA, CardDesc, CardLink, CardTitle, Cards, Icon } from "../HomePage.styles";

type HomeCategoryGridProps = {
  categories: HomeCategory[];
};

export function HomeCategoryGrid({ categories }: HomeCategoryGridProps) {
  return (
    <Cards role="list">
      {categories.map((c) => (
        <CardLink key={c.id} to={c.href} aria-label={`Abrir categoria ${c.title}`}>
          <Card tabIndex={0}>
            <Icon aria-hidden>
              <img
                src={c.icon}
                alt={c.title}
                style={{ width: "48px", height: "48px", objectFit: "contain" }}
              />
            </Icon>
            <CardTitle>{c.title}</CardTitle>
            <CardDesc>{c.description}</CardDesc>
            <CardCTA>Abrir →</CardCTA>
          </Card>
        </CardLink>
      ))}
    </Cards>
  );
}
