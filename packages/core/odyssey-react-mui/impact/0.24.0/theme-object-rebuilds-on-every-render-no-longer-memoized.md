---
summary: Theme object rebuilds on every render, no longer memoized
affectedExports:
  - OdysseyThemeProvider
  - createOdysseyMuiTheme
files:
  - packages/odyssey-react-mui/src/OdysseyThemeProvider.tsx
  - packages/odyssey-react-mui/src/theme/theme.ts
  - packages/odyssey-react-mui/src/theme/palette.ts
  - packages/odyssey-react-mui/src/theme/mixins.ts
  - packages/odyssey-react-mui/src/theme/shape.ts
  - packages/odyssey-react-mui/src/theme/spacing.ts
  - packages/odyssey-react-mui/src/theme/typography.ts
  - packages/odyssey-react-mui/src/theme/index.ts
commit: 3a5a1c7d3
---

The theme is now built per render from a token object rather than being a module-level constant, and OdysseyThemeProvider builds it outside useMemo, so a new theme object is produced on every render of the provider. Everything that consumes the theme re-renders. Note also that primary.main falls back to ColorPaletteGreen500, not blue, if a designTokensOverride sets ColorPaletteBlue500 to undefined.
