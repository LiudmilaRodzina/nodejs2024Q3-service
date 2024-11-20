FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm cache clean --force && npm ci --verbose

COPY . .

EXPOSE 4000

CMD ["npm", "run", "start:prod"]
