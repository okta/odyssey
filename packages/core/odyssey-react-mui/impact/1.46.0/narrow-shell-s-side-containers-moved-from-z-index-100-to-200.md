---
summary: Narrow shell's side containers moved from z-index 100 to 200
affectedExports:
  - UiShell
  - renderUiShell
files:
  - packages/core/odyssey-react-mui/src/ui-shell/NarrowUiShellContent.tsx
commit: 944a0c3fb
onlyRelevantIf: an app rendering the UI Shell at the narrow breakpoint
---

The narrow-viewport side containers moved from z-index 100 to 200. An app whose own positioned content sat between those values changes stacking order against the side nav and the right-side menu.
