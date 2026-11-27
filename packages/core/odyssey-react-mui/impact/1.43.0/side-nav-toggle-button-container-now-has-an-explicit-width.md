---
summary: Side nav toggle button container now has an explicit width
affectedExports:
  - SideNav
  - UiShell
  - renderUiShell
files:
  - packages/odyssey-react-mui/src/ui-shell/SideNav/SideNav.tsx
commit: 963882fcf
---

The side nav toggle button container now has an explicit width where it previously sized to its content. Check the position of the toggle handle against the side nav edge.
