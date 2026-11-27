---
summary: Contrast detection moved to a layout effect, now crosses shadow boundaries
affectedExports:
  - OdysseyProvider
  - OdysseyThemeProvider
files:
  - packages/core/odyssey-react-mui/src/useContrastMode.tsx
commit: 7e09c12d1
---

Contrast detection moved from an effect to a layout effect, so it resolves before paint and the flash of the wrong mode is gone. Its ancestor walk now crosses shadow boundaries through the host element, and its transition listener attaches to the containing root rather than always to `document`. Detection is also skipped entirely when `contrastMode` is passed explicitly. Check which contrast mode resolves in shadow-root and web-component apps, since crossing the boundary can now find a background it previously could not.
