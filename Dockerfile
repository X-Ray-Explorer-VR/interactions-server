FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV IP="0.0.0.0"

ENV PORT=8080

EXPOSE 8080

CMD ["npm", "start"]