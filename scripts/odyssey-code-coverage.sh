#!/bin/bash

# must install dependencies for Odyssey and perform standard setup (eg. install yarn)
source $OKTA_HOME/$REPO/scripts/setup.sh

cd $OKTA_HOME/$REPO

export NODE_ENV=test
export TEST_SUITE_TYPE="junit" # Bacon required config

# Additional bacon required config for reporting results
export TEST_RESULT_FILE_DIR="${OKTA_HOME}/${REPO}/build2/reports/playwright"
echo ${TEST_SUITE_TYPE} > "${TEST_SUITE_TYPE_FILE}"
echo "${TEST_RESULT_FILE_DIR}" > "${TEST_RESULT_FILE_DIR_FILE}"

# Odyssey tests require playwright dependency installation (and uses its own chromium browser)
if ! yarn workspace @okta/odyssey-react-mui playwright install --with-deps chromium; then
  echo "Failed to install Playwright and its dependencies!"
  report_results FAILURE publish_type_and_result_dir_but_always_fail
  exit "$BUILD_FAILURE"
fi

# This command is a hack that will exit with code `1`. It forces vitest to build deps in `node_modules/.vite/deps`. Those deps need to exist for tests to run correctly.
yarn workspace @okta/odyssey-react-mui vitest list

COMMAND=$(yarn workspace @okta/odyssey-react-mui ci:coverage)
EXIT_CODE=$?

echo $COMMAND

if [[ $EXIT_CODE -ne 0 ]]; then
  echo "Code coverage failure!"
  report_results FAILURE publish_type_and_result_dir_but_always_fail
  exit "$BUILD_FAILURE"
fi

echo "Code coverage passed!"
log_custom_message "Code Coverage Report" "$COMMAND"

exit $SUCCESS
