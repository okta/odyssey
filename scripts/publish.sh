#!/bin/bash

# source $OKTA_HOME/$REPO/scripts/setup.sh
# setup_service node v18.12.0
# setup_service yarn 1.22.19

# Install required dependencies
yarn global add @okta/ci-append-sha
yarn global add @okta/ci-pkginfo

export PATH="${PATH}:$(yarn global bin)"
export TEST_SUITE_TYPE="build"
export PUBLISH_REGISTRY="${ARTIFACTORY_URL}/api/npm/npm-topic"

# Append a SHA to the version in package.json 
# if ! ci-append-sha; then
#   echo "ci-append-sha failed! Exiting..."
#   exit $FAILED_SETUP
# fi

npm config set @okta:registry ${PUBLISH_REGISTRY}
PACKAGES=$(echo odyssey-{design-tokens,babel-preset,babel-loader,react-mui} browserslist-config-odyssey)

for PACKAGE_NAME in $PACKAGES; do
  echo "Starting to process ${PACKAGE_NAME}"
  cd $OKTA_HOME/$REPO/$PACKAGE_NAME/dist
  if ! npm publish --unsafe-perm; then
    echo "npm publish failed! Exiting..."
    exit $PUBLISH_ARTIFACTORY_FAILURE
  fi

  # upload artifact version to eng prod s3 to be used by downstream jobs
  artifact_version="$(ci-pkginfo -t pkgname)@$(ci-pkginfo -t pkgsemver)"
  if upload_job_data global artifact_version ${artifact_version}; then
    echo "Upload $PACKAGE_NAME job data artifact_version=${artifact_version} to s3!"
  else
    # only echo the info since the upload is not crucial
    echo "Fail to upload $PACKAGE_NAME job data artifact_version=${artifact_version} to s3!" >&2
  fi

  echo "Finished processing ${PACKAGE_NAME}"
done

# exit $SUCCESS
