---
summary: Small buttons become 2px narrower after an invalid padding fix
affectedExports:
  - odysseyTheme
files:
  - packages/odyssey-react-mui/src/themes/odyssey/components.ts
commit: 523e6ab8a
onlyRelevantIf: you pass odysseyTheme to MUI's own ThemeProvider, since Odyssey re-exports no MUI component at this version
---

A small Button's inline padding was written as calc(0.85714286rem - - 1px), which is invalid CSS and was dropped, so small buttons fell back to the base inline padding. It now resolves to calc(0.85714286rem - 1px), making every size="s" button 2px narrower. Check tight button rows and any width you measured from a small button.
