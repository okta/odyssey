# @okta/odyssey-react-labs

## Production Readiness

Odyssey is production-ready and available to use for real things. The API
is stable for the duration of the point-release, meaning that while Odyssey is
in version 1.x.x, there will be no changes that break the API.

**Odyssey Labs** is the home for components that are usable, but not feature-complete.
At minimum, they'll provide a good jumping-off point for your project; however, they
are not guaranteed to have full support for the full suite of things that Odyssey
provides, such as RTL support, internationalization, etc.

This project follows semantic versioning conventions:

- **Major point releases** may include breaking changes, but the API is stable for the duration of
  the major point release (for example, 1.x.x)
- **Minor point releases** include new features and are backwards-compatible (eg, x.1.x)
- **Patch releases** include bug fixes (eg, x.x.1)

## Getting Started

To use Odyssey Labs, import as:

```sh
import from "@okta/odyssey-react-mui/labs"
```

## Components

Components are published in an ESM format transpiled for the modern browsers
within the [Okta supported browser list][1]. These modules can be served
directly to evergreen browsers for simple applications, or further transpiled,
bundled, and polyfilled for advanced use cases and browser support targets.

[1]: https://help.okta.com/en/prod/Content/Topics/Miscellaneous/Platforms_Browser_OS_Support.htm

## License

[Apache Version 2.0](https://github.com/atko-eng/odyssey-design-system/blob/master/LICENSE)

## Support Disclaimer

This library is community supported and is maintained by members of the Okta team for developers and IT professionals.
This library is not an official Okta product and does not qualify for any Okta support. Anyone who chooses to use this
library must ensure that their implementation meets any applicable legal obligations including any Okta terms and conditions.
