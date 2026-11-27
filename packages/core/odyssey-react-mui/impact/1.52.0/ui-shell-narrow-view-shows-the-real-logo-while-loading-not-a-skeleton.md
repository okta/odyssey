---
summary: UI Shell narrow view shows the real logo while loading, not a skeleton
affectedExports:
  - UiShell
  - UiShellLogo
  - renderUiShell
files:
  - packages/core/odyssey-react-mui/src/ui-shell/NarrowUiShellContent.tsx
  - packages/core/odyssey-react-mui/src/ui-shell/UiShell.tsx
  - packages/core/odyssey-react-mui/src/ui-shell/UiShellLogo.tsx
commit: 5b39f67d8
onlyRelevantIf: an app rendering the UI Shell at a narrow viewport
---

Two separate changes. The narrow view no longer renders a loading skeleton in place of the logo and shows the real logo while loading instead. The hamburger button is now gated on side nav props being present, so an app with no side nav loses a stray button it previously rendered in narrow view. Check narrow-viewport loading states and apps with no side nav.
