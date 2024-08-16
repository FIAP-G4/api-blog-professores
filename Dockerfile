FROM node:18-slim

WORKDIR /app

RUN apt-get update -y && apt-get install -y openssl

COPY package.json /app

RUN npm install

COPY . .

RUN npx prisma generate

CMD ["npm", "run", "dev"]