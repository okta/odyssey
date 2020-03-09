#!/bin/bash

source ${OKTA_HOME}/${REPO}/scripts/setup.sh

REGISTRY="${ARTIFACTORY_URL}/api/npm/npm-okta"
DOC_DEPLOY_BRANCH="master"
LERNA_PUBLISH_LOG="/tmp/odyssey-lerna-publish.log"

export TEST_SUITE_TYPE="build"

function lerna_publish() {
  yarn lerna-publish --registry ${REGISTRY} --yes | tee ${LERNA_PUBLISH_LOG}
}

function send_promotion_message() {
  curl -H "Authorization: Bearer ${TESTSERVICE_SLAVE_JWT}" \
    -H "Content-Type: application/json" \
    -X POST -d "[{\"artifactId\":\"$1\",\"repository\":\"npm-okta\",\"artifact\":\"$2\",\"version\":\"$3\",\"promotionType\":\"ARTIFACT\"}]" \
    -k "${APERTURE_BASE_URL}/v1/artifact-promotion/createPromotionEvent"
}

if [ -n "${action_branch}" ]; then
  echo "Publishing from bacon task using branch ${action_branch}"
  TARGET_BRANCH=${action_branch}
else
  echo "Publishing from bacon testSuite using branch ${BRANCH}"
  TARGET_BRANCH=${BRANCH}
fi

if ! lerna_publish; then
  exit ${BUILD_FAILURE}
fi

# Publish design docs if deploy branch
if [[ "${TARGET_BRANCH}" == "${DOC_DEPLOY_BRANCH}" ]]; then
  echo "Generating design docs and publishing package"

  ARTIFACT_FILE=$(grep '@okta/design-docs@' ${LERNA_PUBLISH_LOG} | sed 's/.*\(design-docs\)@\([^ ]*\)/\1-\2/g' | uniq)".tgz"
  echo "Artifact file is ${ARTIFACT_FILE}"

  DEPLOY_VERSION="$([[ ${ARTIFACT_FILE} =~ design-docs-(.*)\.tgz ]] && echo ${BASH_REMATCH[1]})"
  echo "Deploy version is ${DEPLOY_VERSION}"

  ARTIFACT="@okta/design-docs/-/@okta/${ARTIFACT_FILE}"
  echo "Artifact is ${ARTIFACT}"

  if ! send_promotion_message "design-docs" "${ARTIFACT}" "${DEPLOY_VERSION}"; then
    echo "Error sending design-docs promotion event to aperture"
    exit ${BUILD_FAILURE}
  fi
fi

FINAL_PUBLISHED_VERSIONS=$(<${OKTA_HOME}/odyssey/test-reports/publish/published-versions.txt)
log_custom_message "Published Versions" "$FINAL_PUBLISHED_VERSIONS"

exit ${SUCCESS}
