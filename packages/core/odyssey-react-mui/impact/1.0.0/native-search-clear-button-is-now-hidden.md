---
summary: Native search-clear button is now hidden
affectedExports:
  - SearchField
  - TextField
  - InputBase
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: 8f19d3045
onlyRelevantIf: a SearchField, or any input of type search
---

The browser's native search clear affordance is now hidden. Three new rules set `display: none` on `::-webkit-search-cancel-button`, `::-moz-search-cancel-button`, and `::-ms-clear`. On Chrome, Safari, and Edge a search input previously showed the platform's own clear glyph alongside Odyssey's; that glyph is gone, which frees inline space and removes a control a user may have been clicking. The release shipped as one squashed commit, so the hash points at the whole release rather than at the individual change. No such rules at v0.24.0; v1.0.0 components.tsx:1452-1465.
