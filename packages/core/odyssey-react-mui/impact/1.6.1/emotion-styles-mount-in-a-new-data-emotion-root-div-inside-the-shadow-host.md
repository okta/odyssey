---
summary: Emotion styles mount in a new `data-emotion-root` div inside the shadow host
affectedExports:
  - OdysseyProvider
  - OdysseyCacheProvider
  - OdysseyThemeProvider
  - createShadowRootElement
files:
  - packages/odyssey-react-mui/src/OdysseyCacheProvider.tsx
  - packages/odyssey-react-mui/src/OdysseyProvider.tsx
  - packages/odyssey-react-mui/src/OdysseyThemeProvider.tsx
  - packages/odyssey-react-mui/src/createShadowDom.ts
  - packages/odyssey-react-mui/src/createShadowRootElement.ts
commit: 5ca257c29
onlyRelevantIf: Odyssey is mounted inside a shadow DOM
---

The element Emotion writes styles into is no longer a `<style>` the host creates. OdysseyCacheProvider now builds its own `<div data-emotion-root="data-emotion-root">` and prepends it to the shadow host element, so the shadow root's child order and element types changed. Check any selector, test query, or style-extraction step that reached into the shadow root, and note the new `createShadowRootElement` returns the function itself rather than an element, which 1.6.18 corrects.
