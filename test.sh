#!/usr/bin/env bash
rm -rf a-carnaby-project && mkdir a-carnaby-project &&
cd a-carnaby-project && grunt-init carnaby &&
subl a-carnaby-project.sublime-project &&
npm install && bower install && grunt
