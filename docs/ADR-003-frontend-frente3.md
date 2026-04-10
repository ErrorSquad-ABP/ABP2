# ADR 003 — Frente 3 (front-end): módulo genérico de tabelas

## Contexto

A rota `/tables/:slug` (dados limnológicos genéricos, mapa e polígonos) vivia inteira em `pages/tables/TablesPage.tsx` (~1,6k linhas), fora do padrão da Frente 2 em que a implementação vive em `features/` e `pages/` só reexporta.

## Decisões

1. **Implementação em `features/tables/`** — o componente principal `TablesPage` passa a residir em `front/src/features/tables/TablesPage.tsx`; `front/src/pages/tables/TablesPage.tsx` mantém-se como entrada fina (`export { default } from ...`).
2. **Estilos em `pages/tables/`** — `TablesPage.styles.tsx` permanece ao lado da “página” de roteamento, no mesmo espírito de `pages/sima/SimaTablesPage.styles.tsx`, até eventual co-localização ou `shared/ui` se fizer sentido.
3. **Próximas fatias (não obrigatórias neste ADR)** — extrair hooks (`useTablesPage`), TanStack Query onde houver fetch repetido, e subcomponentes (mapa, wizard, tabela) para reduzir o ficheiro monolítico sem mudar comportamento.

## Consequências

- Novas alterações em fluxo `/tables/:slug` devem ir preferencialmente a `features/tables/`.
- Imports de estilos a partir do feature usam caminho explícito para `pages/tables/TablesPage.styles`.
