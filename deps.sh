#!/bin/bash
set -e
if [ -f ~/.profile ]; then
  echo "Reading .profile"
  . ~/.profile
fi

#nvm install 5.8
npm install -g typescript
npm install -g yo
npm install -g grunt-cli bower yo generator-karma generator-angular

npm install -g firebase-tools
