# Dockerfile (monorepo front/ + back/)
# EXPECTA: ./front (Vite app), ./back (Express/Node API that can serve static files from 'public' or has start script)
# Ajuste PORT e scripts conforme seu projeto.

########### Stage 1: build frontend ###########
FROM node:18-alpine AS front-builder
WORKDIR /app/front

# copy only package files first for better caching
COPY front/package*.json ./
# If using pnpm or yarn, adapte: e.g. COPY front/pnpm-lock.yaml .
RUN npm ci --silent

COPY front/ .
# Se usa Vite, comando de build usual:
RUN npm run build

########### Stage 2: build backend ###########
FROM node:18-alpine AS back-builder
WORKDIR /app/back

# copiar package do backend se existir
# se não existir, estas etapas podem falhar — ver nota abaixo
COPY back/package*.json ./ 2>/dev/null || true
RUN if [ -f package.json ]; then npm ci --silent || true; fi

COPY back/ . 2>/dev/null || true

# copy frontend build into backend public (if backend will serve static)
# create public folder if backend expects it
RUN mkdir -p /app/back/public 2>/dev/null || true
# copy build files from front-builder (if exist)
COPY --from=front-builder /app/front/dist /app/back/public

# optional: build backend if it has a build step
RUN if [ -f package.json ] && grep -q "\"build\":" package.json 2>/dev/null; then npm run build || true; fi

########### Stage 3: runtime ###########
FROM node:18-alpine AS runtime
WORKDIR /app

# copy backend (if exists)
COPY --from=back-builder /app/back /app/back
# also keep frontend dist for fallback serving
COPY --from=front-builder /app/front/dist /app/front/dist

ENV PORT=3000
EXPOSE 3000

# Install tiny static server globally for fallback
RUN npm i -g serve@14 --silent

# Start script:
# - If backend exists (package.json with start) -> run backend
# - Else -> serve static front/dist on $PORT
CMD if [ -f /app/back/package.json ]; then \
      cd /app/back && \
      # prefer npm start; adapt if server uses node ./dist/index.js or similar
      if grep -q "\"start\"" package.json; then npm run start; else node ./index.js || node ./dist/index.js; fi ; \
    else \
      echo "No backend detected — serving front/dist on port ${PORT}" && serve -s /app/front/dist -l ${PORT}; \
    fi
