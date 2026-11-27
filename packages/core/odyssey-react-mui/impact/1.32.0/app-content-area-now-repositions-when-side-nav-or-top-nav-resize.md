---
summary: App content area now repositions when side nav or top nav resize
affectedExports:
  - UiShell
  - renderUiShell
files:
  - packages/odyssey-react-mui/src/ui-shell/UiShellContent.tsx
commit: b55ecd665
onlyRelevantIf: you mount your app through renderUiShell or UiShell
---

The ResizeObserver that positions the app content element now also observes the side nav and top nav containers, so the app area follows their size changes. It previously tracked only its own grid cell and could sit mispositioned after the nav resized.
