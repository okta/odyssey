# Odyssey - the Okta design system

This is the home for Odyssey, Okta's design system. Here you will find assets to build high quality UIs along with documentation to guide you along the way.

## Contributing

### Grab all the things

These docs are maintained in the `docs` package, which exists to document `@okta/odyssey`.

1. You'll need the `odyssey` repo.

    ```bash
    [okta]$ git clone git@github.com:okta/odyssey.git
    ```

2. Make sure you are on a supported node version: `>=12.13.0`.

3. Change directory to the `docs` package.

    ```bash
    [okta]$ cd odyssey/packages/docs
    ```

4. Run a [yarn install](https://yarnpkg.com/en/docs/cli/install)

    ```bash
    [okta/odyssey/packages/docs]$ yarn install
    ```

You may need to [install yarn](https://yarnpkg.com/en/docs/install) if it's not available.

### Serving the docs

1. Start up VuePress:

    ```bash
    [okta/odyssey/packages/docs]$ yarn start
    ```

    This will generate a fresh set of docs and then start a webserver to view them.

2. Go to <http://localhost:8080/>

### Odyssey development

In order to see your changes to the `@okta/odyssey` package reflected here during development, you'll need to link that package locally.

1. Change directory to the `@okta/odyssey` package.

    ```bash
    [okta/odyssey]$ cd packages/odyssey
    ```

2. Create a yarn link.

    ```bash
    [okta/odyssey/packages/odyssey]$ yarn link
    ```

3. Change directory to the `docs` package.

    ```bash
    [okta/odyssey/packages/odyssey]$ cd ../docs
    ```

4. Tell `yarn` to utilize the linked package instead of the published one.

    ```bash
    [okta/odyssey/packages/docs]$ yarn link @okta/odyssey
    ```

Now any changes you make in your local version of `@okta/odyssey` should be reflected in your local server.

## Questions?

Stop by [#design_system](https://okta.slack.com/messages/C7T2H3KNJ) and say hello (Oktanauts-only for now).
