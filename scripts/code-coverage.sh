#!/bin/bash

export CHROME_HEADLESS=true
setup_service google-chrome-stable 83.0.4103.61-1

source $OKTA_HOME/$REPO/scripts/setup.sh

cd $OKTA_HOME/$REPO

# install apt-get
sudo dpkg -i apt.deb

if ! yarn workspace @okta/odyssey-storybook playwright install --with-deps chromium; then
  echo "playwright dependencies failed to install"
  exit ${PUBLISH_TYPE_AND_RESULT_DIR_BUT_ALWAYS_FAIL}
fi

if ! yarn workspace @okta/odyssey-storybook coverage; then
  echo "code coverage failed! Exiting..."
  exit ${PUBLISH_TYPE_AND_RESULT_DIR_BUT_ALWAYS_FAIL}
fi

exit $PUBLISH_TYPE_AND_RESULT_DIR;