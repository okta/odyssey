---
summary: Hardcoded English accessible names now resolve through translations
affectedExports:
  - DataTable
  - DataView
  - SearchField
files:
  - packages/core/odyssey-react-mui/src/DataTable/useRowReordering.tsx
  - packages/core/odyssey-react-mui/src/SearchField.tsx
  - packages/core/odyssey-react-mui/src/labs/DataView/BulkActionsMenu.tsx
commit: 2d3adbc11
onlyRelevantIf: impact depends on the consumer's locale, because at English every one of these strings matches the previous hardcoded text exactly
---

Accessible names that were hardcoded English are now resolved through translations: the row drag handle's name and tooltip, the search field's clear button, and the bulk actions menu. Check accessibility snapshots and any test that located these controls by their previous literal English name.
