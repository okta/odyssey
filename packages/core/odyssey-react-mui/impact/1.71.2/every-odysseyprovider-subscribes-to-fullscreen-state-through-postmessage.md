---
summary: Every OdysseyProvider subscribes to fullscreen state through `postMessage`
affectedExports:
  - OdysseyProvider
files:
  - packages/core/odyssey-react-mui/src/FullScreenOverlayContext.tsx
  - packages/core/odyssey-react-mui/src/FullScreenOverlay.tsx
commit: 973dd4e60
---

OdysseyProvider now reads the page's fullscreen state, so every app that renders it, not only one with the UI Shell, adds a `message` listener to the top window on mount and calls `window.postMessage` once to ask for the current state. In jsdom, `postMessage` delivers the message through a `setTimeout` of 0, so a test that renders any Odyssey component can now leave a pending timer, and fake timers or a check for open handles can report it. While anything on the page is in fullscreen, the overlay container on `<body>` also removes `inert` from itself, and in shadow DOM a dialog opened from a drawer renders into the app's overlay container instead of one of its own. Check tests that use fake timers or count pending timers, and selectors that expected a second overlay container for a nested dialog.
