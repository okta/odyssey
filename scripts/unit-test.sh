#!/bin/bash

source $OKTA_HOME/$REPO/scripts/setup.sh

cd $OKTA_HOME/$REPO

export TEST_SUITE_TYPE="junit"
export TEST_RESULT_FILE_DIR="${REPO}/src/v3/build2/reports/unit"
echo $TEST_SUITE_TYPE > $TEST_SUITE_TYPE_FILE
echo $TEST_RESULT_FILE_DIR > $TEST_RESULT_FILE_DIR_FILE

COMMAND=$(yarn test)
EXIT_CODE=$?

if [[ $EXIT_CODE -ne 0 ]]; then
  echo "Unit tests failed! Exiting..."
  exit ${PUBLISH_TYPE_AND_RESULT_DIR_BUT_ALWAYS_FAIL}
fi

echo "Unit tests passed!"

if [[ $COMMAND ]]; then
  log_custom_message "Unit Test Report" "$COMMAND"
fi

report_results SUCCESS publish_type_and_result_dir_but_succeed_if_no_results
