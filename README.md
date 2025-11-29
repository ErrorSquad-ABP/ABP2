# 🌎 Sistema de Visualização e Disseminação de Dados Limnológicos

<div align="center">

[![Site](https://img.shields.io/badge/🌐_Site-Offline-000000?style=for-the-badge)]()
[![Status](https://img.shields.io/badge/⚙️_Status-em_progresso-orange?style=for-the-badge)](#-sobre-o-projeto)
[![Sprint](https://img.shields.io/badge/📅_Sprint-3/3-green?style=for-the-badge)](#-sprint-3)
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

## História (US01) – Visualizar e Filtrar Todos os Dados

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


## História (US02) – Exibir Dados em Tabelas Ordenáveis

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


## História (US10) – Selecionar Tabelas por Categoria

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


## História (US12) – Acesso Detalhado a Bancos e Portais via Navegação

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


## História (US13) – Filtros Combinados em Múltiplas Colunas

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
🧭 Objetivo do Protótipo

O protótipo tem como finalidade demonstrar visualmente a interface do sistema que permitirá a consulta de horários, turmas, professores e a ocupação de ambientes da instituição. Além disso, visa oferecer uma visualização gráfica e interativa das salas, apoiar a exportação de relatórios e garantir uma experiência fluida tanto em dispositivos desktop quanto móveis.

### 📊 Interfaces Principais

<div align="center">
  <table>
    <tr>
      <th width="50%">pagina 1</th>
      <th width="50%">pagina 2</th>
    </tr>
    <tr>
      <td>
        <img src="https://github.com/ErrorSquad-ABP/ABP2/blob/main/SCRUM/assets/homepage_1.png" alt="Homepage com cards" width="100%">
        <p><strong>Homepage com cartões com tópicos de dados:</strong> Visualização principal dos dados por topico</p>
      </td>
      <td>
        <img src="https://github.com/ErrorSquad-ABP/ABP2/blob/main/SCRUM/assets/homepage_2.png" alt="Homepage com cards" width="100%">
        <p><strong>Homepage com cartões com tópicos de dados:</strong> Visualização principal dos dados por topico</p>
      </td>
    </tr>
    <tr>
      <td>
        <img src="https://github.com/ErrorSquad-ABP/ABP2/blob/main/SCRUM/assets/grafico_prototipo.png" alt="Mapa Interativo Desktop" width="100%">
        <p><strong>Gerador de grafico:</strong> pagina dentro do card para geração dos graficos</p>
      </td>
    </tr>
    <tr>
      <td>
        <img src="https://github.com/ErrorSquad-ABP/ABP2/blob/main/SCRUM/assets/mapa_prototipo.png" alt="Mapa Interativo" width="100%">
        <p><strong>Mapa Interativo:</strong> Visualização espacial dos ambientes acadêmicos</p>
      </td>
    </tr>
    <tr>
      <td>
        <img src="https://github.com/ErrorSquad-ABP/ABP2/blob/main/SCRUM/assets/HomePageSima.png" alt="Homepage Sima" width="100%">
        <p><strong>Homepage Sima:</strong>Página inicial do projeto Sima</p>
      </td>
    </tr>
    <tr>
      <td>
        <img src="https://github.com/ErrorSquad-ABP/ABP2/blob/main/SCRUM/assets/HomePageBalcar.png" alt="Homepage Balcar" width="100%">
        <p><strong>Homepage Balcar:</strong> Página inicial do projeto Balcar</p>
      </td>
    </tr>
    <tr>
      <td>
        <img src="https://github.com/ErrorSquad-ABP/ABP2/blob/main/SCRUM/assets/HomePageFurnas.png" alt="Homepage Furnas" width="100%">
        <p><strong>Homepage Furnas:</strong> Página inicial do projeto Furnas</p>
      </td>
    </tr>
  </table>
</div>

### 🗂️ Arquitetura de Navegação

O sistema é estruturado em páginas principais:
- **Home**: Página inicial com cards que armazenam as tabelas agrupadas em topicos
- **Consulta**: Pagina para seleção de tabela e de colunas que seram utilizadas para a criação do grafico
- **Mapa Interativo**: Visualização do mapa nacional e das coordenadas de coleta dos dados com poligonos
- **Projetos**: cada projeto(Sima, Balcar, Furnas) possui seu respectivo icone na topbar, que redirecionam a suas paginas com todas as informações dos projetos.

- 🎨 Design System
  - Tipografia: fontes sans-serif (Helvetica Neue / Arial) para leitura científica clara.  
  - Componentes: `styled-components` com ThemeProvider (cores, espaçamentos, sombras e bordas padrão).  
  - Interações: hover sutil, elevação (box-shadow) em cards, transições leves em botões.

#### Paleta de Cores

<div align="center">
  <table>
    <tr>
      <td style="background-color:#0B5394; color:white; text-align:center; padding:8px">Azul Escuro<br>#0B5394</td>
      <td style="background-color:#2563EB; color:white; text-align:center; padding:8px">Azul Primário<br>#2563EB</td>
      <td style="background-color:#DBEAFE; color:#0b2740; text-align:center; padding:8px">Fundo Claro Azul<br>#DBEAFE</td>
      <td style="background-color:#0B2740; color:white; text-align:center; padding:8px">Texto Escuro<br>#0B2740</td>
      <td style="background-color:#FFFFFF; color:black; text-align:center; padding:8px; border:1px solid #ccc">Branco<br>#FFFFFF</td>
    </tr>
  </table>
</div>

A paleta usa tons de azul para o topo e elementos de destaque, combinada com branco e azuis claros para fundos e contraste. Para séries no gráfico utilizamos uma pequena paleta complementar (ex.: #0b5394, #2563EB, #06B6D4, #F59E0B, #EF4444).

- 💡 Diferenciais de UX
  - **Seleção explícita de tabela** como passo obrigatório para evitar queries incorretas.  
  - **Gráfico protótipo SVG multissérie** que mostra pontos clicáveis/hover com tooltip (instituição + reservatório).  
  - **Mapa com polígonos dos estados do Brasil** e pontos de coleta escaláveis; controles de zoom e opção de mostrar nomes.   
  - **Layouts responsivos** com grid (2 colunas em desktop, 1 coluna em mobile) e cards maiores para facilitar leitura de dados.

</details>

<details>  
<summary><b>📋 Visão Geral dos Casos de Uso</b></summary>

Para melhor estruturação do projeto, modelamos o diagrama de casos de uso:

#### Diagrama de Casos de Uso

<p align="center">
  <a href="https://github.com/ErrorSquad-ABP/ABP2/tree/main/SCRUM/diagramas" target="_blank" style="
    text-decoration:none;
    background: linear-gradient(90deg, #004AAD, #0083FF);
    padding: 14px 28px;
    border-radius: 8px;
    color: white;
    font-weight: 600;
    font-size: 16px;
    font-family: Arial, sans-serif;
    box-shadow: 0px 3px 8px rgba(0,0,0,0.25);
    transition: 0.25s ease;
    display: inline-block;
  "
  onmouseover="this.style.transform='scale(1.05)'; this.style.boxShadow='0px 4px 12px rgba(0,0,0,0.35)';"
  onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='0px 3px 8px rgba(0,0,0,0.25)';">
    📊 Ver Diagramas do Projeto
  </a>
</p>


**Funcionalidades Principais**
- Pesquisador / Usuário — filtra, gera gráficos, visualiza mapa, exporta dados.  
- Sistema (backend) — fornece endpoints para metadados, agregados, mapas e exportação.

</details>

<details>  
<summary><b>📊 Modelo de Dados</b></summary>

- **Bancos envolvidos**
  - `bdfurnas-campanha` (Furnas)
  - `bdsima` (SIMA)
  - `bdbalcar-campanha` (Balcar)

- **Entidades principais**
  - `reservatorio` (id, nome, instituicao, geom/metadados)
  - `instituicao` (id, nome, contato)
  - `campanha`, `sitio`, `amostra`, `medicao` (aninhadas — campanhas → sitios → amostras → medicoes)
  - Tabelas por tópico (abioticos, bioticos, agua-sedimento, fluxos-gases, etc.)

- **Relacionamentos**
  - `instituicao` 1:N `reservatorio`
  - `campanha` 1:N `sitio` → 1:N `amostra` → 1:N `medicao`
  - Cada medição referencia `reservatorio` e `instituicao`

- **Características Técnicas**
  - Geometria: armazenada no Postgres (geom/lat/lon), usado para mapas e polígonos.  
  - Views/materialized views previstas para otimizar consultas de mapa e agregações.

</details>

<details>  
<summary><b>🚀 Funcionalidades Implementadas</b></summary>

- 💻 **Backend (Express + Node)**  
  Endpoints planejados / implementados (essenciais):
  - `GET /reservatorios`
  - `GET /instituicoes`
  - `GET /data/union` (integração / união de fontes)
  - `GET /tables/:table/columns` (metadados de colunas)
  - `GET /tables/:table/metadata` (intervalo de datas e responsáveis)
  - `GET /tables/:table/aggregate` (dados prontos para gráfico)
  - `GET /tables/:table/map` (dados geoespaciais / polígonos)
  - Outros endpoints de atalho: by-reservatorio / by-instituicao / dados/filtrados / dados/paginados / dados/mapa

- 🗃️ **Banco de Dados**
  - Conexões para 3 bancos (Furnas, SIMA, Balcar) via env vars.
  - Scripts de criação em `docker-compose` montados para popular dados de exemplo.

- 🖥️ **Frontend (React + Vite + styled-components)**  
  Implementações principais:
  - Topbar (MenuBar) com branding, ícone e espaço para 3 logos (SIMAS, FURNAS, BALCAR).
  - Home com cards por tópico e estilização moderna.
  - TablesPage: seleção de tabela, escolha de colunas, geração de gráfico SVG multissérie, mapa do Brasil por estados (polígonos JSON), export CSV/PDF.
  - MapBrazil component (consome `br_states.json`) com opção de zoom e toggle de nomes.

- 🧰 **Ferramentas & Infra**
  - Docker + docker-compose (Postgres + server + front).  
  - Hot-reload configurado para front com Vite e `CHOKIDAR_USEPOLLING` no container.  

</details>

<details>  
<summary><b>📉 Burndown Chart</b></summary>

- 🖼️ Gráfico de Burndown

<div align="center">
    <img src="https://github.com/ErrorSquad-ABP/ABP2/blob/main/SCRUM/burndown/Sprint%201/BurndownSprint1.png" alt="Burndown Chart da Sprint" width="80%">
</div>

- 📋 Observações rápidas  
  - Sprint 1 focou em protótipo visual e arquitetura de endpoints.  
  - Próximos passos: realizar alimentação correta do gerador de graficos, implementar mapa funcional
</details>

<details>  
<summary><b>🔍 Sprint Retrospective</b></summary>

- 🎯 O que funcionou bem
  - Protótipo visual (cards, TablesPage, MapBrazil) avançou rapidamente.  
  - Docker + bancos de testes configurados para reproduzir dados locais.  
  - Entendimento claro dos endpoints necessários para alimentar o frontend.

- ⚠️ Desafios enfrentados
  - Conflitos de merge em arquivos TS (marcadores `<<<<<<< >>>>>>>`) e issues de formatação (Prettier).  
  - Algumas rotas/endpoints ainda não implementadas ou em mismatch com o front.  
  - Adaptação ao novo modelo de ABP baseado em tasks por matéria.
  - Conflitos de padronização de commits e branches
  - erros frequentes de CI CD

- 🚀 Plano de melhorias (Sprint seguinte)
  - Finalizar os endpoints.  
  - Integração completa: frontend chamando endpoints reais e testes de integração.  
  - Melhorias UX: legendas, tooltips, zoom suave no mapa, e export mais robusto.
  - adição de novas funcionalidades.
  - geração de gráficos funcional.
  - visualização e interação de mapa funcional.

- 📈 Métricas alvo para Sprint 2
  - 100% dos endpoints core implementados e testados localmente.   
  - Integração frontend-backend com dados reais.
  - funcionalidades concluidas.

</details>
</details>

---

<details>
<summary><b>🔄 Sprint 2 – Aplicação do Protótipo na Prática</b></summary>
 📅 Período

- **Início:** 13/10/2025
- **Término:** 31/10/2025
- **Review:** 04/11/2025

### 🎯 Objetivos Principais

- Implementar gráficos interativos multissérie e conexões com endpoints de dados.
- Disponibilizar exportação CSV dos dados exibidos em tabelas.
- Melhorar visualização geográfica com mapa interativo e popups.
- Finalizar tabela paginada e ordenável para exibição estrutural dos dados.

<details>  
<summary>📌 Histórias Selecionadas para a Sprint 2</summary>

## História (US03) – Visualizar dados em forma de gráficos

**Como usuário,**  
Quero visualizar os dados em forma de gráficos,  
**Para** ter melhor entendimento e análise temporal dos parâmetros.

**Tarefas:**
- Implementar componente de gráfico multissérie (SVG) reutilizável.
- Ajustar fetch/transformação de dados para agregação correta (diária/mensal) conforme seleção.
- Garantir suporte a múltiplas colunas/séries e legenda dinâmica.
- Implementar tooltips com metadados (instituição / reservatório / timestamp).
- Adicionar testes básicos que validem a representação dos dados (valores, séries e eixos).

**Prioridade:** Alta  
**Sprint:** 2  
**Sprint points:** 5

**Critérios de Aceite:**
- Gráficos multissérie aparecem e atualizam conforme seleção de colunas e período.
- Tooltip mostra valor e metadados ao passar/hover sobre pontos.
- Legenda corresponde às séries exibidas.
- Escala e eixos mostram valores coerentes com os dados (sem agregações erradas).

---

## História (US04) – Exportar dados em CSV

**Como usuário,**  
Quero exportar dados em CSV,  
**Para** permitir análise externa em outras ferramentas.

**Tarefas:**
- Implementar botão/export action no frontend para gerar CSV da vista atual.
- Backend: garantir endpoint que suporte retorno paginado/filtrado e, se necessário, endpoint específico de export (streaming).
- Tratar cabeçalho, escaping, UTF-8 e delimitação correta no CSV gerado.
- Mensagem de aviso quando a exportação for muito grande (oferecer export por página).
- Testes para verificar integridade do CSV (cabeçalho, número de linhas, escaping).

**Prioridade:** Alta  
**Sprint:** 2  
**Sprint points:** 5

**Critérios de Aceite:**
- Usuário pode exportar os dados exibidos na tabela (página atual) em CSV.
- CSV tem cabeçalho correto e valores escapados/formatados.
- Export de todo o conjunto filtrado funciona com aviso/limitação quando dataset for muito grande.

---

## História (US05) – Mapa interativo para visualização geográfica

**Como usuário,**  
Quero visualizar dados em um mapa interativo,  
**Para** analisar a distribuição espacial e interagir com pontos de coleta.

**Tarefas:**
- Integrar MapBrazil (polígonos) e plotar pontos a partir de lat/lng das medições ou metadados de reservatórios.
- Implementar popups/tooltips ao hover/click com resumo da medição (data, parâmetro, valor, reservatório).
- Adicionar filtros que sincronizem mapa ↔ seleção (estações/reservatórios selecionados no fluxo).
- Garantir responsividade e performance para renderização com centenas de pontos.
- Testes de usabilidade para interações básicas (hover, click, zoom).

**Prioridade:** Baixa  
**Sprint:** 2  
**Sprint points:** 1

**Critérios de Aceite:**
- Mapa mostra pontos filtráveis e popups funcionais.
- Ao selecionar filtros na UI, mapa atualiza os pontos exibidos.
- Popup exibe informações chaves (data, reservatório, instituição, valor).

---

## História (US11) – Visualizar dados em tabelas (ordenável/paginado)

**Como usuário,**  
Quero visualizar dados em tabelas com colunas ordenáveis e paginação,  
**Para** facilitar análise tabular e navegação pelos registros.

**Tarefas:**
- Implementar componente de tabela com ordenação, paginação e seleção de colunas visíveis.
- Conectar a tabela aos endpoints com `page`, `pageSize`, `sort` e filtros (reservatório/estação/período).
- Mostrar contagem total de registros e permitir navegação entre páginas.
- Permitir exportar a vista atual (página) em CSV.
- Testes automatizados cobrindo ordenação e paginação.

**Prioridade:** Alta  
**Sprint:** 2  
**Sprint points:** 5

**Critérios de Aceite:**
- Tabela exibe registros com colunas configuráveis.
- Ordenação asc/desc por coluna funciona corretamente.
- Paginação com navegação e exibição de total funciona.
- Export da vista atual (página) gera CSV correto.

</details>

<details>  
<summary><b>📋 Requisitos da Sprint 2</b></summary>

**Requisitos Funcionais contemplados:**

- **RF03:** Renderização de gráficos multissérie a partir dos dados filtrados.  
- **RF04:** Exportação de dados em CSV da vista atual (tabela).  
- **RF05:** Filtragem e visualização no mapa interativo.  
- **RF06:** Tabela com ordenação e paginação integradas ao backend.

**Requisitos Não Funcionais contemplados:**

- **RNF04:** Respostas paginadas do backend para consultas grandes; export em streaming/por página.  
- **RNF05:** Interface com carregamento assíncrono e indicadores de progresso (skeletons / spinners).  
- **RNF06:** Manter compatibilidade com nomes de colunas heterogêneos (`dataHora` / `dataMedida`) via normalização no frontend.  
- **RP05 (restrição):** Uso continuado de containers Docker para front, back e banco.

</details>

<details>  
<summary><b>📝 Principais Funcionalidades</b></summary>

- Componente de gráfico multissérie com legendas e tooltips.  
- Botão de export (CSV) com opções: página atual / todos (com aviso).  
- Mapa interativo com pontos e popups; filtros sincronizados com seleção de estações/reservatórios.  
- Tabela reusável com ordenação, paginação, seleção de colunas e contagem total.  
- Validações de formulário (datas) e mensagens de erro amigáveis.

</details>

<details>  
<summary><b>✅ Critérios de Aceite Gerais da Sprint 2</b></summary>

- Gráficos são renderizados com os dados corretos da seleção.  
- Export CSV gera arquivo com cabeçalho correto e delimitadores válidos.  
- Mapa interativo mostra pontos filtráveis e popups com informações chave.  
- Tabela com ordenação/paginação funcionando; contagem total apresentada.  
- Endpoint principal responde adequadamente a `page`/`pageSize`/`sort`/`filters`.  
- Carregamento e UX apresentam indicadores (loading) em todas as operações assíncronas.

</details>


<details>  
<summary><b>📋 Diagrama de Classes</b></summary>

O diagrama de classes representa a estrutura principal do sistema de visualização e disseminação de dados limnológicos, descrevendo:

- **Classes responsáveis pela interface e manipulação de dados**
- **Classes de serviço para integração entre camadas**
- **Relacionamentos essenciais** entre objetos do sistema

### 🔄 Objetivos do Diagrama
- Garantir clareza arquitetural
- Facilitar futuras extensões do sistema
- Servir como base para decisões de implementação
- Reduzir ambiguidade entre backend ↔ frontend no desenvolvimento

---

<p align="center">
  <a href="https://github.com/ErrorSquad-ABP/ABP2/tree/main/SCRUM/diagramas" target="_blank" style="
    text-decoration:none;
    background: #1351B4;
    padding: 12px 26px;
    border-radius: 6px;
    color: white;
    font-weight: 700;
    font-size: 15px;
    font-family: Arial, sans-serif;
    letter-spacing: .5px;
    transition: 0.25s ease;
    display: inline-block;
  "
  onmouseover="this.style.background='#0A3D91';"
  onmouseout="this.style.background='#1351B4';">
    📁 Ver Diagramas de Classe
  </a>
</p>

</details>
<details>  
<summary><b>🚀 Funcionalidades Implementadas / Planejadas</b></summary>

**Planejado/Implementado nesta sprint:**
- Componente de gráfico multissérie (SVG) com tooltip e legenda.
- Backend: endpoints paginados/filtrados e endpoint de export (ou export via consulta paginada).
- Frontend: botão Exportar (CSV), tabela paginada com ordenação, mapa com pontos e popups.
- Normalização de nomes de colunas no frontend (`dataHora`/`dataMedida`) para que todos os fluxos funcionem.
- Validações de datas (data fim não menor que data início) e UI de loading.

**Infra & Ferramentas:**
- Docker compose para front / back / db.
- Lint (ESLint) e build pipeline (CI) com testes básicos.

</details>

<details>  
<summary><b>📉 Burndown Chart</b></summary>

<div align="center">
  <!-- placeholder image - substituir pelo gráfico real -->
  <img src="./SCRUM/burndown/Sprint%202/BurndownSprint2.png" alt="Burndown Sprint 2" width="80%">
</div>

</details>

<details>  
<summary><b>🔍 Sprint Retrospective (planejado)</b></summary>

- 🎯 O que esperamos que funcione bem:
  - Integração front ↔ back para tabelas, gráficos e export.
  - Fluxo passo-a-passo de seleção (estações/reservatórios → tabela → período → colunas) consistente.
  - UX com indicadores de loading e mensagens claras.

- ⚠️ Riscos / desafios:
  - Volume de dados grande (necessidade de paginação/export streaming).
  - Heterogeneidade de nomes de colunas entre fontes (`dataHora` vs `dataMedida`).
  - Tratamento de ids com espaços/formatos inconsistentes.

- 🚀 Ações de melhoria:
  - Consolidar contrato de API (nomenclatura de colunas, params de paginação).
  - Implementar testes de integração para endpoints principais.
  - Definir limites para exportação e UX para grandes dumps.

</details>
</details>

---
<details>
<summary><b>🔄 Sprint 3 – Refinamento e Entrega Final</b></summary>

### 📅 Período

- **Início:** 06/11/2025  
- **Término:** 24/11/2025  
- **Review:** 25/11/2025  

---

### 🎯 Objetivos Principais

- Implementar funcionalidades essenciais relacionadas à interação no mapa e visualização dos dados.
- Otimizar o desempenho do sistema e reduzir tempo de carregamento.
- Refinar e padronizar o design seguindo diretrizes visuais do INPE/gov.br.
- Desenvolver e integrar o recurso de exportação de gráficos em PDF.


<details>
<summary>📌 Histórias Selecionadas para a Sprint 3</summary>

## História (US06) – Interface intuitiva e padrão visual INPE/gov.br

**Como Product Owner,**  
Quero que a interface siga o padrão estético do INPE/gov.br e facilite a navegação,  
**Para** garantir uma aplicação visualmente consistente, acessível e amigável a usuários leigos.

**Tarefas:**
- Padronizar visualmente componentes UI (cores, espaçamentos, tipografia).
- Ajustar contraste e responsividade seguindo normas de acessibilidade.
- Reduzir carga cognitiva nas telas simplificando a hierarquia visual.
- Revisar a interface com stakeholders.

**Prioridade:** Baixa (2)

**Critérios de Aceite:**
- Interface consistente com padrão visual do INPE/gov.br.
- Navegação clara e intuitiva, especialmente para usuários não técnicos.
- Melhor apresentação visual dos dados exibidos.



## História (US07) – Interação com mapa e consultas por polígonos

**Como usuário,**  
Quero desenhar polígonos no mapa,  
**Para** consultar reservatórios e visualizar as estações filtradas.

**Tarefas:**
- Implementar ferramenta de desenho no mapa (Leaflet/Mapbox).
- Exibir localização das estações georreferenciadas.
- Consultar e retornar reservatórios dentro do polígono.
- Integrar com backend geoespacial (PostGIS).

**Prioridade:** Média (3)

**Critérios de Aceite:**
- Usuário consegue desenhar polígonos no mapa.
- Estações exibidas com suas localizações reais.
- Reservatórios encontrados no polígono exibidos corretamente.




## História (US08) – Otimização de desempenho

**Como usuário,**  
Quero que o site carregue rápido e tenha comportamento fluido,  
**Para** navegar sem travamentos ou lentidão.

**Tarefas:**
- Minificação e compressão de assets (Gzip/Brotli).
- Implementar cache controlável ao inserir novos dados.
- Otimização das consultas backend.
- Testes de performance (Lighthouse / WebVitals).

**Prioridade:** Média (3)

**Critérios de Aceite:**
- Cache resetável via ação administrativa.
- Redução perceptível no tempo de carregamento.
- Aplicação de boas práticas de performance documentadas.
- Resultados comprovados com benchmarks.



## História (US09) – Visualização segmentada por reservatório e estação

**Como usuário,**  
Quero visualizar dados filtrados por reservatórios e estações,  
**Para** realizar análises objetivas e direcionadas.

**Tarefas:**
- Criar filtros específicos por estação.
- Criar filtros por reservatório.
- Ajustar endpoints backend para consultas segmentadas.
- Adequar frontend para exibição segmentada.

**Prioridade:** Alta (5)

**Critérios de Aceite:**
- Exibição segmentada por estações.
- Exibição segmentada por reservatórios.
- Permite alternar entre filtros sem recarregar a página.



## História (US14) – Exportação de gráficos filtrados em PDF

**Como usuário,**  
Quero exportar os gráficos filtrados em PDF mantendo sua visualização customizada,  
**Para** gerar relatórios claros e fiéis.

**Tarefas:**
- Capturar visualizações (canvas/SVG) com estilo aplicado.
- Gerar PDF com layout fiel ao gráfico.
- Preservar filtros e legendas na exportação.
- Garantir consistência visual e legibilidade.

**Prioridade:** Média (3)

**Critérios de Aceite:**
- PDF apresenta exatamente o gráfico visualizado.
- Filtros aplicados preservados.
- Layout visual limpo, profissional e legível.

</details>

<details>
<summary><b>📋 Requisitos da Sprint 3</b></summary>

**Requisitos Funcionais contemplados:**
- **RF06:** Interface padrão INPE/gov.br.
- **RF07:** Ferramenta de desenho de polígonos no mapa.
- **RF08:** Visualização filtrada por reservatórios e estações.
- **RF14:** Exportação de gráficos filtrados em PDF.

**Requisitos Não Funcionais contemplados:**
- **RNF02:** Otimização de performance do site.
- **RNF03:** Testes mínimos baseados em métricas de performance (Lighthouse/WebVitals).
</details>


<details>
<summary><b>📝 Principais Funcionalidades</b></summary>

- Mapa interativo com ferramenta de desenho de polígonos.
- Exibição de estações e reservatórios diretamente no mapa.
- Visualização segmentada por estação e reservatório.
- Exportação de gráficos filtrados para PDF.
- Interface padronizada com diretrizes gov.br.
- Sistema com cache configurável e assets otimizados.
</details>


<details>
<summary><b>✅ Critérios de Aceite Gerais da Sprint 3</b></summary>

- Interface consistente com identidade visual governamental (INPE/gov.br).
- Interação no mapa funcional, com seleção por polígonos.
- Fluxo de visualização segmentada por reservatório/estação operante.
- Desempenho geral aprimorado e perceptível pelo usuário.
- PDF gerado com fidelidade visual ao gráfico exibido.
- Todos os recursos integrados entre frontend e backend.
</details>



<details>
<summary><b>📋 Diagrama de Sequência</b></summary>

O diagrama de sequência demonstra o fluxo de interação entre usuários, frontend e backend, representando:

- 📌 **Consulta de dados por estação**
- 📌 **Consulta de dados por reservatório**
- 📌 **Exportação de dados filtrados em PDF**
- 📌 **Interações com a API e validação de filtros**

### 🧠 O que o diagrama esclarece
- A ordem das chamadas de método
- O ciclo de requisição–resposta
- Como os filtros influenciam o fluxo da aplicação
- Como o frontend manipula os dados e renderiza nos gráficos

### ✨ Benefícios
- Auxilia no alinhamento entre desenvolvedores
- Evita ambiguidades no comportamento das features
- Facilita integração e testes
- Conecta o design técnico aos requisitos funcionais

---

<p align="center">
  <a href="https://github.com/ErrorSquad-ABP/ABP2/tree/main/SCRUM/diagramas" target="_blank" style="
    text-decoration:none;
    background: #1351B4;
    padding: 12px 26px;
    border-radius: 6px;
    color: white;
    font-weight: 700;
    font-size: 15px;
    font-family: Arial, sans-serif;
    letter-spacing: .5px;
    transition: 0.25s ease;
    display: inline-block;
  "
  onmouseover="this.style.background='#0A3D91';"
  onmouseout="this.style.background='#1351B4';">
    📁 Ver Diagramas de Sequência
  </a>
</p>

</details>

<details>
<summary><b>🚀 Funcionalidades Implementadas</b></summary>

### 💻 Visão Geral
- Conclusão de consultas segmentadas por reservatório e estação.
- Ferramenta de desenho e seleção no mapa.
- Exportação de gráficos para PDF com fidelidade visual.
- Padronização visual gov.br.
- Otimizações de performance.

### 🔍 Detalhamento das Implementações

**Backend**
- Endpoints filtrados por polígono.
- Cache resetável ao inserir novos dados.
- Pipeline de exportação PDF server-side.

**Banco de Dados**
- Índices geoespaciais.
- Views dedicadas para análise e agregação.

**Frontend**
- Componentização de filtros.
- Tooling geográfico (Leaflet/Mapbox).
- Captura de gráfico (canvas/SVG) para exportação.

**Arquitetura e Ferramentas**
- React + Leaflet/Mapbox.
- Node/Express + PostgreSQL/PostGIS.
- Build otimizado com Vite, minificação e gzip.

</details>

<details>  
<summary><b>📉 Burndown Chart</b></summary>

<div align="center">
  <!-- placeholder image - substituir pelo gráfico real -->
  <img src="SCRUM/burndown/Sprint 3/BurndownSprint3.jpg" alt="Burndown Sprint 3" width="80%">
</div>

</details>

<details>
<summary><b>🔍 Sprint Retrospective</b></summary>

### Visão Geral
- Sprint técnica com foco em mapa, exportação e otimização.

### O que funcionou bem
- Fluxos de visualização claros no mapa e dados segmentados.
- Ferramenta de desenho estável.
- Melhoria perceptível no carregamento.

### Desafios
- Integração de PDF para múltiplos tipos de gráficos.
- Ajustes de acessibilidade com padrões gov.br.

### Plano de melhorias
- Refinar contraste e acessibilidade.
- Modularizar filtros.
- Políticas reativas de cache.

### Métricas para Sprint 4
- TTFP médio (Time to First Paint).
- Latência média de consultas no dashboard.
- Taxa de uso da exportação PDF.

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
