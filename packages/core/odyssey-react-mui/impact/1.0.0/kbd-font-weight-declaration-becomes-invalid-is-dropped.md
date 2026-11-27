---
summary: "`kbd` font-weight declaration becomes invalid, is dropped"
affectedExports:
  - ScopedCssBaseline
  - OdysseyProvider
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: 8f19d3045
onlyRelevantIf: content inside ScopedCssBaseline that uses `<kbd>`
---

`kbd`'s `fontWeight` is now an invalid declaration. It was `theme.typography.fontWeightRegular`, the number 400; it is now `odysseyTokens.Spacing5`, the string `1.71428571rem`. A length is not a valid `font-weight`, so the browser drops the declaration and the element falls back to its inherited weight. Its corner radius also went 4px to 6px. The release shipped as one squashed commit, so the hash points at the whole release rather than at the individual change. v0.24.0 components.tsx:826; v1.0.0 components.tsx:977.
