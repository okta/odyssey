---
summary: Side nav header collapses to an empty div with no name, logo, or loading
affectedExports:
  - SideNav
  - UiShell
  - renderUiShell
files:
  - packages/odyssey-react-mui/src/ui-shell/SideNav/SideNav.tsx
commit: 18d0f6c01
onlyRelevantIf: a side nav with no appName, no logoProps, and not loading
---

The side nav header container is now conditional. With no app name, no logo, and no loading state it renders a bare empty div in place of the header wrapper, so the header's height and its scroll-triggered bottom border disappear.
