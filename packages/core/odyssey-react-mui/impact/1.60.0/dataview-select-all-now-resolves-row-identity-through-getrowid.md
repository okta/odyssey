---
summary: DataView Select All now resolves row identity through `getRowId`
affectedExports:
  - DataView
files:
  - packages/core/odyssey-react-mui/src/labs/DataView/DataView.tsx
  - packages/core/odyssey-react-mui/src/labs/DataView/BulkActionsMenu.tsx
commit: d42d42854
onlyRelevantIf: a DataView with row selection whose rows have no `id`, or which supplies `getRowId`
---

Select All now resolves row identity through `getRowId` rather than reading `row.id` directly, and the fallback identifier changed from a random value to the row index, which is stable across refetches. Check select-all behavior and selection persistence across data reloads.
