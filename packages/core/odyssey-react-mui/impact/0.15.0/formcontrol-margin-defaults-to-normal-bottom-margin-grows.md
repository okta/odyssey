---
summary: FormControl margin defaults to `normal`, bottom margin grows
affectedExports:
  - odysseyTheme
files:
  - packages/odyssey-react-mui/src/themes/odyssey/components.ts
commit: 1374c239a
onlyRelevantIf: you pass odysseyTheme to MUI's own ThemeProvider, since Odyssey re-exports no MUI component at this version
---

MuiFormControl now defaults margin to "normal", where MUI defaults it to "none", and the normal and dense bottom margin grew from 1.14285714rem to 1.71428571rem with a reset on the last child. Every FormControl you render without an explicit margin gains vertical space. Check form spacing you tuned by hand.
