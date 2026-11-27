---
summary: Alert gets default icons; error and warning share one glyph
affectedExports:
  - odysseyTheme
files:
  - packages/odyssey-react-mui/src/themes/odyssey/components.tsx
commit: ba5ecbe04
onlyRelevantIf: you pass odysseyTheme to MUI's own ThemeProvider, since Odyssey re-exports no MUI component at this version
---

MuiAlert now ships a default iconMapping built from Odyssey icons, so the glyph beside an existing Alert changes. Note that error and warning both map to AlertTriangleFilledIcon, so the two severities no longer differ by glyph, only by colour.
