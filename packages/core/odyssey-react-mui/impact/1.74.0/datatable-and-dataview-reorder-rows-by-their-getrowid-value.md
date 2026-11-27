---
summary: DataTable and DataView reorder rows by their getRowId value
affectedExports:
  - DataTable
  - DataView
files:
  - packages/core/odyssey-react-mui/src/DataTable/DataTable.tsx
  - packages/core/odyssey-react-mui/src/DataTable/reorderDataRowsLocally.tsx
  - packages/core/odyssey-react-mui/src/DataTable/useRowReordering.tsx
  - packages/core/odyssey-react-mui/src/labs/DataView/CardLayoutContent.tsx
  - packages/core/odyssey-react-mui/src/labs/DataView/DataView.tsx
  - packages/core/odyssey-react-mui/src/labs/DataView/RowActions.tsx
  - packages/core/odyssey-react-mui/src/labs/DataView/TableLayoutContent.tsx
onlyRelevantIf: row reordering is on (hasRowReordering with onReorderRows), and either a custom getRowId returns something other than row.id, or a DataView row's id is missing or falsy
commit: d432047fc
---

Every way to reorder a row now identifies it by the id `getRowId` returns: the row actions menu ("Bring to front", "Bring forward", "Send backward", "Send to back") in the table, grid, and list layouts, and the drag handle with the mouse or the keyboard. `onReorderRows` receives that id as `rowId`, and the row moves on screen.

This applies to `DataView` from `@okta/odyssey-react-mui/labs` and to `DataTable` from `@okta/odyssey-react-mui`. `DataTable` from `@okta/odyssey-react-mui/labs` does not pass `getRowId` or `onReorderRows` on to `DataView`, so it is unaffected.

| Path | `rowId` before | `rowId` now | Row moved on screen before |
| --- | --- | --- | --- |
| `DataView` row actions menu, table and card layouts | `row.id` | the `getRowId` value | yes |
| `DataView` drag handle, mouse | the `getRowId` value | the `getRowId` value | no |
| `DataView` drag handle, keyboard | not called, threw `getRow could not find row with ID` | the `getRowId` value | no |
| `DataTable` row actions menu and mouse drag | the `getRowId` value | the `getRowId` value | no |
| `DataTable` drag handle, keyboard | not called, threw the same error | the `getRowId` value | no |

The only change to the value a consumer receives is in the `DataView` row actions menu, which used to send `row.id`. Code that handles `onReorderRows` from that menu and looks the row up by `row.id` now receives the `getRowId` value instead. Look the row up by the value your `getRowId` returns for it.

The row moves on screen on the first page. On later pages, the row actions menu and the keyboard send a `newRowIndex` that counts the rows on earlier pages, and the row does not move on screen. That is unchanged.

With the default `getRowId` and a truthy `id`, `rowId` is still `row.id`. `rowId` is declared as `string`, but `DataView`'s default `getRowId` passes a numeric `id` through unconverted, so `rowId` is a number in that case, as before. Row selection keys convert the same value to a string.

`DataView`'s default `getRowId` uses the row's position on the page, as a string, when `id` is missing or falsy, such as `0`. For such a row:

- The row actions menu now sends that string, where it used to send `row.id`.
- The drag handle already sent that string. Before, the local move matched it against `row.id`, so it moved nothing, or moved the row whose string `id` equals it. Now it moves the row.
- When that string equals another row's `id`, as a string or a number, the two rows share an id. Reordering either one, from any path, moves whichever of the two comes first. Before, only the drag handle could do this, and only for a string `id`. The table and row selection already shared the id.
