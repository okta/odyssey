---
summary: Pagination range label can read past the total row count
affectedExports:
  - Pagination
  - usePagination
files:
  - packages/odyssey-react-mui/src/Pagination/usePagination.ts
  - packages/odyssey-react-mui/src/Pagination/Pagination.tsx
commit: a7ada2dd7
---

usePagination computes lastRow from a new currentRowsCount argument instead of pageSize, and the clamp that capped lastRow at totalRows was deleted. Pagination defaults currentRowsCount to pageSize when the new optional prop is absent, so the range label on a partial final page now reads past the total, for example 180 to 200 of 190 where it used to read 180 to 190. Check the range label on the last page of every paginated view.
