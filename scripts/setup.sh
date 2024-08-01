#!/bin/bash

echo "Setting up CI environment for Bacon"


yum install gnupg2 --allowerasing -y

if ! setup_service node-and-yarn $(cat "${OKTA_HOME}"/"${REPO}"/.nvmrc) "1.22.19"; then
  echo "Failed to install node! Exiting..."
  report_results FAILURE failed_setup
  exit 1
fi

cd ${OKTA_HOME}/${REPO}

# Temporary Puppeteer fix until Applitools upgrades their version to >22.1.0 https://github.com/puppeteer/puppeteer/issues/12094#issuecomment-1999345951
export PUPPETEER_DOWNLOAD_BASE_URL="https://storage.googleapis.com/chrome-for-testing-public"

if ! yarn install --immutable; then
  echo "yarn install command failed! Exiting..."
  exit ${FAILED_SETUP}
fi

export ORIGINAL_REPO=$REPO
export CURRENT_DIR=$(pwd)
