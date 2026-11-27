---
summary: Buttons become 2px shorter as padding absorbs the border
affectedExports:
  - odysseyTheme
files:
  - packages/odyssey-react-mui/src/themes/odyssey/components.ts
commit: 2041953a2
onlyRelevantIf: you pass odysseyTheme to MUI's own ThemeProvider, since Odyssey re-exports no MUI component at this version
---

Button block padding changed from a flat 0.85714286rem to calc(0.85714286rem - 1px), so it now absorbs the button's own 1px border and every button is 2px shorter. Check rows that align a button against an input or another fixed-height control.
