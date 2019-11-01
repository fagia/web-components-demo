FROM node:13.0.1-alpine

RUN npm install http-server@0.11.1 -g

RUN mkdir -p /opt/www

WORKDIR /opt/www

COPY . .

CMD [ "http-server", "." ]
