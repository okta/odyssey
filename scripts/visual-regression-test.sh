#!/bin/bash -x

source $OKTA_HOME/$REPO/scripts/setup.sh

cd $OKTA_HOME/$REPO

export TEST_SUITE_TYPE="junit"
export TEST_RESULT_FILE_DIR="${REPO}/src/v3/build2/reports/unit"
echo $TEST_SUITE_TYPE > $TEST_SUITE_TYPE_FILE
echo $TEST_RESULT_FILE_DIR > $TEST_RESULT_FILE_DIR_FILE

get_terminus_secret "/" APPLITOOLS_API_KEY APPLITOOLS_API_KEY
get_terminus_secret "/" APPLITOOLS_SERVER_URL APPLITOOLS_SERVER_URL

if [[ -z "$APPLITOOLS_API_KEY" ]]; then
  echo "Error in getting APPLITOOLS_API_KEY from Terminous."
  report_results FAILURE PUBLISH_TYPE_AND_RESULT_DIR_BUT_SUCCEED_IF_NO_RESULTS
  exit 1
fi

export DEFAULT_CHROME_VERSION="126.0.6478.55-1"

if ! setup_service google-chrome-stable ${DEFAULT_CHROME_VERSION} ; then
  echo "failure" > ${setup_chrome_status_file}
fi

if ! wget https://chromedriver.storage.googleapis.com/114.0.5735.90/chromedriver_linux64.zip ; then
  echo "failure" > ${setup_chrome_status_file}
fi

unzip chromedriver_linux64.zip
sudo mv chromedriver /usr/local/bin/
sudo chmod +x /usr/local/bin/chromedriver
rm chromedriver_linux64.zip

if ! yarn workspace @okta/odyssey-storybook ci:visualRegressionTest; then
  echo "lerna tests failed! Exiting..."
  exit ${PUBLISH_TYPE_AND_RESULT_DIR_BUT_ALWAYS_FAIL}
fi

echo "Visual Regression Tests passed!"
report_results SUCCESS publish_type_and_result_dir_but_succeed_if_no_results
