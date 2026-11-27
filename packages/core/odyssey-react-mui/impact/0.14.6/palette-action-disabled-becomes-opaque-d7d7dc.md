---
summary: "`palette.action.disabled` becomes opaque #d7d7dc"
affectedExports:
  - odysseyTheme
  - PasswordInput
files:
  - packages/odyssey-react-mui/src/themes/odyssey/palette.ts
commit: 7b2906ad2
onlyRelevantIf: you render Odyssey's PasswordInput, or pass odysseyTheme to MUI's own ThemeProvider
---

palette.action.disabled changed from the translucent rgba(0, 0, 0, 0.26) to the opaque #d7d7dc. Anything MUI draws from action.disabled, including disabled icon and checkbox glyphs, is now opaque grey rather than a black wash, so it no longer picks up the colour behind it.
