FROM node:lts-alpine

WORKDIR /app
COPY package.json .

RUN npm install
RUN npm i dotenv-cli

COPY . .

CMD npx prisma db push && npm run start:dist