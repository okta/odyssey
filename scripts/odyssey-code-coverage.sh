#!/bin/bash

# must install dependencies for Odyssey and perform standard setup (eg. install yarn)
source $OKTA_HOME/$REPO/scripts/setup.sh

cd $OKTA_HOME/$REPO

export TEST_SUITE_TYPE="junit" # Bacon required config

export COMMAND=$(yarn workspace @okta/odyssey-react-mui ci:coverage)
export EXIT_CODE=$?

echo $COMMAND

if [[ $EXIT_CODE -ne 0 ]]; then
  echo "Code coverage failure!"
  report_results FAILURE publish_type_and_result_dir_but_always_fail
  exit "$BUILD_FAILURE"
fi

echo "Code coverage passed!"
log_custom_message "Code Coverage Report" "$COMMAND"

exit $SUCCESS
