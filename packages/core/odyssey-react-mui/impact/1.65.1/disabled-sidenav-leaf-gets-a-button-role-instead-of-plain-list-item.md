---
summary: Disabled SideNav leaf gets a button role instead of plain list item
affectedExports:
  - SideNav
  - UiShell
  - renderUiShell
files:
  - packages/core/odyssey-react-mui/src/ui-shell/SideNav/SideNavItemContent.tsx
commit: 5838afed2
onlyRelevantIf: a SideNav with a disabled leaf item
---

A disabled nav leaf moved `aria-disabled` off the list item onto the content container and gave that container an explicit button role, so it is now reported as a disabled button rather than a plain list item. Check accessibility snapshots and role-based queries over the nav.
