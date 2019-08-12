#!/bin/bash

cd ${OKTA_HOME}/${REPO}

# Revert the cache-min setting, since the internal cache does not apply to
# these repos (and causes problems in lookups)
npm config set cache-min 10

# Add yarn to the $PATH so npm cli commands do not fail
export PATH="${PATH}:$(yarn global bin)"

if ! npm install; then
  echo "npm install failed! Exiting..."
  exit ${FAILED_SETUP}
fi
