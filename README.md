# WEB COMPONENTS DEMO

https://docs.google.com/presentation/d/1_g8C1417toQ63njVQxDXWpI4IfJk20nBZbRWAmCsBJw/edit

## Requirements

Docker
Node (to run e2e tests)

## Tests

Run e2e tests: `npm run e2e-tests:run`

Open e2e tests workspace: `npm run e2e-tests:open`

## Install/update

    docker-compose build --force-rm

## Run

    docker-compose up

Movie database application: http://localhost:3002/

Movie reviews application: http://localhost:3003/

## Stop

Kill the docker-compose process with `Ctrl+c`, then:

    docker-compose down
