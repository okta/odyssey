@okta/build-tools.components
================================

The **components** build tools export commands to build, run, and test different components.

<!-- TOC -->

- [Commands](#commands)
  - [build](#build)
    - [--type](#--type)
    - [--help](#--help)
  - [start](#start)
    - [--type](#--type-1)
    - [--help](#--help-1)
  - [test](#test)
    - [--watch](#--watch)
    - [--watchAll](#--watchall)
    - [--coverage](#--coverage)
    - [-t](#-t)
    - [--verbose](#--verbose)
    - [--help](#--help-2)

<!-- /TOC -->

## Commands

> Commands **must** be run in the folder of the consuming app. They are typically run with the app's [run scripts](https://docs.npmjs.com/misc/scripts).

### build

Builds a component app based on the specified output **type**. By default, the [Stencil compiler](https://github.com/ionic-team/stencil) is used.

```bash
[packages/{component}]$ yarn build
```

#### --type

Specify which type of components to build. Defaults to **stencil**.

```bash
[packages/{component}]$ yarn build --type stencil
```

#### --help

Display the full list of CLI options.

```bash
[packages/{component}]$ yarn build --help
```

### start

Starts the [Storybook](https://storybook.js.org/) component playground based on the specified component **type**.

```bash
[packages/{component}]$ yarn start
```

#### --type

Specify which type of components to build. Defaults to **stencil**.

```bash
[packages/{component}]$ yarn start --type stencil
```

#### --help

Display the full list of CLI options.

```bash
[packages/{component}]$ yarn start --help
```

### test

Runs unit tests with [Jest](http://jestjs.io/docs/en/getting-started), using the configuration file found in a supplied `jest.config.js` file. You can use any of the [Jest CLI Options](http://jestjs.io/docs/en/cli), with some of the more popular options listed below.

#### --watch

Watch files for changes and rerun tests related to changed files. If you want to rerun all tests when a file has changed, use the --watchAll option instead.

```bash
[packages/{component}]$ yarn test --watch
```

#### --watchAll

Watch files for changes and rerun all tests when something changes. If you want to rerun only the tests that depend on the changed files, use the --watch option.

```bash
[packages/{component}]$ yarn test --watchAll
```

#### --coverage

Indicates that test coverage information should be collected and reported in the output.

```bash
[packages/{component}]$ yarn test --coverage
```

#### -t

Run tests that match this spec name (match against the name in describe or test).

```bash
[packages/{component}]$ yarn test -t name-of-spec
```

#### --verbose

Display individual test results with the test suite hierarchy.

```bash
[packages/{component}]$ yarn test --verbose
```

#### --help

Display the full list of Jest CLI options.

```bash
[packages/{component}]$ yarn test --help
```
