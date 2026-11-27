---
summary: Shell scroll detection now walks all descendant scroll containers, not one
affectedExports:
  - UiShell
  - renderUiShell
  - NarrowUiShellContent
  - WideUiShellContent
files:
  - packages/odyssey-react-mui/src/ui-shell/useScrollState.ts
commit: 566cda8cc
onlyRelevantIf: your app content contains its own scrollable element inside the shell's content area
---

Scroll detection now walks every descendant of the content area with `querySelectorAll("*")`, keeps the ones whose computed `overflow-y` is `auto` or `scroll` and which are at least as tall as the container, and reports scrolled if any of them has `scrollTop > 0`. It previously watched one element. The shell's scroll affordance now responds to your inner scroll containers, and which elements qualify depends entirely on your DOM and computed styles.
