# @okta/odyssey-react-mui

## Production Readiness

Odyssey is production-ready and available to use for real things. The API
is stable for the duration of the point-release, meaning that while Odyssey is
in version 1.x.x, there will be no changes that break the API.

This project follows semantic versioning conventions:

- **Major point releases** may include breaking changes, but the API is stable for the duration of
  the major point release (for example, 1.x.x)
- **Minor point releases** include new features and are backwards-compatible (eg, x.1.x)
- **Patch releases** include bug fixes (eg, x.x.1)

## Getting Started

Install the package and peer dependencies:

```sh
yarn add @okta/odyssey-react-mui
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
import { PasswordInput } from "@okta/odyssey-react-mui";
```

Add the Odyssey `OdysseyProvider` around your whole app:

```jsx
import { OdysseyProvider } from "@okta/odyssey-react-mui";

const YourAppRoot = ({ children }) => (
  <OdysseyProvider>{children}</OdysseyProvider>
);
```

Add Material-UI components not exported from Odyssey with Odyssey styling or add your own theme to MUI:

```sh
$ yarn add @mui/material
```

```jsx
import { OdysseyThemeProvider } from "@okta/odyssey-react-mui";

import { myMaterialUiTheme } from "./myMaterialUiTheme";

const YourAppRoot = ({ children }) => (
  <OdysseyThemeProvider theme={myMaterialUiTheme}>{children}<OdysseyThemeProvider>
);
```

### Upgrade Piecemeal

It’s possible to have 2 versions of Odyssey running at the same time, so when adding MUI, you can do it piecemeal.

This is how you setup two `OdysseyProvider`s like so:

```jsx
import { OdysseyProvider } from "@okta/odyssey-react-mui";
import { ThemeProvider as OdysseyLegacyThemeProvider } from "@okta/odyssey-react-theme";

const YourAppRoot = ({ children }) => (
  <OdysseyProvider>
    <OdysseyLegacyThemeProvider>{children}</OdysseyLegacyThemeProvider>
  </OdysseyProvider>
);
```

### Overrides

It is possible to provide `nonce`, `themeOverride`, `languageCode` and `translationOverrides` to the underlying components via props:

```jsx
import { OdysseyProvider } from "@okta/odyssey-react-mui";
import { theme } from "./themeOverride";

const nonce =
  "K6ybeaqlwaAKk0hQF?hE2qZ0Ar3M=G4Bpr-XFk1x4XbL3dH3T5=mk0aXeWX9ifn9";

const languageCode = "en";

const translationOverrides = {
  en: {
    "fieldlabel.optional.text": "Not Required",
  },
  fr: {
    "fieldlabel.optional.text": "Non Requis",
  },
};

const YourAppRoot = ({ children }) => (
  <OdysseyProvider
    nonce={nonce}
    themeOverride={theme}
    languageCode={languageCode}
    translationOverrides={translationOverrides}
  >
    {children}
  </OdysseyProvider>
);
```

### Generating ok-PL and ok-SK files

Right now we do not have the code to generate these files in Odyssey.

If you are an Okta employee, the easiest way to generate these files is to replace the English properties file of another project and run the build commands to get the ok-PL and ok-SK versions. For ok-SK, you will also need to replace the prefix with `odyssey:odyssey-react-mui: `.

If you are not an Okta employee, please file an issue request for assistance.

## Components

Components are published in an ESM format transpiled for the modern browsers
within the [Okta supported browser list][1]. These modules can be served
directly to evergreen browsers for simple applications, or further transpiled,
bundled, and polyfilled for advanced use cases and browser support targets.

[1]: https://help.okta.com/en/prod/Content/Topics/Miscellaneous/Platforms_Browser_OS_Support.htm

## License

[Apache Version 2.0](https://github.com/okta/odyssey/blob/main/LICENSE)

## Support Disclaimer

This library is community supported and is maintained by members of the Okta team for developers and IT professionals.
This library is not an official Okta product and does not qualify for any Okta support. Anyone who chooses to use this
library must ensure that their implementation meets any applicable legal obligations including any Okta terms and conditions.
