---
summary: Typography default font changes from Public Sans to Inter
affectedExports:
  - Typography
  - odysseyTheme
  - OdysseyThemeProvider
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: fab91e6c8
---

MuiTypography's defaultProps fontFamily changed from Public Sans to Inter. Note that the theme kept 'Noto Sans Arabic' in the stack while the FontFamilyBase token dropped it in the same release, so text rendered through Typography and text rendered from the raw token no longer use the same fallback chain.
