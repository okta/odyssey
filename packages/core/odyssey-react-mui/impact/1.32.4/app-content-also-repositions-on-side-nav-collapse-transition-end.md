---
summary: App content also repositions on side nav collapse transition end
affectedExports:
  - UiShell
  - renderUiShell
files:
  - packages/odyssey-react-mui/src/ui-shell/UiShellContent.tsx
commit: 757cb796a
onlyRelevantIf: a collapsible side nav
---

The app content element now also repositions on the side nav's `transitionend`, not only on resize, so it stops overlapping the nav mid-collapse. Content that depended on the old overlap timing moves.
