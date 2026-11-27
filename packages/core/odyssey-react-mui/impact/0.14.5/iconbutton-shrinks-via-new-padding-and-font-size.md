---
summary: IconButton shrinks via new padding and font-size
affectedExports:
  - odysseyTheme
  - PasswordInput
files:
  - packages/odyssey-react-mui/src/themes/odyssey/components.ts
commit: 301ec5c41
onlyRelevantIf: you render Odyssey's PasswordInput, or pass odysseyTheme to MUI's own ThemeProvider
---

MuiIconButton gained a theme override that sets its padding to 0.28571429rem and its font size to the body size. A MUI IconButton under this theme is now noticeably smaller than MUI's default. Check icon buttons inside toolbars, table cells and input adornments.
