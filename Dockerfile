FROM node:22-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm cache clean --force && npm ci

COPY . .

RUN npm run build

FROM node:22-alpine

WORKDIR /app

COPY --from=build /app .

ENV PATH /app/node_modules/.bin:$PATH

EXPOSE 4000

CMD ["npm", "run", "start:dev"]
