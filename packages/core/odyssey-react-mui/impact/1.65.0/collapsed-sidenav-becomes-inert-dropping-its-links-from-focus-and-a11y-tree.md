---
summary: Collapsed SideNav becomes `inert`, dropping its links from focus and a11y tree
affectedExports:
  - SideNav
  - UiShell
  - renderUiShell
files:
  - packages/core/odyssey-react-mui/src/ui-shell/SideNav/SideNav.tsx
commit: d63f17ef2
onlyRelevantIf: a collapsible SideNav. The behavior additionally depends on browser support for `inert`
---

A collapsed side nav is now `inert`, which takes its links out of both the accessibility tree and the tab order and makes them unclickable. It was previously hidden only visually, so those links stayed reachable. Check whether anything relied on reaching a collapsed nav's links.
