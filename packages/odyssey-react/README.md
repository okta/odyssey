# @okta/odyssey-react

## Production Readiness

This project has not yet hit version 1.0.0 and is still in active development. Test change here

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
$ yarn add @okta/odyssey-react
```

Include fonts:

```html
<link rel="preconnect" href="https://fonts.gstatic.com" />
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css2?family=Public+Sans:ital,wght@0,400;0,600;1,400;1,600&display=swap"
/>
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css2?family=Inconsolata&display=swap"
/>
```

Import named ESM exports:

```js
import { Button } from "@okta/odyssey-react";
```

## Components

Components are published in an ESM format transpiled for the modern browsers
within the [Okta supported browser list][1]. These modules can be served
directly to evergreen browsers for simple applications, or further transpiled,
bundled, and polyfilled for advanced use cases and browser support targets.

[1]: https://help.okta.com/en/prod/Content/Topics/Miscellaneous/Platforms_Browser_OS_Support.htm

## License

[Apache Version 2.0](https://github.com/okta/odyssey/blob/master/LICENSE)

## Support Disclaimer

This library is community supported and is maintained by members of the Okta team for developers and IT professionals.
This library is not an official Okta product and does not qualify for any Okta support. Anyone who chooses to use this
library must ensure that their implementation meets any applicable legal obligations including any Okta terms and conditions.
