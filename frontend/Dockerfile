 ## Builder
FROM node:22-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

RUN npm run build


## Runner
FROM node:22-alpine

WORKDIR /app

COPY --from=builder /app ./

RUN npm ci --omit=dev

EXPOSE 3000

CMD [ "npm","start"]