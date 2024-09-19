#!/bin/bash

# must install dependencies for Odyssey and perform standard setup (eg. install yarn)
source $OKTA_HOME/$REPO/scripts/setup.sh

cd $OKTA_HOME/$REPO

export TEST_SUITE_TYPE="junit" # Bacon required config

export CODE_COVERAGE=$(yarn workspace @okta/odyssey-storybook ci:coverage)
export EXIT_CODE=$?

echo $CODE_COVERAGE

if [[ $EXIT_CODE -ne 0 ]]; then
  echo "Code coverage failure!"
  report_results FAILURE publish_type_and_result_dir_but_always_fail
  exit "$BUILD_FAILURE"
fi

echo "Code coverage passed!"
log_custom_message "Code Coverage Report" "$CODE_COVERAGE"

report_results SUCCESS publish_type_and_result_dir_but_succeed_if_no_results
