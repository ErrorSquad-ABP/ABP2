# ADR 003 — Frente 3 (front-end): módulo genérico de tabelas

## Contexto

A rota `/tables/:slug` (dados limnológicos genéricos, mapa e polígonos) vivia inteira em `pages/tables/TablesPage.tsx` (~1,6k linhas), fora do padrão da Frente 2 em que a implementação vive em `features/` e `pages/` só reexporta.

## Decisões

1. **Implementação em `features/tables/`** — o componente principal `TablesPage` passa a residir em `front/src/features/tables/TablesPage.tsx`; `front/src/pages/tables/TablesPage.tsx` mantém-se como entrada fina (`export { default } from ...`).
2. **Estilos em `pages/tables/`** — `TablesPage.styles.tsx` permanece ao lado da “página” de roteamento, no mesmo espírito de `pages/sima/SimaTablesPage.styles.tsx`, até eventual co-localização ou `shared/ui` se fizer sentido.
3. **`useTablesPage` + UI fatiada** — estado e efeitos em `hooks/useTablesPage.ts`; `TablesWizard` (coluna esquerda) e `TablesWorkspace` (gráfico/mapa) em `components/`; `TablesPage.tsx` no feature só compõe `Page` / `Container` (espelhando SIMA).
4. **TanStack Query** — `useTablesMetadataQuery` (por `topicSlug`), `useTablesReservatoriosQuery`, `useTablesCampanhaQuery`; fetches HTTP partilhados em `api/tablesPageClient.ts` com chaves estáveis para cache e `fetchQuery` quando o fluxo precisa de dados antes do hook hidratar.
5. **Modelo puro** — `resolveApiTableName`, `getProviderForApi`, geometria de polígono (`computeReservatoriosInsidePolygon`), projeção do overlay (`mapDrawingProjection`) e extração de datas de campanha (`campanhaDates`) em `model/`, sem JSX.

## Consequências

- Novas alterações em fluxo `/tables/:slug` devem ir preferencialmente a `features/tables/`.
- Imports de estilos a partir do feature usam caminho explícito para `pages/tables/TablesPage.styles`.
- Próximas melhorias opcionais: subdividir `TablesWorkspace` (mapa vs gráfico), exportações CSV/JSON/PDF, e testes de integração do cliente HTTP.
