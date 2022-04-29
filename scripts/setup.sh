#!/bin/bash

NODE_VERSION=v16.15.0

echo "installing node ${NODE_VERSION}"
if setup_service node $NODE_VERSION; then
  echo "Installed node ${NODE_VERSION} successfully"
else
  echo "node ${NODE_VERSION} installation failed."
fi

YARN_VERSION=1.22.17

echo "installing yarn v${YARN_VERSION}"
if setup_service yarn $YARN_VERSION; then
  echo "Yarn v${YARN_VERSION} installed."
else
  echo "Yarn v${YARN_VERSION} installation failed!"
fi

cd ${OKTA_HOME}/odyssey

if ! yarn install --frozen-lockfile; then
  echo "yarn install command failed! Exiting..."
  exit ${FAILED_SETUP}
fi
