---
summary: "`OdysseyThemeProvider` wraps children in `ScopedCssBaseline`"
affectedExports:
  - OdysseyThemeProvider
  - OdysseyProvider
files:
  - packages/odyssey-react-mui/src/OdysseyThemeProvider.tsx
commit: 8f19d3045
---

OdysseyThemeProvider began rendering a ScopedCssBaseline wrapper around its children, so the whole element reset (p, h1 through h6, table, hr, kbd, ins, mark, abbr and the rest) now applies to every descendant, Odyssey or not. An app that mounted the provider high in its tree sees its own non-Odyssey markup restyled. The wrapper also introduces an extra <div> in the tree. This moves to OdysseyProvider at 1.0.3.
