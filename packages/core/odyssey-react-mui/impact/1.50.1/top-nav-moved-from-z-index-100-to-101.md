---
summary: Top nav moved from z-index 100 to 101
affectedExports:
  - UiShell
  - renderUiShell
files:
  - packages/core/odyssey-react-mui/src/ui-shell/TopNav/TopNav.tsx
  - packages/core/odyssey-react-mui/src/ui-shell/uiShellSharedConstants.ts
commit: 8dae2d448
onlyRelevantIf: an app rendering the UI Shell that stacks its own positioned content in the 100 to 101 band
---

The top nav moved from z-index 100 to 101. Check stacking order against any app content positioned at exactly 100.
