[![Travis CI Status](http://img.shields.io/travis/okta/odyssey.svg?label=travis)](https://travis-ci.org/okta/odyssey/master)

# Odyssey

Odyssey is Okta’s official design system that consists of reusable components to design and build products, websites, and features.

**Table of Contents**

<!-- TOC depthFrom:2 -->

- [Getting Started](#getting-started)
    - [Running the Design System Docs](#running-the-design-system-docs)
- [Packages](#packages)
    - [Monorepo](#monorepo)
    - [Versioning](#versioning)
    - [Development](#development)
        - [Publishing a new version](#publishing-a-new-version)

<!-- /TOC -->

## Getting started

We use [Yarn](https://github.com/yarnpkg/yarn) as our node package manager client. To install Yarn, check out their [installation instructions](https://yarnpkg.com/getting-started/install).

```bash
# Clone this repo and navigate into it

git clone git@github.com:okta/odyssey.git
cd odyssey

# Install all package dependencies
yarn install
```

### Running the design system docs

Want to see Odyssey in action? Our `docs` package contains a static website styled using Odyssey. Simply run the following command to launch it:

```bash
# Generates the design docs website
yarn docs
```

Once the website is built, visit <http://localhost:8080/> in your browser.

## Packages

### Monorepo

This repository is managed as a **monorepo** using [Yarn Workspaces](https://yarnpkg.com/blog/2017/08/02/introducing-workspaces/) for dev dependencies and [Lerna](https://lernajs.io/) for everything else. You can think of each package as a separate npm module - each with their own dependencies, package name, and versioned using [Semantic Versioning](https://semver.org/).

Packages are parsed from the `workspaces` property in [package.json](package.json), and adhere to this structure:

```bash
packages/
  docs/
  odyssey-icons/
  odyssey/
  vuepress-theme-nimatron/
```

### Versioning

| Package | Status | Description |
| -------- | ----- | ------ |
| [odyssey](/packages/odyssey) | [![npm version](https://img.shields.io/npm/v/@okta/odyssey.svg?style=flat-square)](https://www.npmjs.com/package/@okta/odyssey) | All necessary SCSS and fonts to utilize Odyssey, Okta's design system. |

### Development

#### Publishing a new version

Before publishing a new version, ensure the following steps are performed:

1. All changes our outlined in the package's `CHANGELOG` file. If there are breaking changes, attempt to create a migration guide.

2. Increment the package versions following [Semantic Versioning](https://semver.org/).

    ```bash
    yarn lerna-version

    # Console output will appear similar to:
    ? Select a new version (currently 0.0.1) (Use arrow keys)
    ❯ Patch (0.0.2)
      Minor (0.1.0)
      Major (1.0.0)
      Prepatch (0.0.2-alpha.0)
      Preminor (0.1.0-alpha.0)
      Premajor (1.0.0-alpha.0)
      Custom Prerelease
      Custom Version
    ```

3. Commit your changes and submit the `CHANGELOG` for approval. Once approved, merge into `master`.

4. (*Internal use only*) Reach out in the `#odyssey` slack channel to promote the package to public NPM.
