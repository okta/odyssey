---
summary: MUI Drawer gains forced width, flex layout, and color overrides inside Odyssey
affectedExports:
  - OdysseyProvider
  - OdysseyThemeProvider
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: 0e64d3b3f
---

A `MuiDrawer` theme override was added, and it applies to any MUI Drawer inside an Odyssey provider, not only Odyssey's own. A consumer rendering `Drawer` straight from `@mui/material` now gets a forced width (25.714rem persistent, 28.571rem temporary), `display: flex` with `justify-content: space-between`, HueNeutral700 text, and for the persistent variant `position: static` with the border removed. Check any hand-rolled drawer or side panel built on MUI's Drawer.
