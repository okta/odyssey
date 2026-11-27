---
summary: "Table container gets `display: block !important`, overriding a consumer's own"
affectedExports:
  - StaticTable
  - PaginatedTable
  - DataTable
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: a6e998e8d
onlyRelevantIf: a table container the consumer set their own display on
---

MuiTableContainer's root gained `display: block !important`, which outranks a `display` the consumer sets on the same element. A table container the consumer gave its own display value stops using it.
