---
summary: OdysseyProvider always rebuilds its theme through a second createTheme pass
affectedExports:
  - OdysseyProvider
  - OdysseyThemeProvider
files:
  - packages/odyssey-react-mui/src/OdysseyThemeProvider.tsx
commit: 9a6856956
---

The theme is now always rebuilt as createTheme(deepmerge(odysseyTheme, themeOverride || {})). Previously, with no themeOverride, the theme object came straight from createOdysseyMuiTheme with no second createTheme pass. Passing an already-built theme back through createTheme re-runs MUI's palette augmentation and typography construction over values that have already been processed. Check custom palette entries, typography variants and any theme value read at runtime rather than through a styleOverride.
