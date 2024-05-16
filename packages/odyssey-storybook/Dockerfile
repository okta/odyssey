FROM mcr.microsoft.com/playwright:v1.44.0-jammy

# copy project (including tests)
COPY /root/okta/odyssey /odyssey

WORKDIR /odyssey

RUN ls -a

# Install dependencies
# RUN yarn install
RUN npm install

# Navigate to storybook package
RUN cd packages/odyssey-storybook

# Install browsers
RUN npx playwright install

# Run playwright test
CMD [ "yarn", "workspace", "@okta/odyssey-storybook", "ci:dev:interactionTest", "--reporter=list" ]