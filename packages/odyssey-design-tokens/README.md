# @okta/odyssey-design-tokens

## Production Readiness

This project has not yet hit version 1.0.0 and is still in active development.

That said, it is beyond the early alpha stage in some key areas. For some
early-adopters that means it is good enough to use for real things. Some
other people think this means it is not ready yet.

Even though the project is in development, effort is still made to keep
the API stable. Patch versions are intended for backwards-compatible
changes and minor versions are intended for backwards-incompatible changes.

If you plan to use this for something real, you should either pin the
exact version (maximum safety) or pin the major and minor versions
(only accept backwards-compatible upgrades).

## Getting Started

Install the package:

```sh
$ yarn add @okta/odyssey-design-tokens
```

Import named ESM exports:

```js
import { * as Tokens } from "@okta/odyssey-design-tokens";
```

## Tokens

Tokens are published in two formats: ESM and SCSS.
