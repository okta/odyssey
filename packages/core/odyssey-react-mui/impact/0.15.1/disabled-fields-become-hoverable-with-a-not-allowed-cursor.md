---
summary: Disabled fields become hoverable with a not-allowed cursor
affectedExports:
  - odysseyTheme
  - PasswordInput
files:
  - packages/odyssey-react-mui/src/themes/odyssey/components.tsx
commit: ad3c5a134
onlyRelevantIf: you render Odyssey's PasswordInput, or pass odysseyTheme to MUI's own ThemeProvider
---

A read-only InputBase now takes a grey #f5f5f6 background, and a disabled OutlinedInput swapped pointer-events: none for cursor: not-allowed with pointer events restored. A disabled field is now hoverable and shows a not-allowed cursor where it previously swallowed every pointer event, so a tooltip or click handler on or around a disabled field starts firing.
