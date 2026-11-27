---
summary: "`useThemeProps` export removed; theme gains an unused `temp` key"
affectedExports:
  - useTheme
  - useThemeProps
  - odysseyTheme
files:
  - packages/odyssey-react-mui/src/index.ts
  - packages/odyssey-react-mui/src/theme/OdysseyTheme.ts
  - packages/odyssey-react-mui/src/theme/temp.ts
  - packages/odyssey-react-mui/src/theme/theme.ts
  - packages/odyssey-react-mui/src/theme/useTheme.ts
  - packages/odyssey-react-mui/src/theme/index.ts
commit: ee6dce7b8
onlyRelevantIf: you snapshot, spread or deep-compare the theme object, or you type-import useThemeProps from the package root
---

The package root stops re-exporting `useThemeProps`. It was a type-only re-export of MUI's function, so no runtime binding existed before or after, and the one pattern it supported is a type-only import read through `typeof`. `useTheme` also stops being MUI's hook re-exported and becomes an Odyssey wrapper that calls MUI's hook with an OdysseyTheme type argument; MUI's hook takes no arguments and the wrapper returns the same theme instance the provider holds, so the returned value is unchanged and only its declared type narrows. `odysseyTheme` gains one top-level key, `temp`, holding a borderWidth of 24px, which nothing in the package reads and which reaches no CSS. Check type-only imports of `useThemeProps`, and any theme snapshot, spread or deep equality check that now sees the extra key.
