#!/usr/bin/env bash
git clone git@github.com:elgrancalavera/grunt-carnaby.git &&
git clone git@github.com:elgrancalavera/grunt-init-carnaby.git &&
cd grunt-carnaby &&
grunt &&
npm install &&
cd ../grunt-init-carnaby &&
npm install &&
cd node_modules &&
ln -s ./../../grunt-carnaby/ grunt-carnaby &&
cd ..
grunt &&


