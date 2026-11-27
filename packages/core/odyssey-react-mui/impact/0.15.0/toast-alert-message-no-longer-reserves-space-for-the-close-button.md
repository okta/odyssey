---
summary: Toast alert message no longer reserves space for the close button
affectedExports:
  - odysseyTheme
files:
  - packages/odyssey-react-mui/src/themes/odyssey/components.ts
commit: 856ee758d
onlyRelevantIf: you pass odysseyTheme to MUI's own ThemeProvider, since Odyssey re-exports no MUI component at this version
---

A toast Alert's message no longer reserves right-hand padding for the close action. Long toast text now runs closer to, or under, the close button. Check toasts whose text fills the width.
