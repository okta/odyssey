---
summary: Snackbar default anchorOrigin moves to bottom-right
affectedExports:
  - odysseyTheme
files:
  - packages/odyssey-react-mui/src/themes/odyssey/components.ts
commit: 301ec5c41
onlyRelevantIf: you pass odysseyTheme to MUI's own ThemeProvider, since Odyssey re-exports no MUI component at this version
---

MuiSnackbar's default anchorOrigin is now bottom-right, where MUI's own default is bottom-left. Any snackbar you render without an explicit anchorOrigin moves to the other side of the viewport. Check fixed-position UI in the bottom-right corner that a snackbar can now cover.
