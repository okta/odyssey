# @okta/ui-shell

## Getting Started

Install the package and peer dependencies:

```sh
yarn add @okta/ui-shell
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

Add `renderOtkaUiShell` to your `index.tsx`:

```ts
import { renderOktaUiShell } from "@okta/ui-shell";

const rootElement = document.getElementById("root") as HTMLDivElement;

renderOktaUiShell({
  changeComponentProps: (setComponentProps) => {
    contentElementId: "react-app-root",
      setComponentProps({
        sideNavProps: {
          navHeaderText,
          sideNavItems: [],
        },
        topNavProps: {
          topNavLinkItems: [],
        },
      });
  },
  rootElement,
});
```

## License

[Apache Version 2.0](https://github.com/okta/odyssey/blob/main/LICENSE)

## Support Disclaimer

This library is community supported and is maintained by members of the Okta team for developers and IT professionals.
This library is not an official Okta product and does not qualify for any Okta support. Anyone who chooses to use this
library must ensure that their implementation meets any applicable legal obligations including any Okta terms and conditions.
