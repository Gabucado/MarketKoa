ARG NODE_ENV=docker

FROM node:22.12-alpine3.21

WORKDIR /usr/src/path

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
