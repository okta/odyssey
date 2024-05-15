#!/bin/bash

echo "Setting up CI environment for Bacon"

REPO=odyssey

REPO_DIR="${OKTA_HOME}/${REPO}"

NODE_VERSION=$(cat "${REPO_DIR}/.nvmrc")
YARN_VERSION=1.22.19

yum install gnupg2 --allowerasing -y

echo "installing node ${NODE_VERSION}"
if setup_service node ${NODE_VERSION}; then
  echo "Installed node ${NODE_VERSION} successfully"
else
  echo "Node ${NODE_VERSION} installation failed."
  exit ${FAILED_SETUP}
fi

echo "installing yarn v${YARN_VERSION}"
if setup_service yarn ${YARN_VERSION}; then
  echo "Installed yarn ${YARN_VERSION} successfully"
else
  echo "Yarn ${YARN_VERSION} installation failed."
  exit ${FAILED_SETUP}
fi

cd ${OKTA_HOME}/${REPO}

# TODO: typescript wants to update to 5.4.3 and fails if immutable flag is set
# if ! yarn install --immutable; then
if ! yarn install; then
  echo "Installing dependencies failed! Exiting..."
  exit ${FAILED_SETUP}
fi

export ORIGINAL_REPO=$REPO
export CURRENT_DIR=$(pwd)
