# 🌎 Sistema de Visualização e Disseminação de Dados Limnológicos 


<div align="center">

[![Site](https://img.shields.io/badge/🌐_Site-Online-000000?style=for-the-badge)]()
[![Status](https://img.shields.io/badge/⚙️_Status-A_ser_feito-orange?style=for-the-badge)](#-sobre-o-projeto)
[![Sprint](https://img.shields.io/badge/📅_Sprint-1/3-orange?style=for-the-badge)](#-sprint-3)
[![Docs](https://img.shields.io/badge/📚_Docs-Wiki-4a90e2?style=for-the-badge)](#documentação)

</div>


---
<details>
  <summary><b>📋 Sobre o Projeto </b></summary>

<summary><b>ℹ️ Informações do Projeto</b></summary> 

| Categoria      | Detalhes                                                            |
| -------------- | ------------------------------------------------------------------- |
| 📍 Instituição | FATEC Jacareí                                                       |
| 📚 Curso       | DSM - 2º Semestre 2025                                              |
| 🔄 Metodologia | Aprendizagem Baseada em Projetos (ABP)                              |
| 👤 Focal Point | Prof. André Olimpio                                         |
| 📧 Contato     | [andre.olimpio@fatec.sp.gov.br](mailto:andre.olimpio@fatec.sp.gov.br) |
| 📅 Início      | 16/09/2025                                                          |
| 📊 Status      | Em desenvolvimento                                                  |

---

## 🚀 Tema do Semestre  

Desenvolver um sistema web para consulta e visualização de dados e gráficos limnológicos do INPE, organizando e otimizando a busca e utilização dos dados já existentes.

---

## 🔍 Desafio  

Atualmente, os dados limnologicos do INPE se encontravam desorganizados, poluidos e sem quaisquer maneira de facil visualização e consulta grafica. O sistema proposto visa resolver esse problema, permitindo consultas por topicos, e seleção de parametros e periodos para geração de graficos.

---

## 📈 Diagramas UML

Para melhor estruturação do projeto, modelamos os principais diagramas da Uml antes de partir para a fase de implementação. São eles:

#### Diagrama de Casos de Uso

![Casos de Uso](./readme-assets/UseCases.png)

### Estrutura de pastas

``` bash
app/
├── balcar-campanha/
│   ├── csv/
│   │   ├── tbcampanha.csv
│   │   ├── tbfluxoinpe.csv
│   │   ├── tbinstituicao.csv
│   │   ├── tbreservatorio.csv
│   │   ├── tbsitio.csv
│   │   └── tbtabelacampo.csv
│   ├── balcar-campanha-modelo.xml
│   ├── copy-table.sql
│   └── create-table.sql
│
├── furnas-campanha/
│   ├── csv/
│   │   ├── tbabioticocoluna.csv
│   │   ├── tbabioticosuperficie.csv
│   │   ├── tbaguamateriaorganicasedimento.csv
│   │   ├── tbbioticocoluna.csv
│   │   ├── tbbioticosuperficie.csv
│   │   ├── tbbolhas.csv
│   │   ├── tbcamarasolo.csv
│   │   ├── tbcampanha.csv
│   │   ├── tbcampanhaportabela.csv
│   │   ├── tbcampoportabela.csv
│   │   ├── tbcarbono.csv
│   │   ├── tbconcentracaogasagua.csv
│   │   ├── tbconcentracaogassedimento.csv
│   │   ├── tbdadosprecipitacao.csv
│   │   ├── tbdadosrepresa.csv
│   │   ├── tbdifusao.csv
│   │   ├── tbdupladessorcaoagua.csv
│   │   ├── tbfluxobolhasinpe.csv
│   │   ├── tbfluxocarbono.csv
│   │   ├── tbfluxodifusivo.csv
│   │   ├── tbfluxodifusivoinpe.csv
│   │   ├── tbgasesembolhas.csv
│   │   ├── tbhoriba.csv
│   │   ├── tbinstituicao.csv
│   │   ├── tbionsnaaguaintersticialdosedimento.csv
│   │   ├── tbmedidacampocoluna.csv
│   │   ├── tbmedidacamposuperficie.csv
│   │   ├── tbnutrientessedimento.csv
│   │   ├── tbparametrosbiologicosfisicosagua.csv
│   │   ├── tbpfq.csv
│   │   ├── tbreservatorio.csv
│   │   ├── tbsitio.csv
│   │   ├── tbtabela.csv
│   │   ├── tbtc.csv
│   │   └── tbvariaveisfisicasquimicasdaagua.csv
│   ├── furnas-campanha-modelo.xml
│   ├── copy-table.sql
│   └── create-table.sql
│
├── sima/
│   ├── csv/
│   │   ├── tbcampotabela.csv
│   │   ├── tbestacao.csv
│   │   ├── tbsensor.csv
│   │   ├── tbsima.csv
│   │   └── tbsimaoffline.csv
│   ├── sima-modelo.xml
│   ├── copy-table.sql
│   └── create-table.sql
│
├── server/
│   ├── src/
│   │   ├── configs/
│   │   │   ├── corsConfig.ts
│   │   │   ├── db.ts
│   │   │   └── logger.ts
│   │   ├── controllers/
│   │   │   ├── balcar/
│   │   │   │   └── fluxoinpe.controller.ts
│   │   │   ├── furnas/
│   │   │   │   ├── abioticocoluna.controller.ts
│   │   │   │   ├── campanha.controller.ts
│   │   │   │   ├── instituicao.controller.ts
│   │   │   │   ├── reservatorio.controller.ts
│   │   │   │   └── sitio.controller.ts
│   │   │   └── sima/
│   │   │       ├── sima.controller.ts
│   │   │       └── simaoffline.controller.ts
│   │   ├── middlewares/
│   │   │   └── errorHandler.ts
│   │   ├── routes/
│   │   │   ├── balcar/
│   │   │   │   └── fluxoinpe.routes.ts
│   │   │   ├── furnas/
│   │   │   │   ├── abioticocoluna.routes.ts
│   │   │   │   ├── campanha.routes.ts
│   │   │   │   ├── instituicao.routes.ts
│   │   │   │   ├── reservatorio.routes.ts
│   │   │   │   └── sitio.routes.ts
│   │   │   └── sima/
│   │   │       ├── sima.routes.ts
│   │   │       └── simaoffline.routes.ts
│   │   └── index.ts
│   ├── .env
│   ├── Dockerfile
│   ├── package.json
│   ├── package-lock.json
│   ├── tsconfig.json
│   ├── tsconfig.eslint.json
│   ├── eslint.config.mjs
│   ├── .prettierrc
│   └── .prettierignore
│
├── front/
│   ├── src/
│   │   ├── api/
│   │   │   └── simaApi.ts
│   │   ├── assets/
│   │   │   └── react.svg
│   │   ├── components/
│   │   │   ├── BarraBrasil.tsx
│   │   │   ├── MenuBar.tsx
│   │   │   └── SimaTable.tsx
│   │   ├── hooks/
│   │   │   └── useSima.ts
│   │   ├── pages/
│   │   │   └── SimaPage.tsx
│   │   ├── styles/
│   │   │   ├── GlobalStyle.ts
│   │   │   ├── styled.d.ts
│   │   │   └── theme.ts
│   │   ├── types/
│   │   │   └── sima.ts
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── vite-env.d.ts
│   ├── public/
│   │   └── favicon.ico
│   ├── Dockerfile
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── tsconfig.app.json
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   ├── vite.config.ts
│   ├── .prettierrc
│   └── .prettierignore
│
├── .github/
│   └── workflows/
│       └── ci.yml
├── .gitignore
├── LICENSE
├── README.md
└── docker-compose.dev.yml

```

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


## História 1 – Visualizar e Filtrar Dados Limnológicos
**Como usuário,**  
Quero visualizar todos os parâmetros limnológicos armazenados,  
**Para** filtrá-los por instituição, reservatório e período de tempo.

**Tarefas:**
- Criar endpoint no backend para listar dados com filtros aplicados.  
- Conectar ao banco PostgreSQL para consulta dos parâmetros.  
- Implementar filtros no frontend (instituição, reservatório, período).  
- Criar componente de listagem bruta dos dados.  
- Validar filtragem com dataset de teste.  

**Prioridade:** Média  

**Critérios de Aceite:**
- Dados exibidos de forma bruta mas legível.  
- Filtros funcionando corretamente (instituição, reservatório e período).  

---

## História 2 – Exibir Dados em Tabelas Ordenáveis
**Como usuário,**  
Quero visualizar os dados em formato de tabela,  
**Para** facilitar a análise e ordenação.

**Tarefas:**
- Criar componente de tabela no React.  
- Implementar ordenação de colunas (asc/desc).  
- Integrar tabela com API de dados filtrados.  
- Garantir responsividade e acessibilidade da tabela.  
- Realizar testes de usabilidade da ordenação.  

**Prioridade:** Alta  

**Critérios de Aceite:**
- Dados exibidos corretamente em tabelas.  
- Ordenação por colunas funcionando.  
- Interface responsiva e intuitiva.  

---

## História 4 – Configurar Banco PostgreSQL e Integração
**Como desenvolvedor,**  
Quero configurar o banco PostgreSQL,  
**Para** armazenar e disponibilizar os dados limnológicos ao backend.

**Tarefas:**
- Configurar container Docker com PostgreSQL.  
- Criar estrutura inicial de tabelas para os parâmetros.  
- Carregar dataset inicial no banco.  
- Criar queries otimizadas para consultas filtradas/ordenadas.  
- Testar integração Node.js ↔ PostgreSQL.  

**Prioridade:** Alta  

**Critérios de Aceite:**
- Banco de dados PostgreSQL configurado e acessível.  
- Dados carregados corretamente.  
- Backend acessando o banco sem erros.  

---

## História 8 – Dockerizar Front, Back e Banco
**Como desenvolvedor,**  
Quero separar a aplicação em containers independentes,  
**Para** garantir modularidade e portabilidade.

**Tarefas:**
- Criar Dockerfile do backend (Node.js + TypeScript).  
- Criar Dockerfile do frontend (React + TypeScript).  
- Criar Dockerfile/configuração do PostgreSQL.  
- Configurar `docker-compose.yml` para orquestração.  
- Validar comunicação entre containers.  
- Testar subida da aplicação completa em ambiente Docker.  

**Prioridade:** Alta  

**Critérios de Aceite:**
- Containers do front, back e banco sobem sem erros.  
- Comunicação entre serviços validada (front → back → banco).  
- Aplicação funcional em ambiente dockerizado.  
  
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


## História  – 
**Como usuário,**  
 
**Para** 

**Tarefas:**
- 
-   
- 
- 
- 

**Prioridade:** 

**Critérios de Aceite:**
- 
-
---

## História  – 
**Como usuário,**  
 
**Para** 

**Tarefas:**
- 
-   
- 
- 
- 

**Prioridade:** 

**Critérios de Aceite:**
- 
-
---

## História  – 
**Como usuário,**  
 
**Para** 

**Tarefas:**
- 
-   
- 
- 
- 

**Prioridade:** 

**Critérios de Aceite:**
- 
-
---

## História  – 
**Como usuário,**  
 
**Para** 

**Tarefas:**
- 
-   
- 
- 
- 

**Prioridade:** 

**Critérios de Aceite:**
- 
-
---
  
</details>  


<details>  
<summary><b>📋 Requisitos da Sprint 1</b></summary>  

**Requisitos Funcionais contemplados:**  
-  
- 
**Requisitos Não Funcionais contemplados:**  
- 
- 
-
- 

---
  
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
- 
</details>




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


## História  – 
**Como usuário,**  
 
**Para** 

**Tarefas:**
- 
-   
- 
- 
- 

**Prioridade:** 

**Critérios de Aceite:**
- 
-
---

## História  – 
**Como usuário,**  
 
**Para** 

**Tarefas:**
- 
-   
- 
- 
- 

**Prioridade:** 

**Critérios de Aceite:**
- 
-
---

## História  – 
**Como usuário,**  
 
**Para** 

**Tarefas:**
- 
-   
- 
- 
- 

**Prioridade:** 

**Critérios de Aceite:**
- 
-
---

## História  – 
**Como usuário,**  
 
**Para** 

**Tarefas:**
- 
-   
- 
- 
- 

**Prioridade:** 

**Critérios de Aceite:**
- 
-
---
  
</details>  


<details>  
<summary><b>📋 Requisitos da Sprint 1</b></summary>  

**Requisitos Funcionais contemplados:**  
-  
- 
**Requisitos Não Funcionais contemplados:**  
- 
- 
-
- 

---
  
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
- 
</details>




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

