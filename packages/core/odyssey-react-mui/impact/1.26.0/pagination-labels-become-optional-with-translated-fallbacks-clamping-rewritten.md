---
summary: Pagination labels become optional with translated fallbacks, clamping rewritten
affectedExports:
  - Pagination
files:
  - packages/odyssey-react-mui/src/Pagination/Pagination.tsx
commit: 2e241494d
---

Every label prop on Pagination became optional with an Odyssey translation as its fallback, and lastRow became optional too. A consumer who passes a label as undefined now gets Odyssey's string where they previously got nothing. The page and rows-per-page clamping logic was also rewritten around a computed maxPageIndex, so the values the component settles on at the boundaries can differ from before. Check the final page and any case where rowsPerPage exceeds totalRows.
