FROM mcr.microsoft.com/playwright:v1.44.0-jammy

# copy project
COPY . /odyssey

# set working directory
WORKDIR /odyssey

# Install dependencies
RUN yarn install

# Install playwright dependencies
CMD [ "yarn", "workspace", "@okta/odyssey-storybook", "playwright", "install", "--with-deps", "chromium" ]

# Run storybook tests
CMD [ "yarn", "workspace", "@okta/odyssey-storybook", "ci:dev:interactionTest", "--reporter=list" ]
