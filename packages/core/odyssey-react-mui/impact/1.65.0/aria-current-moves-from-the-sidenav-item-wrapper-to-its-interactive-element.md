---
summary: "`aria-current` moves from the SideNav item wrapper to its interactive element"
affectedExports:
  - SideNav
  - UiShell
  - renderUiShell
files:
  - packages/core/odyssey-react-mui/src/ui-shell/SideNav/SideNavItemContent.tsx
commit: d84559052
---

`aria-current` moved off the nav item wrapper onto the interactive element inside it. Check accessibility snapshots and selectors keyed on where that attribute sat.
