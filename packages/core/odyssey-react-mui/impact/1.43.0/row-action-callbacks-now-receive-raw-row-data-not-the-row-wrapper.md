---
summary: Row action callbacks now receive raw row data, not the row wrapper
affectedExports:
  - DataView
files:
  - packages/odyssey-react-mui/src/labs/DataView/RowActions.tsx
  - packages/odyssey-react-mui/src/labs/DataView/TableLayoutContent.tsx
commit: f3175d42b
---

Row action callbacks in the table layout now receive the raw row data where they previously received the library's row wrapper, so a callback reading through the wrapper's `original` field stops finding its data. The row-reorder path also now reads the data's own `id` rather than the wrapper's. TypeScript flags this as a signature change; JavaScript does not, and fails at runtime instead. Check every `rowActionButtons` and `rowActionMenuItems` callback.
