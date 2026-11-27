---
summary: Top nav overflow-x hidden is removed, content spills again
affectedExports:
  - TopNav
  - UiShell
  - renderUiShell
files:
  - packages/odyssey-react-mui/src/ui-shell/TopNav/TopNav.tsx
commit: 18d0f6c01
onlyRelevantIf: content in the top nav that is wider than the top nav
---

The `overflow-x: hidden` that 1.32.4 added to the top nav container is gone again, so overflowing slot content spills rather than being clipped. Verified from the file at each tag rather than from the commit subject, which is about responsiveness.
