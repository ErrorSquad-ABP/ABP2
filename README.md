# 🌎 Sistema de Visualização e Disseminação de Dados Limnológicos

<div align="center">

[![Site](https://img.shields.io/badge/🌐_Site-Offline-000000?style=for-the-badge)]()
[![Status](https://img.shields.io/badge/⚙️_Status-em_progresso-orange?style=for-the-badge)](#-sobre-o-projeto)
[![Sprint](https://img.shields.io/badge/📅_Sprint-1/3-orange?style=for-the-badge)](#-sprint-3)
[![Docs](https://img.shields.io/badge/📚_Docs-Wiki-4a90e2?style=for-the-badge)](#documentação)

</div>

---

<details>
  <summary><b>📋 Sobre o Projeto </b></summary>

<summary><b>ℹ️ Informações do Projeto</b></summary>

| Categoria      | Detalhes                                                              |
| -------------- | --------------------------------------------------------------------- |
| 📍 Instituição | FATEC Jacareí                                                         |
| 📚 Curso       | DSM - 2º Semestre 2025                                                |
| 🔄 Metodologia | Aprendizagem Baseada em Projetos (ABP)                                |
| 👤 Focal Point | Prof. André Olimpio                                                   |
| 📧 Contato     | [andre.olimpio@fatec.sp.gov.br](mailto:andre.olimpio@fatec.sp.gov.br) |
| 📅 Início      | 16/09/2025                                                            |
| 📊 Status      | Em desenvolvimento                                                    |

---

## 🚀 Tema do Semestre

Desenvolver um sistema web para consulta e visualização de dados e gráficos limnológicos do INPE, organizando e otimizando a busca e utilização dos dados já existentes.

---

## 🔍 Desafio

atualmente, os dados limnologicos do INPE se encontravam desorganizados, poluidos e sem quaisquer maneira de facil visualização e consulta grafica. O sistema proposto visa resolver esse problema, permitindo consultas por topicos, e seleção de parametros e periodos para geração de graficos.

---

## 📈 Diagramas UML

Para melhor estruturação do projeto, modelamos os principais diagramas da Uml antes de partir para a fase de implementação. São eles:

#### Diagrama de Casos de Uso

![Casos de Uso](./SCRUM/diagramas/DIAGRAMA_CASOS_DE_USO.png)


</details>

<details>
<summary><b>🔄 Sprint 1 – Planejamento inicial, Infraestrutura e Preparação</b></summary>

### 📅 Período

- **Início:** 16/09/2025
- **Término:** 06/10/2025
- **Review:** 07/10/2025

### 🎯 Objetivos Principais

- Implementar as funcionalidades básicas do sistema
- Desenvolver a interface com base nos protótipos
- Integrar frontend com backend

<details>  
<summary>📌 Histórias Selecionadas para a Sprint 1</summary>

## História (Item 1) – Visualizar e Filtrar Todos os Dados

**Como usuário,**  
Quero poder visualizar todos os dados armazenados,  
**Para** filtrá-los de acordo com minhas necessidades.

**Tarefas:**
- Criar endpoint no backend para listar todos os dados (com suporte a query params de filtro).
- Mapear/descritar as tabelas e colunas disponíveis (endpoint de schema).
- Implementar componente de listagem no frontend para exibição bruta legível.
- Implementar controles de filtragem no frontend (instituição, reservatório, período e filtros livres).
- Validar filtragem com dataset de teste e criar testes automatizados básicos.

**Prioridade:** Média (3)

**Critérios de Aceite:**
- Exibição de todos os dados do banco de forma bruta, legível.
- Sistema de filtragem de dados funcional (filtros aplicáveis retornam resultados corretos).


## História (Item 2) – Exibir Dados em Tabelas Ordenáveis

**Como usuário,**  
Quero ordenar e visualizar os dados em forma de tabelas,  
**Para** melhorar a organização e usabilidade.

**Tarefas:**
- Criar componente de tabela reusável no frontend (React) com colunas configuráveis.
- Implementar funcionalidade de ordenação por coluna (asc/desc) e paginação.
- Permitir seleção/exibição das colunas (mostrar/ocultar) mantendo legibilidade.
- Integrar a tabela com a API de dados filtrados/ordenados.
- Garantir responsividade e acessibilidade; realizar testes de usabilidade.

**Prioridade:** Alta (5)

**Critérios de Aceite:**
- Exibição de todas as colunas das tabelas de forma legível.
- Colunas são selecionáveis (mostrar/ocultar) e ordenáveis.


## História (Item 10) – Selecionar Tabelas por Categoria

**Como usuário,**  
Quero selecionar diferentes tabelas dentro de cada categoria de dados,  
**Para** realizar análises específicas por tabela.

**Tarefas:**
- No card de cada categoria, implementar controle (dropdown/list) para escolher a tabela associada.
- Ao escolher uma tabela, exibir o esquema/colunas da tabela (nomes das colunas, sem dados).
- Implementar frontend para marcar filtros obrigatórios e validar seleção antes da consulta.
- Criar endpoints no backend para retornar lista de tabelas por categoria e esquema de cada tabela.
- Testar fluxo de seleção e validação de filtros.

**Prioridade:** Alta (5)

**Critérios de Aceite:**
- Interface permite escolher tabela dentro do card de categoria.
- Todas as colunas da tabela são exibidas (nomes, sem dados).
- É possível definir e exigir seleção de filtros obrigatórios antes da execução da consulta.


## História (Item 12) – Acesso Detalhado a Bancos e Portais via Navegação

**Como usuário,**  
Quero acessar informações de cada banco de dados e portais em páginas detalhadas, através de botões na barra de navegação,  
**Para** consultar detalhes dos projetos/portais de forma rápida.

**Tarefas:**
- Adicionar botões/links na barra de navegação para cada banco/portal relevante.
- Criar páginas detalhadas para projetos/portais (layout limpo com campos chave e metadados).
- Implementar roteamento no frontend e endpoints backend para dados detalhados.
- Garantir design limpo, responsivo e compatível com dispositivos móveis.
- Testar navegação e carregamento das páginas detalhadas.

**Prioridade:** Alta (5)

**Critérios de Aceite:**
- Botões na barra de navegação levam para páginas detalhadas dos projetos/portais.
- Interface limpa e responsiva nas páginas detalhadas.


## História (Item 13) – Filtros Combinados em Múltiplas Colunas

**Como usuário,**  
Quero aplicar filtros combinados em múltiplas colunas,  
**Para** realizar análises mais específicas (ex.: reservatório + data + coluna específica).

**Tarefas:**
- Projetar e implementar UI de filtros combinados (múltiplos campos, operadores e lógica AND/OR).
- Implementar suporte no backend para receber e aplicar filtros compostos de forma eficiente.
- Implementar atualização dinâmica da visualização (fetch assíncrono, debounce) sem reload de página.
- Garantir performance das queries e criar testes de integração para combinações de filtros.
- Validar resultados com casos de uso reais e dataset de teste.

**Prioridade:** Alta (5)

**Critérios de Aceite:**
- Suporte a filtros combinados (ex.: reservatório + data + coluna específica).
- Atualização dinâmica da visualização sem recarregar a página.


</details>

<details>  
<summary><b>📋 Requisitos da Sprint 1</b></summary>

**Requisitos Funcionais contemplados:**

- **RF01:** Permitir aos usuários visualizar todos os parâmetros armazenados, filtrando por instituição, reservatório e período de tempo.
- **RF02:** Consultar e visualizar os dados no formato de tabelas.

**Requisitos Não Funcionais contemplados:**

- **RNF01:** A usabilidade será um requisito crítico, exigindo uma interface intuitiva, clara e de fácil navegação.
- **RNF02:** A aplicação deve apresentar desempenho otimizado, garantindo carregamento rápido dos dados.
- **RNF03:** A interface deve seguir os padrões institucionais do INPE e a identidade visual definida pelo cliente.
- **RP04 (restrição de projeto):** A aplicação deve utilizar containers independentes para o banco de dados, o back-end e o front-end.

---

</details>

<details>  
<summary><b>📝 Principais Funcionalidades</b></summary>

- Exibição inicial dos dados limnológicos em formato bruto.
- Filtros para refinar os dados por **instituição**, **reservatório** e **período de tempo**.
- Tabelas interativas com ordenação por colunas principais (parâmetro, valor, data, instituição).
- Banco de dados PostgreSQL configurado e integrado ao backend em Node.js.
- Backend e frontend em containers separados, orquestrados junto ao banco via Docker Compose.

</details>

<details>  
<summary><b>✅ Critérios de Aceite Gerais da Sprint 1</b></summary>

- Os dados limnológicos devem ser carregados do banco e exibidos corretamente no frontend.
- Os filtros devem retornar os resultados corretos de acordo com as seleções do usuário.
- A ordenação em tabelas deve ser funcional, intuitiva e responsiva.
- O banco PostgreSQL deve estar configurado em container, acessível pelo backend sem erros.
- O backend deve expor endpoints funcionando para o frontend consumir.
- Os três containers (front, back e banco) devem subir sem falhas e se comunicar corretamente.
- Interface deve atender requisitos de usabilidade mínimos definidos no projeto.

</details>

<details>
<summary><b>🎨 Design do Site</b></summary>

## 🧭 Objetivo do Protótipo
Criar um front-end responsivo e moderno para o **Repositório de Dados Limnológicos** que permita explorar conjuntos de dados por tópico, selecionar tabelas, filtrar por período / responsável / colunas e gerar visualizações (gráficos e mapa). O protótipo prioriza fluxo direto para gerar gráficos a partir de seleções do usuário, com exportação (CSV/PDF) e uma visualização geoespacial do Brasil (polígonos de estados).

---

## 📊 Interfaces Principais
1. **Home (tópicos em cards)**  
   - Grade de cards (3 por linha em desktop).  
   - Cada card abre `/tables/:slug` relativo ao tópico (ex.: `abioticos`, `bioticos`).
2. **TablesPage (/tables/:slug)**  
   - Painel esquerdo: controles — data início/fim, seleção de tabela (obrigatória), dropdown de responsável, lista de colunas (checkboxes).  
   - Painel direito: topo com botões `Gerar Gráfico`, `Exportar ▾` (CSV/PDF) e `Ver mapa`.  
   - Área principal: **único gráfico multi-série** que plota as colunas selecionadas.  
   - Alternativa de visualização: **mapa do Brasil** com polígonos de estados como pano de fundo e marcadores/polígonos dos pontos de coleta.
3. **SimaPage / outras páginas institucionais**  
   - Páginas específicas (SIMA, FURNAS, BALCAR) acessíveis pelos logos na topbar.
4. **Topbar (MenuBar)**  
   - Logo e título alinhados à esquerda (BDLimnologico).  
   - Grupo de 3 logos à direita prontos para linkar SIMAS / FURNAS / BALCAR.  
   - Mobile: botão hambúrguer com menu.

---

## 🗂️ Arquitetura de Navegação
- `/` → Home (cards de tópico)
- `/tables/:slug` → Page de seleção / visualização / mapa (principal fluxo de análise)
- `/sima`, `/furnas`, `/balcar` → páginas institucionais (placeholders para logos)
- Rotas internas auxiliares: `/sima/*`, `/tables/:slug/*` para modais e subviews

**Fluxo de interação (resumido):**
1. Usuário clica no card do tópico.
2. Em `/tables/:slug` seleciona Tabela (obrigatório) + período + responsável + colunas.
3. Clica `Gerar Gráfico` → front tenta `GET /tables/:table/aggregate` (fallback para mock).
4. Visualiza gráfico; pode alternar para mapa (`Ver mapa`) que carrega polígonos do Brasil e plota coletas.
5. Exportar via CSV ou PDF.

---

## 🎨 Design System (resumo prático)
**Paleta principal**
- `--color-primary` : `#2563EB` (azul vibrante)
- `--color-primary-dark` : `#063A80` (azul profundo)
- `--color-accent` : `#06B6D4` (teal/ciano)
- `--color-bg-top` : gradient `#f3f7fb → #eef6ff`
- `--color-card-bg` : `#ffffff`
- `--color-text-muted` : `#475569`
- `--color-text-default` : `#0b2740`
- `--color-inverse-text` : `#ffffff`

**Tipografia**
- Família: `Helvetica Neue, Arial, sans-serif`
- Hierarquia: h1 32px, h2 22–26px, base 14–15px
- Peso: regular 400, semibold 600–700 para labels/CTAs

**Espaçamento & layout**
- spacing tokens: `4, 8, 12, 16, 24, 32, 40`
- container max-width: `1200–1400px`
- border-radius: `8–16px` (cards maiores: 16px)
- sombras: suave (ex.: `0 12px 36px rgba(9,30,66,0.06)`)

**Componentes reutilizáveis**
- `Button (primary / secondary)` — pequeno, com micro-anim.
- `Select`, `Input`, `Checkbox` — estado focado acessível.
- `Card` — elevação suave; hover eleva e aumenta sombra.
- `MapBrazil` — componente que aceita `polygons` e `points`.
- `MultiSeriesSVG` — gráfico SVG responsivo protótipo.

---

## 💡 Diferenciais de UX
- **Seleção obrigatória de tabela** claramente indicada no painel, para reduzir erros de geração de gráfico.  
- **Foco em seleção**: colunas aparecem como checkboxes com labels fortes e microdescrições.  
- **Fallbacks inteligentes**: ao não encontrar dados no backend, o protótipo gera séries mock para permitir teste de UI.  
- **Export simples**: CSV ou PDF a partir do conteúdo do painel com preview.  
- **Mapa contextual**: polígonos do Brasil em fundo estilizado (sem rótulos) para destacar coletas, mantendo privacidade/legibilidade.  
- **Acessibilidade básica**: cores com contraste adequado para CTAs; inputs e botões com `:focus` visíveis.  
- **Mobile-first**: grade de cards reflow para 1 coluna; controles empilham verticalmente no mobile; mobile menu com links rápidos.

---

## 🧭 Integração rápida com API (resumo)
Endpoints principais usados no front:
- `GET /tables/:table/columns` → metadados colunas
- `GET /tables/:table/metadata` → intervalo de datas e responsáveis
- `GET /tables/:table/aggregate?start=YYYY-MM-DD&end=YYYY-MM-DD&cols=a,b,c&responsavel=X` → dados agregados/serie temporal
- `GET /tables/:table/map?start=...` → pontos/geojson para mapa
- `POST /export` → gerar CSV / PDF (server-side opcional)

**Exemplo de chamada (frontend)**
``ts
const params = new URLSearchParams({ start, end, cols: selectedColumns.join(","), responsavel });
const res = await fetch(`${API_BASE}/tables/${encodeURIComponent(table)}/aggregate?${params.toString()}`);
const data = await res.json();

</details>

<details>  
<summary><b>📋 Visão Geral dos Casos de Uso</b></summary>

- 📝 Principais Funcionalidades
- 👥 Atores do Sistema

</details>

<details>  
<summary><b>📊 Modelo de Dados</b></summary>

- Diagrama ER
- 📝 Principais Classes e Relacionamentos
- 🔄 Relacionamentos Principais
- Características Técnicas
- 💡 Características do Sistema

</details>

<details>  
<summary><b>🚀 Funcionalidades Implementadas</b></summary>

- 💻 Visão Geral das Implementações
- 🔍 Detalhes das Implementações
  - Backend
  - Banco de Dados
  - Frontend
  - Arquitetura e Ferramentas

</details>

<details>  
<summary><b>📉 Burndown Chart</b></summary>

- 🖼️ Gráfico de Burndown

<div align="center">
    <img src="https://github.com/ErrorSquad-ABP/ABP2/blob/main/SCRUM/burndown/Sprint%201/Sprint1Burndown.jpeg" alt="Burndown Chart da Sprint" width="80%">
</div>

- 📋 Análise do Desempenho

</details>

<details>  
<summary><b>🔍 Sprint Retrospective</b></summary>

- 🎯 Visão Geral da Retrospectiva
- ✅ O que funcionou bem
- ⚠️ Desafios enfrentados
- 🚀 Plano de melhorias
  - Processo e comunicação
  - Gestão de tarefas
  - Planejamento e execução
- 📈 Métricas para Sprint 2

</details>

</details>

---

<details>
<summary><b>🔄 Sprint 2 – Aplicação do Protótipo na Prática</b></summary>

### 📅 Período

- **Início:** 16/09/2025
- **Término:** 06/10/2025
- **Review:** 07/10/2025

### 🎯 Objetivos Principais

- Implementar as funcionalidades básicas do sistema
- Desenvolver a interface com base nos protótipos
- Integrar frontend com backend

<details>  
<summary>📌 Histórias Selecionadas para a Sprint 1</summary>

## História –

**Como usuário,**

**Para**

**Tarefas:**

-
-
-
-
- **Prioridade:**

  **Critérios de Aceite:**

-
- ***

## História –

**Como usuário,**

**Para**

**Tarefas:**

-
-
-
-
- **Prioridade:**

  **Critérios de Aceite:**

-
- ***

## História –

**Como usuário,**

**Para**

**Tarefas:**

-
-
-
-
- **Prioridade:**

  **Critérios de Aceite:**

-
- ***

## História –

**Como usuário,**

**Para**

**Tarefas:**

-
-
-
-
- **Prioridade:**

  **Critérios de Aceite:**

-
- ***

</details>

<details>  
<summary><b>📋 Requisitos da Sprint 1</b></summary>

**Requisitos Funcionais contemplados:**

-
- **Requisitos Não Funcionais contemplados:**
-
-
-
- ***

</details>

<details>  
<summary><b>📝 Principais Funcionalidades</b></summary>

-
-
-
-
-

</details>

<details>  
<summary><b>✅ Critérios de Aceite Gerais da Sprint 1</b></summary>

-
-
-
-
-
-
- </details>

<details>  
<summary><b>🎨 Design do Site</b></summary>

- 🧭 Objetivo do Protótipo
- 📊 Interfaces Principais
- 🗂️ Arquitetura de Navegação
- 🎨 Design System
  - Paleta de Cores
- 💡 Diferenciais de UX

</details>

<details>  
<summary><b>📋 Visão Geral dos Casos de Uso</b></summary>

- 📝 Principais Funcionalidades
- 👥 Atores do Sistema

</details>

<details>  
<summary><b>📊 Modelo de Dados</b></summary>

- Diagrama ER
- 📝 Principais Classes e Relacionamentos
- 🔄 Relacionamentos Principais
- Características Técnicas
- 💡 Características do Sistema

</details>

<details>  
<summary><b>🚀 Funcionalidades Implementadas</b></summary>

- 💻 Visão Geral das Implementações
- 🔍 Detalhes das Implementações
  - Backend
  - Banco de Dados
  - Frontend
  - Arquitetura e Ferramentas

</details>

<details>  
<summary><b>📉 Burndown Chart</b></summary>

- 🖼️ Gráfico de Burndown
- 📋 Análise do Desempenho

</details>

<details>  
<summary><b>🔍 Sprint Retrospective</b></summary>

- 🎯 Visão Geral da Retrospectiva
- ✅ O que funcionou bem
- ⚠️ Desafios enfrentados
- 🚀 Plano de melhorias
  - Processo e comunicação
  - Gestão de tarefas
  - Planejamento e execução
- 📈 Métricas para Sprint 2

</details>

</details>

---

<details>
<summary><b>🔄 Sprint 3 – Refinamento e Entrega Final</b></summary>

### 📅 Período

- **Início:** 16/09/2025
- **Término:** 06/10/2025
- **Review:** 07/10/2025

### 🎯 Objetivos Principais

- Implementar as funcionalidades básicas do sistema
- Desenvolver a interface com base nos protótipos
- Integrar frontend com backend

<details>  
<summary>📌 Histórias Selecionadas para a Sprint 1</summary>

## História –

**Como usuário,**

**Para**

**Tarefas:**

-
-
-
-
- **Prioridade:**

  **Critérios de Aceite:**

-
- ***

## História –

**Como usuário,**

**Para**

**Tarefas:**

-
-
-
-
- **Prioridade:**

  **Critérios de Aceite:**

-
- ***

## História –

**Como usuário,**

**Para**

**Tarefas:**

-
-
-
-
- **Prioridade:**

  **Critérios de Aceite:**

-
- ***

## História –

**Como usuário,**

**Para**

**Tarefas:**

-
-
-
-
- **Prioridade:**

  **Critérios de Aceite:**

-
- ***

</details>

<details>  
<summary><b>📋 Requisitos da Sprint 1</b></summary>

**Requisitos Funcionais contemplados:**

-
- **Requisitos Não Funcionais contemplados:**
-
-
-
- ***

</details>

<details>  
<summary><b>📝 Principais Funcionalidades</b></summary>

-
-
-
-
-

</details>

<details>  
<summary><b>✅ Critérios de Aceite Gerais da Sprint 1</b></summary>

-
-
-
-
-
-
- </details>

<details>  
<summary><b>🎨 Design do Site</b></summary>

- 🧭 Objetivo do Protótipo
- 📊 Interfaces Principais
- 🗂️ Arquitetura de Navegação
- 🎨 Design System
  - Paleta de Cores
- 💡 Diferenciais de UX

</details>

<details>  
<summary><b>📋 Visão Geral dos Casos de Uso</b></summary>

- 📝 Principais Funcionalidades
- 👥 Atores do Sistema

</details>

<details>  
<summary><b>📊 Modelo de Dados</b></summary>

- Diagrama ER
- 📝 Principais Classes e Relacionamentos
- 🔄 Relacionamentos Principais
- Características Técnicas
- 💡 Características do Sistema

</details>

<details>  
<summary><b>🚀 Funcionalidades Implementadas</b></summary>

- 💻 Visão Geral das Implementações
- 🔍 Detalhes das Implementações
  - Backend
  - Banco de Dados
  - Frontend
  - Arquitetura e Ferramentas

</details>

<details>  
<summary><b>📉 Burndown Chart</b></summary>

- 🖼️ Gráfico de Burndown
- 📋 Análise do Desempenho

</details>

<details>  
<summary><b>🔍 Sprint Retrospective</b></summary>

- 🎯 Visão Geral da Retrospectiva
- ✅ O que funcionou bem
- ⚠️ Desafios enfrentados
- 🚀 Plano de melhorias
  - Processo e comunicação
  - Gestão de tarefas
  - Planejamento e execução
- 📈 Métricas para Sprint 2

</details>

</details>

---

## 👥 Nossa Equipe

<div align="center">
    <table>
        <tr>
            <td align="center"><b>Gestão</b></td>
            <td align="center"><b>Desenvolvimento</b></td>
        </tr>
        <tr>
            <td align="center">
                <table>
                    <tr>
                        <td align="center">
                            <b>Caio Araujo</b><br>
                            <i>Product Owner</i><br>
                            <a href="https://github.com/Caiuuutecnologico">
                                <img src="https://img.shields.io/badge/GitHub-333?style=flat-square&logo=github"/>
                            </a>
                            <a href="https://www.linkedin.com/in/caio-arauj/">
                                <img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=flat-square&logo=linkedin&logoColor=white"/>
                            </a>
                        </td>
                    </tr>
                    <tr>
                        <td align="center">
                            <b>Felipe Ferreira Pacheco</b><br>
                            <i>Scrum Master</i><br>
                            <a href="https://github.com/FelipePacheco30">
                                <img src="https://img.shields.io/badge/GitHub-333?style=flat-square&logo=github"/>
                            </a>
                            <a href="https://www.linkedin.com/in/felipe-ferreira-pacheco-621443347/">
                                <img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=flat-square&logo=linkedin&logoColor=white"/>
                            </a>
                        </td>
                    </tr>
                </table>
            </td>
            <td align="center">
                <table>
                    <tr>
                        <td align="center">
                            <b>Tiago Jardel Costa</b><br>
                            <a href="https://github.com/Tiago199516">
                                <img src="https://img.shields.io/badge/GitHub-333?style=flat-square&logo=github"/>
                            </a>
                            <a href="https://www.linkedin.com/in/tiago-jardel-da-costa-0b595bba/">
                                <img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=flat-square&logo=linkedin&logoColor=white"/>
                            </a>
                        </td>
                        <td align="center">
                            <b>Aline</b><br>
                            <a href="https://github.com/TIALICIA">
                                <img src="https://img.shields.io/badge/GitHub-333?style=flat-square&logo=github"/>
                            </a>
                            <a href="#">
                                <img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=flat-square&logo=linkedin&logoColor=white"/>
                            </a>
                        </td>
                    </tr>
                    <tr>
                        <td align="center">
                            <b>Carlos Eduardo Espirito Santo</b><br>
                            <a href="https://github.com/PromptdComando">
                                <img src="https://img.shields.io/badge/GitHub-333?style=flat-square&logo=github"/>
                            </a>
                            <a href="https://www.linkedin.com/in/carlos-eduardo-espirito-santo/">
                                <img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=flat-square&logo=linkedin&logoColor=white"/>
                            </a>
                        </td>
                        <td align="center">
                            <b>Arthur Facchinetti Peixoto</b><br>
                            <a href="https://github.com/ArthurFacchinetti">
                                <img src="https://img.shields.io/badge/GitHub-333?style=flat-square&logo=github"/>
                            </a>
                            <a href="https://www.linkedin.com/in/arthur-facchinetti-669a6a2a7/">
                                <img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=flat-square&logo=linkedin&logoColor=white"/>
                            </a>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</div>

## 👨‍🏫 Coordenação e Orientação

<div align="center">
    <table>
        <tr>
            <td align="center"><b>Professor</b></td>
        </tr>
        <tr>
            <td align="center">
                <table>
                    <tr>
                        <td align="center">
                            <b>Prof. André Olimpio</b><br>
                            <i>Focal Point</i><br>
                            <a href="https://github.com/marcelosudo">
                                <img src="https://img.shields.io/badge/GitHub-333?style=flat-square&logo=github"/>
                            </a>
                            <a href="https://www.linkedin.com/in/marcelo-sudo/">
                                <img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=flat-square&logo=linkedin&logoColor=white"/>
                            </a>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</div>

## 📜 Licença

<div align="center">
    <a href="https://github.com/ErrorSquad-ABP/ABP2-Documentacao/blob/main/LICENSE">
        <img src="https://img.shields.io/badge/📄_Licença-MIT-4a90e2?style=for-the-badge"/>
    </a>
</div>

<div align="center">
    <img src="https://capsule-render.vercel.app/api?type=waving&color=4a90e2&height=100&section=footer" width="100%"/>
</div>
