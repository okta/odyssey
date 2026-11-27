---
summary: DataView Select all keeps rows selected on other pages
affectedExports:
  - DataView
  - DataTable
  - BulkActionsMenu
files:
  - packages/core/odyssey-react-mui/src/labs/DataView/BulkActionsMenu.tsx
onlyRelevantIf: a DataView, the DataTable from the labs subpath, or a DataView built on BulkActionsMenu from the __internal subpath, with row selection whose selection can hold rows that are not selectable rows on screen, such as rows selected on another page, rows hidden by search or filters, rows disabled by isRowSelectionDisabled, or a rowSelection or initialRowSelection seeded with other rows
commit: d926e9a07
---

The Select all button now adds the selectable rows on screen to the existing selection. Before, it replaced the selection with only those rows, so rows selected on other pages, or hidden by search or filters, were dropped. The table header checkbox already added to the selection, so both controls now produce the same selection object. The root `DataTable` export has its own bulk menu and is not affected. A contribution package's DataView that renders `BulkActionsMenu` from `@okta/odyssey-react-mui/__internal` gets the same change.

- The object passed to `onRowSelectionChange`, `onChangeRowSelection`, and `bulkActionMenuItems` after Select all now keeps every key the selection held before, plus a `true` key for each selectable row on screen.
- A key set to `false` in the selection stays `false` unless its row is a selectable row on screen, in which case it becomes `true`.
- A key set to `true` for a row disabled by `isRowSelectionDisabled` now stays `true`. Before, Select all dropped it. Disabled rows that were not selected are still skipped.
- Select none still clears the whole selection.

Check any test, snapshot, or handler that expects Select all to produce only the rows on screen, for example one that reads `Object.keys(selection).length` as the page size.
