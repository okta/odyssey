#!/bin/bash

export CHROME_HEADLESS=true
setup_service google-chrome-stable 83.0.4103.61-1

source $OKTA_HOME/$REPO/scripts/setup.sh

cd $OKTA_HOME/$REPO

if ! yarn workspace @okta/odyssey-storybook dev:interactionTest; then
  echo "interaction tests failed! Exiting..."
  exit ${PUBLISH_TYPE_AND_RESULT_DIR_BUT_ALWAYS_FAIL}
fi

exit $PUBLISH_TYPE_AND_RESULT_DIR;