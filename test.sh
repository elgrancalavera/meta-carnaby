#!/usr/bin/env bash
rm -rf a-carnaby-project &&
mkdir a-carnaby-project &&
cd a-carnaby-project &&
grunt-init carnaby &&
npm install &&
bower install &&
subl a-carnaby-project.sublime-project &&
grunt
