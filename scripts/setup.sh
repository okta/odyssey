#!/bin/bash

NODE_VERSION=lts/gallium

echo "installing node ${NODE_VERSION}"
if setup_service node $NODE_VERSION; then
  echo "Installed node ${NODE_VERSION} successfully"
else
  echo "node ${NODE_VERSION} installation failed."
fi

# Note: Yarn will automatically switch over to yarn 3 after installing yarn 1.x
YARN_VERSION=1.22.17

echo "installing yarn v${YARN_VERSION}"
if setup_service yarn $YARN_VERSION; then
  echo "Yarn v${YARN_VERSION} installed."
else
  echo "Yarn v${YARN_VERSION} installation failed!"
fi

cd ${OKTA_HOME}/odyssey

# Override .yarnrc.yml npmRegistryServer with Okta's
yarn config set npmRegistryServer ${ARTIFACTORY_URL}/api/npm/npm-okta-master

if ! yarn install --immutable; then
  echo "yarn install command failed! Exiting..."
  exit ${FAILED_SETUP}
fi
