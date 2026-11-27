---
summary: Danger button no longer carries its own red focus ring
affectedExports:
  - Button
  - MenuButton
files:
  - packages/core/odyssey-react-mui/src/theme/components/Button.tsx
commit: f1eb8ae6b
onlyRelevantIf: a Button rendered with the danger variant and focused
---

The danger button no longer carries its own focus ring. Its two-layer white and red ring was dropped when the theme was split into per-component files, so a focused danger button falls through to the base rule and paints the primary blue ring. Check focus appearance on destructive buttons, and check any visual snapshot that captured the red ring.
