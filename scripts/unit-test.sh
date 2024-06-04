#!/bin/bash

source $OKTA_HOME/$REPO/scripts/setup.sh

cd $OKTA_HOME/$REPO

export TEST_SUITE_TYPE="junit"
export TEST_RESULT_FILE_DIR="${REPO}/src/v3/build2/reports/unit"
echo $TEST_SUITE_TYPE > $TEST_SUITE_TYPE_FILE
echo $TEST_RESULT_FILE_DIR > $TEST_RESULT_FILE_DIR_FILE

if ! yarn test; then
  echo "lerna tests failed! Exiting..."
  exit ${PUBLISH_TYPE_AND_RESULT_DIR_BUT_ALWAYS_FAIL}
fi

echo "Lerna tests passed!"
report_results SUCCESS publish_type_and_result_dir_but_succeed_if_no_results
