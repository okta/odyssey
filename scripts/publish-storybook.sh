#!/bin/bash

source $OKTA_HOME/$REPO/scripts/setup.sh

cd $OKTA_HOME/$REPO

get_terminus_secret "/" aws_access_key_id AWS_ACCESS_KEY_ID
get_terminus_secret "/" aws_secret_access_key AWS_SECRET_ACCESS_KEY

echo "SHA7=$(git rev-parse --short ${{ github.event.pull_request.head.sha || github.sha }})" >> $GITHUB_ENV
echo "URL_STORYBOOK="https://${SHA7}.ods.dev"" >> $GITHUB_ENV
echo "COMMIT_MSG=${{ github.event.head_commit.message || github.event.pull_request.title }}" >> $GITHUB_ENV

yarn build && cd ./packages/odyssey-storybook && rm -rf ./node_modules/.cache && yarn build

aws s3 sync ./packages/odyssey-storybook/dist/ s3://ods.dev/$SHA7 --delete

bash ./notify-slack.sh

echo "Publishing to Storybook"
if ! lerna_publish; then
  echo "ERROR: Storybook Publish has failed."
  exit $PUBLISH_ARTIFACTORY_FAILURE
else
  echo "Publish successful."
  echo $URL_STORYBOOK
fi

exit $SUCCESS
