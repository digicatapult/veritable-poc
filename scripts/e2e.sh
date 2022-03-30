#!/bin/bash

# RUN CYPRESS E2E TESTS
echo "Installing Cypress globaly"
npm install cypress -g
echo "Running Cypress tests"
npx cypress run

if [[ $? != 0 ]]; then
  echo "Error occurec while running cypress"
  exit 1
fi