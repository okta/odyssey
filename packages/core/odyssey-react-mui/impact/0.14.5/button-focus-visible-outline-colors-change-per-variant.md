---
summary: Button focus-visible outline colors change per variant
affectedExports:
  - odysseyTheme
files:
  - packages/odyssey-react-mui/src/themes/odyssey/components.ts
commit: 017fb9912
onlyRelevantIf: you pass odysseyTheme to MUI's own ThemeProvider, since Odyssey re-exports no MUI component at this version
---

Button focus-visible styling changed for every variant. Primary, secondary and floating gained an explicit blue outline colour; danger's outline went from the light red #f88c90 to the main red #da372c; and secondary no longer sets its background and text to the same blue on focus, which had made its label unreadable, and instead reuses its hover colours plus the outline. Check anything that screenshots or asserts on a focused button.
