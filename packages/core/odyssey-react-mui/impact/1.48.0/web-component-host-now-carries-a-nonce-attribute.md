---
summary: Web component host now carries a `nonce` attribute
affectedExports:
  - getReactWebComponent
  - renderReactInWebComponent
  - renderUiShell
files:
  - packages/core/odyssey-react-mui/src/web-component/renderReactInWebComponent.ts
  - packages/core/odyssey-react-mui/src/web-component/encapsulateShadowDomFromGlobalStyles.ts
  - packages/core/odyssey-react-mui/src/ui-shell/renderUiShell.tsx
commit: 330509b0b
onlyRelevantIf: the consumer renders Odyssey through the web component entry point, or sets a Content Security Policy nonce
---

A `nonce` attribute is now set on the custom element itself, and the shadow-root style injection moved from the constructor to `connectedCallback`. Because the injection now runs on every connect, moving the host element in the DOM appends a second identical `<style>` to the shadow root. Check for a `nonce` attribute appearing on the host element, and for duplicated style elements in apps that relocate the host.
