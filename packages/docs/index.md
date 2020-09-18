---
  template: home
  headline: Odyssey Design System
  lead: Odyssey is Okta’s design system which consists of UI’s, guides, and resources to build products.
  contentPrimary:
    - title: Base
      description: Et morbi eget at consectetur. Elit aenean mi phasellus. Et iusto odio atque dignissimos ducimus qui blanditiis praesentium voluptatum deleniti animi.
      label: See them
      href: /base/
    - title: Components
      description: Et morbi eget at consectetur. Elit aenean mi phasellus. Et iusto odio atque dignissimos ducimus qui blanditiis praesentium voluptatum deleniti animi.
      label: See them
      href: /components/
    - title: Icons
      description: Et morbi eget at consectetur. Elit aenean mi phasellus. Et iusto odio atque dignissimos ducimus qui blanditiis praesentium voluptatum deleniti animi.
      label: See them
      href: /icons/
  principle: 
    title: How we build
    description: We welcome all feedback, designs, or ideas in order to produce the best possible experience for our users. If you’re interested in contributing, check out our contributing guidelines to get started.
    label: Learn more
    href: /base/
  resources:
    - title: GitHub
      description: Et morbi eget at consectetur. Elit aenean mi phasellus. Et iusto odio atque dignissimos ducimus qui blanditiis praesentium voluptatum deleniti animi.
      label: Learn more
      href: /base/
    - title: Figma kit
      description: Et morbi eget at consectetur. Elit aenean mi phasellus. Et iusto odio atque dignissimos ducimus qui blanditiis praesentium voluptatum deleniti animi.
      label: Learn more
      href: /components/
  contentSecondary:
    - title: Principles
      description: Et morbi eget at consectetur. Elit aenean mi phasellus. Et iusto odio atque dignissimos ducimus qui blanditiis praesentium voluptatum deleniti animi.
      label: Learn more
      href: /base/
    - title: Our team
      description: Et morbi eget at consectetur. Elit aenean mi phasellus. Et iusto odio atque dignissimos ducimus qui blanditiis praesentium voluptatum deleniti animi.
      label: Learn more
      href: /components/
    - title: Get help
      description: Et morbi eget at consectetur. Elit aenean mi phasellus. Et iusto odio atque dignissimos ducimus qui blanditiis praesentium voluptatum deleniti animi.
      label: Learn more
      href: /icons/
---

::: slot nimatron-all

# Odyssey - the Okta design system

This is the home for Okta's Design System "Odyssey". Here you will find assets to build high quality UIs along with documentation to guide you along the way.

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

### Serving the Docs

1. Start up Hexo:

    ```bash
     [okta/odyssey/packages/docs]$ yarn start
    ```

    This will generate a fresh set of docs and then start a webserver to view them.

2. Go to <http://localhost:4000/>

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

Stop by [#odyssey](https://okta.slack.com/messages/C7T2H3KNJ) and say hello (Oktanauts-only for now).

:::
