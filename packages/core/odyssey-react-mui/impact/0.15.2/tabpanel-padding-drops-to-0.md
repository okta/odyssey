---
summary: TabPanel padding drops to 0
affectedExports:
  - odysseyTheme
  - TabPanel
files:
  - packages/odyssey-react-mui/src/themes/odyssey/components.tsx
commit: 928dcbfef
---

MuiTabPanel's padding was set to 0, where MUI's lab TabPanel ships 24px. Tab panel content now sits flush against the panel edge. Check panels that relied on that inset.
