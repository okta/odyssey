---
summary: Side nav item click now calls `onCollapse` when the nav isn't collapsible
affectedExports:
  - SideNav
  - NarrowUiShellContent
  - UiShell
  - renderUiShell
files:
  - packages/odyssey-react-mui/src/ui-shell/SideNav/SideNav.tsx
  - packages/odyssey-react-mui/src/ui-shell/NarrowUiShellContent.tsx
commit: bb0b3e16f
---

Clicking a nav item now calls your `onCollapse` when the nav is not collapsible, instead of publishing the close-menu message. The nav previously stayed stuck closed in the narrow view after a click; now the close is routed back through your callback, so `onCollapse` fires in cases where it did not before.
