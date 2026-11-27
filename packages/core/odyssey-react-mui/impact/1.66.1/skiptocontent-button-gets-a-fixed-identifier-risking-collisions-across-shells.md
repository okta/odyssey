---
summary: SkipToContent button gets a fixed identifier, risking collisions across shells
affectedExports:
  - SkipToContent
  - UiShell
  - renderUiShell
files:
  - packages/core/odyssey-react-mui/src/ui-shell/SkipToContent.tsx
commit: 442150f2f
onlyRelevantIf: an app rendering the UI Shell that already uses that identifier, or renders two shells on one page
---

The skip link button now carries a fixed identifier rather than none. Because it is fixed rather than generated, it collides with an element of the same identifier elsewhere in the app, and two shells on one page produce a duplicate. Check for identifier collisions.
