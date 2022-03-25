#!/bin/bash
cd be/
rm -rf dist/
# Install dependencies and compile ts code
npm run build
cd dist/
nohup node index.js > /dev/null &
# Install fe dependencies and start server 
cd ../../fe/
yarn
# Start server
yarn run start
