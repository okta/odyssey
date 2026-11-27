---
summary: Adjacent buttons always get 0.571rem gap, not just matching ones
affectedExports:
  - odysseyTheme
files:
  - packages/odyssey-react-mui/src/themes/odyssey/components.ts
commit: 020e0d397
onlyRelevantIf: you pass odysseyTheme to MUI's own ThemeProvider, since Odyssey re-exports no MUI component at this version
---

The adjacent-Button margin selector changed from "& + &", which only matched two buttons that emotion had given the identical generated class, to ".MuiButton-root + &", which matches any button. Two adjacent buttons of different variants or sizes previously got no inline spacing and now get 0.57142857rem. Check button groups where you added the gap yourself.
