---
summary: Shadow root style reset is now also injected outside the web component
affectedExports:
  - Dialog
  - Drawer
  - createShadowDomElements
  - renderReactInWebComponent
files:
  - packages/core/odyssey-react-mui/src/web-component/removeGlobalStylesFromShadowDom.ts
  - packages/core/odyssey-react-mui/src/web-component/createShadowDomElements.ts
commit: 9d9d714f4
onlyRelevantIf: the consumer renders Odyssey inside Shadow DOM, which is also the only case where a Dialog or temporary Drawer creates its own shadow root
---

The `:host { all: initial; contain: content; }` reset that the web component injected is now also injected by `createShadowDomElements`, so every bare shadow root gets it. `all: initial` stops inherited typography and color reaching that subtree, and an extra `<style>` element now appears inside the root. The nonce defaults to `window.cspNonce`, so under a strict `style-src` policy with that global unset the style element carries `nonce="undefined"` and is blocked. Check overlay and shadow-root content for lost inherited styles, and check for blocked styles under a Content Security Policy.
