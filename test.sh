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
  npm install && bower install && grunt && grunt connect watch
fi
