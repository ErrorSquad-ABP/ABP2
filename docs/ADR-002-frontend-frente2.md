# ADR 002 — Frente 2 (front-end): direção inicial

## Contexto

O front passa a ser organizado por `features/` e `shared/`, com estado de servidor padronizado via TanStack Query e rotas SIMA consolidadas sob o prefixo `/sima`.

## Decisões

1. **TanStack Query** — `QueryClient` criado em `createAppQueryClient()` com `staleTime` padrão e retry limitado; provedor em `AppProviders` envolvendo a árvore (junto ao tema existente).
2. **Rotas SIMA** — `/sima` é a raiz do módulo: índice = listagem de registros (`SimaRecordsListPage`); `/sima/institucional` = conteúdo institucional (`SimaInstitutionalPage`). `/simas` redireciona para `/sima/institucional` para compatibilidade.
3. **HashRouter** — mantido nesta fase (deploy e histórico atuais); migração para `BrowserRouter` fica como decisão posterior com alinhamento de hosting.
4. **Home** — primeira fatia de componentização pura: dados em `features/home/homeCategories.ts`, estilos em `HomePage.styles.tsx`, UI em `components/` sem alterar aparência ou fluxos.

## Consequências

- Novos fluxos de dados devem preferir `useQuery` / `useMutation` em vez de efeitos ad hoc.
- Links internos devem usar `/sima` e `/sima/institucional` em vez de `/simas`.
