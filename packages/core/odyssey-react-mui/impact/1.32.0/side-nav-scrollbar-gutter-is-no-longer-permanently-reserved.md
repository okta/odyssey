---
summary: Side nav scrollbar gutter is no longer permanently reserved
affectedExports:
  - SideNav
  - UiShell
  - renderUiShell
files:
  - packages/odyssey-react-mui/src/ui-shell/SideNav/SideNav.tsx
commit: b55ecd665
onlyRelevantIf: a platform that draws classic, space-occupying scrollbars
---

The side nav's scrollable region went from `overflow-y: scroll` to `auto`, so the scrollbar gutter is no longer permanently reserved. Short nav lists get back the gutter's width, which shifts nav item text.
