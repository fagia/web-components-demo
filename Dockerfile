FROM node:13.0.1-alpine AS back-end

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
COPY back-end/package*.json ./
RUN npm ci
COPY back-end/ ./

WORKDIR /opt/app/public
RUN sass --sourcemap=none sass/main.scss:stylesheets/main.css && \
    rm -Rf sass

FROM node:13.0.1-alpine AS app

WORKDIR /opt/app

RUN apk --no-cache add bash && \
    wget https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh && \
    chmod +x ./wait-for-it.sh

COPY --from=back-end /opt/app /opt/app

CMD [ "npm", "start" ]
