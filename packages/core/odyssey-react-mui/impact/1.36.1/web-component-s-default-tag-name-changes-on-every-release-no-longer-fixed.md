---
summary: Web component's default tag name changes on every release, no longer fixed
affectedExports:
  - renderReactInWebComponent
  - UiShell
  - renderUiShell
files:
  - packages/odyssey-react-mui/src/web-component/odysseyWebComponentVersion.generated.ts
commit: 7a8c36b0d
recursUntil: 1.69.0
---

The web component's default tag name is `odyssey-react-web-component-<version, dots replaced by dashes>`, generated from `odysseyWebComponentVersion.generated.ts`. It changes on every release, so it is never a stable selector, and the stable hook is the `data-odyssey-react-web-component` attribute the factory sets on every instance. The rule starts at 1.36.0, when the tag stopped being the fixed `odyssey-react-web-component`, and holds through 1.69.0. Three releases stamp something other than their own version, so never compute the name from the package version: 1.36.0 stamps 1-35-0, the previous release; 1.40.0 stamps 2-0-0; and 1.46.0 stamps 1-45-3, because the generator ran while lerna.json still read 1.45.2 and it wrote the next patch instead of the release. 1.36.0 has its own entry for the tag becoming versioned at all.
