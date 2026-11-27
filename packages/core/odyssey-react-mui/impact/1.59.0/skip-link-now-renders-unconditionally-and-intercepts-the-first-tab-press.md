---
summary: Skip link now renders unconditionally and intercepts the first Tab press
affectedExports:
  - SkipToContent
  - UiShell
  - renderUiShell
files:
  - packages/core/odyssey-react-mui/src/ui-shell/SkipToContent.tsx
  - packages/core/odyssey-react-mui/src/ui-shell/WideUiShellContent.tsx
  - packages/core/odyssey-react-mui/src/ui-shell/NarrowUiShellContent.tsx
  - packages/core/odyssey-react-mui/src/ui-shell/uiShellSharedConstants.ts
commit: b24831139
onlyRelevantIf: an app rendering the UI Shell. Impact depends on the consumer's `appElement` and on whether the app has its own Tab or focus handling
---

A skip link now renders unconditionally in both shell layouts, with no way to opt out. It becomes the first focusable element in the shell, sits at z-index 300 above every other shell layer, registers three document-level listeners, intercepts the first forward Tab press on the document with `preventDefault`, and mutates the `appElement` the consumer passed in by setting `tabindex="-1"` and an outline reset when they are absent. Check the first Tab press from page load, focus order generally, and whether anything else depends on the attributes of the element passed as `appElement`.
