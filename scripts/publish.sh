#!/bin/bash

# echo "SHA: $SHA\n"

source $OKTA_HOME/$REPO/scripts/setup.sh

echo "current directory:\n"
pwd

PUBLISH_SHA="$(git rev-parse --short $SHA)"

export PATH="${PATH}:$(yarn global bin)"
export TEST_SUITE_TYPE="build"
export PUBLISH_REGISTRY="${ARTIFACTORY_URL}/api/npm/npm-topic"

echo "Artifactory URL: $PUBLISH_REGISTRY \n"

cd $OKTA_HOME/$REPO
# yarn run lerna-version --yes
npm config set @okta:registry ${PUBLISH_REGISTRY}
PACKAGES=$(echo odyssey-{design-tokens,babel-preset,babel-loader,react-mui} browserslist-config-odyssey)
CURRENT_VERSION=$(< lerna.json jq -r '.version')
TAGGED_VERSION=$CURRENT_VERSION-$PUBLISH_SHA

function lerna_publish() {
#   MY_CMD="yarn lerna-publish --loglevel silly --dist-tag \"${PUBLISH_SHA}\" --registry \"${PUBLISH_REGISTRY}\" --yes --no-push --no-git-tag-version"
  MY_CMD="yarn run lerna publish from-package --ignore-changes --no-push --no-git-tag-version --no-verify-access --registry \"${PUBLISH_REGISTRY}\" --yes"
  echo "Running ${MY_CMD}"
  ${MY_CMD}
}

lerna_json_contents="$(jq '.version = "'$TAGGED_VERSION'"' $OKTA_HOME/$REPO/lerna.json)" && \
echo -E "${lerna_json_contents}" > $OKTA_HOME/$REPO/lerna.json

echo "Publishing to artifactory"
git status
# git update-index --assume-unchanged scripts/publish.sh
# git update-index --assume-unchanged yarn.lock
git update-index --assume-unchanged --all
if ! lerna_publish; then
  echo "ERROR: Lerna Publish has failed."
  exit $PUBLISH_ARTIFACTORY_FAILURE
else
  echo "Publish successful. Sending promotion message"
fi

exit $SUCCESS
