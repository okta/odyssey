---
summary: MuiAlert gains banner and infobox theme variants
affectedExports:
  - odysseyTheme
files:
  - packages/odyssey-react-mui/src/themes/odyssey/components.ts
  - packages/odyssey-react-mui/src/themes/odyssey/components.types.ts
commit: d54f9b06e
onlyRelevantIf: you pass odysseyTheme to MUI's own ThemeProvider, since Odyssey re-exports no MUI component at this version
---

MuiAlert and MuiAlertTitle gained theme overrides and two Odyssey variants, banner and infobox. A MUI Alert rendered under this theme now takes Odyssey padding, severity-tinted background and border, and a reset icon and message block. The type augmentation also disables MUI's own filled, outlined and standard variants, and only banner and infobox carry variant-specific styling, so an Alert left on MUI's default variant gets the root styling without a border.
