## 📊 Projeto ABP – Repositório de Dados Limnológicos

Este projeto integra múltiplos bancos de dados PostgreSQL, uma API em Node.js/Express escrita em TypeScript, e um front-end em React (Vite + TypeScript + styled-components).
O objetivo é oferecer uma aplicação organizada, containerizada e com boas práticas de desenvolvimento (linting, formatação, CI/CD e tema global).


### ▶️ Subindo os Containers

Para inicializar todo o ambiente (bancos de dados, servidor e front-end):
```bash
docker compose -f docker-compose.dev.yml up --build -d
```
- A flag `--build` força a reconstrução das imagens (aplica alterações recentes).
- Certifique-se de executar o comando na raiz do projeto, ou seja, no diretório onde está localizado o arquivo `docker-compose.dev.yml`. Caso contrário, o Docker não encontrará as definições dos serviços.
- Para parar os containers:
```bash
docker compose -f docker-compose.dev.yml down
```

---

### 📂 Estrutura de Pastas

A organização do projeto segue uma separação clara entre bancos de dados (scripts e dados), servidor (código da aplicação) e configurações gerais.

```bash
app/
├── balcar-campanha/            
│   ├── csv/                       # Arquivos de dados (CSV) carregados nas tabelas
│   ├── copy-table.sql             # Script SQL para importar os arquivos CSV para o banco
│   ├── create-table.sql           # Script SQL para criar a estrutura das tabelas
│   └── balcar-campanha-modelo.xml # Modelo conceitual do banco, visualizável no DBDesigner
│  
├── furnas-campanha/
│   ├── csv/                       # Arquivos de dados (CSV) carregados nas tabelas
│   ├── copy-table.sql             # Script SQL para importar os arquivos CSV para o banco
│   ├── create-table.sql           # Script SQL para criar a estrutura das tabelas
│   └── furnas-campanha-modelo.xml # Modelo conceitual do banco, visualizável no DBDesigner
│   
├── sima/
│   ├── csv/                       # Arquivos de dados (CSV) específicos do SIMA
│   ├── copy-table.sql             # Script SQL para importação dos CSV
│   ├── create-table.sql           # Script SQL para criação das tabelas
│   └── sima-modelo.xml            # Modelo conceitual do banco SIMA (para DBDesigner)
│ 
├── server/
│   ├── src/                       # Código-fonte da aplicação
│   │   ├── configs/               # Configurações, como conexão com banco de dados
│   │   │   └── db.ts
│   │   ├── controllers/           # Lógica de controle (recebem requisições, chamam serviços)
│   │   ├── routes/                # Definição das rotas da API
│   │   └── index.ts               # Arquivo principal que inicializa o servidor
│   ├── .env                       # Variáveis de ambiente da aplicação
│   ├── Dockerfile                 # Receita para construção da imagem Docker do servidor
│   ├── package.json               # Dependências e scripts NPM
│   ├── package-lock.json          # Controle de versões exatas das dependências
│   ├── tsconfig.json              # Configurações do compilador TypeScript
│   ├── tsconfig.eslint.json       # Regras de análise estática específicas para ESLint
│   ├── eslint.config.mjs          # Configuração de qualidade de código (ESLint)
│   ├── .prettierrc                # Configuração de formatação automática (Prettier)
│   └── .prettierignore            # Arquivos/pastas ignorados pelo Prettier
│
├── front/                        # Front-end React + Vite + styled-components
│   ├── src/
│   │   ├── api/                  # Consumo da API (axios)
│   │   ├── components/           # Componentes reutilizáveis
│   │   ├── hooks/                
│   │   ├── pages/                # Páginas (ex.: SimaPage)
│   │   ├── styles/               # GlobalStyle + ThemeProvider
│   │   └── types/               
│   ├── Dockerfile
│   ├── vite.config.ts
│   ├── package.json
│   └── tsconfig.json
│
├── .github/workflows/ci.yml       # Pipeline de Integração Contínua
├── .gitignore                     # Define arquivos e pastas que não devem ir para o Git
└── docker-compose.dev.yml         # Definições dos serviços Docker para ambiente de desenvolvimento
  
```

---

### 🔑 Principais Tecnologias e Configurações

**Back-end (`server/`)**

- Node.js + Express + TypeScript.
- Estrutura em camadas (configs, controllers, routes).
- Conexão com múltiplos bancos via `pg.Pool`.
- Middlewares: JSON parser, erro global, CORS configurado (apenas GET).
- ESLint + Prettier para padronização de código.
- Dockerfile com hot reload (ts-node-dev).

**Front-end (`front/`)**

- React + Vite + TypeScript.
- styled-components com `ThemeProvider` global (cores, tipografia, espaçamento).
- GlobalStyle para reset de estilos.
- Barra Brasil + Menu responsivo com hambúrguer.
- Estrutura organizada (`api/`, `components/`, `pages/`, `styles/`).
* Axios configurado com `VITE_SERVER_PORT`.

**Banco de Dados**

- PostgreSQL 17 (um container por domínio: furnas-campanha, sima, balcar-campanha).
- Scripts SQL para `CREATE TABLE` e `COPY FROM CSV`.
- Volumes persistentes para dados.
- Cada banco acessível em uma porta distinta (5433, 5434, 5435).

**CI/CD**

- GitHub Actions (`.github/workflows/ci.yml`):
    - O projeto utiliza GitHub Actions para garantir qualidade de código e que a stack Docker esteja sempre saudável.
    - O pipeline roda automaticamente em **push** e **pull requests** para a branch `main`.
- Estrutura de Jobs: `server-ci`, `front-ci` e `docker-ci`.

---

### B🚀 Como rodar o projeto localmente (sem Docker)

**Back-end**
```bash
cd server
npm install
npm run dev
```
API disponível em: http://localhost:3001

**Front-end**
```bash
cd front
npm install
npm run dev
```
App disponível em: http://localhost:3002


--- 

### 🌐 Acessando a Aplicação

- Front-end (React): http://localhost:3002

- Back-end (API Node): http://localhost:3001
    - Exemplo: http://localhost:3001/sima/sima/all?page=1&limit=20

---

### 🛠️ Boas práticas aplicadas

- Separação clara de camadas (DB / API / Front).
- Containers independentes para cada banco.
- Hot reload para server e front em dev.
- ESLint + Prettier (garantindo padronização de código).
- CI no GitHub Actions.