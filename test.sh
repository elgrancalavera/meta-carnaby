#!/usr/bin/env bash
rm -rf a-carnaby-project && mkdir a-carnaby-project &&
cd a-carnaby-project && grunt-init carnaby -d -v &&
subl a-carnaby-project.sublime-project

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
  to=$(pwd)'/a-carnaby-project/node_modules'
  echo
  echo 'Symlinking grunt-carnaby gruntplugin...'
  echo 'From: ' $from
  echo 'To:   ' $to
  echo
  ln -s $from $to
  ls -laf a-carnaby-project/node_modules
  cd a-carnaby-project
  grunt server
fi
