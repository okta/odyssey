---
summary: DataTable column-to-filter conversion rewritten
affectedExports:
  - DataTable
  - DataFilters
files:
  - packages/odyssey-react-mui/src/DataTable/DataTable.tsx
  - packages/odyssey-react-mui/src/labs/DataFilters.tsx
commit: 53af1c383
onlyRelevantIf: a DataTable derives its filters from its columns
---

Column-to-filter conversion was rewritten. A column's `filterVariant` is no longer defaulted to `"text"`, so a column that did not set one now yields a filter with an undefined variant and renders differently. `filterSelectOptions` given as bare strings are now normalised into label and value pairs.
