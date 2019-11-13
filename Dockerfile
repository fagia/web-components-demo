ARG NODE_IMAGE="node:13.1.0-alpine"

FROM ${NODE_IMAGE} AS back-end

WORKDIR /opt/app
COPY back-end/package*.json ./
RUN npm ci
COPY back-end/ ./

FROM ${NODE_IMAGE} AS front-end

WORKDIR /opt/app

COPY front-end/package*.json ./
RUN npm ci

COPY front-end/sass/main.scss ./sass/main.scss

RUN mkdir -p /opt/app/stylesheets && \
    npx sass --no-source-map sass/main.scss:stylesheets/main.css && \
    rm -Rf ./sass

COPY front-end/ ./

FROM ${NODE_IMAGE} AS back-end_front-end

WORKDIR /opt/app

RUN apk --no-cache add bash coreutils && \
    wget https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh && \
    chmod +x ./wait-for-it.sh

COPY --from=back-end /opt/app /opt/app
COPY --from=front-end /opt/app /opt/app/public

CMD [ "npm", "start" ]

FROM ${NODE_IMAGE} AS components

WORKDIR /opt/app

COPY components/package*.json ./

RUN npm ci

COPY components/ ./

RUN npm run build

FROM ${NODE_IMAGE} AS back-end_front-end_components

WORKDIR /opt/app

COPY --from=back-end_front-end /opt/app /opt/app
COPY --from=components /opt/app/www/build /opt/app/public/components

CMD [ "npm", "start" ]
