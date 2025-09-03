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
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap"
  rel="stylesheet"
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
  <OdysseyProvider>
    <CssBaseline />
    {children}
  </OdysseyProvider>
);
```

Add Material-UI components not exported from Odyssey with Odyssey styling or add your own theme to MUI:

```sh
yarn add @mui/material
```

```jsx
import { OdysseyThemeProvider } from "@okta/odyssey-react-mui";

import { myMaterialUiTheme } from "./myMaterialUiTheme.js";

const YourAppRoot = ({ children }) => (
  <OdysseyThemeProvider theme={myMaterialUiTheme}>
    {children}
  <OdysseyThemeProvider>
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
import { theme } from "./themeOverride.js";

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

## Running odyssey-react-mui for local development

Follow these steps for local [Odyssey development](https://odyssey-storybook.okta.design/?path=/docs/contributing-odyssey-development--docs)

## Downstream Testing

Local changes can be tested in various other okta packages using the `yarn ok-ui downstream` command, which will clone
the specified repos, applies the changes from your local version via linking, and then run the build and test commands
for the specified packages. Logs for the output of these individual commands can be found under `ok-ui-logs/downstream`.

To enable verbose logging use the `-v` flag.

By default, repos from previous test runs will be reused to speed up yarn install times. If you want to avoid using
these cached repos, then use the `--forceGitClone` flag

You can configure which packages to test using the `ok.yaml` config file.

example:

```yaml
downstream:
  # Determines if any packages should be linked in addition to the target package
  additionalWorkspaces:
    - "@okta/odyssey-design-tokens"

  # List of repos to clone
  repos:
    - repoName: "example-react-spa"
      url: "https://github.com/atko-eng/example-react-spa.git"
      # List of packages to test for this repo
      packages:
        - pkgName: "@okta/example-react-spa"
    - repoName: "admin-ui"
      # optionally override the command used to build the packages
      buildCmd: "FORCE_COLOR=true yarn build:all"
      # url to colone from
      url: "https://github.com/atko-eng/admin-ui.git"
      # List of packages to test for this repo
      packages:
        - pkgName: "@okta/admin-v2.admin-app-react"
          # optionally override the command used to test the package
          testCmd: "yarn run vitest"
        - pkgName: "@okta/admin-v2.admin-dashboard"
```

## License

[Apache Version 2.0](https://github.com/atko-eng/odyssey-design-system/blob/master/LICENSE)

## Support Disclaimer

This library is community supported and is maintained by members of the Okta team for developers and IT professionals.
This library is not an official Okta product and does not qualify for any Okta support. Anyone who chooses to use this
library must ensure that their implementation meets any applicable legal obligations including any Okta terms and conditions.
