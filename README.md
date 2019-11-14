# WEB COMPONENTS DEMO

[![Build Status](https://travis-ci.org/fagia/web-components-demo.svg?branch=master)](https://travis-ci.org/fagia/web-components-demo)

https://docs.google.com/presentation/d/1_g8C1417toQ63njVQxDXWpI4IfJk20nBZbRWAmCsBJw/edit

## Requirements

- Bash shell
- Node
- Docker

## Install

    npm install

## Build

    npm run build

## Tests

### E2E tests

- Run: `npm run e2e-tests:run`
- Open workspace: `npm run e2e-tests:open`

## Run

    npm run start

Movie database application: http://localhost:3002/

Movie reviews application: http://localhost:3003/

## Stop

Kill the docker-compose process with `Ctrl+c`, then:

    npm run stop

## Development

### Init dependencies

    npm run init

The init command will run `npm install` in every application contained in this demo.

### Update dependencies

    npm run update

The update command will run `npm update` in every application contained in this demo.
