---
summary: Shell z-indexes consolidate to 100 for chrome, 200 for overlays
affectedExports:
  - SideNav
  - TopNav
  - UiShell
  - renderUiShell
files:
  - packages/odyssey-react-mui/src/ui-shell/uiShellSharedConstants.ts
  - packages/odyssey-react-mui/src/ui-shell/SideNav/SideNav.tsx
  - packages/odyssey-react-mui/src/ui-shell/TopNav/TopNav.tsx
commit: 18d0f6c01
---

Shell z-indexes were consolidated onto two values, 100 for base chrome and 200 for overlays. The persistent side nav footer went from 2 to 100. Check where content of your own sits in that stack.
