---
summary: Web component tag name is now versioned, not the fixed previous name
affectedExports:
  - renderReactInWebComponent
  - UiShell
  - renderUiShell
files:
  - packages/odyssey-react-mui/src/web-component/renderReactInWebComponent.ts
  - packages/odyssey-react-mui/src/web-component/odysseyWebComponentVersion.generated.ts
commit: e89c9c7f0
---

The custom element's tag name stopped being the fixed `odyssey-react-web-component` and became `odyssey-react-web-component-<version>`, generated from a new `odysseyWebComponentVersion.generated.ts` that does not exist at 1.35.4 or earlier, so two Odyssey versions on one page no longer collide. Any CSS, querySelector, or Selenium locator keyed on the old tag name stops matching. The stable replacement is the `data-odyssey-react-web-component` attribute, which the factory sets on every instance. This release also stamps the wrong value: 1.36.0 ships `odyssey-react-web-component-1-35-0`, the previous version, so do not compute the name from the package version. The tag then changes on every release through 1.69.0; the recurring entry at 1.36.1 carries that rule and the two later releases that misstamp it.
