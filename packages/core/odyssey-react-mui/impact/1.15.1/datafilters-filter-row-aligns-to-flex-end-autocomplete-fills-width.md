---
summary: DataFilters filter row aligns to flex-end, autocomplete fills width
affectedExports:
  - DataFilters
files:
  - packages/odyssey-react-mui/src/labs/DataFilters.tsx
commit: 86b2e7e6e
onlyRelevantIf: a DataFilters renders its autocomplete filter row
---

Two styled components were rewritten from a tagged template into an object, which fixed declarations that had never been valid CSS. The outer row was declaring `align-items: center` followed by a stray `alignitems: "flex-end"` that the browser dropped, and it now genuinely aligns to `flex-end`. The inner container's `width: "100%"` was quoted inside a template literal and so was also dropped, and it now genuinely fills the width. The filter row's vertical alignment and the autocomplete's width both change. The `gap` remains unitless and still has no effect.
