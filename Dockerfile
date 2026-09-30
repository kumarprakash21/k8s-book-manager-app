FROM node:22-alpine AS builder

RUN npm install -g npm@12.1.0

WORKDIR /app

COPY package*.json ./

RUN npm install 

RUN npm install -g npm@12.1.0

COPY . .

FROM node:22-alpine

RUN npm install -g npm@12.1.0

WORKDIR /app

COPY --from=builder /app .

EXPOSE 80

CMD ["node", "server.js"]
