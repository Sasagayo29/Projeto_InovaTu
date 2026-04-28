# Etapa 1: Build do Angular (Node 20)
FROM node:20-alpine AS build
WORKDIR /app

# Instala dependências
COPY package*.json ./
RUN npm install

# Copia o código fonte e gera o build de produção
COPY . .
# O flag --configuration=production garante otimizações do Angular [cite: 99]
RUN npm run build -- --configuration=production

# Etapa 2: Servidor Web (Nginx)
FROM nginx:alpine

# Remove a configuração padrão (será substituída pelo volume em config/frontend)
RUN rm /etc/nginx/conf.d/default.conf

# Limpa o diretório padrão
RUN rm -rf /usr/share/nginx/html/*

# Copia os arquivos estáticos gerados (Ajuste 'inovatu-frontend' se o nome no angular.json for diferente) [cite: 101]
COPY --from=build /app/dist/sakai-ng/browser /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]