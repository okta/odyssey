---
summary: "`appComponent` now only renders as the ErrorBoundary fallback"
affectedExports:
  - UiShell
files:
  - packages/odyssey-react-mui/src/ui-shell/UiShell.tsx
commit: 331570b79
onlyRelevantIf: you render UiShell directly and pass appComponent
---

`appComponent` still typechecks but changed meaning. It went from required, and the thing rendered in the shell's content area, to optional and used only as the ErrorBoundary fallback. Passing it no longer puts anything on screen in the normal path.
