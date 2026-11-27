---
summary: Table cells wrap mid-word, detail panel loses its padding and border
affectedExports:
  - DataTable
files:
  - packages/core/odyssey-react-mui/src/DataTable/DataTable.tsx
commit: 36f1708e7
---

Body cells gained `overflowWrap: anywhere`, so long unbroken cell values now break mid-word instead of overflowing, which can change row heights. Detail panel rows lost their padding, border, and hover background, and an expanded detail panel's content gained block padding. When row actions are hidden and column resizing is on, the `<table>` element's own class list gains `ods-column-grow` unless a column sets `grow`. Check column widths, row heights, and any CSS hooked to the table element's classes.
