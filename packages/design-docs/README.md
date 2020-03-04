Welcome to our design system docs!

Our [design system](https://oktawiki.atlassian.net/wiki/spaces/UX/pages/286458744/Design+System+Project) will provide and document the styles and components we use throughout Okta. Our first step is a visual inventory of Courage components.

`/design-docs/` is built separately from the rest of Courage, and will eventually be moved to a separate repo.

# Getting Started

1. Clone this repo
    ```bash
    [okta]$ git clone git@github.com:okta/courage.git
    ```
2. Make sure you are on the right node version - node 8.1.1.

3. `cd` into this directory
    ```bash
    [okta]$ cd courage/packages/design-docs
    ```

4. Run a [yarn install](https://yarnpkg.com/en/docs/cli/install)
    ```bash
    [okta/courage/packages/design-docs]$ yarn install
    ```
_[install yarn](https://yarnpkg.com/en/docs/install) if it's not available in your system yet_

## Serving the Docs

1. Start up Hexo:
    ```bash
     [okta/courage/packages/design-docs]$ yarn start
    ```

    This will generate a fresh set of docs and then start a webserver to view them.

2. Go to <http://localhost:4000/>

# Development

Markdown content is intended to be portable and long-living.

Build tools will be replaced and documented as we progress.

# Questions?

Ask [@edburyenegren-okta](https://github.com/edburyenegren-okta).
