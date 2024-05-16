#!/bin/bash

export CHROME_HEADLESS=true
setup_service google-chrome-stable 83.0.4103.61-1

source $OKTA_HOME/$REPO/scripts/setup.sh

cd $OKTA_HOME/$REPO

setup_service docker

docker pull mcr.microsoft.com/playwright:v1.44.0-jammy

docker run -it --rm --ipc=host mcr.microsoft.com/playwright:v1.44.0-jammy /bin/bash

# install apt-get
# dpkg -i apt.deb
# wget http://security.ubuntu.com/ubuntu/pool/main/a/apt/apt_1.0.1ubuntu2.17_amd64.deb -O apt.deb
if ! yarn workspace @okta/odyssey-storybook playwright install --with-deps chromium; then
  echo "playwright dependencies failed to install"
  exit ${PUBLISH_TYPE_AND_RESULT_DIR_BUT_ALWAYS_FAIL}
fi

# if ! yarn workspace @okta/odyssey-storybook coverage; then
#   echo "code coverage failed! Exiting..."
#   exit ${PUBLISH_TYPE_AND_RESULT_DIR_BUT_ALWAYS_FAIL}
# fi

exit $PUBLISH_TYPE_AND_RESULT_DIR;