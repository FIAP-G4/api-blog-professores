FROM node:18-slim

# Instala o cliente do PostgreSQL
# RUN apt-get update && apt-get install -y postgresql-client && rm -rf /var/lib/apt/lists/*

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos de dependência
COPY package.json package-lock.json ./

# Instala as dependências
RUN npm install

# Copia o restante dos arquivos
COPY . .

# Executa o build da aplicação
RUN npm run build

# Inicia a aplicação e realiza as migrações após garantir que o PostgreSQL está acessível
CMD ["sh", "-c", "npm run migrate:prod && npm run start"]
