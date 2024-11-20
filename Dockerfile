FROM node:22-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install --only=production

COPY . .

FROM node:22-alpine

WORKDIR /app

COPY --from=build /app ./

EXPOSE 4000

ENV PATH /app/node_modules/.bin:$PATH

CMD ["npm", "run", "start:dev"]
