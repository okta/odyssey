---
summary: Each `OdysseyProvider` now appends an overlay host div to `document.body`
affectedExports:
  - Dialog
  - Drawer
  - OdysseyProvider
files:
  - packages/core/odyssey-react-mui/src/FullScreenOverlayContext.tsx
  - packages/core/odyssey-react-mui/src/OdysseyProvider.tsx
commit: c7f87461f
---

Each OdysseyProvider now creates a div and appends it to `document.body` to host overlays, and removes it on unmount. This happens whether or not Shadow DOM is in use, so an app with no Shadow DOM gains an empty div on body per provider. Check tests and snapshots that assert on the children of `document.body`, and check any code that walks body's children.
