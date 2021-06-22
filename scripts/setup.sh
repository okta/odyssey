#!/bin/bash

echo "installing node v12.20.0"
if setup_service node v12.20.0; then
  echo "Installed node v12.20.0 successfully"
else
  echo "node v12.20.0 installation failed."
fi

echo "installing yarn 1.22.10"
if setup_service yarn 1.22.10; then
  echo "Yarn v1.22.10 installed."
else
  echo "Yarn installation failed!"
fi

cd ${OKTA_HOME}/odyssey

if ! yarn install; then
  echo "yarn install command failed! Exiting..."
  exit ${FAILED_SETUP}
fi
