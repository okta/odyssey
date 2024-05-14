#!/bin/bash

# echo "SHA: $SHA\n"

source $OKTA_HOME/$REPO/scripts/setup.sh

echo "current directory:\n"
pwd

PUBLISH_SHA="-$(git rev-parse --short $SHA)"

export PATH="${PATH}:$(yarn global bin)"
export TEST_SUITE_TYPE="build"
export PUBLISH_REGISTRY="${ARTIFACTORY_URL}/api/npm/npm-topic"

function lerna_publish() {
#   MY_CMD="yarn lerna-publish --loglevel silly --dist-tag \"${PUBLISH_SHA}\" --registry \"${PUBLISH_REGISTRY}\" --yes --no-push --no-git-tag-version"
  MY_CMD="yarn run lerna publish from-package --no-push --no-git-tag-version --no-verify-access --registry \"${PUBLISH_REGISTRY}\" --yes"
  echo "Running ${MY_CMD}"
  ${MY_CMD}
}

# yarn run lerna-version --yes
npm config set @okta:registry ${PUBLISH_REGISTRY}
PACKAGES=$(echo odyssey-{design-tokens,babel-preset,babel-loader,react-mui} browserslist-config-odyssey)
CURRENT_VERSION=$(< lerna.json jq -r '.version')

# if ! npm publish --access=public --unsafe-perm; then
#   echo "npm publish failed! Exiting..."
#   exit $PUBLISH_ARTIFACTORY_FAILURE
# fi

# echo "Publishing to artifactory, yarn run lerna-publish"
cd $OKTA_HOME/$REPO
# git update-index --assume-unchanged .yarnrc.yml
if ! lerna_publish; then
  echo "ERROR: Lerna Publish has failed."
  exit $PUBLISH_ARTIFACTORY_FAILURE
else
  echo "Publish successful. Sending promotion message"
fi

# for PACKAGE_NAME in $PACKAGES; do
#   echo "Starting to process ${PACKAGE_NAME}"
#   pwd
#   cd packages
#   pwd
#   cd $PACKAGE_NAME
#   pwd
#   ls
#   echo "^ should print directory contents"
# #   cd $OKTA_HOME/$REPO/packages/$PACKAGE_NAME/dist
#   if ! npm publish --unsafe-perm; then
#     echo "npm publish failed! Exiting..."
#     exit $PUBLISH_ARTIFACTORY_FAILURE
#   fi

#   # upload artifact version to eng prod s3 to be used by downstream jobs
#   artifact_version="$(ci-pkginfo -t pkgname)@$(ci-pkginfo -t pkgsemver)"
#   if upload_job_data global artifact_version ${artifact_version}; then
#     echo "Upload $PACKAGE_NAME job data artifact_version=${artifact_version} to s3!"
#   else
#     # only echo the info since the upload is not crucial
#     echo "Fail to upload $PACKAGE_NAME job data artifact_version=${artifact_version} to s3!" >&2
#   fi

#   echo "Finished processing ${PACKAGE_NAME}"
# done

exit $SUCCESS
