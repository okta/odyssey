#!/bin/bash

source $OKTA_HOME/$REPO/scripts/setup.sh

cd $OKTA_HOME/$REPO

export TEST_SUITE_TYPE="junit"
export TEST_RESULT_FILE_DIR="${REPO}/src/v3/build2/reports/unit"
echo $TEST_SUITE_TYPE > $TEST_SUITE_TYPE_FILE
echo $TEST_RESULT_FILE_DIR > $TEST_RESULT_FILE_DIR_FILE

function get_secret_key_for_applitools() {
  get_vault_secret_key team-uicore/odyssey ${APPLITOOLS_API_SECRET_IN_VAULT} APPLITOOLS_API_KEY
  if [[ -z "$APPLITOOLS_API_KEY" ]]; then
    echo "Error in getting APPLITOOLS_API_KEY from Vault. APPLITOOLS_API_SECRET_IN_VAULT"
    report_results FAILURE PUBLISH_TYPE_AND_RESULT_DIR_BUT_SUCCEED_IF_NO_RESULTS
    exit 1
  fi
}

if ! yarn workspace @okta/odyssey-storybook ci:visualRegressionTest; then
  echo "lerna tests failed! Exiting..."
  exit ${PUBLISH_TYPE_AND_RESULT_DIR_BUT_ALWAYS_FAIL}
fi

echo "Lerna tests passed!"
report_results SUCCESS publish_type_and_result_dir_but_succeed_if_no_results

