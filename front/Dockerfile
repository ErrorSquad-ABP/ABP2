# front/Dockerfile
# Stage 1 — build
FROM node:18-alpine AS builder
WORKDIR /app
ENV CI=true
COPY package*.json ./
RUN npm ci --silent
COPY . .
# Ajuste se seu build script for diferente
RUN npm run build

# Stage 2 — nginx para servir os arquivos estáticos
FROM nginx:1.25-alpine
# Remover default nginx conf
RUN rm /etc/nginx/conf.d/default.conf

# Copia seus arquivos estáticos para o nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Nginx conf que escuta 3002 internamente (Render define PORT em runtime)
# Vamos usar substitution da variável PORT se houver. Caso Render forneça PORT, configure lá.
COPY nginx.conf /etc/nginx/conf.d/app.conf

# Expor porta (opcional, Render usa variável PORT)
EXPOSE 3002

CMD ["nginx", "-g", "daemon off;"]
