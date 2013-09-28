#!/usr/bin/env bash
rm -rf test && mkdir test &&
cd test && grunt-init carnaby -d -v &&
subl test.sublime-project

while getopts ":i" opt ; do
  case $opt in
    i )
    install=true
    ;;
  esac
done

if [[ $install ]]; then
  npm install && bower install &&
  cd ..

  # Symlink the grunt-carnaby gruntplugin
  mkdir -p grunt-init-carnaby/node_modules
  from=$(pwd)'/grunt-carnaby'
  to=$(pwd)'/test/node_modules'
  echo
  echo 'Symlinking grunt-carnaby gruntplugin...'
  echo 'From: ' $from
  echo 'To:   ' $to
  echo
  ln -s $from $to
  ls -laf test/node_modules

  cd test
fi
