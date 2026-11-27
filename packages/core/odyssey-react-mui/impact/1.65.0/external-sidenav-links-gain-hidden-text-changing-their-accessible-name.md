---
summary: External SideNav links gain hidden text, changing their accessible name
affectedExports:
  - SideNav
  - UiShell
  - renderUiShell
files:
  - packages/core/odyssey-react-mui/src/ui-shell/SideNav/SideNavItemContent.tsx
commit: 882c85202
onlyRelevantIf: a SideNav with an item that opens in a new window
---

External nav links gained visually hidden screen-reader text announcing the new window, which changes their accessible name. Check accessibility snapshots and tests that matched an external nav link by its exact accessible name.
