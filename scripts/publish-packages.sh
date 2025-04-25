#!/bin/bash

source $OKTA_HOME/$REPO/scripts/setup.sh

cd $OKTA_HOME/$REPO

PUBLISH_SHA="$(git rev-parse --short $SHA)"
PUBLISH_REGISTRY="${ARTIFACTORY_URL}/api/npm/npm-topic"
CURRENT_VERSION=$(< lerna.json jq -r '.version')
TAGGED_VERSION=$CURRENT_VERSION-$PUBLISH_SHA

npm config set @okta:registry ${PUBLISH_REGISTRY}

function lerna_publish() {
  # use lerna to publish without making a commit to the repo
  MY_CMD="yarn run lerna publish from-package --force-publish=* --ignore-changes --no-push --no-git-tag-version --no-verify-access --registry \"${PUBLISH_REGISTRY}\" --yes"
  echo "Running ${MY_CMD}"
  ${MY_CMD}
}

# prevent local changes from being reported so lerna can publish
git checkout .

# All packages are built by `prepack`.

# update version with commit SHA to allow lerna to publish
FILES_TO_UPDATE_VERSION="lerna.json packages/odyssey-design-tokens/package.json packages/odyssey-react-mui/package.json packages/browserslist-config-odyssey/package.json packages/odyssey-storybook/package.json"
for PATH_AND_FILE in $FILES_TO_UPDATE_VERSION; do
  FULL_PATH="$OKTA_HOME/$REPO/$PATH_AND_FILE"
  json_contents="$(jq '.version = "'$TAGGED_VERSION'"' $FULL_PATH)" && \
  echo -E "${json_contents}" > $FULL_PATH
  git update-index --assume-unchanged $FULL_PATH
done

yarn workspace @okta/odyssey-react-mui generate:wcVersion

echo "Publishing to artifactory"
if ! lerna_publish; then
  echo "ERROR: Lerna Publish has failed."
  exit $PUBLISH_ARTIFACTORY_FAILURE
else
  echo "Publish successful. Sending promotion message"
fi

exit $SUCCESS
