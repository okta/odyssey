---
summary: Pagination's page value is now clamped to a minimum of 1
affectedExports:
  - Pagination
  - DataView
  - DataTable
files:
  - packages/odyssey-react-mui/src/Pagination/Pagination.tsx
commit: 03c951d0e
onlyRelevantIf: a pagination control with an editable page-number input
---

Page and page-size parsing moved from `parseInt` to `Number`, and the page value is now clamped to a minimum of 1. Two behaviours change together: an empty input used to yield NaN and now yields 0 before clamping to 1. Check what your handler receives for cleared and malformed input.
