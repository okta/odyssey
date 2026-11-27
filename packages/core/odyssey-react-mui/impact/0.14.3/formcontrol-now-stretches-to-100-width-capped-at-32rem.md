---
summary: FormControl now stretches to 100% width, capped at 32rem
affectedExports:
  - odysseyTheme
files:
  - packages/odyssey-react-mui/src/themes/odyssey/components.ts
commit: 2041953a2
onlyRelevantIf: you pass odysseyTheme to MUI's own ThemeProvider, since Odyssey re-exports no MUI component at this version
---

MuiFormControl gained a theme override that sets width: 100% and max-width: 32rem, and gives the normal and dense margins a bottom margin of 1.14285714rem with no top margin. Any MUI FormControl under this theme now stretches to its container and caps at 32rem unless fullWidth is set. Check side-by-side form layouts and narrow columns.
