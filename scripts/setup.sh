#!/bin/bash -x

echo "Setting up CI environment for Bacon"


yum install gnupg2 --allowerasing -y

if ! setup_service node-and-yarn $(cat "${OKTA_HOME}"/"${REPO}"/.nvmrc) "1.22.19"; then
  echo "Failed to install node! Exiting..."
  report_results FAILURE failed_setup
  exit 1
fi


cd ${OKTA_HOME}/${REPO}

sleep 10m

if ! yarn install --immutable --inline-builds; then
  echo "yarn install command failed! Exiting..."
  exit ${FAILED_SETUP}
fi

export ORIGINAL_REPO=$REPO
export CURRENT_DIR=$(pwd)
