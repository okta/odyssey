---
summary: Input adornment gains flex layout and side padding
affectedExports:
  - odysseyTheme
  - PasswordInput
files:
  - packages/odyssey-react-mui/src/themes/odyssey/components.ts
commit: 46db653e4
onlyRelevantIf: you render Odyssey's PasswordInput, or pass odysseyTheme to MUI's own ThemeProvider
---

MuiInputAdornment gained a theme override that defaults its variant to outlined, zeroes its inner margin, and makes it a flex box, and OutlinedInput now adds 0.85714286rem of padding on the side that carries an adornment. Check fields with a leading or trailing adornment: the gap between adornment and text, and the field's overall width, both move.
