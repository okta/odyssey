#!/bin/bash

source $OKTA_HOME/$REPO/scripts/setup.sh

cd $OKTA_HOME/$REPO

# Bacon required config
export TEST_SUITE_TYPE="junit"
export TEST_RESULT_FILE_DIR="${OKTA_HOME}/${REPO}/build2/reports/playwright"
echo ${TEST_SUITE_TYPE} > "${TEST_SUITE_TYPE_FILE}"
echo "${TEST_RESULT_FILE_DIR}" > "${TEST_RESULT_FILE_DIR_FILE}"

if ! yarn workspace @okta/odyssey-storybook playwright install --with-deps chromium; then
  echo "Failed to install Playwright and its dependencies!"
  report_results FAILURE publish_type_and_result_dir_but_always_fail
  exit "$BUILD_FAILURE"
fi

if ! yarn workspace @okta/odyssey-storybook ci:dev:interactionTest; then
  echo "Playwright test failure!"
  report_results FAILURE publish_type_and_result_dir_but_always_fail
  exit "$BUILD_FAILURE"
fi

echo "Playwright tests passed!"
report_results SUCCESS publish_type_and_result_dir_but_succeed_if_no_results