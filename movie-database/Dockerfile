FROM node:13.0.1-alpine

RUN apk update && \
    apk upgrade
RUN apk --no-cache add build-base ruby ruby-dev unzip && \
    gem install sass --no-ri --no-rdoc
RUN wget https://github.com/jgthms/bulma/releases/download/0.8.0/bulma-0.8.0.zip -O /opt/bulma.zip && \
    unzip /opt/bulma.zip -d /opt && \
    mv /opt/bulma-0.8.0 /opt/bulma && \
    rm -f /opt/bulma.zip

RUN mkdir -p /opt/app/public/stylesheets

WORKDIR /opt/app
COPY package*.json ./
RUN npm ci
COPY . .

WORKDIR /opt/app/public
RUN sass --sourcemap=none sass/main.scss:stylesheets/main.css && \
    rm -Rf sass

WORKDIR /opt/app

ENV DEBUG=movie-database:*

CMD [ "npm", "start" ]
