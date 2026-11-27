---
summary: DataTable row drag handle gains a tab stop, key handling, and `aria-label`
affectedExports:
  - DataTable
files:
  - packages/odyssey-react-mui/src/labs/DataTable.tsx
commit: 858c4b4e0
onlyRelevantIf: a DataTable has row reordering enabled
---

The row drag handle lost its tabIndex={-1} and gained onKeyDown, a title, an aria-label, and a focus-visible ring, so every drag handle now enters the tab order. A table with many rows adds one tab stop per row. The title and aria-label strings are hardcoded English and do not go through the translation provider. Check keyboard traversal of the page and any test that counts tab stops.
