#!/bin/bash

source $OKTA_HOME/$REPO/scripts/setup.sh

cd $OKTA_HOME/$REPO

if ! yarn workspace @okta/odyssey-storybook coverage; then
  echo "code coverage failed! Exiting..."
  exit ${PUBLISH_TYPE_AND_RESULT_DIR_BUT_ALWAYS_FAIL}
fi

exit $PUBLISH_TYPE_AND_RESULT_DIR;