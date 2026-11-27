---
summary: "`body` typography variant renamed to `body1`, `caption` removed"
affectedExports:
  - odysseyTheme
files:
  - packages/odyssey-react-mui/src/themes/odyssey/typography.ts
  - packages/odyssey-react-mui/src/themes/odyssey/typography.types.ts
commit: 1374c239a
onlyRelevantIf: you pass odysseyTheme to MUI's own ThemeProvider, since Odyssey re-exports no MUI component at this version
---

The theme's typography.body was renamed to typography.body1 and typography.caption was removed, while the type augmentation still accepts variant="body". So <Typography variant="body"> keeps compiling and renders with no variant styles at all, and <Typography variant="caption"> falls back to MUI's own caption rather than Odyssey's. Two new variants, subtitle1 and legend, were added. Check every Typography that names body or caption.
