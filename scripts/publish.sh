#!/bin/bash

source $OKTA_HOME/$REPO/scripts/setup.sh

cd $OKTA_HOME/$REPO

PUBLISH_SHA="$(git rev-parse --short $SHA)"
PUBLISH_REGISTRY="${ARTIFACTORY_URL}/api/npm/npm-topic"
CURRENT_VERSION=$(< lerna.json jq -r '.version')
TAGGED_VERSION=$CURRENT_VERSION-$PUBLISH_SHA

npm config set @okta:registry ${PUBLISH_REGISTRY}

function lerna_publish() {
  MY_CMD="yarn run lerna publish from-package --force-publish=* --ignore-changes --no-push --no-git-tag-version --no-verify-access --registry \"${PUBLISH_REGISTRY}\" --yes"
  echo "Running ${MY_CMD}"
  ${MY_CMD}
}

lerna_json_contents="$(jq '.version = "'$TAGGED_VERSION'"' $OKTA_HOME/$REPO/lerna.json)" && \
echo -E "${lerna_json_contents}" > $OKTA_HOME/$REPO/lerna.json

echo "Publishing to artifactory"
# assume all files unchanged for lerna publish
git update-index --assume-unchanged scripts/publish.sh
git update-index --assume-unchanged yarn.lock
git update-index --assume-unchanged lerna.json
if ! lerna_publish; then
  echo "ERROR: Lerna Publish has failed."
  exit $PUBLISH_ARTIFACTORY_FAILURE
else
  echo "Publish successful. Sending promotion message"
fi

exit $SUCCESS
