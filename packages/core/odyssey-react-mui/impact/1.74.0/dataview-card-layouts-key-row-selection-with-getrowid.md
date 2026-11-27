---
summary: DataView card layouts key row selection with getRowId
affectedExports:
  - DataView
files:
  - packages/core/odyssey-react-mui/src/labs/DataView/CardLayoutContent.tsx
onlyRelevantIf: a DataView with row selection in the grid or list layout, where getRowId returns something other than a truthy string row.id. That covers a custom getRowId, rows with a numeric id, and rows with no id or a falsy one
commit: d432047fc
---

The grid and list layouts now read and write the row selection with the key `getRowId` returns, as a string. Before, they used `row.id` and ignored `getRowId`, while the table layout and the Select all button used `getRowId`.

- Custom `getRowId`: before, checking a card stored `row.id`, while Select all stored `getRowId` keys. No card showed as checked after Select all, and checking a card afterwards counted that row twice. Now cards, the table, and Select all use the same key.
- Numeric `id`: before, a checked card could not be unchecked. Now it can.
- Rows with no `id` or a falsy one: before, they all shared one key, so checking one card checked all of them. Now each card uses the default `getRowId` fallback, its index on the page, and selects only itself.

Check code that reads the selection from `onRowSelectionChange`, `onChangeRowSelection`, or `bulkActionMenuItems` in a card layout. Its keys are now the `getRowId` values, not `row.id`. Check any controlled `rowSelection` you pass to a card layout too: it must use `getRowId` keys, as its documentation already says.
