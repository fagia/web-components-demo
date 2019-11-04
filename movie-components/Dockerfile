FROM node:13.0.1-alpine

RUN npm install http-server@0.11.1 -g

RUN mkdir -p /opt/stencil

WORKDIR /opt/stencil

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

CMD [ "http-server", "/opt/stencil/www/build" ]
