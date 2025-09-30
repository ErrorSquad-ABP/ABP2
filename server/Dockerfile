# Ambiente de desenvolvimento
FROM node:22-alpine

WORKDIR /usr/src/app

# Instalar dependências
COPY package*.json ./
RUN npm install

# Copiar o restante do código
COPY . .

# Expor a porta da API
EXPOSE 3000

# Rodar com hot reload (ts-node-dev precisa estar nas devDependencies)
CMD ["npm", "run", "dev"]
