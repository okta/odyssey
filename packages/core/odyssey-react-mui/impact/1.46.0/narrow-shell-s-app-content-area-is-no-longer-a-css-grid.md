---
summary: Narrow shell's app content area is no longer a CSS grid
affectedExports:
  - UiShell
  - renderUiShell
files:
  - packages/core/odyssey-react-mui/src/ui-shell/NarrowUiShellContent.tsx
commit: 944a0c3fb
onlyRelevantIf: an app rendering the UI Shell at the narrow breakpoint
---

The narrow app content area stopped being a CSS grid and the three grid area placements were removed, leaving the app container sized by width and height alone. Both side containers were already absolutely positioned. Check the narrow-viewport layout for the app content area and the right-side menu, especially when a scrollbar is present.
