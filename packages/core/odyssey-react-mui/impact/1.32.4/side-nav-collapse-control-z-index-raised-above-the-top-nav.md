---
summary: Side nav collapse control z-index raised above the top nav
affectedExports:
  - SideNav
  - UiShell
  - renderUiShell
files:
  - packages/odyssey-react-mui/src/ui-shell/SideNav/SideNavToggleButton.tsx
commit: 7a65d3df9
onlyRelevantIf: overlays of your own near the side nav's collapse control
---

The side nav visibility toggle's z-index went from 2 to 200, putting it above the top nav. Check anything of yours that previously drew over it.
