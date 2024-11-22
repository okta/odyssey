#!/bin/bash

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

# Fetch open pull requests
GITHUB_RESPONSE=$(curl -s -L \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer $GITHUB_TOKEN" \
  -H "X-GitHub-Api-Version: 2022-11-28" \
  "https://api.github.com/repos/$GITHUB_ORG/$REPO/commits/$SHA/pulls")

BASE_BRANCH_NAME=$(echo $GITHUB_RESPONSE | jq -r '.[0].base.ref')
COMMIT_MESSAGE=$(echo $GITHUB_RESPONSE | jq -r '.[0].body')
PR_NUMBER=$(echo $GITHUB_RESPONSE | jq -r '.[0].number')
PR_TITLE=$(echo $GITHUB_RESPONSE | jq -r '.[0].title')
PR_URL=$(echo $GITHUB_RESPONSE | jq -r '.[0].html_url')

APPLITOOLS_BATCH_ID=$SHA
CURRENT_BRANCH_NAME=$BRANCH
CHROME_VERSION="126.0.6478.55"

if ! setup_service google-chrome-stable ${CHROME_VERSION}-1 ; then
  echo "failure" > ${setup_chrome_status_file}
fi

if ! wget https://artifacts.aue1e.internal/artifactory/thirdparty-yum/x86_64/chrome-sel3/${CHROME_VERSION}-1/webdriver/${CHROME_VERSION}/chromedriver-linux64.zip ; then
  echo "failure" > ${setup_chrome_status_file}
fi

unzip chromedriver-linux64.zip
mv chromedriver-linux64 /usr/local/bin/
chmod +x /usr/local/bin/chromedriver-linux64
rm chromedriver-linux64.zip

COMMAND=$(yarn workspace @okta/odyssey-storybook ci:visualRegressionTest)
EXIT_CODE=$?

log_custom_message "Visual Regression Test Report" "$COMMAND"

if [[ $EXIT_CODE -ne 0 ]]; then
  echo "Applitools Visual Regression Tests failed! Exiting..."
  exit ${PUBLISH_TYPE_AND_RESULT_DIR_BUT_ALWAYS_FAIL}
fi

echo "Visual Regression Tests passed!"

report_results SUCCESS publish_type_and_result_dir_but_succeed_if_no_results
