#!/usr/bin/env bash

# Bring the code
echo
echo 'Cloning git repos...'
echo
rm -rf grunt-carnaby grunt-init-carnaby &&
git clone git@github.com:elgrancalavera/grunt-carnaby.git &&
git clone git@github.com:elgrancalavera/grunt-init-carnaby.git &&

# Symlink the grunt-init-carnaby template
mkdir -p ~/.grunt-init/
rm -f ~/.grunt-init/carnaby
from=$(pwd)'/grunt-init-carnaby'
to=~/.grunt-init
to=$to'/carnaby'
echo
echo 'Symlinking grunt-init-carnaby template...'
echo 'From: ' $from
echo 'To:   ' $to
echo
ln -s $from $to
ls -laf ~/.grunt-init

# Symlink the grunt-carnaby gruntplugin
mkdir -p grunt-init-carnaby/node_modules
from=$(pwd)'/grunt-carnaby'
to=$(pwd)'/grunt-init-carnaby/node_modules'
echo
echo 'Symlinking grunt-carnaby gruntplugin...'
echo 'From: ' $from
echo 'To:   ' $to
echo
ln -s $from $to
ls -laf grunt-init-carnaby/node_modules

# Install grunt-carnaby
echo
echo 'Insalling grunt-carnaby plugin...'
echo
cd grunt-carnaby &&
npm install &&
grunt &&

# Install grunt-init-carnaby
echo
echo 'Installing grunt-init-carnaby template...'
echo
cd ../grunt-init-carnaby &&
npm install &&
grunt &&

echo
echo 'Done.'
echo
