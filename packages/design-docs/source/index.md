# Odyssey - the Okta design system

Hello and welcome! These are the early days of Okta's design system, and things will be in flux for a while. Feel free to poke around, test things out, and explore our guidelines.

## Contributing

### Grab All the Things

These docs are maintained in the `design-docs` package, which exists to document `@okta/nim`.

1. You'll need the `okta-ui` repo.
    ```bash
    [okta]$ git clone git@github.com:okta/okta-ui.git
    ```
2. Make sure you are on the right node version - node 8.1.1.

3. Change directory to the `design-docs` package.
    ```bash
    [okta]$ cd okta-ui/packages/design-docs
    ```

4. Run a [yarn install](https://yarnpkg.com/en/docs/cli/install)
    ```bash
    [okta/okta-ui/packages/design-docs]$ yarn install
    ```

You may need to [install yarn](https://yarnpkg.com/en/docs/install) if it's not available.

### Serving the Docs

1. Start up Hexo:
    ```bash
     [okta/okta-ui/packages/design-docs]$ yarn start
    ```

    This will generate a fresh set of docs and then start a webserver to view them.

2. Go to <http://localhost:400/>

### Odyssey Development

In order to see your changes to the `@okta/nim` package reflected here during development, you'll need to link that package locally.

1. Change directory to the `@okta/nim` package.
    ```bash
    [okta/okta-ui]$ cd packages/nim
    ```

2. Create a yarn link.
    ```bash
    [okta/okta-ui/packages/nim]$ yarn link
    ```

3. Change directory to the `design-docs` package.
    ```bash
    [okta/okta-ui/packages/nim]$ cd ../design-docs
    ```

4. Tell `yarn` to utilize the linked package instead of the published one.
    ```bash
    [okta/okta-ui/packages/design-docs]$ yarn link @okta/nim
    ```

Now any changes you make in your local version of `@okta/nim` should be reflected in your local server.

## Questions?

Stop by [#design_system](https://okta.slack.com/messages/C7T2H3KNJ) and say hello (Oktanauts-only for now).
