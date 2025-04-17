#!/bin/bash

# must install dependencies for Odyssey and perform standard setup (eg. install yarn)
source $OKTA_HOME/$REPO/scripts/setup.sh

cd $OKTA_HOME/$REPO

export TEST_SUITE_TYPE="junit" # Bacon required config

# Additional bacon required config for reporting results
export TEST_RESULT_FILE_DIR="${OKTA_HOME}/${REPO}/build2/reports/playwright"
echo ${TEST_SUITE_TYPE} > "${TEST_SUITE_TYPE_FILE}"
echo "${TEST_RESULT_FILE_DIR}" > "${TEST_RESULT_FILE_DIR_FILE}"

# Possible AL2023 fix. Come back to this later.
# dnf install atk at-spi2-atk cups-libs libdrm libxcb libxkbcommon at-spi2-core libX11 libXcomposite libXdamage libXext libXfixes libXrandr mesa-libgbm pango cairo alsa-lib

# Odyssey tests require playwright dependency installation (and uses its own chromium browser)
if ! yarn workspace @okta/odyssey-react-mui playwright install --with-deps chromium; then
  echo "Failed to install Playwright and its dependencies!"
  report_results FAILURE publish_type_and_result_dir_but_always_fail
  exit "$BUILD_FAILURE"
fi

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
