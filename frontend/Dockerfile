# frontend/Dockerfile
FROM node:22-alpine AS build

WORKDIR /app

# Copiar arquivos de dependências
COPY frontend/package.json frontend/package-lock.json* ./

# Instalar dependências
RUN npm ci

# Copiar código fonte do frontend
COPY frontend/ ./

# Build da aplicação (NÃO use npm run dev aqui!)
RUN npm run build

# Estágio de produção com nginx
FROM nginx:alpine

# Instalar curl para healthcheck
RUN apk add --no-cache curl

# Copiar arquivos buildados
COPY --from=build /app/dist /usr/share/nginx/html

# Copiar configuração customizada do nginx
COPY frontend/nginx.conf /etc/nginx/conf.d/default.conf

# Expor porta do frontend
EXPOSE 80

# Healthcheck
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost/ || exit 1

# Iniciar nginx
CMD ["nginx", "-g", "daemon off;"]