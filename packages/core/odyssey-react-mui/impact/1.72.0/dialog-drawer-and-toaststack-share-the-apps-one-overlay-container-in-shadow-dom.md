---
summary: Dialog, Drawer, and ToastStack share the app's one overlay container in shadow DOM
affectedExports:
  - Dialog
  - Drawer
  - ToastStack
files:
  - packages/core/odyssey-react-mui/src/Dialog.tsx
  - packages/core/odyssey-react-mui/src/Drawer.tsx
  - packages/core/odyssey-react-mui/src/FullScreenOverlay.tsx
  - packages/core/odyssey-react-mui/src/FullScreenOverlayContext.tsx
  - packages/core/odyssey-react-mui/src/ToastStack.tsx
commit: ce377e69d
onlyRelevantIf: the app renders Odyssey in shadow DOM, such as through renderReactInWebComponent or a `shadowRootElement` on OdysseyProvider
---

In shadow DOM, each Dialog, temporary Drawer, and ToastStack used to mount a nested OdysseyProvider that appended its own container to `<body>`, open or closed. Those containers carried `data-odyssey-react-dialog-overlay-component`, `data-odyssey-react-drawer-overlay-component`, or `data-odyssey-react-toast-stack-overlay-component`, and no `id`. They are gone. Every overlay now renders into the app's one container, which carries `data-odyssey-react-overlay-component` and the app's `fullScreenOverlayId`. Overlays also follow the app's `hasAnimations` setting now, where the nested provider always turned animations on. The `overlayType` prop of FullScreenOverlay and FullScreenOverlayProvider is deprecated and no longer has an effect. Check selectors and test queries that look for the three removed attributes or count containers on `<body>`, and overlays that animated in an app that sets `hasAnimations` to `false`.
