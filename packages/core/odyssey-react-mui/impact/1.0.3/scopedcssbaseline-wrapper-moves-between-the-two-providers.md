---
summary: "`ScopedCssBaseline` wrapper moves between the two providers"
affectedExports:
  - OdysseyThemeProvider
  - OdysseyProvider
files:
  - packages/odyssey-react-mui/src/OdysseyThemeProvider.tsx
  - packages/odyssey-react-mui/src/OdysseyProvider.tsx
commit: 1bffb3bca
onlyRelevantIf: OdysseyThemeProvider mounted directly rather than through OdysseyProvider
---

The ScopedCssBaseline wrapper moved from OdysseyThemeProvider to OdysseyProvider. An app that mounts OdysseyThemeProvider on its own loses the entire element reset and the wrapper div that came with it, so unstyled <p>, <table>, <hr> and heading elements revert to browser defaults. An app on OdysseyProvider sees the wrapper move one level in the tree.
