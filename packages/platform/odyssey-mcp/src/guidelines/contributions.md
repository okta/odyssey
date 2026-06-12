---
label: Contribution Packages
description: Required provider setup and usage guidelines for @okta/odyssey-contributions-* packages.
---

# Odyssey Contributions — Usage Guidelines

## Package-specific provider (REQUIRED)

Every contribution package ships its own named provider, which is a re-export of `OdysseyProvider` from `@okta/odyssey-react-mui`. Import it directly from the contribution package.

**Without this wrapper, contribution components will not render correctly.**

```tsx
// Example using iga-components
import { IgaComponentsProvider } from "@okta/odyssey-contributions-iga-components";

function App() {
  return <IgaComponentsProvider>{/* your app tree */}</IgaComponentsProvider>;
}
```

## Why the provider is required

Contribution packages are isolated, product-specific component libraries built on top of `@okta/odyssey-react-mui`. The package provider:

- Supplies the Odyssey theme context to all contribution components
- Manages token overrides and design system scope
- Ensures consistent styling across Okta product surfaces

## Package setup

Each contribution package follows this pattern:

1. Install the contribution package (e.g. `@okta/odyssey-contributions-iga-components`)
2. Install `@okta/odyssey-react-mui` (peer dependency)
3. Wrap your app in the package's own provider (e.g. `IgaComponentsProvider`)
4. Use contribution components inside the provider

## Common pitfalls

- **Missing provider**: Components render with broken styles or no theme
- **Multiple provider instances**: Do not nest multiple contribution providers of the same type. Contribution providers are isolated and can coexist inside an app-level `OdysseyProvider` — but stacking two providers of the same contribution package will cause context conflicts.

  ```tsx
  // Correct — contribution provider inside an app-level OdysseyProvider
  <OdysseyProvider>
    <PasswordlessComponentsProvider>
      <App />
    </PasswordlessComponentsProvider>
  </OdysseyProvider>

  // Wrong — two providers of the same contribution package nested
  <PasswordlessComponentsProvider>
    <PasswordlessComponentsProvider>
      <App />
    </PasswordlessComponentsProvider>
  </PasswordlessComponentsProvider>
  ```

- **Missing peer deps**: Contribution packages have `react`, `react-dom`, and `@okta/odyssey-react-mui` as peer dependencies — ensure they are installed at the app level

## Available contribution packages

| Package                                                         | Provider                                 |
| --------------------------------------------------------------- | ---------------------------------------- |
| `@okta/odyssey-contributions-iga-components`                    | `IgaComponentsProvider`                  |
| `@okta/odyssey-contributions-oin-components`                    | `OinComponentsProvider`                  |
| `@okta/odyssey-contributions-passwordless-components`           | `PasswordlessComponentsProvider`         |
| `@okta/odyssey-contributions-resource-access-policy-components` | `ResourceAccessPolicyComponentsProvider` |
| `@okta/odyssey-contributions-ud-components`                     | `UDComponentsProvider`                   |
| `@okta/odyssey-contributions-workflows-components`              | `WorkflowsComponentsProvider`            |
| `@okta/odyssey-contributions-wp-components`                     | `WpComponentsProvider`                   |

## Adding a new contribution package

Use the `example-components` package as a template:
`packages/contributions/example-components/`

Follow these steps:

1. Copy the example-components directory
2. Update `package.json` with your package name and description
3. Replace placeholder components with your own
4. Run `yarn workspace @okta/odyssey-cli contributions sync` to register

## i18n

Contribution packages support i18n via the Odyssey i18n system. Run:

```
yarn workspace @okta/odyssey-cli i18n generate
```

to scaffold i18n files for your package.
