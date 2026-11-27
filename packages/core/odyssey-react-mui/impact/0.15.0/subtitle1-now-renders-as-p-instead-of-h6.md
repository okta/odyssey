---
summary: "`subtitle1` now renders as `<p>` instead of `<h6>`"
affectedExports:
  - odysseyTheme
files:
  - packages/odyssey-react-mui/src/themes/odyssey/components.ts
commit: 1374c239a
onlyRelevantIf: you pass odysseyTheme to MUI's own ThemeProvider, since Odyssey re-exports no MUI component at this version
---

MuiTypography now sets its own variantMapping, and subtitle1 maps to <p> where MUI maps it to <h6>. The rendered element changes without any change to your source, which affects CSS selectors keyed on the tag, document outline, and anything asserting on heading roles.
