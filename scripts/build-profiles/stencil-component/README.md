@okta/build-profiles.stencil-component
================================

The **stencil-component** build profile exports commands to build and test a [Stencil Component](https://stenciljs.com/docs/introduction/).

<!-- TOC -->

- [Commands](#commands)
  - [build](#build)
    - [--production](#--production)
    - [--verbose](#--verbose)
    - [--help](#--help)
  - [test](#test)
      - [--watch](#--watch)
      - [--watchAll](#--watchall)
      - [--coverage](#--coverage)
      - [-t](#-t)
      - [--verbose](#--verbose-1)
      - [--help](#--help-1)

<!-- /TOC -->

## Commands

> Commands **must** be run in the folder of the consuming app. They are typically run with the app's [run scripts](https://docs.npmjs.com/misc/scripts).

### build

Builds the app with the [Stencil compiler](https://github.com/ionic-team/stencil), using the base configuration found in [stencil.config.js](stencil.config.js).

```bash
[packages/{stencil-component}]$ yarn build
```

#### --production

Generates a production build. Defaults to `true`.

```bash
[packages/{stencil-component}]$ yarn build --production false
```

#### --verbose

Runs with verbose logging. Defaults to `false`.

```bash
[packages/{stencil-component}]$ yarn build --verbose
```

#### --help

Shows these options in the console.

```bash
[packages/{stencil-component}]$ yarn build --help
```

### test

Runs unit tests with [Jest](http://jestjs.io/docs/en/getting-started), using the configuration file found in [jest.config.js](jest.config.js). You can use any of the [Jest CLI Options](http://jestjs.io/docs/en/cli), with some of the more popular options listed below.

##### --watch

Watch files for changes and rerun tests related to changed files. If you want to rerun all tests when a file has changed, use the --watchAll option instead.

```bash
[packages/{stencil-component}]$ yarn test --watch
```

##### --watchAll

Watch files for changes and rerun all tests when something changes. If you want to rerun only the tests that depend on the changed files, use the --watch option.

```bash
[packages/{stencil-component}]$ yarn test --watchAll
```

##### --coverage

Indicates that test coverage information should be collected and reported in the output.

```bash
[packages/{stencil-component}]$ yarn test --coverage
```

##### -t

Run tests that match this spec name (match against the name in describe or test).

```bash
[packages/{stencil-component}]$ yarn test -t name-of-spec
```

##### --verbose

Display individual test results with the test suite hierarchy.

```bash
[packages/{stencil-component}]$ yarn test --verbose
```

##### --help

Display the full list of Jest CLI options.

```bash
[packages/{stencil-component}]$ yarn test --help
```
