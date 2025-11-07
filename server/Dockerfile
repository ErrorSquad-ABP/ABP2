# server/Dockerfile
FROM node:22-alpine AS builder
WORKDIR /usr/src/app

# copiar somente package(s) para cache
COPY package*.json ./
RUN npm ci --production=false --silent

# copiar código e buildar
COPY . .
RUN npm run build

# runtime stage
FROM node:22-alpine AS runtime
WORKDIR /usr/src/app

ENV NODE_ENV=production
ENV PORT=3001

COPY package*.json ./
RUN npm ci --production --silent

# copiar build do builder
COPY --from=builder /usr/src/app/dist ./dist
# se precisar de assets estáticos, copie também
COPY --from=builder /usr/src/app/src ./src
COPY --from=builder /usr/src/app/.env ./ # opcional (não recomendado com segredos)

EXPOSE 3001

# garantir que o container execute o start de produção
CMD ["node", "dist/index.js"]
