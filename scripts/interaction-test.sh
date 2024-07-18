#!/bin/bash

# must install dependencies for Odyssey and perform standard setup (eg. install yarn)
source $OKTA_HOME/$REPO/scripts/setup.sh

cd $OKTA_HOME/$REPO

export TEST_SUITE_TYPE="junit" # Bacon required config

# Additional bacon required config for reporting results
export TEST_RESULT_FILE_DIR="${OKTA_HOME}/${REPO}/build2/reports/playwright"
echo ${TEST_SUITE_TYPE} > "${TEST_SUITE_TYPE_FILE}"
echo "${TEST_RESULT_FILE_DIR}" > "${TEST_RESULT_FILE_DIR_FILE}"

# Storybook tests require playwright dependency installation (and uses its own chromium browser)
if ! yarn workspace @okta/odyssey-storybook playwright install --with-deps chromium; then
  echo "Failed to install Playwright and its dependencies!"
  report_results FAILURE publish_type_and_result_dir_but_always_fail
  exit "$BUILD_FAILURE"
fi

# executes the interaction tests against a local instance of Odyssey storybook running
if ! yarn workspace @okta/odyssey-storybook ci:interactionTest; then
  echo "Playwright test failure!"
  report_results FAILURE publish_type_and_result_dir_but_always_fail
  exit "$BUILD_FAILURE"
fi

# Tests were successful if it reached here
echo "Playwright tests passed!"
report_results SUCCESS publish_type_and_result_dir_but_succeed_if_no_results
