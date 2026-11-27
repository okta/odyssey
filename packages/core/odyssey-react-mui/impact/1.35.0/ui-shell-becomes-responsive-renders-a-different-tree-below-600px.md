---
summary: UI Shell becomes responsive, renders a different tree below 600px
affectedExports:
  - UiShell
  - renderUiShell
  - NarrowUiShellContent
  - WideUiShellContent
  - SideNav
  - TopNav
files:
  - packages/odyssey-react-mui/src/ui-shell/UiShell.tsx
  - packages/odyssey-react-mui/src/ui-shell/NarrowUiShellContent.tsx
  - packages/odyssey-react-mui/src/ui-shell/WideUiShellContent.tsx
  - packages/odyssey-react-mui/src/ui-shell/useUiShellBreakpoints.ts
  - packages/odyssey-react-mui/src/ui-shell/UiShellContent.tsx
commit: 18d0f6c01
---

UI Shell became responsive on viewport width, and the branch it takes is not derivable from your props. Below 600px it renders a different tree entirely: a hamburger-triggered overlay side nav instead of the persistent one. Between 600px and 800px it overrides your `sideNavProps.isCollapsed` and `isCollapsible` to `true` regardless of what you pass. At 800px and above your values apply. `UiShellContent` was deleted and split into `NarrowUiShellContent` and `WideUiShellContent`; verify at each of the three widths rather than at one.
