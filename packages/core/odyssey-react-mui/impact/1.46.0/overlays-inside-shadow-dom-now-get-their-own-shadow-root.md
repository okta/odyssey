---
summary: Overlays inside Shadow DOM now get their own shadow root
affectedExports:
  - Dialog
  - Drawer
  - OdysseyProvider
  - createShadowDomElements
  - renderReactInWebComponent
files:
  - packages/core/odyssey-react-mui/src/FullScreenOverlayContext.tsx
  - packages/core/odyssey-react-mui/src/shadow-dom/shadow-dom.ts
commit: c7f87461f
onlyRelevantIf: an app rendering Odyssey inside Shadow DOM, including through the web component entry point
---

Overlays now get their own shadow root, attached to the div appended to body, instead of rendering into the app's existing root. Check that dialog and temporary drawer content is styled, that focus moves into the overlay, and that queries reaching into the overlay still find it, since it now sits behind a different shadow boundary.
