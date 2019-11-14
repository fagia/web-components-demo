#!/bin/bash
set -e

declare -a APPLICATIONS=(
    "movie-database/back-end"
    "movie-database/components"
    "movie-database/front-end"
    "movie-reviews/back-end"
    "movie-reviews/front-end"
)

if [ $# -ne 1 ]; then
  echo "Usage: $0 <install|update>"
  exit 1
fi

cd $(dirname $0)/..
BASE_DIR=$PWD

COMMAND=$1

execute_command() {
    APPLICATION=$1
    echo "Running \"npm ${COMMAND}\" on ${APPLICATION}"
    cd "${BASE_DIR}/${APPLICATION}"
    npm "${COMMAND}"
    echo "Done \"npm ${COMMAND}\" on ${APPLICATION}"
}

for APPLICATION in "${APPLICATIONS[@]}"; do
   case "${COMMAND}" in
      install|update)
         execute_command "${APPLICATION}"
         ;;
      *)
         echo "${COMMAND} command is not supported"
         exit 1
    esac
done
