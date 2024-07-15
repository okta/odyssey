#!/bin/bash

source $OKTA_HOME/$REPO/scripts/setup.sh

cd $OKTA_HOME/$REPO

get_terminus_secret "/" AWS_ACCESS_KEY_ID AWS_ACCESS_KEY_ID
get_terminus_secret "/" AWS_SECRET_ACCESS_KEY AWS_SECRET_ACCESS_KEY
get_terminus_secret "/" AWS_REGION AWS_REGION

echo "URL_STORYBOOK=\"https://${SHA}.ods.dev\""

# Build all packages except Storybook because it's excluded.
yarn build

# Build Storybook package.
cd ./packages/odyssey-storybook && rm -rf ./node_modules/.cache && yarn build

aws s3 sync ./dist/ s3://ods.dev/$SHA --delete

# bash ./scripts/notify-slack.sh

echo "Publishing to Storybook"
if ! lerna_publish; then
  echo "ERROR: Storybook Publish has failed."
  exit $PUBLISH_ARTIFACTORY_FAILURE
else
  echo "Publish successful."
  echo $URL_STORYBOOK
  log_custom_message "Storybook URL" $URL_STORYBOOK
fi
