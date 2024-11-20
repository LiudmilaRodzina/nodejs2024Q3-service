
FROM node:22-alpine as build

WORKDIR /app

COPY package*.json ./

RUN npm install --omit=dev

COPY . .

FROM node:22-alpine

WORKDIR /app

COPY --from=build /app .

EXPOSE 4000

CMD ["npm", "run", "start:prod"]
