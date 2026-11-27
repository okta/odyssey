---
summary: Closing the side nav via message now also closes it when expanded
affectedExports:
  - SideNav
  - UiShell
  - renderUiShell
files:
  - packages/odyssey-react-mui/src/ui-shell/SideNav/SideNav.tsx
commit: "8545423e5"
onlyRelevantIf: you rely on the close-side-nav message from outside the shell
---

The side nav now subscribes to the close-menu message unconditionally, where it previously only subscribed while `isCollapsed` was true. Publishing that message now closes an expanded nav too.
