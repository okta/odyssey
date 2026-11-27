---
summary: Button loses its 64px minimum width
affectedExports:
  - odysseyTheme
files:
  - packages/odyssey-react-mui/src/themes/odyssey/components.tsx
commit: d84b135d7
onlyRelevantIf: you pass odysseyTheme to MUI's own ThemeProvider, since Odyssey re-exports no MUI component at this version
---

The Button root now sets minWidth: "unset", removing MUI's 64px minimum. A button with a short label, an icon only, or a single character gets narrower than before. Check toolbars and button rows sized around the old minimum.
