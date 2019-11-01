FROM node:13.0.1-alpine

COPY package*.json ./

RUN npm ci

COPY . .

CMD [ "npm", "run", "start" ]
