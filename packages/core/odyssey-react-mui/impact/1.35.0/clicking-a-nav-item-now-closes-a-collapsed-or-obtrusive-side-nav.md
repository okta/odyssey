---
summary: Clicking a nav item now closes a collapsed or obtrusive side nav
affectedExports:
  - SideNav
  - UiShell
  - renderUiShell
files:
  - packages/odyssey-react-mui/src/ui-shell/SideNav/SideNav.tsx
commit: 18d0f6c01
onlyRelevantIf: a collapsed side nav, or one passed isObtrusive
---

Clicking a nav item now closes the side nav menu when the nav is collapsed or obtrusive. Navigation that previously left the nav open closes it.
