#!/bin/bash

export CHROME_HEADLESS=true
setup_service google-chrome-stable 83.0.4103.61-1

source $OKTA_HOME/$REPO/scripts/setup.sh

cd $OKTA_HOME/$REPO

apt-get install libnss3\
  libnspr4\
  libdbus-1-3\
  libatk1.0-0\
  libatk-bridge2.0-0\
  libcups2\
  libdrm2\
  libatspi2.0-0\
  libx11-6\
  libxcomposite1\
  libxdamage1\
  libxext6\
  libxfixes3\
  libxrandr2\
  libgbm1\
  libxcb1\
  libpango-1.0-0\
  libcairo2\
  libasound2

if ! yarn workspace @okta/odyssey-storybook coverage; then
  echo "code coverage failed! Exiting..."
  exit ${PUBLISH_TYPE_AND_RESULT_DIR_BUT_ALWAYS_FAIL}
fi

exit $PUBLISH_TYPE_AND_RESULT_DIR;