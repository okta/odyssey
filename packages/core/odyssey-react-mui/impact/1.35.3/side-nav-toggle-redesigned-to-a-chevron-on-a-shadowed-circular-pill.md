---
summary: Side nav toggle redesigned to a chevron on a shadowed circular pill
affectedExports:
  - SideNav
  - UiShell
  - renderUiShell
files:
  - packages/odyssey-react-mui/src/ui-shell/SideNav/SideNavToggleButton.tsx
commit: 726928ccb
onlyRelevantIf: a collapsible side nav
---

The side nav visibility toggle was rebuilt. The two animated bars, which read as one vertical bar at rest and animated into a chevron on hover, are gone, replaced by a chevron icon on a white circular pill with a shadow, and the control's own width now includes an explicit click-area padding. Its size, position, and hit area all differ.
