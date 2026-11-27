---
summary: Overlay content loses its contrast detection wrapper div
affectedExports:
  - Dialog
  - Drawer
  - OdysseyThemeProvider
files:
  - packages/core/odyssey-react-mui/src/FullScreenOverlay.tsx
  - packages/core/odyssey-react-mui/src/OdysseyThemeProvider.tsx
commit: c7f87461f
onlyRelevantIf: rendering inside a Dialog or a temporary Drawer, where the wrapper element is now suppressed
---

Overlay content no longer gets the contrast container div that OdysseyThemeProvider normally renders. That div carried `height: inherit` and the ref that background-derived contrast detection uses, so contrast mode cannot be detected from the background inside an overlay. Check height-dependent layouts inside dialogs and temporary drawers, and check components inside them that adapt to contrast mode.
