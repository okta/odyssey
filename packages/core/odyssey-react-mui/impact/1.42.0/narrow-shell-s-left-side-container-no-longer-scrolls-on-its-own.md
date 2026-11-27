---
summary: Narrow shell's left side container no longer scrolls on its own
affectedExports:
  - UiShell
  - renderUiShell
files:
  - packages/odyssey-react-mui/src/ui-shell/NarrowUiShellContent.tsx
commit: d6a7e2dd9
onlyRelevantIf: the narrow UI Shell breakpoint, and only when the side content is taller than the viewport
---

The narrow-viewport left side container lost `overflowY: auto`, so it no longer scrolls on its own. Check narrow-viewport side nav content that is taller than the viewport, because the scroll now has to come from an ancestor.
