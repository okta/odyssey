#!/bin/bash

source ${OKTA_HOME}/${REPO}/scripts/setup.sh

REGISTRY="${ARTIFACTORY_URL}/api/npm/npm-okta"

npm install -g @okta/ci-update-package
npm install -g @okta/ci-pkginfo

export TEST_SUITE_TYPE="build"

if [ -n "${action_branch}" ]; then
  echo "Publishing from bacon task using branch ${action_branch}"
  TARGET_BRANCH=${action_branch}
else
  echo "Publishing from bacon testSuite using branch ${BRANCH}"
  TARGET_BRANCH=${BRANCH}
fi

# TEMPORARY: Navigate directly into a single package until we use lerna publish
cd ${OKTA_HOME}/${REPO}/packages/odyssey

if ! ci-update-package --branch ${TARGET_BRANCH}; then
  echo "ci-update-package failed! Exiting..."
  exit $FAILED_SETUP
fi

if ! npm publish --registry ${REGISTRY}; then
  echo "npm publish failed! Exiting..."
  exit ${PUBLISH_ARTIFACTORY_FAILURE}
fi

DATALOAD=$(ci-pkginfo -t dataload)
if ! artifactory_curl -X PUT -u ${ARTIFACTORY_CREDS} ${DATALOAD} -v -f; then
  echo "artifactory_curl failed! Exiting..."
  exit ${PUBLISH_ARTIFACTORY_FAILURE}
fi

popd

exit ${SUCCESS}
