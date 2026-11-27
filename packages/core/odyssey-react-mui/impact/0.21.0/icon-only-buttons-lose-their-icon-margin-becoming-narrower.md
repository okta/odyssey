---
summary: Icon-only buttons lose their icon margin, becoming narrower
affectedExports:
  - Button
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: ea2891d39
onlyRelevantIf: a Button that renders only an icon, with no text child
---

MuiButton's startIcon and endIcon slots drop their inline margin when the Button has no children, so an icon-only button is narrower than before. Check toolbars and button rows that were spaced around the old width.
