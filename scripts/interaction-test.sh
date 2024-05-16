#!/bin/bash

cd $OKTA_HOME/$REPO

setup_service docker

docker build -t storybook-interaction-tests . && docker run --rm storybook-interaction-tests

exit $PUBLISH_TYPE_AND_RESULT_DIR;