---
summary: DataView header checkbox and Select all follow the rows on screen
affectedExports:
  - DataView
  - DataTable
  - BulkActionsMenu
  - TableLayoutContent
files:
  - packages/core/odyssey-react-mui/src/labs/DataView/BulkActionsMenu.tsx
  - packages/core/odyssey-react-mui/src/labs/DataView/TableLayoutContent.tsx
onlyRelevantIf: a DataView, the DataTable from the labs subpath, or a DataView built on BulkActionsMenu or TableLayoutContent from the __internal subpath, with row selection whose selection can hold rows that are not selectable rows on screen, such as rows on other pages, rows hidden by search or filters, or rows disabled by isRowSelectionDisabled
commit: d926e9a07
---

The table header checkbox and the Select all button now decide their state from the selectable rows on screen. Before, both compared a count of the whole selection with the number of rows on screen, so a selection that held other rows could show the wrong state. The root `DataTable` export has its own table setup and bulk menu and is not affected.

- Header checkbox: before, it compared the number of keys in the selection, `false` keys included, with the number of rows on screen. So it showed unchecked when some rows on screen were checked and the selection held at least as many keys as there were rows on screen. Now it shows the partial state whenever some, but not all, selectable rows on screen are checked. It now shows unchecked, not partial, when no selectable row on screen is checked, even if the selection holds other rows. That includes a selection made only of rows disabled by `isRowSelectionDisabled`.
- Select all: before, it was disabled whenever the number of selected rows was at least the number of selectable rows on screen, even with unchecked selectable rows on screen. Now it is disabled only when every selectable row on screen is selected.

The partial state is visual only. MUI marks it with `data-indeterminate="true"` on the input and does not set `aria-checked="mixed"`.

A contribution package's DataView built on `@okta/odyssey-react-mui/__internal` gets the header change only if it renders `TableLayoutContent` from there, and the Select all change only if it renders `BulkActionsMenu` from there.

Check any test or snapshot that reads the header checkbox's `data-indeterminate` or checked state, or the Select all button's `aria-disabled`, where the selection holds rows that are not on screen or are disabled.
