---
summary: OutlinedInput border states rewritten, multiline defaults to 3 rows
affectedExports:
  - odysseyTheme
  - PasswordInput
files:
  - packages/odyssey-react-mui/src/themes/odyssey/components.ts
commit: 65349ff3f
onlyRelevantIf: you render Odyssey's PasswordInput, or pass odysseyTheme to MUI's own ThemeProvider
---

OutlinedInput's border states were rewritten. Hover now goes to text.primary rather than the primary blue, focus thickens the outline to 2px, error and disabled get their own colours, a multiline field loses its root padding, and multiline defaults to minRows: 3. Check field heights, and any three-row default you were setting yourself.
