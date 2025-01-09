#!/bin/bash

echo "Setting up CI environment for Bacon"


yum install gnupg2 --allowerasing -y

if ! setup_service node-and-yarn $(cat "${OKTA_HOME}"/"${REPO}"/.nvmrc) "1.22.19"; then
  echo "Failed to install node! Exiting..."
  report_results FAILURE failed_setup
  exit 1
fi

cd ${OKTA_HOME}/${REPO}

# ESLint takes up too much RAM after upgrading to v9. This is a workaround: https://stackoverflow.com/a/54456814.
export NODE_OPTIONS="--max-old-space-size=4096"

if ! yarn install --immutable; then
  echo "yarn install command failed! Exiting..."
  exit ${FAILED_SETUP}
fi

export ORIGINAL_REPO=$REPO
export CURRENT_DIR=$(pwd)
