---
summary: "`palette.text.disabled` lightens from #6e6e78 to #8c8c96"
affectedExports:
  - odysseyTheme
  - PasswordInput
files:
  - packages/odyssey-react-mui/src/themes/odyssey/palette.ts
commit: 85e30fa36
onlyRelevantIf: you render Odyssey's PasswordInput, or pass odysseyTheme to MUI's own ThemeProvider
---

palette.text.disabled changed from #6e6e78 to the lighter #8c8c96. Disabled text everywhere under this theme has less contrast against a white background than before. Check disabled labels and helper text against your contrast requirements.
