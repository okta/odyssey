# @okta/odyssey-babel-preset

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
$ yarn add --dev @okta/odyssey-babel-preset
```

Reference the preset within your babel configuration:

```js
module.exports = {
  presets: [
    [
      "@okta/odyssey-babel-preset",
      {
        transformStyles: {
          identityObjectProxy: true,
        },
        react: {
          runtime: "classic",
        },
      },
    ],
  ],

  env: {
    production: {
      presets: [
        [
          "@okta/odyssey-babel-preset",
          {
            react: {
              runtime: "classic",
            },
          },
        ],
      ],
    },
  },
};
```

## License

[Apache Version 2.0](https://github.com/okta/odyssey/blob/master/LICENSE)

## Support Disclaimer

This library is community supported and is maintained by members of the Okta team for developers and IT professionals.
This library is not an official Okta product and does not qualify for any Okta support. Anyone who chooses to use this
library must ensure that their implementation meets any applicable legal obligations including any Okta terms and conditions.
